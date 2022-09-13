import DOMManipulation from '@/behaviours/dommanipulation';

export type TPglyNotificationOptions = {
	timer: number;
	type: string;
	light: boolean;
};

export default class PglyNotification {
	protected _container: HTMLDivElement;

	constructor (el: string | HTMLDivElement) {
		this._container = DOMManipulation.getElement(el);
		this._bind();
	}

	public launch (message: string, options: Partial<TPglyNotificationOptions>) {
		const op = {
			timer: 2000,
			type: 'regular',
			light: false,
			...options,
		};

		const notification = document.createElement('div');
		notification.classList.add('pgly-wps--notification', `pgly-wps-is-${op.type}`);

		if (op.light) {
			notification.classList.add(`pgly-wps-is-light`);
		}

		const del = document.createElement('button');
		del.classList.add('pgly-wps--delete');

		const msg = document.createElement('div');
		msg.textContent = message;

		notification.appendChild(del);
		notification.appendChild(msg);
		this._container.appendChild(notification);

		let removed = false;

		setTimeout(() => {
			if (!removed) this._container.removeChild(notification);
		}, op.timer);

		del.addEventListener('click', () => {
			this._container.removeChild(notification);
			removed = true;
		});
	}

	protected _bind () {
		document
			.querySelectorAll('.pgly-wps--notification .pgly-wps--delete')
			.forEach(el => {
				const notification = el.parentNode as HTMLElement;
				const timer = parseInt(notification.dataset.timer ?? '0', 10);
				let removed = false;

				if (timer > 0) {
					setTimeout(() => {
						if (!removed) notification?.parentNode?.removeChild(notification);
					}, timer);
				}

				el.addEventListener('click', () => {
					removed = true;
					notification?.parentNode?.removeChild(notification);
				});
			});
	}
}
