import DOMManipulation from '../behaviours/dommanipulation';
import AsynchronousComponent from '../components/asynchronous';

export type PglyWidgetDataOptions = {
	values: Array<{
		name: string;
	}>
};

/**
 * Load data from an API and display it in the widget.
 */
export default class PglyWidgetData extends AsynchronousComponent {
	/**
	 * The values to display.
	 *
	 * @type {Array<{name: string, el: HTMLElement}>}
	 * @protected
	 */
	protected _values: Array<{
		name: string;
		el: HTMLElement;
	}>;

	/**
	 * Constructor.
	 *
	 * For each value in options, we will try to find the element in the DOM
	 * that has the data-name attribute set to the name of the value. We will
	 * store it in the _values array. The name of the value will be used
	 * to match the value returned by the API.
	 *
	 * @param {string | HTMLDivElement} el
	 * @param {PglyWidgetCounterOptions} options
	 * @public
	 * @constructor
	 * @returns {void}
	 */
	constructor (el: string | HTMLDivElement, options: PglyWidgetDataOptions) {
		super(el);

		this._values = options.values.map(v => ({
				name: v.name,
				el: DOMManipulation.findElement(this._wrapper, `[data-name="${v.name}"]`),
			}));

		this._loader.prepare();
	}

	/**
	 * Load the data from the API and display it in the widget.
	 *
	 * The callback should return a promise that resolves to an object
	 * containing the values to display. The keys of the object should
	 * match the names of the values. The values will be displayed in the
	 * widget.
	 *
	 * @param {() => Promise<Record<string, string>>} callback
	 * @returns {Promise<void>}
	 * @memberof PglyWidgetData
	 * @async
	 * @public
	 */
	public async load (callback: () => Promise<Record<string, string | { value: string, cssClass: string }>>) {
		this._loader.prepare();
		const values = await callback();

		Object.keys(values).forEach(k => {
			const v = this._values.find(_v => _v.name === k);

			if (v) {
				const el = values[k];

				if (typeof el === 'object') {
					v.el.innerHTML = el.value;
					v.el.classList.add(el.cssClass);
				} else {
					v.el.innerHTML = el;
				}
			}
		});

		this._loader.done();
	}
}