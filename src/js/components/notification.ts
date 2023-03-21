import { TColors } from '../types';
import DOMManipulation from '../behaviours/dommanipulation';

export type PglyNotificationOptions = {
	timer: number;
	type: TColors;
	light: boolean;
};

/**
 * Create a notification wrapper.
 */
export default class PglyNotification {
	/**
	 * The container of the notification.
	 *
	 * @type {HTMLDivElement}
	 * @protected
	 */
	protected _container: HTMLDivElement;

	/**
	 * Create a new notification wrapper.
	 *
	 * @param {string | HTMLDivElement} el The element to bind the notification to.
	 * @memberof PglyNotification
	 * @public
	 * @constructor
	 * @returns {void}
	 */
	constructor (el: string | HTMLDivElement) {
		this._container = DOMManipulation.getElement(el);
		this._bind();
	}

	/**
	 * Launch a new notification.
	 *
	 * @param {string} message The message to display.
	 * @param {Partial<PglyNotificationOptions>} options The options of the notification.
	 * @protected
	 * @memberof PglyNotification
	 * @returns {void}
	 */
	public launch (message: string, options: Partial<PglyNotificationOptions>) {
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

	/**
	 * Bind the events.
	 *
	 * @protected
	 * @memberof PglyNotification
	 * @returns {void}
	 */
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
