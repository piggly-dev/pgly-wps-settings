export interface IPglyNotificationElement {
	message: string;
	timer?: number;
	type?: string;
	light?: boolean;
	container?: string;
}

export interface IPglyNotification {
	container: HTMLElement | null;
	_init(options: IPglyNotificationElement): void;
	_new(options: IPglyNotificationElement): void;
}

function PglyNotification(
	this: IPglyNotification,
	options: IPglyNotificationElement
) {
	if (!options.message) {
		throw new Error(
			'You need to set a message to display the notification'
		);
	}

	options.timer = options.timer || 2000;
	options.type = options.type || 'regular';
	options.light = options.light || false;
	options.container = options.container || 'pgly-wps--notification';

	this.container = document.getElementById(options.container);
	if (!this.container) return;

	this._init(options);
}

PglyNotification.prototype._init = function (
	options: IPglyNotificationElement
) {
	Promise.resolve().then(() => {
		this._new(options);
	});
};

PglyNotification.prototype._new = function (
	options: IPglyNotificationElement
) {
	const notification = document.createElement('div');
	notification.classList.add(
		'pgly-wps--notification',
		`pgly-wps-is-${options.type}`
	);

	if (options.light) {
		notification.classList.add(`pgly-wps-is-light`);
	}

	const del = document.createElement('button');
	del.classList.add('pgly-wps--delete');

	del.addEventListener('click', () => {
		this.container.removeChild(notification);
	});

	const msg = document.createElement('div');
	msg.innerHTML = options.message;

	notification.appendChild(del);
	notification.appendChild(msg);
	this.container.appendChild(notification);

	setTimeout(
		() => this.container.removeChild(notification),
		options.timer
	);
};

const handlePglyNotifications = () => {
	(
		document.querySelectorAll(
			'.pgly-wps--notification .pgly-wps--delete'
		) || []
	).forEach(($delete: Element): void => {
		const $notification = $delete.parentNode;
		const timer = parseInt(
			($notification as HTMLElement).dataset.timer || '0'
		);

		if (timer > 0) {
			setTimeout(
				() => $notification?.parentNode?.removeChild($notification),
				timer
			);
		}

		$delete.addEventListener('click', () => {
			$notification?.parentNode?.removeChild($notification);
		});
	});
};

export { PglyNotification, handlePglyNotifications };
