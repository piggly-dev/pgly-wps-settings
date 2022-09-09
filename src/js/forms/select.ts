import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglySelectComponent extends PglyBaseComponent {
	protected items: HTMLDivElement;
	protected selection: {
		wrapper: HTMLDivElement;
		value: HTMLSpanElement;
	};

	constructor(el: string | HTMLDivElement) {
		super(el);

		this.items = DOMManipulation.findElement(this._wrapper, '.items');

		this.selection = {
			wrapper: DOMManipulation.findElement(this._wrapper, '.selected'),
			value: DOMManipulation.findElement(this._wrapper, '.selected span'),
		};

		this.bind();
	}

	public toggle() {
		this.selection.wrapper.classList.toggle('open');
		this.items.classList.toggle('selectHide');
	}

	public select(el: HTMLDivElement) {
		const value = el.dataset.value ?? 'unknown';

		this.selection.value.textContent = el.textContent;
		this.field().set(value);

		this.flushItems(el);
		this.toggle();
	}

	public flushItems(selected: HTMLDivElement) {
		this.items.querySelectorAll<HTMLDivElement>('.item').forEach(el => {
			el.classList.remove('current');
		});

		selected.classList.add('current');
	}

	protected bind() {
		this.selection.wrapper.addEventListener('click', () => this.toggle());

		this.items
			.querySelectorAll<HTMLDivElement>('.item')
			.forEach(el => el.addEventListener('click', () => this.select(el)));
	}
}
