export interface IPglyAsyncFormField {
    id: string;
    name: string;
    required: boolean;
}
export interface IPglyAsyncOptions {
    container: string;
    responseContainer?: string;
    form?: {
        [key: string]: Array<IPglyAsyncFormField>;
    };
    url: string;
    x_security: string;
    messages?: {
        request_error?: string;
        invalid_fields?: string;
    };
    debug: boolean;
}
export interface IPglyAsync {
    options: IPglyAsyncOptions;
    _init(): void;
    _startLoad($button: HTMLButtonElement): void;
    _stopLoad($button: HTMLButtonElement): void;
    _consoleLog(...args: any[]): void;
    _consoleError(...args: any[]): void;
}
declare function PglyAsync(this: IPglyAsync, options: IPglyAsyncOptions): void;
export default PglyAsync;
