import ApexCharts, { ApexOptions } from 'apexcharts';
import DOMManipulation from '../behaviours/dommanipulation';
import AsynchronousComponent from '../components/asynchronous';

export default class PglyWidgetGraph extends AsynchronousComponent {
	protected _chart: HTMLSpanElement;

	protected _apex?: ApexCharts;

	constructor (el: string | HTMLDivElement) {
		super(el);

		this._chart = DOMManipulation.findElement(this._wrapper, '.pgly-wps--chart');
		this._loader.prepare();
	}

	public async load (callback: () => Promise<ApexOptions>) {
		this._loader.prepare();
		const data = await callback();
		this._apex = new ApexCharts(this._chart, data);
		this._loader.done();
	}
}