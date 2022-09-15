import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglyTextAreaComponent extends PglyBaseComponent<string> {
	protected _keyEvent = false;

	protected _input: HTMLInputElement;

	constructor (el: string | HTMLDivElement) {
		super(el);

		this._input = DOMManipulation.findElement(this._wrapper, 'textarea');

		this._bind();
		this._default();
	}

	public emptyValue (): void {
		this.field().set('');
	}

	protected _bind () {
		this.on('change', () => {
			if (this._keyEvent) return;
			this._input.value = this.field().get();
		});

		this._input.addEventListener('keyup', e => {
			this._keyEvent = true;
			this._field.set((e.target as HTMLInputElement).value);
			this._keyEvent = false;
		});
	}

	protected _default (): void {
		this.field().set(this._input.value);
	}
}
