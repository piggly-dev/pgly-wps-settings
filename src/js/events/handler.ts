export default class EventHandler {
	protected events: Record<string, Array<(data: any) => void>> = {};

	public on (id: string, callback: (data: any) => void): void {
		if (!this.events[id]) this.events[id] = [];
		this.events[id].push(callback);
	}

	public remove (id: string, callback: (data: any) => void): void {
		if (!this.events[id]) return;
		this.events[id] = this.events[id].filter(cn => cn !== callback);
	}

	public removeAll (id: string): void {
		this.events[id] = [];
	}

	public emit (id: string, data: any): void {
		if (!this.events[id]) return;

		this.events[id].forEach(cn => {
			cn.call(this, data);
		});
	}
}
