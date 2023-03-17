import EventHandler from '../events/handler';

export default class PglyLoadable {
	protected _parent: EventHandler;

	protected _loading = false;

	constructor (parent: EventHandler) {
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
