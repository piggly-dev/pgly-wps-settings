export declare type TPglyNotificationOptions = {
    timer: number;
    type: string;
    light: boolean;
};
export default class PglyNotification {
    protected _container: HTMLDivElement;
    constructor(el: string | HTMLDivElement);
    launch(message: string, options: Partial<TPglyNotificationOptions>): void;
    _bind(): void;
}
