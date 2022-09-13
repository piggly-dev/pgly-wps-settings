import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';
import PglyLoadable from './loadable';

export type TFinderItem = {
	value: string;
	label: string;
};

export type TFinderOptions = {
	load: (v: string) => Promise<Array<TFinderItem>>;
	labels: {
		select: string;
		unselect: string;
	};
};

export default class PglyFinderComponent extends PglyBaseComponent<string> {
	protected _search: {
		wrapper: HTMLDivElement;
		input: HTMLInputElement;
		button: HTMLButtonElement;
	};

	protected _selected: {
		wrapper: HTMLDivElement;
		label: HTMLDivElement;
		button: HTMLButtonElement;
	};

	protected _items: {
		loader: HTMLDivElement;
		list: HTMLDivElement;
	};

	protected currIndex?: number;

	protected _response: Array<TFinderItem>;

	protected _loader: PglyLoadable;

	protected _options: Partial<TFinderOptions> = {
		labels: {
			select: 'Select',
			unselect: 'Unselect',
		},
	};

	constructor (el: string | HTMLDivElement) {
		super(el);
		this._search = {
			wrapper: DOMManipulation.findElement(
				this._wrapper,
				'.pgly-wps--field .pgly-wps--input'
			),
			input: DOMManipulation.findElement(this._wrapper, '.pgly-wps--field input'),
			button: DOMManipulation.findElement(this._wrapper, '.pgly-wps--field button'),
		};

		this._selected = {
			wrapper: DOMManipulation.findElement(
				this._wrapper,
				'.pgly-wps--field .pgly-wps--selected'
			),
			label: DOMManipulation.findElement(
				this._wrapper,
				'.pgly-wps--field .pgly-wps--selected .pgly-wps--label'
			),
			button: DOMManipulation.findElement(
				this._wrapper,
				'.pgly-wps--field .pgly-wps--selected button'
			),
		};

		this._items = {
			loader: this._wrapper.querySelector('.pgly-wps--loader') as HTMLDivElement,
			list: this._wrapper.querySelector(
				'.pgly-wps--loader .pgly-wps--list'
			) as HTMLDivElement,
		};

		this._response = [];
		this._loader = new PglyLoadable(this);

		this._bind();
		this._default();
	}

	public options (options: Partial<TFinderOptions>) {
		this._options = { ...this._options, ...options };
	}

	public loader (): PglyLoadable {
		return this._loader;
	}

	public emptyValue () {
		this.field().set('', '');
	}

	protected _select () {
		const hasValue = this.field().get() !== '';

		this._selected.label.textContent = this.field().label() as string;
		this._search.input.value = '';

		if (hasValue !== undefined) {
			this._flush();
		}

		this._search.wrapper.style.display = hasValue ? 'none' : 'flex';
		this._selected.wrapper.style.display = hasValue ? 'flex' : 'none';
	}

	protected _flush () {
		while (this._items.list.firstChild) {
			this._items.list.removeChild(this._items.list.firstChild);
		}
	}

	protected async load (): Promise<void> {
		if (
			this._search.input.value.length === 0 ||
			this.loader().isLoading() ||
			!this._options.load
		) {
			return;
		}

		let response: Array<TFinderItem>;
		this.loader().prepare();

		try {
			response = await this._options.load(this._search.input.value);
		} catch (err) {
			this.loader().done();
			return;
		}

		this._flush();

		response.forEach(item => {
			this._items.list.appendChild(this._render(item));
		});

		this.loader().done();
	}

	protected _bind () {
		this.on('change', () => {
			this._select();
		});

		this.on('beforeLoad', () => {
			this._search.button.classList.add('pgly-loading--state');
			this._items.loader.classList.add('pgly-loading--state');
		});

		this.on('afterLoad', () => {
			this._search.button.classList.remove('pgly-loading--state');
			this._items.loader.classList.remove('pgly-loading--state');
		});

		this._search.button.addEventListener('click', e => {
			e.preventDefault();
			this.load();
		});

		this._selected.button.addEventListener('click', e => {
			e.preventDefault();

			this.currIndex = undefined;
			return this.field().set('', '');
		});

		this._items.list.addEventListener('click', e => {
			const target = e.target as HTMLElement;
			e.preventDefault();

			if (target.classList.contains('pgly-wps--button')) {
				const { label = '', value = '' } = target.dataset;
				this.field().set(value, label);
			}
		});
	}

	protected _render (item: TFinderItem) {
		const row = document.createElement('div');
		row.className = 'pgly-wps--row';

		const col = document.createElement('div');
		col.className = 'pgly-wps--column pgly-wps-col--12 pgly-wps-is-compact';

		const card = document.createElement('div');
		card.className = 'pgly-wps--card pgly-wps-is-white pgly-wps-is-compact';

		const content = document.createElement('div');
		content.className = 'inside left';
		content.textContent = item.label;

		const actionBar = document.createElement('div');
		actionBar.className = 'pgly-wps--action-bar inside right';

		const button = document.createElement('button');
		button.className = 'pgly-wps--button pgly-wps-is-compact pgly-wps-is-primary';
		button.textContent = this._options.labels?.select ?? 'Select';
		button.dataset.label = item.label;
		button.dataset.value = item.value;

		actionBar.appendChild(button);
		card.appendChild(content);
		card.appendChild(actionBar);
		col.appendChild(card);
		row.appendChild(col);

		return row;
	}

	protected _default (): void {
		if (!this._selected.wrapper.dataset.value) return;

		this.field().set(
			this._selected.wrapper.dataset.value,
			this._selected.wrapper.dataset.label
		);
	}
}
