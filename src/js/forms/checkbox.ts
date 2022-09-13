import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglyCheckboxComponent extends PglyBaseComponent<boolean> {
	protected _checkbox: HTMLDivElement;

	constructor (el: string | HTMLDivElement) {
		super(el);
		this._checkbox = DOMManipulation.findElement(this._wrapper, '.pgly-wps--checkbox');

		this._bind();
		this._default();
	}

	public emptyValue (): void {
		this.field().set(false);
	}

	protected _select (v: boolean) {
		this._checkbox.classList.remove('pgly-checked--state');
		if (v) this._checkbox.classList.add('pgly-checked--state');
	}

	protected _bind () {
		this.on('change', ({ value }) => {
			this._select(value);
		});

		this._checkbox.addEventListener('click', () => {
			this.field().set(!this.field().get());
		});
	}

	protected _default (): void {
		this.field().set(this._checkbox.dataset.value === 'true');
	}
}
