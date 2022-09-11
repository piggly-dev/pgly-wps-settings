import DOMManipulation from '@/behaviours/dommanipulation';
import PglyBaseComponent from './base';

export type TMultipleMediaItem = {
	value: string;
	src: string;
};

export type TMultipleMediaOptions = {
	labels: {
		title: string;
		button: string;
	};
};

export default class PglyMultipleMediaComponent extends PglyBaseComponent<Array<string>> {
	protected _images: HTMLDivElement;
	protected _options: TMultipleMediaOptions;

	constructor(el: string | HTMLDivElement) {
		super(el);

		this._images = DOMManipulation.findElement(this._wrapper, '.pgly-wps--images');
		this._options = {
			labels: {
				title: 'Select a media',
				button: 'Select',
			},
		};

		this.field().set([]);
		this._bind();
	}

	public options(options: Partial<TMultipleMediaOptions>) {
		this._options = { ...this._options, ...options };
	}

	public select(data: TMultipleMediaItem) {
		this.field().get().push(data.value);
		this._render(data);
	}

	public remove(id: string) {
		const img = document.getElementById(`${this.field().name()}-img-${id}`);

		if (!img) return;

		this._images.removeChild(img);
		this.field().set(
			this.field()
				.get()
				.filter(i => i != id)
		);
	}

	public clean() {
		this.field().set([]);

		while (this._images.firstChild) {
			this._images.removeChild(this._images.firstChild);
		}
	}

	protected _render(data: TMultipleMediaItem) {
		const wrapper = document.createElement('div');
		wrapper.id = `${this.field().name()}-img-${data.value}`;
		wrapper.className = 'pgly-wps--image';
		wrapper.style.backgroundImage = `url(${data.src})`;

		const button = document.createElement('button');
		button.className =
			'pgly-wps--icon-button pgly-wps--remove pgly-wps-is-compact pgly-wps-is-rounded pgly-wps-is-danger pgly-wps--close';
		button.dataset.value = data.value;

		wrapper.appendChild(button);
		this._images.appendChild(wrapper);
	}

	protected _bind() {
		this._wrapper.addEventListener('click', e => {
			const el = e.target as HTMLElement | null;

			if (!el) return;

			e.preventDefault();

			if (el.classList.contains('pgly-wps--remove')) {
				const { value = '' } = el.dataset;
				this.emit('remove', { component: this, value });
				return this.remove(value);
			}

			if (el.classList.contains('pgly-wps--select')) {
				return this.emit('select', { component: this });
			}

			if (el.classList.contains('pgly-wps--clean')) {
				this.emit('clean', { component: this });
				return this.clean();
			}
		});
	}

	public static wpFrame({ component }: { component: PglyMultipleMediaComponent }) {
		const frame = (wp.media.frames.metaImageFrame = wp.media({
			title: component._options.labels.title,
			library: {
				type: 'image',
			},
			button: { text: component._options.labels.button },
			multiple: true,
		}));

		frame.on('open', () => {
			component
				.field()
				.get()
				.forEach((id: string) => {
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

			while (component._images.firstChild) {
				component._images.removeChild(component._images.firstChild);
			}

			component.field().set([]);

			selected.forEach((i: Record<string, any>) => {
				component.select({ value: i.id, src: i.url });
			});
		});

		frame.open();
	}
}
