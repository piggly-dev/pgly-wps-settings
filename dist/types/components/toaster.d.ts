export declare type TPglyToastOptions = {
    timer: number;
    type: string;
    light: boolean;
};
export default class PglyToast {
    protected _container: HTMLDivElement;
    constructor(el: string | HTMLDivElement);
    launch(message: string, options: Partial<TPglyToastOptions>): void;
}
