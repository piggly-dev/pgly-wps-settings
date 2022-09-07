import PglyBaseComponent from './base';

export default class PglyTextAreaComponent extends PglyBaseComponent {
	protected input: HTMLTextAreaElement;

	constructor(el: string | HTMLDivElement) {
		super(el);
		this.input = PglyTextAreaComponent.findElement(this.wrapper, 'textarea');
	}

	public getInput(): HTMLTextAreaElement {
		return this.input;
	}

	public getValue(): string {
		return this.input.value;
	}
}
