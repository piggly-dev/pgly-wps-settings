import PglyBaseComponent from './base';
export default class PglyLoadable {
    protected _parent: PglyBaseComponent;
    protected _loading: boolean;
    constructor(parent: PglyBaseComponent);
    prepare(payload?: any): void;
    done(payload?: any): void;
    isLoading(): boolean;
}
