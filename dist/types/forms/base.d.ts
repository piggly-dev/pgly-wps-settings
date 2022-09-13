import EventHandler from '@/events/handler';
import { RuleValidator } from '@/validator/engine';
import PglyFieldError from './error';
import PglyField from './field';
export declare type TInputError = {
    state: boolean;
    message?: string;
};
export default abstract class PglyBaseComponent<T = any> extends EventHandler {
    protected _wrapper: HTMLDivElement;
    protected _field: PglyField<T>;
    protected _error: PglyFieldError;
    constructor(el: string | HTMLDivElement);
    abstract emptyValue(): void;
    error(): PglyFieldError;
    field(): PglyField<T>;
    validate(rules: Array<RuleValidator>): void;
    protected abstract _default(): void;
}
