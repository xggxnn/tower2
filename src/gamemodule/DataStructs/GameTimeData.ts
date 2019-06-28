export default class GameTimeData {

	private _preFrame = 0;
	private _localTime = 0;
	// 	本地，当前时间， unix时间戳 毫秒
	get localTime() {
		if (Laya.timer.currFrame != this._preFrame) {
			this._localTime = new Date().getTime();
			this._preFrame = Laya.timer.currFrame;
		}
		return this._localTime
	}
}