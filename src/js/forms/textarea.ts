import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglyTextAreaComponent extends PglyBaseComponent {
	constructor(el: string | HTMLDivElement) {
		super(el);
		DOMManipulation.findElement(this._wrapper, 'textarea').addEventListener(
			'keyup',
			e => {
				this._field.set((e.target as HTMLTextAreaElement).value);
			}
		);
	}
}
