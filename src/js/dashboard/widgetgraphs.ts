import ApexCharts, { ApexOptions } from 'apexcharts';
import DOMManipulation from '../behaviours/dommanipulation';
import AsynchronousComponent from '../components/asynchronous';

/**
 * Manipulate a chart in the widget.
 */
export default class PglyWidgetGraph extends AsynchronousComponent {
	/**
	 * The chart element.
	 *
	 * @type {HTMLElement}
	 * @protected
	 */
	protected _chart: HTMLElement;

	/**
	 * The ApexCharts instance.
	 *
	 * @type {ApexCharts}
	 * @protected
	 */
	protected _apex?: ApexCharts;

	/**
	 * Constructor.
	 *
	 * @param {string | HTMLDivElement} el
	 * @public
	 * @constructor
	 * @returns {void}
	 */
	constructor (el: string | HTMLDivElement) {
		super(el);

		this._chart = DOMManipulation.findElement(this._wrapper, '.pgly-wps--chart');
		this._loader.prepare();
	}

	/**
	 * Load the data from the API and display it in the widget.
	 *
	 * The callback should return options for ApexCharts.
	 *
	 * @see https://apexcharts.com/docs/options/
	 * @param {() => Promise<ApexOptions>} callback
	 * @returns {Promise<void>}
	 * @memberof PglyWidgetGraph
	 * @public
	 * @async
	 */
	public async load (callback: () => Promise<ApexOptions>) {
		this._loader.prepare();
		const data = await callback();
		this._apex = new ApexCharts(this._chart, data);
		this._apex.render();
		this._loader.done();
	}
}