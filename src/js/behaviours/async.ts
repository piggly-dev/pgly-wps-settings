import axios from 'axios';
const qs = require('qs');

export interface IPglyAsyncFormField {
	id: string;
	name: string;
	required: boolean;
}

export interface IPglyAsyncOptions {
	container: string;
	responseContainer?: string;
	form?: { [key: string]: Array<IPglyAsyncFormField> };
	url: string;
	x_security: string;
	messages?: {
		request_error?: string;
		invalid_fields?: string;
	};
	debug: boolean;
}

export interface IPglyAsync {
	options: IPglyAsyncOptions;
	_init(): void;
	_startLoad($button: HTMLButtonElement): void;
	_stopLoad($button: HTMLButtonElement): void;
	_consoleLog(...args: any[]): void;
	_consoleError(...args: any[]): void;
}

function PglyAsync(this: IPglyAsync, options: IPglyAsyncOptions) {
	if (!options.url) {
		throw new Error('`url` is required to async actions.');
	}

	if (!options.x_security) {
		throw new Error('`x_security` is required to async actions.');
	}

	if (!options.container) {
		throw new Error('`container` is required to async actions.');
	}

	options.responseContainer =
		options.responseContainer || `${options.container}--response`;
	options.debug = options.debug || false;

	this.options = options;
	this._init();
}

PglyAsync.prototype._init = function (this: IPglyAsync) {
	document
		.querySelectorAll(`${this.options.container} .pgly-async--behaviour`)
		.forEach(($el: Element) => {
			const $button: HTMLButtonElement = $el as HTMLButtonElement;
			$button.dataset.loading = 'false';

			$button.addEventListener('click', e => {
				this._consoleLog('Clicked at async button...');
				e.preventDefault();

				if ($button.dataset.loading === 'true') {
					return;
				}

				// Start loading
				this._startLoad($button);

				const data = $button.dataset;
				const refresh = data.refresh || false;
				const responseContainer =
					data.responseContainer || this.options.responseContainer;

				if (this.options.form && data.form) {
					this._consoleLog('Button has form', data.form);
					const form: Array<IPglyAsyncFormField> =
						this.options.form[data.form] || [];
					let error = false;

					form.forEach((i: IPglyAsyncFormField) => {
						const $el = document.getElementById(
							i.id
						) as HTMLInputElement;
						const val = $el ? $el.value : '';

						if (i.required && val.length === 0) {
							error = true;
							return;
						}

						data[i.name] = val;
					});

					if (error) {
						const _window: any = window;

						if (_window.PglyWpsNotification) {
							new _window.PglyWpsNotification({
								message:
									this.options.messages?.invalid_fields ||
									'Invalid fields',
								type: data.success ? 'success' : 'danger',
								container: responseContainer,
								timer: 5000,
							});
						}

						this._consoleError(
							'Cannot send, invalid fields detected',
							data.form
						);
						this._stopLoad($button);
						return;
					}
				}

				data.xSecurity = this.options.x_security;
				this._consoleLog('Request body', data);

				axios
					.post(this.options.url, qs.stringify(data))
					.then(res => {
						const _window: any = window;
						const { data } = res;
						this._consoleLog('Success', data);

						if (_window.PglyWpsNotification) {
							new _window.PglyWpsNotification({
								message: data.data.message,
								type: data.success ? 'success' : 'danger',
								container: responseContainer,
								timer: 5000,
							});
						}

						if (refresh) {
							setTimeout(() => document.location.reload(), 3000);
						}
					})
					.catch(err => {
						const _window: any = window;
						this._consoleError('Error', err);

						if (_window.PglyWpsNotification) {
							new _window.PglyWpsNotification({
								message:
									this.options.messages?.request_error ||
									'Something went wrong',
								type: data.success ? 'success' : 'danger',
								container: responseContainer,
								timer: 5000,
							});
						}
					})
					.finally(() => {
						this._stopLoad($button);
					});
			});
		});
};

PglyAsync.prototype._consoleLog = function (...args: any[]) {
	if (this.options.debug) console.log(...args);
};

PglyAsync.prototype._consoleError = function (...args: any[]) {
	if (this.options.debug) console.error(...args);
};

PglyAsync.prototype._startLoad = function ($button: HTMLButtonElement) {
	$button.classList.add('pgly-loading--state');
	$button.dataset.loading = 'true';
};

PglyAsync.prototype._stopLoad = function ($button: HTMLButtonElement) {
	$button.classList.remove('pgly-loading--state');
	$button.dataset.loading = 'false';
};

export default PglyAsync;
