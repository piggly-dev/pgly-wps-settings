import PglyBaseComponent from './base';
import PglyLoadable from './loadable';
export declare type TSelectItem = {
    label: string;
    value: string;
    selected: boolean;
};
export declare type TSelectOptions = {
    labels: {
        placeholder: string;
    };
};
export default class PglySelectComponent extends PglyBaseComponent {
    protected items: Array<TSelectItem>;
    protected _loader: PglyLoadable;
    protected _options: TSelectOptions;
    protected _comps: {
        selection: HTMLDivElement;
        value: HTMLSpanElement;
        items: HTMLDivElement;
        container: HTMLDivElement;
    };
    constructor(el: string | HTMLDivElement);
    options(options: Partial<TSelectOptions>): void;
    loader(): PglyLoadable;
    synchronous(items: Array<TSelectItem>): void;
    asynchronous(callback: () => Promise<Array<TSelectItem>>): Promise<void>;
    emptyValue(): void;
    cleanItems(): void;
    reflect(select: PglySelectComponent, values: Record<string, Array<TSelectItem>>): void;
    protected _flush(): void;
    protected _toggle(): void;
    protected _close(): void;
    protected _renderSelection(): void;
    protected _render(): void;
    protected _bind(): void;
    protected _default(): void;
}
