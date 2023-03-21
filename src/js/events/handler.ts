/**
 * Event handler class.
 * Allow a component to listen to events.
 */
export default class EventHandler {
	/**
	 * Events list.
	 *
	 * @type {Record<string, Array<(data: any) => void>>}
	 * @protected
	 */
	protected events: Record<string, Array<(data: any) => void>> = {};


	/**
	 * Add a new event listener.
	 *
	 * @param {string} id Event ID.
	 * @param {(data: any) => void} callback Callback function.
	 * @returns {void}
	 * @memberof EventHandler
	 * @public
	 */
	public on (id: string, callback: (data: any) => void): void {
		if (!this.events[id]) this.events[id] = [];
		this.events[id].push(callback);
	}

	/**
	 * Remove an event listener.
	 *
	 * @param {string} id Event ID.
	 * @param {(data: any) => void} callback Callback function to remove.
	 * @returns {void}
	 * @memberof EventHandler
	 * @public
	 */
	public remove (id: string, callback: (data: any) => void): void {
		if (!this.events[id]) return;
		this.events[id] = this.events[id].filter(cn => cn !== callback);
	}

	/**
	 * Remove all event listeners on event.
	 *
	 * @param {string} id Event ID.
	 * @returns {void}
	 * @memberof EventHandler
	 * @public
	 */
	public removeAll (id: string): void {
		this.events[id] = [];
	}

	/**
	 * Emit an event. All listeners will be triggered.
	 *
	 * @param {string} id Event ID.
	 * @param {any} data Event Data.
	 * @returns {void}
	 * @memberof EventHandler
	 * @public
	 */
	public emit (id: string, data: any): void {
		if (!this.events[id]) return;

		this.events[id].forEach(cn => {
			cn.call(this, data);
		});
	}
}
