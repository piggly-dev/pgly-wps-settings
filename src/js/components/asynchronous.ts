import DOMManipulation from '../behaviours/dommanipulation';
import EventHandler from '../events/handler';
import PglyLoadable from './loadable';

/**
 * Grabs the element and binds the events for a loading state.
 */
export default abstract class AsynchronousComponent extends EventHandler {
	/**
	 * The wrapper of the component.
	 *
	 * @type {HTMLDivElement}
	 * @protected
	 */
	protected _wrapper: HTMLDivElement;

	/**
	 * The loadable component.
	 *
	 * @type {PglyLoadable}
	 * @protected
	 */
	protected _loader: PglyLoadable;

	/**
	 * Create a new asynchronous component.
	 *
	 * @param {string | HTMLDivElement} el The element to bind the loading state to.
	 * @memberof AsynchronousComponent
	 * @public
	 * @constructor
	 * @returns {void}
	 */
	constructor (el: string | HTMLDivElement) {
		super();

		this._loader = new PglyLoadable(this);
		this._wrapper = DOMManipulation.getElement<HTMLDivElement>(el);

		this._bind();
	}

	/**
	 * Auto bind the events.
	 * Add `.pgly-loading--state` css class before load state.
	 * Remove `.pgly-loading--state` css class after load state.
	 *
	 * @protected
	 * @memberof AsynchronousComponent
	 * @returns {void}
	 */
	protected _bind () : void {
		this.on('beforeLoad', () => {
			this._wrapper.classList.add('pgly-loading--state');
		});

		this.on('afterLoad', () => {
			this._wrapper.classList.remove('pgly-loading--state');
		});
	}
}