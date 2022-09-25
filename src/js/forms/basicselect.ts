import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';
import PglyLoadable from './loadable';
import { TSelectItem } from './select';

export default class PglyBasicSelectComponent extends PglyBaseComponent<string> {
	protected _changeEvent = false;

	protected _loader: PglyLoadable;

	protected _input: HTMLSelectElement;

	constructor (el: string | HTMLDivElement) {
		super(el);

		this._input = DOMManipulation.findElement(this._wrapper, 'select');
		this._loader = new PglyLoadable(this);

		this._bind();
		this._default();
	}

	public loader (): PglyLoadable {
		return this._loader;
	}

	public synchronous (items: Array<TSelectItem>) {
		this.loader().prepare();
		this._render(items);
		this.loader().done();
	}

	public async asynchronous (callback: () => Promise<Array<TSelectItem>>) {
		this.loader().prepare();
		this._render(await callback());
		this.loader().done();
	}

	public emptyValue (): void {
		this.field().set('');
	}

	public cleanItems (): void {
		this._render([]);
	}

	public reflect (
		select: PglyBasicSelectComponent,
		values: Record<string, Array<TSelectItem>>
	) {
		this.on('change', ({ value }: { value: any }) => {
			select.emptyValue();

			if (values[value]) {
				select.field().set(values[value][0].value, values[value][0].label);

				select.synchronous(values[value]);
				this.emit('reflectedTo', {
					origin: this,
					destination: select,
					values: values[value],
				});
			}
		});
	}

	protected _render (items: Array<TSelectItem>): void {
		const placeholder = DOMManipulation.findElement(this._input, '.placeholder');

		while (this._input.firstChild) {
			this._input.removeChild(this._input.firstChild);
		}

		if (placeholder) this._input.appendChild(placeholder);

		items.forEach(item => {
			const op = document.createElement('option');
			op.value = item.value;
			op.textContent = item.label;

			if (item.selected) op.selected = true;

			this._input.appendChild(op);
		});
	}

	protected _bind () {
		this.on('beforeLoad', () => {
			this._input.disabled = true;
		});

		this.on('afterLoad', () => {
			this._input.disabled = false;
		});

		this.on('change', () => {
			if (this._changeEvent) return;
			this._input.value = this.field().get();
		});

		this._input.addEventListener('change', e => {
			this._changeEvent = true;
			this._field.set((e.target as HTMLInputElement).value);
			this._changeEvent = false;
		});
	}

	protected _default (): void {
		this.field().set(this._input.value);
	}
}
