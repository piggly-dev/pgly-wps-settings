import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglyFieldError {
	protected _parent: PglyBaseComponent;
	protected _state: boolean = false;
	protected _message?: string;
	protected _comp: {
		wrapper: HTMLDivElement;
		message: HTMLSpanElement;
	};

	constructor(parent: PglyBaseComponent, wrapper: HTMLDivElement) {
		this._parent = parent;

		this._comp = {
			wrapper: wrapper,
			message: DOMManipulation.findElement(wrapper, '.pgly-wps--message'),
		};
	}

	public apply(message: string) {
		this._state = true;
		this._message = message;
		this._emit('error');
	}

	public flush() {
		this._state = false;
		this._message = undefined;
		this._emit('errorFlush');
	}

	public has(): boolean {
		return this._state;
	}

	public message(): string | undefined {
		return this._message;
	}

	protected _render() {
		this._comp.wrapper.classList.remove('pgly-wps--error');
		if (this._state) this._comp.wrapper.classList.add('pgly-wps--error');

		this._comp.message.textContent = this._message ?? '';
	}

	protected _emit(id: string) {
		this._render();
		this._parent.emit(id, {
			component: this._parent,
			state: this._state,
			message: this._message,
		});
	}
}
