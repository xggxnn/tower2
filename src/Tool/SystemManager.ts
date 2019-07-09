import Fun from "../Tool/Fun";
import EventManager from "../Tool/EventManager";
import Game from "../Game";
import LoaderManager from "./LoaderManager";

export default class SystemManager {

	public static get VERSION_UPDATE(): string {
		return "VERSION_UPDATE";
	}
	public static get ON_HIDE(): string {
		return "ON_HIDE";
	}
	public static get ON_SHOW(): string {
		return "ON_SHOW";
	}

	private static info = null;

	public static initAllData(): void {
		Game.waveData.init();
	}

	public static init(): void {
		if (!Game.isMobile) return;
		this.info = wx.getSystemInfoSync();
		let _sdkv = this.info.SDKVersion;
		let _arr: Array<string> = _sdkv.split(".");
		let _v: number = 0;
		if (_arr.length == 3) {
			_v += parseInt(_arr[0]) * 10000;
			_v += parseInt(_arr[1]) * 100;
			_v += parseInt(_arr[2]);
		}
		this._verson = _v;
		this._platform = this.info.platform;
		this._screenWidth = this.info.screenWidth;
		this._screenHeight = this.info.screenHeight;
		this.launchReady();
		this.updateReady();
		this.sceneRefresh();
	}
	public static login(): void {
		wx.login({
			success: function (result) {
				let data = {
					code: "11004",//result.code,
				}
				if (Game.userData.inviter) {
					data["inviter"] = Game.userData.inviter;
				}
				Game.proto.login(data);
			},
			fail: null,
			complete: null,
			pkgName: "",
		});
	}
	// 
	private static launchReady(): void {
		let _launchInfo = wx["getLaunchOptionsSync"]();
		if (_launchInfo.query && _launchInfo.query.hasOwnProperty("id")) {
			Game.userData.inviter = _launchInfo.query.id;
		}
		if (_launchInfo.query && _launchInfo.query.hasOwnProperty("channel")) {
			SystemManager._channel = _launchInfo.query.channel;
		}
		if (_launchInfo.hasOwnProperty("referrerInfo")) {
			SystemManager._channelAPPID = _launchInfo.referrerInfo.appId;
		}
	}

	public static backList(list: Object): void {
		if (Fun.checkNullObj(list)) return;
		for (const id in list) {
			if (list.hasOwnProperty(id) && SystemManager.orderHash.hasOwnProperty(id)) {
				SystemManager.orderHash[id].state = 1;
			}
		}
		// EventManager.event(ServerManager.PAY_BACK);
	}

	private static orderHash: Object = {};

	//监听游戏客户端是否有加载完最新版的内容，更新完成后提示重启游戏
	private static updateReady(): void {
		wx["getUpdateManager"]().onCheckForUpdate(function (res) {
			if (res.hasUpdate) {
				EventManager.event(SystemManager.VERSION_UPDATE);
				wx["getUpdateManager"]().onUpdateReady(function () {
					SystemManager.showModal({
						title: "",
						content: "游戏有新的版本发布，请切换到新版本，体验最新游戏玩法！",
						showCancel: false,
						cancelText: "",
						cancelColor: "#000000",
						confirmText: "进入新版",
						confirmColor: "#000000",
						success: function (res) {
							if (res.confirm) {
								SystemManager.deleteAllRes();
								wx["getUpdateManager"]().applyUpdate();
							}
						},
						fail: null,
						complete: null,
					});
				});
				wx["getUpdateManager"]().onUpdateFailed(function () {
					SystemManager.showModal({
						title: "",
						content: "游戏有新的版本发布，请重新打开游戏，体验最新游戏玩法！",
						showCancel: false,
						cancelText: "",
						cancelColor: "#000000",
						confirmText: "重开游戏",
						confirmColor: "#000000",
						success: function (res) {
							if (res.confirm) {
								SystemManager.exitGame();
							}
						},
						fail: null,
						complete: null,
					});
				});
			}
		});
	}

	public static sceneRefresh(): void {
		//保持屏幕常亮
		wx.setKeepScreenOn({
			keepScreenOn: true,
			success: null,
			fail: null,
			complete: null,
		});
		wx["onHide"](this.onHide);
		wx["onShow"](this.onShow);
	}

	//音频控制
	public static setAudioOption(b: boolean): void {
		if (this.canInner) {
			wx["setInnerAudioOption"]({
				mixWithOther: b,
				obeyMuteSwitch: true,
			});
		}
	}

	public static showModal(_obj: _showModalObject): void {
		wx.showModal(_obj);
	}

	public static exitGame(): void {
		if (window.hasOwnProperty("wx")) {
			window["wx"].exitMiniProgram({});
		}
	}

	public static deleteAllRes(): void {
		// Laya.MiniFileMgr.deleteAll();
		laya.wx.mini.MiniAdpter.removeAll();
	}

	public static retryGame(): void {
		this.deleteAllRes();
		this.exitGame();
	}

	public static customerService(): void {
		wx["openCustomerServiceConversation"]({
			showMessageCard: true,
		});
	}

	private static _verson: number = 0;
    /**
     * 设备是否支持播放视频广告（含Banner广告和激励广告）
     */
	public static get canPlayAd(): boolean {
		return this._verson >= 20006;
	}

	public static get canInner(): boolean {
		return this._verson >= 20300;
	}

	private static _platform: string = "";

	// public static get offlineUnlock(): boolean {
	// 	if (MapData.currentLevel < 28) return false;
	// 	if (this.isAndroid) return true;
	// 	if (TotalData.vipUnlocked(1)) return true;
	// 	return false;
	// }
	// public static get signUnlock(): boolean {
	// 	return MapData.currentLevel >= 9;
	// }
	// public static get freeUnlock(): boolean {
	// 	return MapData.currentLevel >= 8;
	// }
	// public static get totalUnlock(): boolean {
	// 	if (TotalData.vipUnlocked(1)) return true;
	// 	if (this.isIOS) return false;
	// 	let maxLevel = MapData.currentLevel;
	// 	return maxLevel > 10;
	// }
	// public static get taskUnlock(): boolean {
	// 	return MapData.currentLevel >= 10;
	// }
	// public static get activeUnlock(): boolean {
	// 	return MapData.mapCompleted(1) || TotalData.vipUnlocked(1);
	// }

	public static get isAndroid(): boolean {
		return this._platform == "android";
	}

	public static get isIOS(): boolean {
		return this._platform != "android";
	}

	public static get screenWidth(): number {
		return this._screenWidth;
	}
	public static _screenWidth: number;
	public static get screenHeight(): number {
		return this._screenHeight;
	}
	public static _screenHeight: number;

	public static pay(cost: number = 6): void {
		if (SystemManager.isAndroid) {
			this.wxPay(cost);
		} else {
			// EventManager.event(ConstEvent.LOAD_DIALOG_BAG);
		}
	}
	private static buyList: Array<number> = [1, 3, 6, 8, 12, 18, 25, 30, 40, 45, 50, 60, 68, 73, 78, 88, 98, 108, 118, 128, 148, 168, 188, 198, 328, 648];
	private static wxPay(cost: number = 6): void {
		if (cost > this.buyList[this.buyList.length - 1]) {
			cost = this.buyList[this.buyList.length - 1];
		}
		else {
			for (let i = 0; i < this.buyList.length; i++) {
				if (cost <= this.buyList[i]) {
					cost = this.buyList[i];
					break;
				}
			}
		}
		// EventManager.event(ConstEvent.SHOW_WAIT);
		wx["requestMidasPayment"]({
			mode: "game",
			env: 0,
			offerId: "1450018359",
			currencyType: "CNY",
			platform: "android",
			buyQuantity: cost * 10,
			zoneId: "1",
			success: function () {
				// ProtoManager.pay()
			},
			fail: function () {
				// EventManager.event(ConstEvent.CLOSE_WAIT);
			},
		})
	}
	public static onHide(): void {
		EventManager.event(SystemManager.ON_HIDE);
		// BJManager.BJexposure();
	}
	public static onShow(res): void {
		console.log("onShow:", res);
		EventManager.event(SystemManager.ON_SHOW);
	}

	private static _channel: string = "";
	public static get channel(): string {
		return this._channel;
	}


	private static _channelAPPID: string = "";
	public static get channelAPPID(): string {
		return this._channelAPPID;
	}


	public static loadError(): void {
		Game.tipWin.showTip("网络情况不佳！点击确认按钮尝试重新加载。", Laya.Handler.create(LoaderManager, LoaderManager.reload));
	}
	public static loadFail(): void {
		Game.tipWin.showTip("网络情况不佳！请点击确认按钮，调整手机网络通畅以后重开打开游戏。", Laya.Handler.create(SystemManager, SystemManager.retryGame));
	}

	private static _linkUnlock: boolean = false;
	public static get linkUnlock(): boolean {
		return this._linkUnlock;
	}
	public static set linkUnlock(v: boolean) {
		this._linkUnlock = v;
	}

	private static _shareUnlock: boolean = false;
	public static get shareUnlock(): boolean {
		return this._shareUnlock;
	}
	public static set shareUnlock(v: boolean) {
		this._shareUnlock = v;
	}

}