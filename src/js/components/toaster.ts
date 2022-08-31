export interface IPglyToastElement {
	message: string;
	timer?: number;
	type?: string;
	light?: boolean;
	container?: string;
}

export interface IPglyToast {
	container: HTMLElement | null;
	_init(options: IPglyToastElement): void;
	_new(options: IPglyToastElement): void;
}

function PglyToast(this: IPglyToast, options: IPglyToastElement) {
	if (!options.message) {
		throw new Error('You need to set a message to display the toast');
	}

	options.timer = options.timer || 2000;
	options.type = options.type || 'regular';
	options.light = options.light || false;
	options.container = options.container || 'pgly-wps--toaster';

	this.container = document.getElementById(options.container);
	if (!this.container) return;

	this._init(options);
}

PglyToast.prototype._init = function (options: IPglyToastElement) {
	Promise.resolve()
		.then(() => {
			if (this.container) {
				return Promise.resolve();
			}

			return this._createContainer();
		})
		.then(() => {
			this._new(options);
		});
};

PglyToast.prototype._new = function (options: IPglyToastElement) {
	const toast = document.createElement('div');
	toast.classList.add('pgly-wps--toast', `pgly-wps-is-${options.type}`);

	if (options.light) {
		toast.classList.add(`pgly-wps-is-light`);
	}

	const del = document.createElement('button');
	del.classList.add('pgly-wps--delete');

	del.addEventListener('click', () => {
		this.container.removeChild(toast);
	});

	const msg = document.createElement('div');
	msg.innerHTML = options.message;

	toast.appendChild(del);
	toast.appendChild(msg);
	this.container.appendChild(toast);

	setTimeout(() => this.container.removeChild(toast), options.timer);
};

export default PglyToast;
