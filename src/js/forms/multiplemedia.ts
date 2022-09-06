export type TMultipleMediaItem = {
	value: string;
	src: string;
};

export type TMultipleMediaOptions = {
	name: string;
	title: string;
	button: string;
	onSelect?: (comp: PglyMultipleMediaComponent) => void;
};

export default class PglyMultipleMediaComponent {
	protected wrapper: HTMLDivElement;
	protected input: HTMLInputElement;
	protected images: HTMLDivElement;
	protected options: TMultipleMediaOptions;

	protected selection: Array<string> = [];

	constructor(id: string, options: TMultipleMediaOptions) {
		this.wrapper = document.getElementById(id) as HTMLDivElement;

		if (!this.wrapper) {
			throw Error(
				`PglyMultipleMediaComponent -> Cannot find element #${id} on DOM.`
			);
		}

		this.input = this.wrapper.querySelector('input') as HTMLInputElement;
		this.images = this.wrapper.querySelector(
			'pgly-wps--images'
		) as HTMLDivElement;
		this.options = options;

		if (this.input.value.length > 0) {
			this.selection = this.input.value.split(',');
		}

		this.bind();
	}

	public wpFrame() {
		const frame = (wp.media.frames.metaImageFrame = wp.media({
			title: this.options.title,
			library: {
				type: 'image',
			},
			button: { text: this.options.button },
			multiple: true,
		}));

		frame.on('open', () => {
			this.selection.forEach((id: string) => {
				// Select media in wordpress library
				const selection = frame.state().get('selection');
				const att = wp.media.attachment(id);

				att.fetch();
				selection.add(att ? [att] : []);
			});
		});

		frame.on('select', () => {
			// multiple selection
			const selected = frame
				.state()
				.get('selection')
				.map((i: any) => {
					return i.toJSON();
				});

			while (this.images.firstChild) {
				this.images.removeChild(this.images.firstChild);
			}

			this.selection = [];

			selected.forEach((i: Record<string, any>) => {
				this.select({ value: i.id, src: i.url });
				this.selection.push(i.id);
			});

			this.input.value = this.selection.join(',');
		});

		frame.open();
	}

	public select(data: TMultipleMediaItem) {
		const frag = document.createRange()
			.createContextualFragment(`<div id="${this.options.name}-img-${data.value}" class="pgly-wps--image" style="background-image: url(${data.src})">
				<button data-id="${data.value}" class="pgly-wps--icon-button pgly-wps--remove pgly-wps-is-compact pgly-wps-is-rounded pgly-wps-is-danger">
					<svg height="512px" style="enable-background:new 0 0 512 512;" version="1.1"
						viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink">
						<path fill="#ea1f26"
							d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
					</svg>
				</button>
			</div>`);

		this.images.appendChild(frag);
	}

	public remove(id: string) {
		const img = document.getElementById(`${this.options.name}-img-${id}`);

		if (!img) return;

		this.images.removeChild(img);
		this.selection = this.selection.filter(i => i !== id);
	}

	public clean() {
		this.input.value = '';

		while (this.images.firstChild) {
			this.images.removeChild(this.images.firstChild);
		}

		this.selection = [];
	}

	protected bind() {
		this.wrapper.addEventListener('click', e => {
			const el = e.target as HTMLElement | null;

			if (!el) return;

			if (el.classList.contains('pgly-wps--remove')) {
				const { id = '' } = el.dataset;
				return this.remove(id);
			}

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
