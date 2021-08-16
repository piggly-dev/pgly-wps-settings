export interface IPglyToastElement {
    message: string;
    timer?: number;
    type?: string;
    light?: boolean;
    container?: string;
}
export interface IPglyToast {
    container: HTMLElement | null;
    _init(options: IPglyToastElement): void;
    _new(options: IPglyToastElement): void;
}
declare function PglyToast(this: IPglyToast, options: IPglyToastElement): void;
export default PglyToast;
