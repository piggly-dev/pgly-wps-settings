import PglyBaseComponent from './base';
import EventHandler from '@/events/handler';
import { RuleValidator } from '@/validator/engine';
import { TOrUndefined } from '@/types';
export declare type TFormError = {
    name: string;
    value: any;
    message?: string;
};
export declare type TFormPreparedData = {
    inputs: Record<string, any>;
    errors: Array<TFormError>;
};
export declare type TFormOptions = {
    x_security?: string;
    inputs?: Array<PglyBaseComponent>;
    rules?: Record<string, Array<RuleValidator>>;
};
export declare abstract class PglyBaseFormEngine extends EventHandler {
    protected _wrapper: HTMLFormElement;
    protected _inputs: Array<PglyBaseComponent>;
    protected _button: HTMLButtonElement;
    protected _options: TFormOptions;
    protected _loading: boolean;
    constructor(el: string | HTMLFormElement, options?: Partial<TFormOptions>);
    add(input: PglyBaseComponent): void;
    get(name: string): TOrUndefined<PglyBaseComponent>;
    remove(name: string): void;
    auto(): void;
    prepare(rules?: Record<string, Array<RuleValidator>>): TFormPreparedData;
    isLoading(): boolean;
    protected abstract submit(data: TFormPreparedData): void;
    protected loadState(loading: boolean): void;
    protected _bind(): void;
}
export declare class PglyAsyncFormEngine extends PglyBaseFormEngine {
    protected submit(data: TFormPreparedData): void;
}
