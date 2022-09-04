export type TFinderItem = {
	value: string;
	label: string;
};

export type TFinderOptions = {
	load: (v: string) => Promise<Array<TFinderItem>>;
	labels: {
		select: string;
	};
};

export default class PglyFinderComponent {
	protected wrapper: HTMLDivElement;

	protected search: {
		wrapper: HTMLDivElement;
		input: HTMLInputElement;
		button: HTMLButtonElement;
	};

	protected selected: {
		wrapper: HTMLDivElement;
		input: HTMLInputElement;
		label: HTMLDivElement;
		button: HTMLButtonElement;
	};

	protected items: {
		loader: HTMLDivElement;
		list: HTMLDivElement;
	};

	protected response: Array<TFinderItem>;
	protected options: TFinderOptions;
	protected loading: boolean = false;

	constructor(id: string, options: TFinderOptions) {
		this.wrapper = document.getElementById(id) as HTMLDivElement;

		if (!this.wrapper) {
			throw Error(
				`PglyFinderComponent -> Cannot find element #${id} on DOM.`
			);
		}

		this.response = [];
		this.options = options;

		this.search = {
			wrapper: this.wrapper.querySelector(
				'.pgly-wps--field .pgly-wps--input'
			) as HTMLDivElement,
			input: this.wrapper.querySelector(
				'.pgly-wps--field input'
			) as HTMLInputElement,
			button: this.wrapper.querySelector(
				'.pgly-wps--field button'
			) as HTMLButtonElement,
		};

		this.selected = {
			wrapper: this.wrapper.querySelector(
				'.pgly-wps--field .pgly-wps--selected'
			) as HTMLDivElement,
			input: this.wrapper.querySelector(
				'.pgly-wps--field .pgly-wps--selected input'
			) as HTMLInputElement,
			label: this.wrapper.querySelector(
				'.pgly-wps--field .pgly-wps--selected .pgly-wps--label'
			) as HTMLInputElement,
			button: this.wrapper.querySelector(
				'.pgly-wps--field .pgly-wps--selected button'
			) as HTMLButtonElement,
		};

		this.items = {
			loader: this.wrapper.querySelector(
				'.pgly-wps--loader'
			) as HTMLDivElement,
			list: this.wrapper.querySelector(
				'.pgly-wps--loader .pgly-wps--list'
			) as HTMLDivElement,
		};

		this.bind();
	}

	public select(index: number, item: TFinderItem) {
		this.selected.input.value = item.value;
		this.selected.label.textContent = item.label;
		this.selected.wrapper.dataset.index = index.toString();
		this.search.input.value = '';

		this.flushItems();
		this.search.wrapper.style.display = 'none';
		this.selected.wrapper.style.display = 'flex';
	}

	public unselect() {
		this.selected.input.value = '';
		this.selected.label.textContent = '';
		this.selected.wrapper.dataset.index = '';
		this.search.input.value = '';

		this.search.wrapper.style.display = 'flex';
		this.selected.wrapper.style.display = 'none';
	}

	protected flushItems() {
		while (this.items.list.firstChild) {
			this.items.list.removeChild(this.items.list.firstChild);
		}
	}

	protected changeState() {
		this.loading = !this.loading;
		this.search.button.classList.toggle('pgly-loading--state');
		this.items.loader.classList.toggle('pgly-loading--state');
	}

	protected async load(): Promise<void> {
		if (this.search.input.value.length === 0 || this.loading) {
			return;
		}

		let response: Array<TFinderItem>;
		this.changeState();

		try {
			response = await this.options.load(this.search.input.value);
		} catch (err) {
			return this.changeState();
		}

		this.flushItems();

		response.forEach((item, idx) => {
			this.items.list.appendChild(this.template(idx, item));
		});

		return this.changeState();
	}

	protected onSelect(e: HTMLElement) {
		if (!e.classList.contains('pgly-wps--button')) {
			return;
		}

		const { label = '', value = '', index = '0' } = e.dataset;
		this.select(parseInt(index), { label, value });
	}

	protected bind() {
		this.search.button.addEventListener('click', () => this.load());
		this.selected.button.addEventListener('click', () => this.unselect());

		this.items.list.addEventListener('click', e =>
			this.onSelect(e.target as HTMLElement)
		);
	}

	protected template(index: number, item: TFinderItem) {
		const row = document.createElement('div');
		row.className = 'pgly-wps--row';

		const col = document.createElement('div');
		col.className =
			'pgly-wps--column pgly-wps-col--12 pgly-wps-is-compact';

		const card = document.createElement('div');
		card.className =
			'pgly-wps--card pgly-wps-is-white pgly-wps-is-compact';

		const content = document.createElement('div');
		content.className = 'inside left';
		content.textContent = item.label;

		const actionBar = document.createElement('div');
		actionBar.className = 'pgly-wps--action-bar inside right';

		const button = document.createElement('button');
		button.className =
			'pgly-wps--button pgly-wps-is-compact pgly-wps-is-primary';
		button.textContent = this.options.labels.select ?? 'Select';
		button.dataset.label = item.label;
		button.dataset.value = item.value;
		button.dataset.index = index.toString();

		actionBar.appendChild(button);
		card.appendChild(content);
		card.appendChild(actionBar);
		col.appendChild(card);
		row.appendChild(col);

		return row;
	}
}
