import EventManager from "./EventManager";
import SystemManager from "./SystemManager";
import TempletManager from "./TempletManager";
import EventKey from "./EventKey";

export default class LoaderManager {

	private static loadHash: Object = {};
	public static init(): void {
		// Laya.MiniAdpter.autoCacheFile = false;
		// Laya.MiniAdpter.nativefiles = [
		// 	"res_code",
		// 	"res_font"
		// ];
		// Laya.URL.basePath = "http://192.168.10.127/";
		// Laya.loader.retryDelay = 100;
		Laya.loader.retryNum = 3;
		Laya.loader.on(Laya.Event.ERROR, LoaderManager, LoaderManager.loadError);
		// Laya.MiniAdpter.enable();
	}
	private static network: boolean = true;
	public static loadError(url: string): void {
		console.log("============loadError 1 :", url);
		let _b = false;
		for (let i = 0, _length = Laya.MiniAdpter.nativefiles.length; i < _length; i++) {
			let _path = Laya.MiniAdpter.nativefiles[i];
			if (url.search(_path) == 0) {
				_b = true;
				break;
			}
		}
		this.errorHash[url] = 1;
		this.stop();
		if (_b) {
			EventManager.event(EventKey.LOADER_FAIL);
		} else {
			EventManager.event(EventKey.LOADER_ERROR);
		}
	}
	private static errorHash: Object = {};
	private static reloadNum: number = 0;
	public static reload(): void {
		this.network = true;
		let num = 0;
		this.reloadNum++;
		for (const url in this.errorHash) {
			if (this.errorHash.hasOwnProperty(url)) {
				num++;
			}
		}
		if (num >= 10 || this.reloadNum >= 3) {
			SystemManager.retryGame();
		} else {
			for (const url in this.errorHash) {
				if (this.errorHash.hasOwnProperty(url)) {
					Laya.loader.clearRes(url);
					this.addLoad(url, true);
				}
			}
		}
		this.errorHash = {};
	}
	public static stop(): void {
		this.network = false;
		Laya.loader.clearUnLoaded();
	}
	public static resetShowLoad(): void {
		this.network = true;
		this.loadHash = {};
	}
	public static addList(list: Array<string>): void {
		for (let i = 0; i < list.length; i++) {
			let url = list[i];
			this.loadHash[url] = 0;
		}
		for (let i = 0; i < list.length; i++) {
			let url = list[i];
			this.loadShow(url, false);
		}
	}
	public static addLoad(url: string, cache: boolean = false): void {
		this.loadHash[url] = 0;
		this.loadShow(url, cache);
	}
	private static loadShow(url: string, cache: boolean): void {
		let fix_arr = url.split(".");
		let fix = fix_arr.pop();
		let temp = fix_arr.pop().split("/");
		let key = temp.pop();
		if (fix == "sk") {
			if (TempletManager.hasTemplet(key)) {
				this.loadComplete(url);
			} else {
				let templet = new Laya.Templet();
				templet.on(Laya.Event.COMPLETE, this, this.loadTempletComplete, [url, key]);
				templet.loadAni(url);
			}
		} else if (fix == "fnt") {
			let bitmapFont = new Laya.BitmapFont();
			bitmapFont.loadFont(url, Laya.Handler.create(this, this.loadFNTComplete, [url, bitmapFont]));
		} else if (fix == "scene") {
			Laya.Scene.load(url, Laya.Handler.create(this, this.loadComplete, [url]));
		} else if (fix == "png" || fix == "jpg" || fix == "jpeg" || fix == "gif") {
			Laya.loader.load(url, Laya.Handler.create(this, this.loadComplete, [url]), null, Laya.Loader.IMAGE, 1, true, "", cache);
		} else if (fix == "mp3" || fix == "wav") {
			Laya.loader.load(url, Laya.Handler.create(this, this.loadComplete, [url]), null, Laya.Loader.SOUND, 1, true);
		} else {

		}
	}
	private static loadTempletComplete(url: string, key: string, templet: Laya.Templet): void {
		TempletManager.setTemplet(key, templet);
		this.loadComplete(url);
	}
	private static loadFNTComplete(url: string, bitmapFont: Laya.BitmapFont): void {
		let temp = url.split(".fnt")[0].split("/");
		let key = temp[temp.length - 1];
		Laya.Text.registerBitmapFont(key, bitmapFont);
		this.loadComplete(url);
	}
	private static loadComplete(url: string): void {
		this.loadHash[url] = 1;
		if (!this.network) return;
		let currNum = 0;
		let maxNum = 0;
		for (let _url in this.loadHash) {
			maxNum++;
			currNum += this.loadHash[_url];
		}
		if (maxNum) {
			let peogressNum = currNum / maxNum;
			EventManager.event(EventKey.LOADER_PROGRESS, [currNum, maxNum]);
			if (currNum >= maxNum) {
				this.reloadNum = 0;
				EventManager.event(EventKey.LOADER_OVER);
			}
		}
		EventManager.event(EventKey.LOADER_COMPLETE, [url]);
	}

	private static csvMap: object = {};
	private static csvNum: number = 0;
	public static loadCSV(): void {
		// let csvList: Array<string> = [];
		// let csvKV = CSV.getKV();
		// for (let key in csvKV) {
		// 	let url = "res_code/csv/" + key;
		// 	csvList.push(url);
		// }
		// Laya.loader.load(csvList, Laya.Handler.create(this, this.csvComplete), null, Laya.Loader.TEXT, 1, true);
	}
	private static csvComplete(b: boolean): void {
		// let csvKV = CSV.getKV();
		// for (let key in csvKV) {
		// 	let url = "res_code/csv/" + key;
		// 	let csv: string = Laya.Loader.getRes(url);
		// 	CSV.install(url, csv);
		// 	Laya.Loader.clearRes(url);
		// }
		// EventManager.event(LoaderManager.CSV_LOAD_OVER);
	}

}