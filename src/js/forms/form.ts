import axios from 'axios';
import stringify from 'qs-stringify';

import PglyBaseComponent from './base';
import PglyCheckboxComponent from './checkbox';
import PglyInputComponent from './input';
import PglyTextAreaComponent from './textarea';
import EventHandler from '../events/handler';
import DOMManipulation from '../behaviours/dommanipulation';
import { RuleValidator } from '../validator/engine';
import PglySelectComponent from './select';
import { TOrUndefined } from '../types';
import PglyFinderComponent from './finder';
import PglySingleMediaComponent from './singlemedia';
import PglyMultipleMediaComponent from './multiplemedia';
import { PglyGroupFormComponent } from './group';
import PglyBasicSelectComponent from './basicselect';
import PglyTextEditorComponent from './texteditor';

export type TFormError = {
	name: string;
	value: any;
	message?: string;
};

export type TFormPreparedData = {
	inputs: Record<string, any>;
	errors: Array<TFormError>;
};

export type TFormOptions = {
	x_security?: string;
	inputs?: Array<PglyBaseComponent>;
	rules?: Record<string, Array<RuleValidator>>;
};

export type TFormBody<T = any> = (data: Record<string, any>) => T;

export abstract class PglyBaseFormEngine extends EventHandler {
	protected _wrapper: HTMLFormElement;

	protected _inputs: Array<PglyBaseComponent>;

	protected _options: TFormOptions;

	protected _loading = false;

	protected _currentButtonClass = '.pgly-form--submit';

	protected _formatter: TFormBody;

	constructor (el: string | HTMLFormElement, options: Partial<TFormOptions> = {}) {
		super();

		this._wrapper = DOMManipulation.getElement(el);

		this._inputs = options.inputs ?? [];
		this._options = options;
		this._formatter = data => stringify(data);

		this._bind();
	}

	public changeSubmitButtonClass (querySelector: string) {
		this._currentButtonClass = querySelector;
	}

	public restoreSubmitButtonClass () {
		this._currentButtonClass = '.pgly-form--submit';
	}

	public formEl (): HTMLFormElement {
		return this._wrapper;
	}

	public dataset (): Record<string, any> {
		return this._wrapper.dataset;
	}

	public formatter (func: TFormBody) {
		this._formatter = func;
	}

	public add (input: PglyBaseComponent) {
		this._inputs.push(input);
	}

	public get<T = PglyBaseComponent> (name: string): TOrUndefined<T> {
		return this._inputs.find(
			i => i.field().name() === name
		) as unknown as TOrUndefined<T>;
	}

	public remove (name: string) {
		this._inputs = this._inputs.filter(i => i.field().name() !== name);
	}

	public auto () {
		const prefix = `pgly-form`;

		this._wrapper.querySelectorAll<HTMLDivElement>(`.${prefix}--input`).forEach(el => {
			if (el.classList.contains(`${prefix}--text`)) {
				this._inputs.push(new PglyInputComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--textarea`)) {
				this._inputs.push(new PglyTextAreaComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--texteditor`)) {
				this._inputs.push(new PglyTextEditorComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--checkbox`)) {
				this._inputs.push(new PglyCheckboxComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--select`)) {
				this._inputs.push(new PglyBasicSelectComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--eselect`)) {
				this._inputs.push(new PglySelectComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--finder`)) {
				this._inputs.push(new PglyFinderComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--single-media`)) {
				this._inputs.push(new PglySingleMediaComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--multiple-media`)) {
				this._inputs.push(new PglyMultipleMediaComponent(el));
				return;
			}

			if (el.classList.contains(`${prefix}--group`)) {
				const comp = new PglyGroupFormComponent(el);
				comp.auto();
				this._inputs.push(comp);
			}
		});
	}

	public prepare (rules: Record<string, Array<RuleValidator>> = {}): TFormPreparedData {
		const inputs: Record<string, any> = {};
		const errors: Array<TFormError> = [];

		this._inputs.forEach(el => {
			if (rules[el.field().name()]) {
				el.validate(rules[el.field().name()]);

				if (el.error().has()) {
					errors.push({
						name: el.field().name(),
						value: el.field().get(),
						message: el.error().message(),
					});
				}
			}

			inputs[el.field().name()] = el.field().get();
		});

		return { inputs, errors };
	}

	public isLoading (): boolean {
		return this._loading;
	}

	public abstract submit(method: string, action: string, data: TFormPreparedData): void;

	protected loadState (loading: boolean) {
		this._loading = loading;
		this._wrapper
			.querySelectorAll(this._currentButtonClass)
			.forEach(el => el.classList.toggle('pgly-loading--state'));
	}

	protected _bind () {
		const action = this._wrapper.action ?? this._wrapper.dataset.action ?? '/';
		const method = this._wrapper.method ?? this._wrapper.dataset.method ?? 'POST';

		this._wrapper.addEventListener('submit', e => {
			e.preventDefault();
			this.submit(method, action, this.prepare(this._options.rules ?? {}));
		});

		this._wrapper.addEventListener('click', e => {
			e.preventDefault();
			const target = e.target as HTMLElement;

			if (!target) return;

			if (target.classList.contains('pgly-form--submit')) {
				this.submit(method, action, this.prepare(this._options.rules ?? {}));
			}
		});
	}
}

export class PglyAsyncFormEngine extends PglyBaseFormEngine {
	public submit (method: string, action: string, data: TFormPreparedData) {
		const _data = { ...data };

		if (this._loading) {
			return;
		}

		if (_data.errors.length !== 0) {
			this.emit('error', { data: _data.errors });
			return;
		}

		this.loadState(true);

		_data.inputs.xSecurity = this._options.x_security;
		this.emit('prepared', _data);

		const request =
			method.toUpperCase() === 'POST'
				? axios.post(action, this._formatter(_data.inputs))
				: axios.get(action, this._formatter(_data.inputs));

		request
			.then(res => {
				this.emit('requestSuccess', { data: _data.inputs, response: res.data });
			})
			.catch(err => {
				this.emit('requestError', { data: _data.inputs, error: err });
			})
			.finally(() => {
				this.loadState(false);
				this.emit('requestEnd', { data: _data.inputs });
				this.restoreSubmitButtonClass();
			});
	}
}
