export interface IPglyNotificationElement {
    message: string;
    timer?: number;
    type?: string;
    light?: boolean;
    container?: string;
}
export interface IPglyNotification {
    container: HTMLElement | null;
    _init(options: IPglyNotificationElement): void;
    _new(options: IPglyNotificationElement): void;
}
declare function PglyNotification(this: IPglyNotification, options: IPglyNotificationElement): void;
declare const handlePglyNotifications: () => void;
export { PglyNotification, handlePglyNotifications };
