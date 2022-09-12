import PglyBaseComponent from './base';
export default class PglyInputComponent extends PglyBaseComponent<string> {
    protected _keyEvent: boolean;
    protected _input: HTMLInputElement;
    constructor(el: string | HTMLDivElement);
    emptyValue(): void;
    protected _bind(): void;
    protected _default(): void;
}
