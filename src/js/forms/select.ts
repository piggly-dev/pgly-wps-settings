import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';
import PglyLoadable from './loadable';

export type TSelectItem = {
	label: string;
	value: string;
	selected: boolean;
};

export type TSelectOptions = {
	labels: {
		placeholder: string;
	};
};

export default class PglySelectComponent extends PglyBaseComponent {
	protected items: Array<TSelectItem> = [];
	protected _loader: PglyLoadable;
	protected _options: TSelectOptions;

	protected _comps: {
		selection: HTMLDivElement;
		value: HTMLSpanElement;
		items: HTMLDivElement;
		container: HTMLDivElement;
	};

	constructor(el: string | HTMLDivElement) {
		super(el);

		this._comps = {
			selection: DOMManipulation.findElement(this._wrapper, '.selected'),
			value: DOMManipulation.findElement(this._wrapper, '.selected span'),
			items: DOMManipulation.findElement(this._wrapper, '.items'),
			container: DOMManipulation.findElement(this._wrapper, '.items .container'),
		};

		this._loader = new PglyLoadable(this);
		this._options = {
			labels: {
				placeholder: 'Select an option...',
			},
		};

		this._bind();
		this._default();
	}

	public options(options: Partial<TSelectOptions>) {
		this._options = { ...this._options, ...options };
	}

	public loader(): PglyLoadable {
		return this._loader;
	}

	public synchronous(items: Array<TSelectItem>) {
		this.loader().prepare();

		this.items = items;
		this._render();
		this.loader().done();
	}

	public async asynchronous(callback: () => Promise<Array<TSelectItem>>) {
		this.loader().prepare();
		this.items = await callback();
		this._render();
		this.loader().done();
	}

	public emptyValue(): void {
		this.field().set('', '');
	}

	protected _flush() {
		this._comps.items.querySelectorAll<HTMLElement>('.item').forEach(el => {
			el.classList.remove('current');
			if (el.dataset.value === this.field().get()) el.classList.add('current');
		});
	}

	protected _toggle() {
		this._comps.selection.classList.toggle('open');
		this._comps.items.classList.toggle('hidden');
	}

	protected _close() {
		this._comps.selection.classList.remove('open');
		this._comps.items.classList.add('hidden');
	}

	protected _renderSelection() {
		if (this.field().get() !== '') {
			this._comps.selection.classList.remove('empty');
		} else {
			this._comps.selection.classList.add('empty');
		}

		this._comps.value.textContent =
			this.field().label() ?? this._options.labels.placeholder ?? '';

		this._flush();
		this._close();
	}

	protected _render() {
		while (this._comps.container.firstChild) {
			this._comps.container.removeChild(this._comps.container.firstChild);
		}

		this.items.forEach(item => {
			const el = document.createElement('div');
			el.className = 'item';
			el.dataset.value = item.value;
			el.textContent = item.label;

			if (item.selected) {
				el.className += ' current';
				this.field().set(item.value, item.label);
				this._comps.selection.classList.remove('empty');
				this._comps.value.textContent = this.field().label() ?? '';
			}

			this._comps.container.appendChild(el);
		});
	}

	protected _bind() {
		this.on('beforeLoad', () => {
			this._comps.selection.classList.add('pgly-loading--state');
		});

		this.on('afterLoad', () => {
			this._comps.selection.classList.remove('pgly-loading--state');
		});

		this.on('change', () => {
			this._renderSelection();
		});

		this._comps.selection.addEventListener('click', () => {
			if (this.loader().isLoading()) return;
			this._toggle();
		});

		this._comps.items.addEventListener('click', e => {
			if (this.loader().isLoading()) return;
			const target = e.target as HTMLElement;

			if (!target) return;

			e.preventDefault();

			if (
				target.classList.contains('item') ||
				target.classList.contains('clickable')
			) {
				const value = target.dataset.value ?? '';
				const label = target.textContent ?? '';

				return this.field().set(value, label);
			}
		});
	}

	protected _default(): void {
		if (!this._comps.selection.dataset.value) return;

		this.field().set(
			this._comps.selection.dataset.value,
			this._comps.selection.dataset.label
		);
	}
}
