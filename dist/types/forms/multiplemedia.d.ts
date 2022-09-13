import PglyBaseComponent from './base';
export declare type TMultipleMediaItem = {
    value: string;
    src: string;
};
export declare type TMultipleMediaOptions = {
    labels: {
        title: string;
        button: string;
    };
};
export default class PglyMultipleMediaComponent extends PglyBaseComponent<Array<string>> {
    protected _images: HTMLDivElement;
    protected _options: TMultipleMediaOptions;
    constructor(el: string | HTMLDivElement);
    options(options: Partial<TMultipleMediaOptions>): void;
    select(data: TMultipleMediaItem): void;
    remove(id: string): void;
    clean(): void;
    emptyValue(): void;
    protected _render(data: TMultipleMediaItem): void;
    protected _bind(): void;
    static wpFrame({ component }: {
        component: PglyMultipleMediaComponent;
    }): void;
    protected _default(): void;
}
