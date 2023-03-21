import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';

/**
 * A component which represents an input field.
 */
export default class PglyInputComponent extends PglyBaseComponent<string> {
	/**
	 * The state of the key event.
	 *
	 * @type {boolean}
	 * @protected
	 */
	protected _keyEvent = false;

	/**
	 * The input element of the component.
	 *
	 * @type {HTMLInputElement}
	 * @protected
	 */
	protected _input: HTMLInputElement;

	/**
	 * Create a new input component.
	 *
	 * @param {string | HTMLDivElement} el The element of the component.
	 * @constructor
	 * @public
	 * @returns {void}
	 */
	constructor (el: string | HTMLDivElement) {
		super(el);

		this._input = DOMManipulation.findElement(this._wrapper, 'input');

		this._bind();
		this._default();
	}

	/**
	 * Empty the value of the field.
	 *
	 * @public
	 * @returns {void}
	 * @memberof PglyInputComponent
	 */
	public emptyValue (): void {
		this.field().set('');
	}

	/**
	 * Bind the component.
	 *
	 * This will bind the change event of the input element.
	 * This will also bind the keyup event of the input element.
	 *
	 * @protected
	 * @returns {void}
	 * @memberof PglyInputComponent
	 */
	protected _bind () {
		this.on('change', () => {
			if (this._keyEvent) return;
			this._input.value = this.field().get();
		});

		this._input.addEventListener('keyup', e => {
			this._keyEvent = true;
			this._field.set((e.target as HTMLInputElement).value);
			this._keyEvent = false;
		});
	}

	/**
	 * Set the default value of the field.
	 *
	 * @protected
	 * @returns {void}
	 * @memberof PglyInputComponent
	 */
	protected _default (): void {
		this.field().set(this._input.value);
	}
}
