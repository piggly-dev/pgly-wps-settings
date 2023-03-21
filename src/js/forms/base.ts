import DOMManipulation from '../behaviours/dommanipulation';
import EventHandler from '../events/handler';
import ValidatorEngine, { RuleValidator } from '../validator/engine';
import PglyFieldError from './error';
import PglyField from './field';

export type TInputError = {
	state: boolean;
	message?: string;
};

/**
 * Base class for all components.
 */
export default abstract class PglyBaseComponent<T = any> extends EventHandler {
	/**
	 * The wrapper element of the component.
	 *
	 * @type {HTMLDivElement}
	 * @protected
	 */
	protected _wrapper: HTMLDivElement;

	/**
	 * The field data of the component.
	 * This is used to store the value of the component.
	 *
	 * @type {PglyField<any>}
	 * @protected
	 */
	protected _field: PglyField<T>;

	/**
	 * The error data of the component.
	 *
	 * @type {PglyFieldError}
	 * @protected
	 */
	protected _error: PglyFieldError;

	/**
	 * Create a new base component.
	 *
	 * @param {string | HTMLDivElement} el The element of the component.
	 * @constructor
	 * @public
	 * @returns {void}
	 */
	constructor (el: string | HTMLDivElement) {
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
		this._field = new PglyField<T>(this, name, undefined as unknown as T);
	}

	/**
	 * Empty the value of the field.
	 *
	 * @public
	 * @returns {void}
	 * @memberof PglyBaseComponent
	 */
	public abstract emptyValue(): void;

	/**
	 * Get the error data of the component.
	 *
	 * @public
	 * @returns {PglyFieldError}
	 * @memberof PglyBaseComponent
	 */
	public error (): PglyFieldError {
		return this._error;
	}

	/**
	 * Get the field data of the component.
	 * This is used to store the value of the component.
	 *
	 * @public
	 * @returns {PglyField<any>}
	 * @memberof PglyBaseComponent
	 */
	public field (): PglyField<T> {
		return this._field;
	}

	/**
	 * Validate the field with the given rules.
	 * This will also update the error data of the component.
	 *
	 * @param {Array<RuleValidator>} rules The rules to validate the field with.
	 * @public
	 * @returns {void}
	 * @memberof PglyBaseComponent
	 */
	public validate (rules: Array<RuleValidator>): void {
		ValidatorEngine.apply<T>(
			rules,
			this._field.get(),
			(message: string) => this._error.apply(message),
			() => this._error.flush()
		);
	}

	protected abstract _default(): void;
}
