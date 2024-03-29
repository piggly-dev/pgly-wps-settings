import DOMManipulation from '../behaviours/dommanipulation';

export type TPglyToastOptions = {
	timer: number;
	type: string;
	light: boolean;
};

export default class PglyToast {
	protected _container: HTMLDivElement;

	constructor (el: string | HTMLDivElement) {
		this._container = DOMManipulation.getElement(el);
	}

	public launch (message: string, options: Partial<TPglyToastOptions>) {
		const op = {
			timer: 2000,
			type: 'regular',
			light: false,
			...options,
		};

		const toast = document.createElement('div');
		toast.classList.add('pgly-wps--toast', `pgly-wps-is-${op.type}`);

		if (op.light) {
			toast.classList.add(`pgly-wps-is-light`);
		}

		const del = document.createElement('button');
		del.classList.add('pgly-wps--delete');

		const msg = document.createElement('div');
		msg.textContent = message;

		toast.appendChild(del);
		toast.appendChild(msg);
		this._container.appendChild(toast);

		let removed = false;

		setTimeout(() => {
			if (!removed) this._container.removeChild(toast);
		}, op.timer);

		del.addEventListener('click', () => {
			this._container.removeChild(toast);
			removed = true;
		});
	}
}
