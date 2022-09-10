import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export type TSelectItem = {
	label: string;
	value: string;
	selected: boolean;
};

export default class PglySelectComponent extends PglyBaseComponent {
	protected items: Array<TSelectItem> = [];
	protected loading: boolean = false;

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

		this._bind();
	}

	public synchronous(items: Array<TSelectItem>) {
		this.loading = false;

		this.items = items;
		this._render();
	}

	public async asynchronous(callback: () => Promise<Array<TSelectItem>>) {
		this.loading = true;
		this._comps.selection.classList.add('pgly-loading--state');

		this.items = await callback();
		this._render();

		this.loading = false;
		this._comps.selection.classList.remove('pgly-loading--state');
	}

	public select(el: HTMLDivElement) {
		this._comps.selection.classList.remove('empty');

		this.field().set(el.dataset.value ?? '', el.textContent ?? '');
		this._comps.value.textContent = this.field().label() ?? '';

		if (this.field().get() === '') {
			this._comps.selection.classList.add('empty');
		}

		this._flush(el);
		this._close();
	}

	public empty(label: string) {
		this.field().set('', label);
		this._comps.value.textContent = this.field().label() ?? '';
		this._comps.selection.classList.add('empty');

		this._flush();
		this._close();
	}

	protected _flush(selected?: HTMLDivElement) {
		this._comps.items.querySelectorAll<HTMLDivElement>('.item').forEach(el => {
			el.classList.remove('current');
		});

		if (selected) selected.classList.add('current');
	}

	protected _toggle() {
		this._comps.selection.classList.toggle('open');
		this._comps.items.classList.toggle('hidden');
	}

	protected _close() {
		this._comps.selection.classList.remove('open');
		this._comps.items.classList.add('hidden');
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
		this._comps.selection.addEventListener('click', () => {
			if (this.loading) return;
			this._toggle();
		});

		this._comps.items.addEventListener('click', el => {
			if (this.loading) return;
			const target: any = el.target;

			if (target.classList.contains('item')) {
				this.select(target);
				return;
			}

			if (target.classList.contains('clickable')) {
				this.empty(target.textContent);
				return;
			}
		});
	}
}
