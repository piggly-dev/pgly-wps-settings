export default class PglySelectComponent {
	protected wrapper: HTMLDivElement;
	protected items: HTMLDivElement;
	protected selection: {
		wrapper: HTMLDivElement;
		value: HTMLSpanElement;
		input: HTMLInputElement;
	};

	constructor(id: string) {
		this.wrapper = document.getElementById(id) as HTMLDivElement;

		if (!this.wrapper) {
			throw Error(
				`PglySelectInput -> Cannot find element #${id} on DOM.`
			);
		}

		const selWrapper = this.wrapper.querySelector(
			'.selected'
		) as HTMLDivElement;

		const itemsWrapper = this.wrapper.querySelector(
			'.items'
		) as HTMLDivElement;

		this.selection = {
			wrapper: selWrapper,
			value: selWrapper.querySelector('span') as HTMLSpanElement,
			input: this.createHiddenInput(selWrapper),
		};

		this.items = itemsWrapper;
		this.bind();
	}

	public toggle() {
		this.selection.wrapper.classList.toggle('open');
		this.items.classList.toggle('selectHide');
	}

	public select(el: HTMLDivElement) {
		this.selection.value.textContent = el.textContent;
		this.selection.input.value = el.dataset.value ?? 'unknown';

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
			.forEach(el =>
				el.addEventListener('click', () => this.select(el))
			);
	}

	protected createHiddenInput(parent: HTMLDivElement): HTMLInputElement {
		const el = document.createElement('input');
		el.type = 'hidden';
		el.name = this.wrapper.dataset.name ?? 'unknown';
		el.value =
			this.wrapper.querySelector<HTMLDivElement>('.items .current')
				?.dataset.value ?? '';

		parent.appendChild(el);
		return el;
	}
}
