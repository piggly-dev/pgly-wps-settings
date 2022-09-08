export default class DOMManipulation {
	public static getElement<T = HTMLElement>(el: string | HTMLElement): T {
		if (typeof el === 'string') {
			const wrapper = document.getElementById(el);
			if (!wrapper) throw new Error(`Cannot find element id #${el} on DOM...`);
			return wrapper as T;
		}

		return el as T;
	}

	public static findElement<T = HTMLElement>(wrapper: HTMLElement, query: string): T {
		const el = wrapper.querySelector(query);
		if (!query)
			throw new Error(`Cannot find element with query ${query} on wrapper...`);
		return el as T;
	}
}
