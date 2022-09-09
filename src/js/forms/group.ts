// import DOMManipulation from '@/behaviours/dommanipulation';
// import ValidatorRule from '@/validator/rule';
// import PglyBaseComponent from './base';
// import PglyCheckboxComponent from './checkbox';
// import PglyInputComponent from './input';
// import PglyTextAreaComponent from './textarea';

// export type TGroupFormItem = Record<string, any>;

// export type TGroupFormError = {
// 	name: string;
// 	value: string;
// 	message?: string;
// };

// export type TGroupFormPreparedData = {
// 	inputs: TGroupFormItem;
// 	errors: Array<TGroupFormError>;
// };

// export type TGroupFormOptions = {
// 	keys: { label: string };
// 	labels: { edit: string; remove: string };
// };

// export default class PglyGroupFormComponent extends PglyBaseComponent {
// 	protected inputs: Array<PglyBaseComponent>;
// 	protected button: HTMLButtonElement;

// 	protected items: {
// 		wrapper: HTMLDivElement;
// 		content: Array<Record<string, any>>;
// 	};

// 	protected options: TGroupFormOptions;

// 	protected editing: boolean = false;
// 	protected current?: number;

// 	constructor(el: string | HTMLDivElement, options: Partial<TGroupFormOptions>) {
// 		super(el);

// 		this.items = {
// 			wrapper: DOMManipulation.findElement(this.wrapper, '.pgly-wps--list'),
// 			content: [],
// 		};

// 		this.inputs = [];
// 		this.button = DOMManipulation.findElement(this.wrapper, 'button.pgly-form--submit');
// 		this.options = {
// 			keys: { label: 'id' },
// 			labels: { edit: 'Edit', remove: 'Remove' },
// 			...options,
// 		};
// 	}

// 	public addInput(input: PglyBaseComponent) {
// 		this.inputs.push(input);
// 	}

// 	public removeInput(name: string) {
// 		this.inputs = this.inputs.filter(i => i.getName() !== name);
// 	}

// 	public autoInput() {
// 		const prefix = `.pgly-gform`;

// 		this.wrapper.querySelectorAll<HTMLDivElement>(`${prefix}--input`).forEach(el => {
// 			if (el.classList.contains(`${prefix}--text`)) {
// 				this.inputs.push(new PglyInputComponent(el));
// 				return;
// 			}

// 			if (el.classList.contains(`${prefix}--textarea`)) {
// 				this.inputs.push(new PglyTextAreaComponent(el));
// 				return;
// 			}

// 			if (el.classList.contains(`${prefix}--checkbox`)) {
// 				this.inputs.push(new PglyCheckboxComponent(el));
// 				return;
// 			}
// 		});
// 	}

// 	public prepare(
// 		rules: Record<string, Array<ValidatorRule>> = {}
// 	): TGroupFormPreparedData {
// 		const inputs: Record<string, any> = {};
// 		const errors: Array<TGroupFormError> = [];

// 		this.inputs.forEach(el => {
// 			if (rules[el.getName()]) {
// 				el.validate(rules[el.getName()]);

// 				if (el.hasError()) {
// 					errors.push({
// 						name: el.getName(),
// 						value: el.getValue(),
// 						message: el.getError().message,
// 					});
// 				}
// 			}

// 			inputs[el.getName()] = el.getValue();
// 		});

// 		return { inputs, errors };
// 	}

// 	public edit(target: HTMLElement) {
// 		const { index = '0' } = target.dataset;
// 		const item = this.items.content[parseInt(index)];

// 		this.inputs.forEach(i => {
// 			if (item[i.getName()]) {
// 				i.setValue(item[i.getName()]);
// 			}
// 		});

// 		this.editing = true;
// 		this.current = parseInt(index);
// 	}

// 	protected submit(data: TGroupFormPreparedData) {
// 		if (data.errors.length !== 0) {
// 			this.emit('error', { data: data.errors });
// 			return;
// 		}

// 		this.emit('prepared', data);

// 		if (!this.editing) {
// 			this.items.content.push(data.inputs);
// 			this.template(this.items.content.length + 1, data.inputs);
// 		} else if (this.current) {
// 			this.items.content[this.current] = data.inputs;
// 			this.update(this.current, data.inputs);
// 		}

// 		this.emit('submitted', { data: data.inputs });
// 	}

// 	protected bind() {
// 		this.button.addEventListener('click', e => {
// 			e.preventDefault();
// 			this.submit(this.prepare());
// 		});

// 		this.items.wrapper.addEventListener('click', e => {
// 			e.preventDefault();
// 			const target = e.target as HTMLElement;

// 			if (target.classList.contains('pgly-wps-action--edit')) {
// 				this.edit(target);
// 				return;
// 			}

// 			if (target.classList.contains('pgly-wps-action--remove')) {
// 				this.remove(target);
// 				return;
// 			}
// 		});
// 	}

// 	protected update(idx: number, item: TGroupFormItem) {
// 		this.items.wrapper.querySelectorAll<HTMLElement>('.pgly-wps--row').forEach(el => {
// 			const { index } = el.dataset;

// 			if (index !== idx.toString()) {
// 				return;
// 			}

// 			const content = el.querySelector('.pgly-wps--card .inside.left');

// 			if (content) {
// 				content.textContent = item[this.options.keys.label];
// 			}
// 		});
// 	}

// 	protected template(index: number, item: TGroupFormItem) {
// 		const row = document.createElement('div');
// 		row.className = 'pgly-wps--row';
// 		row.dataset.index = index.toString();

// 		const col = document.createElement('div');
// 		col.className = 'pgly-wps--column pgly-wps-col--12 pgly-wps-is-compact';

// 		const card = document.createElement('div');
// 		card.className = 'pgly-wps--card pgly-wps-is-white pgly-wps-is-compact';

// 		const content = document.createElement('div');
// 		content.className = 'inside left';
// 		content.textContent = item[this.options.keys.label];

// 		const actionBar = document.createElement('div');
// 		actionBar.className = 'pgly-wps--action-bar inside right';

// 		const edit = document.createElement('button');
// 		edit.className =
// 			'pgly-wps--button pgly-wps-action--edit pgly-wps-is-compact pgly-wps-is-primary';
// 		edit.textContent = this.options.labels.edit;
// 		edit.dataset.index = index.toString();

// 		const remove = document.createElement('button');
// 		remove.className =
// 			'pgly-wps--button pgly-wps-action--remove pgly-wps-is-compact pgly-wps-is-danger';
// 		remove.textContent = this.options.labels.remove;
// 		remove.dataset.index = index.toString();

// 		actionBar.appendChild(edit);
// 		actionBar.appendChild(remove);
// 		card.appendChild(content);
// 		card.appendChild(actionBar);
// 		col.appendChild(card);
// 		row.appendChild(col);

// 		return row;
// 	}
// }
