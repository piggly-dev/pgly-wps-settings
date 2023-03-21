import EventHandler from '../events/handler';

/**
 * Handle the loading state of a component.
 */
export default class PglyLoadable {
	/**
	 * The parent of the loadable component.
	 * Must be an EventHandler.
	 *
	 * @type {EventHandler}
	 * @protected
	 */
	protected _parent: EventHandler;

	/**
	 * The loading state of the component.
	 *
	 * @type {boolean}
	 * @protected
	 */
	protected _loading = false;

	/**
	 * Create a new loadable component.
	 *
	 * @param {EventHandler} parent The parent of the loadable component.
	 * @memberof PglyLoadable
	 * @public
	 * @constructor
	 * @returns {void}
	 */
	constructor (parent: EventHandler) {
		this._parent = parent;
	}

	/**
	 * Prepare the component to load.
	 *
	 * @param {any} payload The payload to send to the event.
	 * @memberof PglyLoadable
	 * @public
	 * @returns {void}
	 * @fires EventHandler#beforeLoad Emit before load.
	 */
	public prepare (payload: any = undefined) {
		this._parent.emit('beforeLoad', { loading: false, payload });
		this._loading = true;
	}

	/**
	 * Finish the loading process.
	 *
	 * @param {any} payload The payload to send to the event.
	 * @memberof PglyLoadable
	 * @public
	 * @returns {void}
	 * @fires EventHandler#afterLoad Emit after load.
	 */
	public done (payload: any = undefined) {
		this._loading = false;
		this._parent.emit('afterLoad', { loading: false, payload });
	}

	/**
	 * Get the loading state of the component.
	 *
	 * @memberof PglyLoadable
	 * @public
	 * @returns {boolean} The loading state of the component.
	 */
	public isLoading (): boolean {
		return this._loading;
	}
}
