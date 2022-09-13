export default class EventHandler {
    protected events: Record<string, Array<(data: any) => void>>;
    on(id: string, callback: (data: any) => void): void;
    remove(id: string, callback: (data: any) => void): void;
    removeAll(id: string): void;
    emit(id: string, data: any): void;
}
