import PglyBaseComponent from './base';

export default class PglyField<T = any> {
	protected _parent: PglyBaseComponent;

	protected _value: T;

	protected _name: string;

	protected _label?: string;

	constructor (parent: PglyBaseComponent, name: string, def: T) {
		this._parent = parent;
		this._value = def;
		this._name = name;
	}

	public name (): string {
		return this._name;
	}

	public label (): string | undefined {
		return this._label;
	}

	public set (value: T, label?: string) {
		this._value = value;
		this._label = label;

		this._parent.emit('change', {
			component: this._parent,
			value: this._value,
			label: this._label,
		});
	}

	public get (): T {
		return this._value;
	}
}
