export default class EventManager extends Laya.EventDispatcher {

	private static _instance: EventManager = null;
	public static getInstance(): EventManager {
		if (this._instance == null) {
			this._instance = new EventManager();
		}
		return this._instance;
	}

	public static on(type: string, caller: any, listener: Function, args?: Array<any>): void {
		this.getInstance().on(type, caller, listener, args);
	}
	public static once(type: string, caller: any, listener: Function, args?: Array<any>): void {
		this.getInstance().once(type, caller, listener, args);
	}
	public static event(type: string, data?: any): void {
		this.getInstance().event(type, data);
	}
	public static off(type: string, caller: any, listener: Function, onceOnly?: boolean): void {
		this.getInstance().off(type, caller, listener, onceOnly);
	}
	public static offAll(type?: string): void {
		this.getInstance().offAll(type);
	}
	public static offAllCaller(caller: any): void {
		this.getInstance().offAllCaller(caller);
	}

}