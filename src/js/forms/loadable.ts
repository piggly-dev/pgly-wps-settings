import PglyBaseComponent from './base';

export default class PglyLoadable {
	protected _parent: PglyBaseComponent;

	protected _loading = false;

	constructor (parent: PglyBaseComponent) {
		this._parent = parent;
	}

	public prepare () {
		this._parent.emit('beforeLoad', { loading: false });
		this._loading = true;
	}

	public done () {
		this._loading = false;
		this._parent.emit('afterLoad', { loading: false });
	}

	public isLoading (): boolean {
		return this._loading;
	}
}
