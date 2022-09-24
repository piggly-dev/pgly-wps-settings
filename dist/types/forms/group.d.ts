import PglyBaseComponent from './base';
import { TOrUndefined } from '../types';
import { RuleValidator } from '../validator/engine';
import PglyLoadable from './loadable';
export declare type TGroupFormInputs = Record<string, {
    label?: string;
    value: any;
}>;
export declare type TGroupFormItem = {
    uid: string;
    inputs: TGroupFormInputs;
};
export declare type TGroupFormError = {
    name: string;
    value: string;
    message?: string;
};
export declare type TGroupFormPreparedData = {
    inputs: TGroupFormInputs;
    errors: Array<TGroupFormError>;
};
export declare type TGroupFormOptions = {
    rules?: Record<string, Array<RuleValidator>>;
    view: Record<string, string>;
    labels: {
        edit: string;
        remove: string;
    };
};
export declare class PglyGroupFormItems {
    protected _parent: PglyBaseComponent;
    protected _items: Array<TGroupFormItem>;
    constructor(parent: PglyBaseComponent);
    count(): number;
    add(item: TGroupFormItem, eventOrigin?: string): void;
    get(uid: string): TOrUndefined<TGroupFormItem>;
    all(): Array<Record<string, any>>;
    updateId(uid: string, id: number, eventOrigin?: string): void;
    update(item: TGroupFormItem, eventOrigin?: string): void;
    remove(uid: string, eventOrigin?: string): void;
}
export declare class PglyGroupFormComponent extends PglyBaseComponent<Array<TGroupFormInputs>> {
    protected _inputs: Record<string, PglyBaseComponent>;
    protected _loader: PglyLoadable;
    protected _items: PglyGroupFormItems;
    protected _options: TGroupFormOptions;
    protected _comps: {
        items: HTMLDivElement;
    };
    protected _editing: boolean;
    protected _current?: string;
    constructor(el: string | HTMLDivElement);
    groupEl(): HTMLDivElement;
    dataset(): Record<string, any>;
    options(options: Partial<TGroupFormOptions>): void;
    loader(): PglyLoadable;
    items(): PglyGroupFormItems;
    add(input: PglyBaseComponent): void;
    synchronous(items: Array<TGroupFormInputs>): void;
    asynchronous(callback: () => Promise<Array<TGroupFormInputs>>): Promise<void>;
    get(name: string): TOrUndefined<PglyBaseComponent>;
    remove(name: string): void;
    auto(): void;
    prepare(rules?: Record<string, Array<RuleValidator>>): TGroupFormPreparedData;
    emptyValue(): void;
    protected _submit(data: TGroupFormPreparedData): void;
    protected _cancel(): void;
    protected _flushInputs(): void;
    protected _updateInputs(uid: string): void;
    protected _addCard(item: TGroupFormItem): void;
    protected _updateCard(item: TGroupFormItem): void;
    protected _removeCard(item: TGroupFormItem): void;
    protected _bind(): void;
    protected _default(): void;
}
