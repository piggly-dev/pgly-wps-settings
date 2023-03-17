import Quill, { QuillOptionsStatic } from 'quill';
import DOMManipulation from '../behaviours/dommanipulation';
import PglyBaseComponent from './base';

export default class PglyTextEditorComponent extends PglyBaseComponent<string> {
	protected _input: HTMLDivElement;

	protected _quill: Quill;

	constructor (el: string | HTMLDivElement) {
		super(el);

		this._input = DOMManipulation.findElement(this._wrapper, '.quill-editor');
		this._quill = new Quill(this._input, {
			modules: {
				toolbar: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }, { 'align': [] }],
					['bold', 'italic', 'underline', 'link'],
					[{ 'list': 'ordered' }, { 'list': 'bullet' }],
					['blockquote', 'code-block'],
					[{ 'color': [] }, { 'background': [] }],
					['clean'],
				],
			},
			theme: 'snow',
		});

		this._bind();
		this._default();
	}

	public options (options: QuillOptionsStatic) {
		this._quill = new Quill(DOMManipulation.findElement(this._wrapper, '.quill-editor'), options);
		this._bind();
	}

	public emptyValue (): void {
		this._quill.deleteText(0, this._quill.getLength());
		this.field().set('');
	}

	protected _bind () {
		this._quill.on('text-change', () => {
			this._field.set(this._input.querySelector('.ql-editor')?.innerHTML ?? '');
		});
	}

	protected _default (): void {
		this.field().set(this._input.querySelector('.ql-editor')?.innerHTML ?? '');
	}
}
