import { RuleValidator } from '../validator/engine';
import { PglyAsyncFormEngine, TFormBody } from './form';
import PglySingleMediaComponent from './singlemedia';
import PglyMultipleMediaComponent from './multiplemedia';
import PglyToast from '../components/toaster';

export const wpSingleMediaFrame = PglySingleMediaComponent.wpFrame;
export const wpMultipleMediaFrame = PglyMultipleMediaComponent.wpFrame;

export class WPForm {
	protected _toaster: PglyToast;

	protected _form: PglyAsyncFormEngine;

	protected _postForm?: HTMLFormElement;

	protected _rules: Record<string, Array<RuleValidator>> = {};

	protected _group = false;

	protected _actions: Record<string, string> = {};

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

	public actions () : Record<string, string> {
		return this._actions;
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
