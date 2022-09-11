import DOMManipulation from '@/behaviours/dommanipulation';
import EventHandler from '@/events/handler';
import ValidatorEngine, { RuleValidator } from '@/validator/engine';
import PglyFieldError from './error';
import PglyField from './field';

export type TInputError = {
	state: boolean;
	message?: string;
};

export default abstract class PglyBaseComponent<T = any> extends EventHandler {
	protected _wrapper: HTMLDivElement;
	protected _field: PglyField<T>;
	protected _error: PglyFieldError;

	constructor(el: string | HTMLDivElement) {
		super();

		this._wrapper = DOMManipulation.getElement<HTMLDivElement>(el);
		const { name } = this._wrapper.dataset;

		if (!name) {
			console.error('Wrapper has no data-name attribute', this._wrapper);

			throw new Error(
				'PglyBaseComponent.PglyField must have a data-name attribute in its wrapper...'
			);
		}

		this._error = new PglyFieldError(this, this._wrapper);
		this._field = new PglyField<T>(this, name, undefined as T);
	}

	public error(): PglyFieldError {
		return this._error;
	}

	public field(): PglyField<T> {
		return this._field;
	}

	public validate(rules: Array<RuleValidator>): void {
		ValidatorEngine.apply<T>(
			rules,
			this._field.get(),
			(message: string) => this._error.apply(message),
			() => this._error.flush()
		);
	}

	protected abstract _default(): void;
}
