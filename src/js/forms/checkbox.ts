import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglyCheckboxComponent extends PglyBaseComponent {
	protected input: HTMLInputElement;
	protected checkbox: HTMLDivElement;

	constructor(el: string | HTMLDivElement) {
		super(el);

		this.checkbox = DOMManipulation.findElement(this.wrapper, '.pgly-wps--checkbox');

		this.input = document.createElement('input');

		this.input = DOMManipulation.createHiddenInput(
			this.checkbox,
			this.checkbox.dataset.name ?? 'unknown',
			this.checkbox.dataset.selected === 'true' ? '1' : '0'
		);

		this.bind();
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
		this.checkbox.addEventListener('click', () => {
			const selected: boolean = this.checkbox.dataset.selected === 'true';

			this.checkbox.dataset.selected = !selected ? 'true' : 'false';
			this.checkbox.classList.toggle('pgly-checked--state');
			this.input.value = !selected ? '1' : '0';
			this.emit('change', { component: this, selected });
		});
	}
}
