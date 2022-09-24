import { RuleValidator } from '../validator/engine';
import { PglyAsyncFormEngine, TFormBody } from './form';
import PglySingleMediaComponent from './singlemedia';
import PglyMultipleMediaComponent from './multiplemedia';
import PglyToast from '../components/toaster';
export declare const wpSingleMediaFrame: typeof PglySingleMediaComponent.wpFrame;
export declare const wpMultipleMediaFrame: typeof PglyMultipleMediaComponent.wpFrame;
export declare class WPForm {
    protected _toaster: PglyToast;
    protected _form: PglyAsyncFormEngine;
    protected _postForm?: HTMLFormElement;
    protected _rules: Record<string, Array<RuleValidator>>;
    protected _group: boolean;
    protected _actions: Record<string, string>;
    constructor(formId: string, toasterId: string, rules: Record<string, Array<RuleValidator>>, formatter?: TFormBody, group?: boolean);
    toaster(): PglyToast;
    form(): PglyAsyncFormEngine;
    isOnPost(): void;
    protected _loadForm(id: string, formatter: TFormBody, rules?: Record<string, Array<RuleValidator>>): PglyAsyncFormEngine;
    protected _applyData(data: Record<string, any>): Record<string, any>;
    protected _error(): void;
    protected _onSuccess({ response }: any): void;
    protected _onError({ error }: any): void;
    protected _getRecordId(): string | undefined;
    protected _updateRecordId(id?: string): void;
}
