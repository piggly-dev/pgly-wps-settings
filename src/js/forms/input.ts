import PglyBaseComponent from './base';

export default class PglyInputComponent extends PglyBaseComponent {
	protected input: HTMLInputElement;

	constructor(el: string | HTMLDivElement) {
		super(el);
		this.input = PglyInputComponent.findElement(this.wrapper, 'input');
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
}
