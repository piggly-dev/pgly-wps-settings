import axios from 'axios';
import stringify from 'qs-stringify';

import PglyBaseComponent from './base';
import PglyCheckboxComponent from './checkbox';
import PglyInputComponent from './input';
import PglyTextAreaComponent from './textarea';
import EventHandler from '@/events/handler';
import DOMManipulation from '@/behaviours/dommanipulation';
import { RuleValidator } from '@/validator/engine';
import PglySelectComponent from './select';
import { TOrUndefined } from '@/types';
import PglyFinderComponent from './finder';
import PglySingleMediaComponent from './singlemedia';
import PglyMultipleMediaComponent from './multiplemedia';
import { PglyGroupFormComponent } from './group';

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
	protected _button: HTMLButtonElement;
	protected _options: TFormOptions;
	protected _loading: boolean = false;
	protected _formatter: TFormBody;

	constructor(el: string | HTMLFormElement, options: Partial<TFormOptions> = {}) {
		super();

		this._wrapper = DOMManipulation.getElement(el);
		this._button = DOMManipulation.findElement(
			this._wrapper,
			'button.pgly-form--submit'
		);

		this._inputs = options.inputs ?? [];
		this._options = options;
		this._formatter = data => stringify(data);

		this._bind();
	}

	public formatter(func: TFormBody) {
		this._formatter = func;
	}

	public add(input: PglyBaseComponent) {
		this._inputs.push(input);
	}

	public get(name: string): TOrUndefined<PglyBaseComponent> {
		return this._inputs.find(i => i.field().name() === name);
	}

	public remove(name: string) {
		this._inputs = this._inputs.filter(i => i.field().name() !== name);
	}

	public auto() {
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

			if (el.classList.contains(`${prefix}--checkbox`)) {
				this._inputs.push(new PglyCheckboxComponent(el));
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
				return;
			}
		});
	}

	public prepare(rules: Record<string, Array<RuleValidator>> = {}): TFormPreparedData {
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

	public isLoading(): boolean {
		return this._loading;
	}

	protected abstract submit(data: TFormPreparedData): void;

	protected loadState(loading: boolean) {
		this._loading = loading;
		this._button.classList.toggle('pgly-loading--state');
	}

	protected _bind() {
		this._wrapper.addEventListener('submit', e => {
			e.preventDefault();
			this.submit(this.prepare(this._options.rules ?? {}));
		});

		this._button.addEventListener('click', e => {
			e.preventDefault();
			this.submit(this.prepare(this._options.rules ?? {}));
		});
	}
}

export class PglyAsyncFormEngine extends PglyBaseFormEngine {
	protected submit(data: TFormPreparedData) {
		console.table(data.inputs);
		if (this._loading) {
			return;
		}

		if (data.errors.length !== 0) {
			this.emit('error', { data: data.errors });
			return;
		}

		this.loadState(true);

		data.inputs.xSecurity = this._options.x_security;
		this.emit('prepared', data);

		const { method = 'POST', action } = this._wrapper;

		let request =
			method.toUpperCase() === 'POST'
				? axios.post(action, this._formatter(data.inputs))
				: axios.get(action, this._formatter(data.inputs));

		request
			.then(res => {
				this.emit('requestSuccess', { data: data.inputs, response: res.data });
			})
			.catch(err => {
				this.emit('requestError', { data: data.inputs, error: err });
			})
			.finally(() => {
				this.loadState(false);
				this.emit('requestEnd', { data: data.inputs });
			});
	}
}
