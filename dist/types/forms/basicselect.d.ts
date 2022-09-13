import PglyBaseComponent from './base';
import PglyLoadable from './loadable';
import { TSelectItem } from './select';
export default class PglyBasicSelectComponent extends PglyBaseComponent<string> {
    protected _changeEvent: boolean;
    protected _loader: PglyLoadable;
    protected _input: HTMLSelectElement;
    constructor(el: string | HTMLDivElement);
    loader(): PglyLoadable;
    asynchronous(callback: () => Promise<Array<TSelectItem>>): Promise<void>;
    emptyValue(): void;
    protected _render(items: Array<TSelectItem>): void;
    protected _bind(): void;
    protected _default(): void;
}
