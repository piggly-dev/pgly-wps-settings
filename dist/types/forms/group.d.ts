import PglyBaseComponent from './base';
import { TOrUndefined } from '@/types';
import { RuleValidator } from '@/validator/engine';
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
    add(item: TGroupFormItem): void;
    get(uid: string): TOrUndefined<TGroupFormItem>;
    all(): Array<Record<string, any>>;
    update(item: TGroupFormItem): void;
    remove(uid: string): void;
}
export declare class PglyGroupFormComponent extends PglyBaseComponent<Array<TGroupFormInputs>> {
    protected _inputs: Record<string, PglyBaseComponent>;
    protected _loader: PglyLoadable;
    protected _items: PglyGroupFormItems;
    protected _options: TGroupFormOptions;
    protected _comps: {
        button: HTMLButtonElement;
        items: HTMLDivElement;
    };
    protected _editing: boolean;
    protected _current?: string;
    constructor(el: string | HTMLDivElement);
    options(options: Partial<TGroupFormOptions>): void;
    loader(): PglyLoadable;
    add(input: PglyBaseComponent): void;
    synchronous(items: Array<TGroupFormInputs>): void;
    asynchronous(callback: () => Promise<Array<TGroupFormInputs>>): Promise<void>;
    get(name: string): TOrUndefined<PglyBaseComponent>;
    remove(name: string): void;
    auto(): void;
    prepare(rules?: Record<string, Array<RuleValidator>>): TGroupFormPreparedData;
    emptyValue(): void;
    protected _submit(data: TGroupFormPreparedData): void;
    protected _flushInputs(): void;
    protected _updateInputs(uid: string): void;
    protected _addCard(item: TGroupFormItem): void;
    protected _updateCard(item: TGroupFormItem): void;
    protected _removeCard(uid: string): void;
    protected _bind(): void;
    protected _default(): void;
}
