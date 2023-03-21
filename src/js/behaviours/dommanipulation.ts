/**
 * Easy shortcuts for DOM manipulation.
 */
export default class DOMManipulation {
	/**
	 * Get an element by ID from the DOM.
	 *
	 * @param {string|HTMLElement} el The element to get.
	 * @returns {HTMLElement} The element.
	 * @throws {Error} If element is not found.
	 * @public
	 * @static
	 */
	public static getElement<T = HTMLElement> (el: string | HTMLElement): T {
		if (typeof el === 'string') {
			const wrapper = document.getElementById(el);
			if (!wrapper) throw new Error(`Cannot find element id #${el} on DOM...`);
			return wrapper as unknown as T;
		}

		return el as unknown as T;
	}

	/**
	 * Get an element by query selector from the DOM.
	 *
	 * @param {HTMLElement} wrapper The parent of element to be found.
	 * @param {string} query The query to find the element.
	 * @returns {HTMLElement} The element.
	 * @throws {Error} If element is not found.
	 * @public
	 * @static
	 */
	public static findElement<T = HTMLElement> (wrapper: HTMLElement, query: string): T {
		const el = wrapper.querySelector(query);
		if (!query)
			throw new Error(`Cannot find element with query ${query} on wrapper...`);
		return el as unknown as T;
	}

	/**
	 * Create an hidden input on parent.
	 *
	 * @param {HTMLElement} parent The parent of element to be found.
	 * @param {string} name The name of the input.
	 * @param {string} value The value of the input.
	 * @returns {HTMLInputElement} The input created.
	 * @public
	 * @static
	 */
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
