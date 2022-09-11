import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export type TSingleMediaItem = {
	value: string;
	src: string;
};

export type TSingleMediaOptions = {
	labels: {
		title: string;
		button: string;
	};
};

export default class PglySingleMediaComponent extends PglyBaseComponent<string> {
	protected _image: HTMLImageElement;
	protected _options: TSingleMediaOptions;

	constructor(el: string | HTMLDivElement) {
		super(el);

		this._options = {
			labels: {
				title: 'Select a media',
				button: 'Select',
			},
		};

		this._image = DOMManipulation.findElement(this._wrapper, 'img');

		this._bind();
		this._default();
	}

	public options(options: Partial<TSingleMediaOptions>) {
		this._options = { ...this._options, ...options };
	}

	public select(data: TSingleMediaItem) {
		this.field().set(data.value, data.src);
	}

	public clean() {
		this.field().set('', '');
	}

	public emptyValue() {
		this.clean();
	}

	protected _bind() {
		this.on('change', () => {
			this._image.src = this.field().label() ?? '';
		});

		this._wrapper.addEventListener('click', e => {
			const el = e.target as HTMLElement | null;

			if (!el) return;

			e.preventDefault();

			if (el.classList.contains('pgly-wps--select')) {
				return this.emit('select', { component: this });
			}

			if (el.classList.contains('pgly-wps--clean')) {
				this.emit('clean', { component: this });
				return this.clean();
			}
		});
	}

	protected _default(): void {
		if (!this._image.dataset.value) return;

		this.field().set(this._image.dataset.value, this._image.dataset.src);
	}

	public static wpFrame({ component }: { component: PglySingleMediaComponent }) {
		const frame = (wp.media.frames.metaImageFrame = wp.media({
			title: component._options.labels.title,
			library: {
				type: 'image',
			},
			button: { text: component._options.labels.button },
			multiple: false,
		}));

		frame.on('open', () => {
			const value = component.field().get();

			if (value.length <= 0) return;

			// Select media in wordpress library
			const selection = frame.state().get('selection');
			const att = wp.media.attachment(value);

			att.fetch();
			selection.add(att ? [att] : []);
		});

		frame.on('select', () => {
			const { id, url } = frame.state().get('selection').first().toJSON();
			component.select({ value: id, src: url });
		});

		frame.open();
	}
}
