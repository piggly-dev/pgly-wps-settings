import DOMManipulation from '@/behaviours/dommanipulation';
import EventHandler from '@/events/handler';
import ValidatorEngine from '@/validator/engine';
import ValidatorRule from '@/validator/rule';
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
		const { name, def = undefined } = this._wrapper.dataset;

		if (!name) {
			console.error('Wrapper has no data-name attribute', this._wrapper);

			throw new Error(
				'PglyBaseComponent.PglyField must have a data-name attribute in its wrapper...'
			);
		}

		this._error = new PglyFieldError(this, this._wrapper);
		this._field = new PglyField<T>(this, name, def as T);
	}

	public error(): PglyFieldError {
		return this._error;
	}

	public field(): PglyField<T> {
		return this._field;
	}

	public validate(rules: Array<ValidatorRule>): void {
		ValidatorEngine.apply<T>(
			rules,
			this._field.get(),
			this._error.apply,
			this._error.flush
		);
	}
}
