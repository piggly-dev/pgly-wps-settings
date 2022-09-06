export type TSingleMediaItem = {
	value: string;
	src: string;
};

export type TSingleMediaOptions = {
	title: string;
	button: string;
	onSelect?: (comp: PglySingleMediaComponent) => void;
};

export default class PglySingleMediaComponent {
	protected wrapper: HTMLDivElement;
	protected input: HTMLInputElement;
	protected image: HTMLImageElement;
	protected options: TSingleMediaOptions;

	constructor(id: string, options: TSingleMediaOptions) {
		this.wrapper = document.getElementById(id) as HTMLDivElement;

		if (!this.wrapper) {
			throw Error(
				`PglySingleMediaComponent -> Cannot find element #${id} on DOM.`
			);
		}

		this.input = this.wrapper.querySelector('input') as HTMLInputElement;
		this.image = this.wrapper.querySelector('img') as HTMLImageElement;
		this.options = options;

		this.bind();
	}

	public wpFrame() {
		const frame = (wp.media.frames.metaImageFrame = wp.media({
			title: this.options.title,
			library: {
				type: 'image',
			},
			button: { text: this.options.button },
			multiple: false,
		}));

		frame.on('open', () => {
			const value = this.input.value;

			if (value.length <= 0) return;

			// Select media in wordpress library
			const selection = frame.state().get('selection');
			const att = wp.media.attachment(value);

			att.fetch();
			selection.add(att ? [att] : []);
		});

		frame.on('select', () => {
			const { id, url } = frame
				.state()
				.get('selection')
				.first()
				.toJSON();

			this.select({ value: id, src: url });
		});

		frame.open();
	}

	public select(data: TSingleMediaItem) {
		this.input.value = data.value;
		this.image.src = data.src;
	}

	public clean() {
		this.input.value = '';
		this.image.src = '';
	}

	protected bind() {
		this.wrapper.addEventListener('click', e => {
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
