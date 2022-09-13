export default class DOMManipulation {
	public static getElement<T = HTMLElement> (el: string | HTMLElement): T {
		if (typeof el === 'string') {
			const wrapper = document.getElementById(el);
			if (!wrapper) throw new Error(`Cannot find element id #${el} on DOM...`);
			return wrapper as unknown as T;
		}

		return el as unknown as T;
	}

	public static findElement<T = HTMLElement> (wrapper: HTMLElement, query: string): T {
		const el = wrapper.querySelector(query);
		if (!query)
			throw new Error(`Cannot find element with query ${query} on wrapper...`);
		return el as unknown as T;
	}

	public static createHiddenInput (
		parent: HTMLElement,
		name: string,
		value: string
	): HTMLInputElement {
		const input = document.createElement('input');
		input.type = 'hidden';
		input.name = name;
		input.value = value;

		parent.appendChild(input);
		return input;
	}
}
