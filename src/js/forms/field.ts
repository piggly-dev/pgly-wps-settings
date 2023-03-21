import PglyBaseComponent from './base';

/**
 * Store data for a field.
 */
export default class PglyField<T = any> {
	/**
	 * The parent component which owns the field data.
	 *
	 * @type {PglyBaseComponent}
	 * @protected
	 */
	protected _parent: PglyBaseComponent;

	/**
	 * The value of the field.
	 *
	 * @type {any}
	 * @protected
	 */
	protected _value: T;

	/**
	 * The name of the field.
	 * This is used for identification purposes.
	 *
	 * @type {string}
	 * @protected
	 */
	protected _name: string;

	/**
	 * The label of the field.
	 * This is used for display purposes.
	 *
	 * @type {string | undefined}
	 * @protected
	 */
	protected _label?: string;

	/**
	 * Create a new field.
	 *
	 * @param {PglyBaseComponent} parent The parent component which owns the field data.
	 * @param {string} name The name of the field.
	 * @param {T} def The default value of the field.
	 * @constructor
	 * @public
	 * @returns {void}
	 */
	constructor (parent: PglyBaseComponent, name: string, def: T) {
		this._parent = parent;
		this._value = def;
		this._name = name;
	}

	/**
	 * Get the name of the field.
	 * This is used for identification purposes.
	 *
	 * @returns {string}
	 * @memberof PglyField
	 * @public
	 */
	public name (): string {
		return this._name;
	}

	/**
	 * Get the label of the field.
	 * This is used for display purposes.
	 *
	 * @returns {string | undefined}
	 * @memberof PglyField
	 * @public
	 */
	public label (): string | undefined {
		return this._label;
	}

	/**
	 * Set the value of the field.
	 * This will emit a change event.
	 *
	 * @param {any} value The new value of the field.
	 * @param {string | undefined} label The new label of the field.
	 * @memberof PglyField
	 * @public
	 * @returns {void}
	 * @fires PglyBaseComponent#change
	 */
	public set (value: T, label?: string) {
		this._value = value;
		this._label = label;

		this._parent.emit('change', {
			component: this._parent,
			value: this._value,
			label: this._label,
		});
	}

	/**
	 * Get the value of the field.
	 *
	 * @returns {any}
	 * @memberof PglyField
	 * @public
	 */
	public get (): T {
		return this._value;
	}
}
