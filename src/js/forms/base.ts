import DOMManipulation from '@/behaviours/dommanipulation';
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

		this.wrapper = DOMManipulation.getElement<HTMLDivElement>(el);
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
}
