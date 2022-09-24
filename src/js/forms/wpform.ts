import axios from 'axios';
import { RuleValidator } from '../validator/engine';
import { PglyAsyncFormEngine, TFormBody } from './form';
import PglySingleMediaComponent from './singlemedia';
import PglyMultipleMediaComponent from './multiplemedia';
import PglyToast from '../components/toaster';
import { PglyGroupFormComponent, TGroupFormInputs, TGroupFormItem } from './group';
import PglyFinderComponent, { TFinderItem } from './finder';

export const wpSingleMediaFrame = PglySingleMediaComponent.wpFrame;
export const wpMultipleMediaFrame = PglyMultipleMediaComponent.wpFrame;

export class WPForm {
	protected _toaster: PglyToast;

	protected _form: PglyAsyncFormEngine;

	protected _postForm?: HTMLFormElement;

	protected _rules: Record<string, Array<RuleValidator>> = {};

	protected _group = false;

	public actions: Record<string, string> = {};

	constructor (
		formId: string,
		toasterId: string,
		rules: Record<string, Array<RuleValidator>>,
		formatter?: TFormBody,
		group = false
	) {
		const defFormatter = (data: Record<string, any>) => this._applyData(data);

		this._toaster = new PglyToast(toasterId);
		this._rules = rules;
		this._form = this._loadForm(formId, formatter ?? defFormatter, rules);
		this._group = group;
	}

	public toaster (): PglyToast {
		return this._toaster;
	}

	public form (): PglyAsyncFormEngine {
		return this._form;
	}

	public isOnPost () {
		this._postForm =
			document.querySelector<HTMLFormElement>('form[name="post"]') ?? undefined;

		if (this._postForm && !this._group) {
			this._postForm.addEventListener('submit', e => {
				e.preventDefault();

				if (this._form) {
					this._form.submit(
						'POST',
						this._form.dataset().action,
						this._form.prepare(this._rules)
					);

					return;
				}

				this._postForm?.submit();
			});
		}
	}

	public inOnMetabox (
		inputName: string,
		loadUrl: string,
		editUrl: string,
		xSecurity: string,
		view: Record<string, string>,
		rules: Record<string, Array<RuleValidator>>
	) {
		const group = this._form.get(inputName) as PglyGroupFormComponent;

		group.options({
			view,
			labels: {
				edit: 'Editar',
				remove: 'Remover',
			},
			rules,
		});

		group.asynchronous(async (): Promise<Array<TGroupFormInputs>> => {
			try {
				const { data } = await axios.post(loadUrl, {
					...this._form.dataset(),
					x_security: xSecurity,
				});

				if (!data.success) {
					this._onError({ error: data.data });
					return [];
				}

				return data.data as Array<TGroupFormInputs>;
			} catch (err) {
				this._onError({ error: err });
				return [];
			}
		});

		const action =
			(
				url: string,
				data: any,
				onSuccess: (item: TGroupFormItem, id: string) => void,
				onError: (item: TGroupFormItem) => void
			) =>
			({ item, origin }: { item: TGroupFormItem; origin: string }) => {
				if (origin === 'load') {
					return;
				}

				if (!item.inputs.id && (origin === 'remove' || origin === 'update')) {
					return;
				}

				group.loader().prepare();

				new Promise((res, rej) => {
					const inputs: Record<string, any> = {};

					Object.keys(item.inputs).forEach(key => {
						inputs[key] = item.inputs[key].value;
					});

					axios
						.post(url, {
							...this._form.dataset(),
							...inputs,
							...data,
							x_security: xSecurity,
						})
						.then(response => {
							res(response.data);
						})
						.catch(err => {
							rej(err);
						});
				})
					.then((_data: any) => {
						if (!_data.success) {
							this._onError({ error: _data });
							onError(item);
							return;
						}

						this._onSuccess({ response: _data });
						onSuccess(item, _data.data.id ?? undefined);
					})
					.catch(err => {
						this._onError({ error: err });
						onError(item);
					})
					.finally(() => group.loader().done());
			};

		group.on('loadError', ({ err }) => {
			this._onError({ error: err });
		});

		group.on(
			'added',
			action(
				editUrl,
				{ action: 'add' },
				(item, id) => {
					group.items().updateId(item.uid, parseInt(id, 10));
				},
				item => {
					group.items().remove(item.uid);
				}
			)
		);

		group.on(
			'updated',
			action(
				editUrl,
				{ action: 'update' },
				() => null,
				() => null
			)
		);

		group.on(
			'removed',
			action(
				editUrl,
				{ action: 'remove' },
				() => null,
				() => null
			)
		);

		group.on('error', this._error.bind(this));
	}

	public enableAction (action: string, callback: (wpForm: WPForm) => void) {
		this.form()
			.formEl()
			.addEventListener('click', e => {
				if (!e.target) return;
				const target = e.target as HTMLElement;
				if (target.classList.contains(`pgly-form--${action}`)) {
					e.preventDefault();
					callback(this);
				}
			});

		const urlParams = new URLSearchParams(window.location.search);
		const _action = urlParams.get('action');

		if (action === _action) {
			callback(this);
		}
	}

	public getUrl (base: string, action: string): string {
		return `${base}?action=${action}`;
	}

	public applyToFinder (field: PglyFinderComponent, url: string, xSecurity: string) {
		field.options({
			load: async query => {
				try {
					const { data } = await axios.post(url, {
						query,
						x_security: xSecurity,
					});

					if (data.data.length === 0) {
						this._toaster.launch('Nenhum resultado encontrado...', {
							type: 'danger',
							timer: 2000,
						});
					}

					return data.data as Array<TFinderItem>;
				} catch (err) {
					this._onError(err);
					return [];
				}
			},
			labels: {
				select: 'Selecionar',
				unselect: 'Remover',
			},
		});
	}

	protected _loadForm (
		id: string,
		formatter: TFormBody,
		rules?: Record<string, Array<RuleValidator>>
	) {
		const form = new PglyAsyncFormEngine(id, {
			rules: rules ?? {},
		});

		form.formatter(formatter.bind(this));
		form.on('error', this._error.bind(this));
		form.on('requestSuccess', this._onSuccess.bind(this));
		form.on('requestError', this._onError.bind(this));
		form.auto();

		return form;
	}

	protected _applyData (data: Record<string, any>): Record<string, any> {
		if (!this._form) return data;

		const _data = { ...data };

		if (this._form.dataset().recordId) _data.id = this._form.dataset().recordId;

		if (this._form.dataset().postId) _data.post_id = this._form.dataset().postId;

		if (this._form.dataset().xSecurity)
			_data.x_security = this._form.dataset().xSecurity;

		return _data;
	}

	protected _error (): void {
		this._toaster.launch('Campos inválidos, verifique antes de continuar', {
			type: 'danger',
			timer: 5000,
		});
	}

	protected _onSuccess ({ response }: any): void {
		if (!response.success) {
			this._toaster.launch(response.data.message, {
				type: 'danger',
				timer: 5000,
			});

			return;
		}

		this._toaster.launch(response.data.message, {
			type: 'success',
			timer: 5000,
		});

		if (this._postForm) this._postForm.submit();
		if (response.data.id) this._updateRecordId(response.data.id);
	}

	protected _onError ({ error }: any): void {
		this._toaster.launch(
			error?.response?.data?.data?.message ??
				error?.data?.message ??
				error.message ??
				'Erro de execução do script',
			{
				type: 'danger',
				timer: 5000,
			}
		);
	}

	protected _getRecordId (): string | undefined {
		if (!this._form) return undefined;
		return this._form.dataset().recordId;
	}

	protected _updateRecordId (id?: string): void {
		if (!id || !this._form) return;
		this._form.formEl().dataset.recordId = id;
	}
}
