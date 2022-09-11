import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglyInputComponent extends PglyBaseComponent<string> {
	constructor(el: string | HTMLDivElement) {
		super(el);
		
		DOMManipulation.findElement(this._wrapper, 'input').addEventListener('keyup', e => {
			this._field.set((e.target as HTMLInputElement).value);
		});

		this._default();
	}

	protected _default(): void {
		const input = DOMManipulation.findElement<HTMLInputElement>(this._wrapper, 'input');
		this.field().set(input.value);
	}
}
