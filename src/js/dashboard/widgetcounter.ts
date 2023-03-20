import DOMManipulation from '../behaviours/dommanipulation';
import AsynchronousComponent from '../components/asynchronous';

export default class PglyWidgetCounter extends AsynchronousComponent {
	protected _value: HTMLSpanElement;

	constructor (el: string | HTMLDivElement) {
		super(el);

		const _value = DOMManipulation.findElement(this._wrapper, '.pgly-wps--value');

		if ( this._wrapper.dataset.tag ) {
			const tag = document.createElement('span');
			tag.className = 'pgly-wps--tag';
			tag.textContent = this._wrapper.dataset.tag;
			_value.appendChild(tag);
		}

		const v = document.createElement('span');
		v.className = 'pgly-wps--data';
		v.textContent = '';
		_value.appendChild(v);

		this._value = v;
		this._loader.prepare();
	}

	public async load (callback: () => Promise<string>) {
		this._loader.prepare();
		const value = await callback();

		if (value && value.length !== 0) this._setValue(value);
		this._loader.done();
	}

	protected _setValue (value: string) {
		this._value.textContent = value;
	}

	protected _addTag (tag: string) {
		const el = document.createElement('span');
		el.className = 'pgly-wps--tag';
		el.textContent = tag;
		this._value.appendChild(el);
	}
}