import EventHandler from '@/events/handler';
import ValidatorEngine from '@/validator/engine';
import ValidatorRule from '@/validator/rule';

export type TInputError = {
	state: boolean;
	message?: string;
};

export default abstract class PglyBaseComponent extends EventHandler {
	protected wrapper: HTMLDivElement;
	protected message: HTMLSpanElement;
	protected error: TInputError;

	constructor(el: string | HTMLDivElement) {
		super();

		this.wrapper = PglyBaseComponent.getElement<HTMLDivElement>(el);
		this.message = this.wrapper.querySelector('.pgly-wps--message') as HTMLSpanElement;
		this.error = { state: false, message: undefined };
	}

	public applyError(message: string) {
		this.error = { state: true, message: message };

		this.wrapper.classList.toggle('pgly-wps--error');
		this.message.textContent = message;

		this.emit('error', { component: this, message: message });
	}

	public flushError() {
		this.error = { state: false, message: undefined };

		this.wrapper.classList.toggle('pgly-wps--error');
		this.message.textContent = '';

		this.emit('flushError', { component: this });
	}

	public getError(): TInputError {
		return this.error;
	}

	public hasError(): boolean {
		return this.error.state;
	}

	public validate<T = any>(rules: Array<ValidatorRule>): void {
		ValidatorEngine.apply<T>(rules, this.getValue(), this.applyError, this.flushError);
	}

	public abstract getName(): string;

	public abstract getValue(): any;

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
