import PglyBaseComponent from './base';
export declare type TSingleMediaItem = {
    value: string;
    src: string;
};
export declare type TSingleMediaOptions = {
    labels: {
        title: string;
        button: string;
    };
};
export default class PglySingleMediaComponent extends PglyBaseComponent<string> {
    protected _image: HTMLImageElement;
    protected _options: TSingleMediaOptions;
    constructor(el: string | HTMLDivElement);
    options(options: Partial<TSingleMediaOptions>): void;
    select(data: TSingleMediaItem): void;
    clean(): void;
    emptyValue(): void;
    protected _bind(): void;
    protected _default(): void;
    static wpFrame({ component }: {
        component: PglySingleMediaComponent;
    }): void;
}
