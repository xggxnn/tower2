import EventManager from "./EventManager";

export default class TempletManager {

	public static get TEMPLET_INIT_COMPLETE(): string {
		return "TEMPLET_INIT_COMPLETE";
	}

	private static _hash: Object = {};

	public static setTemplet(key: string, templet: Laya.Templet): void {
		if (this._hash.hasOwnProperty(key)) {
			templet.destroy();
		} else {
			this._hash[key] = templet;
		}
		EventManager.event(this.TEMPLET_INIT_COMPLETE, [key, templet]);
	}

	public static getTemplet(name: string): Laya.Templet {
		return this._hash[name];
	}

	public static hasTemplet(name: string): boolean {
		return this._hash.hasOwnProperty(name);
	}

	public static gc(_list: Array<string>): void {
		let length = _list.length;
		if (length == 0) return;
		let _obj: Object = {};
		for (let i = 0; i < length; i++) {
			let url = _list[i];
			let fix_arr = url.split(".");
			let fix = fix_arr.pop();
			if (fix == "sk") {
				let temp = fix_arr[0].split("/");
				let key = temp[temp.length - 1];
				_obj[key] = 1;
			}
		}
	}

	public static destroyTemplet(name: string): void {
		let templet = this._hash[name];
		if (templet) {
			templet.lock = false;
			templet.getTexture("_").bitmap.lock = false;
			delete this._hash[name];
		}
	}

}