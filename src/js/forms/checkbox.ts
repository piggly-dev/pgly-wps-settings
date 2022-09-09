import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglyCheckboxComponent extends PglyBaseComponent<boolean> {
	protected checkbox: HTMLDivElement;

	constructor(el: string | HTMLDivElement) {
		super(el);

		this.checkbox = DOMManipulation.findElement(this._wrapper, '.pgly-wps--checkbox');

		this._bind();
		this.field().set(this._wrapper.dataset.def === 'true');
	}

	protected _select(v: boolean) {
		this.checkbox.classList.remove('pgly-checked--state');
		if (v) this.checkbox.classList.add('pgly-checked--state');
	}

	protected _bind() {
		this.on('change', ({ value }) => {
			this._select(value);
		});

		this.checkbox.addEventListener('click', () => {
			this.field().set(!this.field().get());
		});
	}
}
