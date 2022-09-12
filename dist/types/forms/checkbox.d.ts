import PglyBaseComponent from './base';
export default class PglyCheckboxComponent extends PglyBaseComponent<boolean> {
    protected _checkbox: HTMLDivElement;
    constructor(el: string | HTMLDivElement);
    emptyValue(): void;
    protected _select(v: boolean): void;
    protected _bind(): void;
    protected _default(): void;
}
