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
	onSelect?: (comp: PglySingleMediaComponent) => void;
};

export default class PglySingleMediaComponent extends PglyBaseComponent<string> {
	protected image: HTMLImageElement;
	protected options: TSingleMediaOptions;

	constructor(el: string | HTMLDivElement, options: TSingleMediaOptions) {
		super(el);

		this.options = options;
		this.image = DOMManipulation.findElement(this._wrapper, 'img');

		this.bind();
	}

	public wpFrame() {
		const frame = (wp.media.frames.metaImageFrame = wp.media({
			title: this.options.labels.title,
			library: {
				type: 'image',
			},
			button: { text: this.options.labels.button },
			multiple: false,
		}));

		frame.on('open', () => {
			const value = this.field().get();

			if (value.length <= 0) return;

			// Select media in wordpress library
			const selection = frame.state().get('selection');
			const att = wp.media.attachment(value);

			att.fetch();
			selection.add(att ? [att] : []);
		});

		frame.on('select', () => {
			const { id, url } = frame.state().get('selection').first().toJSON();
			this.select({ value: id, src: url });
		});

		frame.open();
	}

	public select(data: TSingleMediaItem) {
		this.field().set(data.value);
		this.image.src = data.src;
	}

	public clean() {
		this.field().set('');
		this.image.src = '';
	}

	protected bind() {
		this._wrapper.addEventListener('click', e => {
			const el = e.target as HTMLElement | null;

			if (!el) return;

			if (el.classList.contains('pgly-wps--select')) {
				if (this.options.onSelect) {
					return this.options.onSelect(this);
				}

				return this.wpFrame();
			}

			if (el.classList.contains('pgly-wps--clean')) {
				return this.clean();
			}
		});
	}
}
