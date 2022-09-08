import axios from 'axios';
const qs = require('qs');

import ValidatorRule from '@/validator/rule';
import PglyBaseComponent from './base';
import PglyCheckboxComponent from './checkbox';
import PglyInputComponent from './input';
import PglyTextAreaComponent from './textarea';
import EventHandler from '@/events/handler';

export type TFormError = {
	name: string;
	value: string;
	message?: string;
};

export type TFormPreparedData = {
	inputs: Record<string, any>;
	errors: Array<TFormError>;
};

export type TFormOptions = {
	x_security: string;
};

export default class FormEngine extends EventHandler {
	protected wrapper: HTMLFormElement;
	protected inputs: Array<PglyBaseComponent>;
	protected button: HTMLButtonElement;
	protected options: TFormOptions;
	protected loading: boolean = false;

	constructor(el: string | HTMLFormElement, options: TFormOptions) {
		super();

		this.wrapper = FormEngine.getElement(el);
		this.button = FormEngine.findElement(this.wrapper, 'button.pgly-form--submit');
		this.inputs = [];
		this.options = options;
	}

	public add(input: PglyBaseComponent) {
		this.inputs.push(input);
	}

	public auto() {
		this.wrapper.querySelectorAll<HTMLDivElement>('.pgly-form--input').forEach(el => {
			if (el.classList.contains('.pgly-form--text')) {
				this.inputs.push(new PglyInputComponent(el));
				return;
			}

			if (el.classList.contains('.pgly-form--textarea')) {
				this.inputs.push(new PglyTextAreaComponent(el));
				return;
			}

			if (el.classList.contains('.pgly-form--checkbox')) {
				this.inputs.push(new PglyCheckboxComponent(el));
				return;
			}
		});
	}

	public prepare(rules: Record<string, Array<ValidatorRule>> = {}): TFormPreparedData {
		const inputs: Record<string, any> = {};
		const errors: Array<TFormError> = [];

		this.inputs.forEach(el => {
			if (rules[el.getName()]) {
				el.validate(rules[el.getName()]);

				if (el.hasError()) {
					errors.push({
						name: el.getName(),
						value: el.getValue(),
						message: el.getError().message,
					});
				}
			}

			inputs[el.getName()] = el.getValue();
		});

		return { inputs, errors };
	}

	public isLoading(): boolean {
		return this.loading;
	}

	protected submit(data: TFormPreparedData) {
		if (this.loading) {
			return;
		}

		if (data.errors.length !== 0) {
			this.emit('error', { data: data.errors });
			return;
		}

		this.loadState(true);

		data.inputs.xSecurity = this.options.x_security;
		this.emit('prepared', data);

		axios
			.post(this.wrapper.action, qs.stringify(data.inputs))
			.then(res => {
				this.emit('submitted', { data: data.inputs, response: res.data });
			})
			.catch(err => {
				this.emit('unsubmitted', { data: data.inputs, error: err });
			})
			.finally(() => {
				this.loadState(false);
				this.emit('finished', { data: data.inputs });
			});
	}

	protected loadState(loading: boolean) {
		this.loading = loading;
		this.button.classList.toggle('pgly-loading--state');
	}

	protected bind() {
		this.wrapper.addEventListener('submit', e => {
			e.preventDefault();
			this.submit(this.prepare());
		});

		this.button.addEventListener('click', e => {
			e.preventDefault();
			this.submit(this.prepare());
		});
	}

	public static getElement<T = HTMLElement>(el: string | HTMLElement): T {
		if (typeof el === 'string') {
			const wrapper = document.getElementById(el);
			if (!wrapper) throw new Error(`Cannot find element id #${el} on DOM...`);
			return wrapper as T;
		}

		return el as T;
	}

	public static findElement<T = HTMLElement>(wrapper: HTMLElement, query: string): T {
		const el = wrapper.querySelector(query);
		if (!query)
			throw new Error(`Cannot find element with query ${query} on wrapper...`);
		return el as T;
	}
}
