import PglyBaseComponent from './base';
export default class PglyFieldError {
    protected _parent: PglyBaseComponent;
    protected _state: boolean;
    protected _message?: string;
    protected _comp: {
        wrapper: HTMLDivElement;
        message: HTMLSpanElement;
    };
    constructor(parent: PglyBaseComponent, wrapper: HTMLDivElement);
    apply(message: string): void;
    flush(): void;
    has(): boolean;
    message(): string | undefined;
    protected _render(): void;
    protected _emit(id: string): void;
}
