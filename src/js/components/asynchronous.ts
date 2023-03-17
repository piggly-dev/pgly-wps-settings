import DOMManipulation from '../behaviours/dommanipulation';
import EventHandler from '../events/handler';
import PglyLoadable from './loadable';

export default abstract class AsynchronousComponent extends EventHandler {
	protected _wrapper: HTMLDivElement;

	protected _loader: PglyLoadable;

	constructor (el: string | HTMLDivElement) {
		super();

		this._loader = new PglyLoadable(this);
		this._wrapper = DOMManipulation.getElement<HTMLDivElement>(el);

		this._bind();
	}

	protected _bind () : void {
		this.on('beforeLoad', () => {
			this._wrapper.classList.add('pgly-loading--state');
		});

		this.on('afterLoad', () => {
			this._wrapper.classList.remove('pgly-loading--state');
		});
	}
}