export default class DOMManipulation {
    static getElement<T = HTMLElement>(el: string | HTMLElement): T;
    static findElement<T = HTMLElement>(wrapper: HTMLElement, query: string): T;
    static createHiddenInput(parent: HTMLElement, name: string, value: string): HTMLInputElement;
}
