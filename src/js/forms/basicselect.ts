import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';
import PglyLoadable from '../components/loadable';
import { TSelectItem } from './select';

/**
 * The basic select component.
 */
export default class PglyBasicSelectComponent extends PglyBaseComponent<string> {
	/**
	 * The state of the change event.
	 *
	 * @type {boolean}
	 * @protected
	 */
	protected _changeEvent = false;

	/**
	 * The loader of the component.
	 *
	 * @type {PglyLoadable}
	 * @protected
	 */
	protected _loader: PglyLoadable;

	/**
	 * The select input element of the component.
	 *
	 * @type {HTMLSelectElement}
	 * @protected
	 */
	protected _input: HTMLSelectElement;

	/**
	 * Create a new select input component.
	 *
	 * @param {string | HTMLDivElement} el The element of the component.
	 * @constructor
	 * @public
	 * @returns {void}
	 */
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

	/**
	 * Bind the component.
	 *
	 * This will bind the change event of the input element.
	 * It will also bind the beforeLoad and afterLoad events of the loader.
	 *
	 * @protected
	 * @returns {void}
	 * @memberof PglyInputComponent
	 */
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

	/**
	 * Set the default value of the field.
	 *
	 * @protected
	 * @returns {void}
	 * @memberof PglyBasicSelectComponent
	 */
	protected _default (): void {
		this.field().set(this._input.value);
	}
}
