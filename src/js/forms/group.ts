import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';
import PglyCheckboxComponent from './checkbox';
import PglyInputComponent from './input';
import PglyTextAreaComponent from './textarea';
import { TOrUndefined } from '../types';
import PglySingleMediaComponent from './singlemedia';
import PglyMultipleMediaComponent from './multiplemedia';
import PglyFinderComponent from './finder';
import PglySelectComponent from './select';
import { RuleValidator } from '../validator/engine';
import UUID from '../helpers/uuid';
import PglyLoadable from './loadable';
import PglyBasicSelectComponent from './basicselect';
import PglyTextEditorComponent from './texteditor';

export type TGroupFormInputs = Record<string, { label?: string; value: any }>;

export type TGroupFormItem = {
	uid: string;
	inputs: TGroupFormInputs;
};

export type TGroupFormError = {
	name: string;
	value: string;
	message?: string;
};

export type TGroupFormPreparedData = {
	inputs: TGroupFormInputs;
	errors: Array<TGroupFormError>;
};

export type TGroupFormOptions = {
	rules?: Record<string, Array<RuleValidator>>;
	view: Record<string, string>;
	labels: {
		edit: string;
		remove: string;
	};
};

export class PglyGroupFormItems {
	protected _parent: PglyBaseComponent;

	protected _items: Array<TGroupFormItem> = [];

	constructor (parent: PglyBaseComponent) {
		this._parent = parent;
	}

	public count (): number {
		return this._items.length;
	}

	public add (item: TGroupFormItem, eventOrigin = 'add') {
		this._items.push(item);
		this._parent.emit('added', { item, origin: eventOrigin });
	}

	public get (uid: string): TOrUndefined<TGroupFormItem> {
		return this._items.find(i => i.uid === uid);
	}

	public all (): Array<Record<string, any>> {
		return this._items.map(item => {
			const inputs = { ...item.inputs };

			Object.keys(inputs).forEach(key => {
				inputs[key] = inputs[key].value;
			});

			return inputs;
		});
	}

	public updateId (uid: string, id: number, eventOrigin = 'updateId') {
		const item = this._items.find(i => i.uid === uid);

		if (!item) return;
		item.inputs.id = { value: id };
		this._parent.emit('updatedId', { item, origin: eventOrigin });
	}

	public update (item: TGroupFormItem, eventOrigin = 'update') {
		const index = this._items.findIndex(i => i.uid === item.uid);

		if (index < 0) return;

		Object.keys(item.inputs).forEach(key => {
			this._items[index].inputs[key] = item.inputs[key];
		});

		this._parent.emit('updated', { item: this._items[index], origin: eventOrigin });
	}

	public remove (uid: string, eventOrigin = 'remove') {
		const item = this._items.find(i => i.uid === uid);

		if (!item) return;

		this._items = this._items.filter(i => i.uid !== uid);
		this._parent.emit('removed', { item, origin: eventOrigin });
	}
}

export class PglyGroupFormComponent extends PglyBaseComponent<Array<TGroupFormInputs>> {
	protected _inputs: Record<string, PglyBaseComponent>;

	protected _loader: PglyLoadable;

	protected _items: PglyGroupFormItems;

	protected _options: TGroupFormOptions;

	protected _comps: {
		items: HTMLDivElement;
	};

	protected _editing: boolean;

	protected _current?: string;

	constructor (el: string | HTMLDivElement) {
		super(el);

		this._inputs = {};
		this._items = new PglyGroupFormItems(this);
		this._loader = new PglyLoadable(this);
		this._editing = false;
		this._current = undefined;

		this._comps = {
			items: DOMManipulation.findElement(this._wrapper, '.pgly-wps--items'),
		};

		this._options = {
			view: {},
			labels: {
				edit: 'Edit',
				remove: 'Remove',
			},
		};

		this._bind();
	}

	public groupEl (): HTMLDivElement {
		return this._wrapper;
	}

	public dataset (): Record<string, any> {
		return this._wrapper.dataset;
	}

	public options (options: Partial<TGroupFormOptions>) {
		this._options = { ...this._options, ...options };
	}

	public loader (): PglyLoadable {
		return this._loader;
	}

	public items (): PglyGroupFormItems {
		return this._items;
	}

	public add (input: PglyBaseComponent) {
		this._inputs[input.field().name()] = input;
	}

	public synchronous (items: Array<TGroupFormInputs>) {
		this.loader().prepare({ action: 'items' });
		items.forEach(item =>
			this._items.add({ uid: UUID.generate(), inputs: item }, 'load')
		);
		this.loader().done({ action: 'items' });
	}

	public async asynchronous (callback: () => Promise<Array<TGroupFormInputs>>) {
		try {
			this.loader().prepare({ action: 'items' });
			const items = await callback();

			items.forEach(item =>
				this._items.add({ uid: UUID.generate(), inputs: item }, 'load')
			);
		} catch (err) {
			this.emit('loadError', { error: err });
		}

		this.loader().done({ action: 'items' });
	}

	public get<T = PglyBaseComponent> (name: string): TOrUndefined<T> {
		return this._inputs[name] as unknown as TOrUndefined<T>;
	}

	public remove (name: string) {
		delete this._inputs[name];
	}

	public auto () {
		const prefix = `pgly-gform`;

		this._wrapper.querySelectorAll<HTMLDivElement>(`.${prefix}--input`).forEach(el => {
			if (el.classList.contains(`${prefix}--text`)) {
				const component = new PglyInputComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
				return;
			}

			if (el.classList.contains(`${prefix}--textarea`)) {
				const component = new PglyTextAreaComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
				return;
			}

			if (el.classList.contains(`${prefix}--texteditor`)) {
				const component = new PglyTextEditorComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
				return;
			}

			if (el.classList.contains(`${prefix}--checkbox`)) {
				const component = new PglyCheckboxComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
				return;
			}

			if (el.classList.contains(`${prefix}--select`)) {
				const component = new PglyBasicSelectComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
				return;
			}

			if (el.classList.contains(`${prefix}--eselect`)) {
				const component = new PglySelectComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
				return;
			}

			if (el.classList.contains(`${prefix}--finder`)) {
				const component = new PglyFinderComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
				return;
			}

			if (el.classList.contains(`${prefix}--single-media`)) {
				const component = new PglySingleMediaComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
				return;
			}

			if (el.classList.contains(`${prefix}--multiple-media`)) {
				const component = new PglyMultipleMediaComponent(el);
				const name = component.field().name();
				this._inputs[name] = component;
			}
		});
	}

	public prepare (
		rules: Record<string, Array<RuleValidator>> = {}
	): TGroupFormPreparedData {
		const inputs: Record<string, { label?: string; value: any }> = {};
		const errors: Array<TGroupFormError> = [];

		Object.keys(this._inputs).forEach(name => {
			const el = this._inputs[name];

			if (rules[el.field().name()]) {
				el.validate(rules[el.field().name()]);

				if (el.error().has()) {
					errors.push({
						name: el.field().name(),
						value: el.field().get(),
						message: el.error().message(),
					});
				}
			}

			inputs[el.field().name()] = {
				label: el.field().label(),
				value: el.field().get(),
			};
		});

		return { inputs, errors };
	}

	public emptyValue (): void {
		throw new Error('Not implemented');
	}

	protected _submit (data: TGroupFormPreparedData) {
		if (this._loader.isLoading()) return;

		if (data.errors.length !== 0) {
			this.emit('error', { data: data.errors });
			return;
		}

		if (!this._editing) {
			this._items.add({ uid: UUID.generate(), inputs: data.inputs });
		} else if (this._current) {
			this._items.update({ uid: this._current, inputs: data.inputs });

			const card = DOMManipulation.findElement(
				this._comps.items,
				`.pgly-wps--card[data-uid="${this._current}"]`
			);

			if (card) card.classList.remove('pgly-wps-is-warning');
		}

		this._editing = false;
		this._current = undefined;
		this._flushInputs();
	}

	protected _cancel () {
		if (this._current) {
			const card = DOMManipulation.findElement(
				this._comps.items,
				`.pgly-wps--card[data-uid="${this._current}"]`
			);

			if (card) card.classList.remove('pgly-wps-is-warning');
		}

		this._editing = false;
		this._current = undefined;
		this._flushInputs();
	}

	protected _flushInputs () {
		Object.keys(this._inputs).forEach(k => {
			this._inputs[k].emptyValue();
		});
	}

	protected _updateInputs (uid: string) {
		const item = this._items.get(uid)?.inputs;
		if (!item) return;

		Object.keys(item).forEach(key => {
			const input = this._inputs[key];
			if (!input) return;

			input.field().set(item[key].value, item[key].label);
		});

		const card = DOMManipulation.findElement(
			this._comps.items,
			`.pgly-wps--card[data-uid="${uid}"]`
		);

		if (card) card.classList.add('pgly-wps-is-warning');
	}

	protected _addCard (item: TGroupFormItem) {
		const card = document.createElement('div');
		card.className = 'pgly-wps--card pgly-wps-is-white pgly-wps-is-compact';
		card.dataset.uid = item.uid;

		const content = document.createElement('div');
		content.className = 'pgly-wps--content inside left';

		Object.keys(item.inputs).forEach(key => {
			if (!this._options.view[key]) return;

			const column = document.createElement('div');
			column.className = 'pgly-wps--item';

			const strong = document.createElement('strong');
			strong.textContent = this._options.view[key];

			const span = document.createElement('span');
			span.textContent = (item.inputs[key].label ?? item.inputs[key].value).toString();

			column.appendChild(strong);
			column.appendChild(span);

			content.appendChild(column);
		});

		const action = document.createElement('div');
		action.className = 'pgly-wps--action-bar inside right';

		const edit = document.createElement('button');
		edit.className =
			'pgly-wps--button pgly-wps-is-compact pgly-wps-is-primary pgly-wps--edit';
		edit.dataset.uid = item.uid;
		edit.textContent = this._options.labels.edit;

		const remove = document.createElement('button');
		remove.className =
			'pgly-wps--button pgly-wps-is-compact pgly-wps-is-danger pgly-wps--remove';
		remove.dataset.uid = item.uid;
		remove.textContent = this._options.labels.remove;

		action.appendChild(edit);
		action.appendChild(remove);

		card.appendChild(content);
		card.appendChild(action);

		this._comps.items.appendChild(card);
	}

	protected _updateCard (item: TGroupFormItem) {
		const card = DOMManipulation.findElement(
			this._comps.items,
			`.pgly-wps--card[data-uid="${item.uid}"]`
		);

		if (!card) return;

		const content = DOMManipulation.findElement(card, '.pgly-wps--content');

		if (!content) return;

		while (content.firstChild) {
			content.removeChild(content.firstChild);
		}

		Object.keys(item.inputs).forEach(key => {
			if (!this._options.view[key]) return;

			const column = document.createElement('div');
			column.className = 'pgly-wps--item';

			const strong = document.createElement('strong');
			strong.textContent = this._options.view[key];

			const span = document.createElement('span');
			span.textContent = (item.inputs[key].label ?? item.inputs[key].value).toString();

			column.appendChild(strong);
			column.appendChild(span);

			content.appendChild(column);
		});
	}

	protected _removeCard (item: TGroupFormItem) {
		const card = DOMManipulation.findElement(
			this._comps.items,
			`.pgly-wps--card[data-uid="${item.uid}"]`
		);

		if (card) this._comps.items.removeChild(card);
	}

	protected _bind () {
		this.on('beforeLoad', () => {
			this._wrapper.classList.add('pgly-loading--state');
		});

		this.on('afterLoad', () => {
			this._wrapper.classList.remove('pgly-loading--state');
		});

		this.on('submit', () => this._submit(this.prepare(this._options.rules ?? {})));

		this.on('cancel', () => this._cancel());

		this.on('added', ({ item }) => {
			this.field().set(this._items.all());
			this._addCard(item);
		});

		this.on('updated', ({ item }) => {
			this.field().set(this._items.all());
			this._updateCard(item);
		});

		this.on('updatedId', ({ item }) => {
			this.field().set(this._items.all());
			this._updateCard(item);
		});

		this.on('removed', ({ item }) => {
			this.field().set(this._items.all());
			this._removeCard(item);
		});

		this._comps.items.addEventListener('click', e => {
			const target = e.target as HTMLElement;

			if (!target.dataset.uid || this._loader.isLoading()) return;

			e.preventDefault();

			if (target.classList.contains('pgly-wps--edit')) {
				if (this._editing) return;

				this._editing = true;
				this._current = target.dataset.uid;

				this._updateInputs(this._current);
				return;
			}

			if (target.classList.contains('pgly-wps--remove')) {
				if (this._editing) return;
				this._items.remove(target.dataset.uid);
			}
		});

		DOMManipulation.findElement(
			this._wrapper,
			'button.pgly-gform--submit'
		).addEventListener('click', e => {
			e.preventDefault();
			this.emit('submit', {});
		});

		DOMManipulation.findElement(
			this._wrapper,
			'button.pgly-gform--cancel'
		).addEventListener('click', e => {
			e.preventDefault();
			this.emit('cancel', {});
		});
	}

	protected _default () {
		this.field().set([]);
	}
}
