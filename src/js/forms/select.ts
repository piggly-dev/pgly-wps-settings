import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglySelectComponent extends PglyBaseComponent {
	protected input: HTMLInputElement;
	protected items: HTMLDivElement;
	protected selection: {
		wrapper: HTMLDivElement;
		value: HTMLSpanElement;
	};

	constructor(el: string | HTMLDivElement) {
		super(el);

		this.items = DOMManipulation.findElement(this.wrapper, '.items');

		this.selection = {
			wrapper: DOMManipulation.findElement(this.wrapper, '.selected'),
			value: DOMManipulation.findElement(this.wrapper, '.selected span'),
		};

		this.input = DOMManipulation.createHiddenInput(
			this.selection.wrapper,
			this.wrapper.dataset.name ?? 'unknown',
			this.items.querySelector<HTMLDivElement>('.current')?.dataset.value ?? ''
		);

		this.bind();
	}

	public toggle() {
		this.selection.wrapper.classList.toggle('open');
		this.items.classList.toggle('selectHide');
	}

	public select(el: HTMLDivElement) {
		const label = el.textContent;
		const value = el.dataset.value ?? 'unknown';

		this.selection.value.textContent = el.textContent;
		this.input.value = el.dataset.value ?? 'unknown';

		this.emit('change', { component: this, label, value });

		this.flushItems(el);
		this.toggle();
	}

	public flushItems(selected: HTMLDivElement) {
		this.items.querySelectorAll<HTMLDivElement>('.item').forEach(el => {
			el.classList.remove('current');
		});

		selected.classList.add('current');
	}

	public getInput(): HTMLInputElement {
		return this.input;
	}

	public getName(): string {
		return this.input.name;
	}

	public getValue(): string {
		return this.input.value;
	}

	protected bind() {
		this.selection.wrapper.addEventListener('click', () => this.toggle());

		this.items
			.querySelectorAll<HTMLDivElement>('.item')
			.forEach(el => el.addEventListener('click', () => this.select(el)));
	}
}
