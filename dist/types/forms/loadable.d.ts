import PglyBaseComponent from './base';
export default class PglyLoadable {
    protected _parent: PglyBaseComponent;
    protected _loading: boolean;
    constructor(parent: PglyBaseComponent);
    prepare(): void;
    done(): void;
    isLoading(): boolean;
}
