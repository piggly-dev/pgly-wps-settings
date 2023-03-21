import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';

export type  PglyFieldErrorComponents = {
	wrapper: HTMLDivElement;
	message: HTMLSpanElement;
}

/**
 * Store error data for a field.
 */
export default class PglyFieldError {
	/**
	 * The parent component which owns the error data.
	 *
	 * @type {PglyBaseComponent}
	 * @protected
	 */
	protected _parent: PglyBaseComponent;

	/**
	 * The state of the error.
	 *
	 * @type {boolean}
	 * @protected
	 */
	protected _state = false;

	/**
	 * The message of the error.
	 *
	 * @type {string | undefined}
	 * @protected
	 */
	protected _message?: string;

	/**
	 * The components of the error.
	 *
	 * @type {PglyFieldErrorComponents}
	 * @protected
	 */
	protected _comp: PglyFieldErrorComponents;

	/**
	 * Create a new error.
	 *
	 * @param {PglyBaseComponent} parent The parent component which owns the error data.
	 * @param {HTMLDivElement} wrapper The wrapper element of the error.
	 * @constructor
	 * @public
	 * @returns {void}
	 */
	constructor (parent: PglyBaseComponent, wrapper: HTMLDivElement) {
		this._parent = parent;

		this._comp = {
			wrapper,
			message: DOMManipulation.findElement(wrapper, '.pgly-wps--message'),
		};
	}

	/**
	 * Apply the error.
	 * This will set the state of the error to true and emit the error event.
	 * Error will be rendered.
	 *
	 * The event payload will contains:
	 *
	 * component: The parent component which owns the error data.
	 * state: The state of the error.
	 * message: The message of the error.
	 *
	 * @param message The message of the error.
	 * @memberof PglyFieldError
	 * @public
	 * @returns {void}
	 * @fires PglyBaseComponent#error
	 */
	public apply (message: string) {
		this._state = true;
		this._message = message;
		this._emit('error');
	}

	/**
	 * Flush the error.
	 * This will set the state of the error to false and emit the errorFlush event.
	 * Error will be rendered.
	 *
	 * The event payload will contains:
	 *
	 * component: The parent component which owns the error data.
	 * state: The state of the error.
	 * message: The message of the error.
	 *
	 * @memberof PglyFieldError
	 * @public
	 * @returns {void}
	 * @fires PglyBaseComponent#errorFlush
	 */
	public flush () {
		this._state = false;
		this._message = undefined;
		this._emit('errorFlush');
	}

	/**
	 * Get the state of the error.
	 *
	 * @returns {boolean}
	 * @memberof PglyFieldError
	 * @public
	 */
	public has (): boolean {
		return this._state;
	}

	/**
	 * Get the message of the error.
	 *
	 * @returns {string | undefined}
	 * @memberof PglyFieldError
	 * @public
	 */
	public message (): string | undefined {
		return this._message;
	}

	/**
	 * Render the error.
	 *
	 * This will add or remove the error class to the wrapper element.
	 * This will set the message of the error.
	 *
	 * @memberof PglyFieldError
	 * @protected
	 * @returns {void}
	 */
	protected _render () {
		this._comp.wrapper.classList.remove('pgly-wps--error');
		if (this._state) this._comp.wrapper.classList.add('pgly-wps--error');

		this._comp.message.textContent = this._message ?? '';
	}

	/**
	 * Emit an event.
	 * This will render the error and emit the event.
	 *
	 * @param {string} id The id of the event.
	 * @memberof PglyFieldError
	 * @protected
	 */
	protected _emit (id: string) {
		this._render();
		this._parent.emit(id, {
			component: this._parent,
			state: this._state,
			message: this._message,
		});
	}
}
