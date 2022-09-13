import PglyBaseComponent from './base';
export default class PglyField<T = any> {
    protected _parent: PglyBaseComponent;
    protected _value: T;
    protected _name: string;
    protected _label?: string;
    constructor(parent: PglyBaseComponent, name: string, def: T);
    name(): string;
    label(): string | undefined;
    set(value: T, label?: string): void;
    get(): T;
}
