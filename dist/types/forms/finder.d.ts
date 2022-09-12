import PglyBaseComponent from './base';
import PglyLoadable from './loadable';
export declare type TFinderItem = {
    value: string;
    label: string;
};
export declare type TFinderOptions = {
    load: (v: string) => Promise<Array<TFinderItem>>;
    labels: {
        select: string;
        unselect: string;
    };
};
export default class PglyFinderComponent extends PglyBaseComponent<string> {
    protected _search: {
        wrapper: HTMLDivElement;
        input: HTMLInputElement;
        button: HTMLButtonElement;
    };
    protected _selected: {
        wrapper: HTMLDivElement;
        label: HTMLDivElement;
        button: HTMLButtonElement;
    };
    protected _items: {
        loader: HTMLDivElement;
        list: HTMLDivElement;
    };
    protected currIndex?: number;
    protected _response: Array<TFinderItem>;
    protected _loader: PglyLoadable;
    protected _options: Partial<TFinderOptions>;
    constructor(el: string | HTMLDivElement);
    options(options: Partial<TFinderOptions>): void;
    loader(): PglyLoadable;
    emptyValue(): void;
    protected _select(): void;
    protected _flush(): void;
    protected load(): Promise<void>;
    protected _bind(): void;
    protected _render(item: TFinderItem): HTMLDivElement;
    protected _default(): void;
}
