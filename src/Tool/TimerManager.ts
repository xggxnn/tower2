import EventManager from "./EventManager";
import EventKey from "./EventKey";

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
}