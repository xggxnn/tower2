import EventManager from "./EventManager";
import EventKey from "./EventKey";
import Dictionary from "./Dictionary";
import TypedSignal from "./TypedSignal";

export default class TimerManager {

	private static get DAY_SECOND(): number {
		return 86400;
	}
	private static get TIME_OFFSET(): number {
		return 28800;
	}


	public static init(): void {
		Laya.timer.loop(1000, this, this.secondTimer);
		Laya.timer.frameLoop(1, this, this.frameLoop);
	}

	private static _second: number = 0;
	private static secondTimer(): void {
		if (this.nextSecondTimer) {
			this.nextSecondTimer = false;
			EventManager.event(EventKey.DATA_REQUEST);
		}
		this._second++;
		EventManager.event(EventKey.ENTER_SECOND);
		// 计数器
		let keyList = this.timeUpdateDic.getKeys();
		let keyLeng = keyList.length;
		if (keyLeng > 0) {
			for (let i = 0; i < keyLeng; i++) {
				let item = this.timeUpdateDic.getValue(keyList[i]);
				item--;
				if (item > 0) {
					this.timeUpdateDic.set(keyList[i], item);
				} else {
					this.removeTimeUpdate(keyList[i]);
				}
			}
		}
		this.sUpdateDownCd.dispatch(this.timeUpdateDic);
		if (this._second % 60 == 0) {
			EventManager.event(EventKey.ENTER_MINUTE);
		}
		this._timestamp++;
		if ((this._timestamp + this.TIME_OFFSET) % this.DAY_SECOND == 0) {
			this.nextSecondTimer = true;
		}
	}
	// 下一秒触发
	private static nextSecondTimer: boolean = false;
	private static frameLoop(): void {
		EventManager.event(EventKey.ENTER_FRAME);
	}
	private static _timestamp: number;
	public static set timestamp(v: number) {
		this._timestamp = v;
	}
	public static get timestamp(): number {
		return this._timestamp;
	}

	// 更新倒计时
	public static sUpdateDownCd: TypedSignal<Dictionary<string, number>> = new TypedSignal<Dictionary<string, number>>();
	private static timeUpdateDic: Dictionary<string, number> = new Dictionary<string, number>();
	// 设置倒计时序列
	public static setTimeUpdate(key: string, num: number): void {
		this.timeUpdateDic.set(key, num);
	}
	// 返回倒计时结果
	public static getTimeUpdate(key: string): number {
		let result = 0;
		if (this.timeUpdateDic.hasKey(key)) {
			result = this.timeUpdateDic.getValue(key);
			if (result <= 0) {
				this.removeTimeUpdate(key);
			}
		}
		return result;
	}
	public static removeTimeUpdate(key: string): void {
		this.timeUpdateDic.remove(key);
	}
}