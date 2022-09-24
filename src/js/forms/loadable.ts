import PglyBaseComponent from './base';

export default class PglyLoadable {
	protected _parent: PglyBaseComponent;

	protected _loading = false;

	constructor (parent: PglyBaseComponent) {
		this._parent = parent;
	}

	public prepare (payload: any = undefined) {
		this._parent.emit('beforeLoad', { loading: false, payload });
		this._loading = true;
	}

	public done (payload: any = undefined) {
		this._loading = false;
		this._parent.emit('afterLoad', { loading: false, payload });
	}

	public isLoading (): boolean {
		return this._loading;
	}
}
