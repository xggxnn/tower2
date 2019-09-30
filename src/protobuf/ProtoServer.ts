import EventManager from "../tool/EventManager";
import TimerManager from "../tool/TimerManager";
import ProtoManager from "./ProtoManager";
import EventKey from "../tool/EventKey";
import Game from "../Game";

export default class ProtoServer {

	private static get LOG_SERVER_URL(): string {
		return "https://log.yz063.com/log/tf2/client/upload";
	}
	public static logPost(data: Object): void {
		wx.request(
			{
				url: ProtoServer.LOG_SERVER_URL,
				data: data,
				header: {
					"content-type": "application/text"
				},
				method: "POST",
				dataType: "text",
				responseType: "text",
				success: null,
				fail: null,
				complete: null
			}
		);
	}



	private static get SERVER_URL(): string {
		// 线上版本
		// return "https://td2.yz063.com/td2/v1/facade.php";
		// return "https://td2.yz063.com/td2/v2/facade.php";
		return "https://td2.yz063.com/td2/v3/facade.php";
		// 本地测试
		// return "http://192.168.10.178/td2/v1/facade.php";
		// return "http://192.168.10.178/td2/v2/facade.php";
	}
	public static init(): void {
		EventManager.on(EventKey.ENTER_SECOND, ProtoServer, ProtoServer.update);
	}
	private static update(): void {
		ProtoServer.time++;
		if (ProtoServer.time >= 800) {
			ProtoServer.forceCall();
		}
	}
	// 请求超时时间计数器
	private static time: number = 0;
	private static calling: boolean = false;
	private static dataList: Array<Object> = [];
	public static request(data: Object): void {
		if (Game.showLog) {
			console.log("				======request start=========");
			console.log(data);
			console.log("				======= end	=========");
		}
		this.dataList.push(data);
		this.callServer();
	}
	private static forceCall(): void {
		ProtoServer.time = 0;
		this.calling = false;
		this.callServer();
	}
	private static callServer(): void {
		if (this.calling) return;
		if (this.dataList.length == 0) return;
		EventManager.event(EventKey.SHOW_WAIT);
		this.calling = true;
		ProtoServer.time = 0;

		let data = this.dataList[0];
		data["order"] = this.nextOrder;
		data["ts"] = new Date().getTime();
		data["version"] = "v1.1.13";
		wx.request(
			{
				url: ProtoServer.SERVER_URL,
				data: data,
				header: {
					"content-type": "application/text"
				},
				method: "POST",
				dataType: "text",
				responseType: "text",
				success: function (res) {
					ProtoServer.callback(res.data);
				},
				fail: null,
				complete: null
			}
		);
	}
	private static callback(data: string): void {
		try {
			let json = JSON.parse(data);
			if (json.hasOwnProperty("order")) {
				if (this.nextOrder == Number(json.order)) {
					this.currentOrder = Number(json.order);
					//处理返回服务器时间
					if (json.hasOwnProperty("sysTime")) {
						TimerManager.timestamp = json.sysTime;
					}
					if (json.hasOwnProperty("errCode")) {
						Game.tipWin.showTip(this.errorStr(parseInt(json.errCode)), false, Laya.Handler.create(this, this.closeWait));
					}
					else {
						if (Game.showLog) {
							console.log("   >>> back:", json.protoId, json);
						}
						// // 用户数据变更
						// if (json.hasOwnProperty("userData")) {
						// 	this.parseUserData(json.userData);
						// }
						let pro = ProtoManager.getProto(json.protoId);
						// console.log("<<<<<<<<<<<-------------back-----------", json.protoId);
						// console.log(json);
						// console.log("<<<<<<<<<<<-------------back-----------");
						pro.callBack(json);
					}
					ProtoServer.dataList.shift();
				}
				else {
					console.error("出错啦，订单序号有错误~~~order：", json.order);
					Game.tipWin.showTip("出错啦，订单序号有错误~~~\norder：" + json.order, false, Laya.Handler.create(this, this.closeWait));
					return;
				}
			}
			this.closeWait();
		} catch (error) {
			// 服务器代码异常
			console.error("服务器出错,data:", data);
			console.error("服务器出错,error:", error);
			return;
		}
		ProtoServer.calling = false;
		ProtoServer.callServer();
	}
	private static closeWait(): void {
		EventManager.event(EventKey.CLOSE_WAIT);
	}
	// 错误码处理
	private static errorStr(code: number): string {
		let str = "错误码：" + code;
		switch (code) {
			case this.ERR_LOGIN:
				str = "登录请求微信服务器错误";
				break;
			case this.ERR_NO_REQ_PARAMS:
				str = "入参不完整";
				break;
			case this.ERR_PSW:
				str = "PSW错误";
				break;
			case this.ERR_NO_GOLD:
				str = "金币不够";
				break;
			case this.ERR_NO_JADEITE:
				str = "翡翠不够";
				break;
			case this.ERR_NO_:
				str = "11";
				break;
			case this.ERR_BEYOND_MAX_USER_LEVEL:
				str = "超过了用户最大的等级";
				break;
			case this.ERR_LESS_THAN__USER_LEVEL_10:
				str = "用户等级<10";
				break;
			case this.ERR_NO_HERO_CLIP:
				str = "没有该英雄碎片";
				break;
			case this.ERR_UPGRADE_STAR:
				str = "升星错误";
				break;
			case this.ERR_HERO_CALLED:
				str = "碎片不够，重复召唤";
				break;
			case this.ERR_PASS:
				str = "通关错误";
				break;
			case this.ERR_LESS_THAN_MINIMUM_TIME:
				str = "小于最小时间";
				break;
			case this.ERR_SEAT:
				str = "seat";
				break;
			case this.ERR_SHOP_CLIPS_NUM:
				str = "商城购买英雄碎片》10";
				break;
			case this.ERR_NO_DIAMOND:
				str = "钻石不够";
				break;
			case this.ERR_NO_ID:
				str = "ID不存在";
				break;
			case this.ERR_MORE_THAN_LOTTERY_MAX:
				str = "抽卡超过最大次数";
				break;
			case this.ERR_MORE_THAN_BUY_CARD_MAX:
				str = "卡包超过最大次数";
				break;
			case this.ERR_NO_BUY_HERO_CLIPS:
				str = "卡包超过最大次数";
				break;
			case this.ERR_EXPLORE:
				str = "领取探索物品失败";
				break;
			case this.ERR_DUPLICATION_ID:
				str = "该id已存在";
				break;
			case this.ERR_DUPLICATION_SIGN_IN:
				str = "该id已存在";
				break;
			case this.ERR_NO_MAGIC:
				str = "魔尘没有";
				break;
		}
		return str;
	}
	private static ERR_LOGIN = 4000; //登录请求微信服务器错误
	private static ERR_NO_REQ_PARAMS = 5000; //入参不完整
	private static ERR_PSW = 5001; //PSW错误
	private static ERR_NO_GOLD = 5002; //金币不够
	private static ERR_NO_JADEITE = 5003; //翡翠不够
	private static ERR_NO_ = 5004; //11
	private static ERR_BEYOND_MAX_USER_LEVEL = 5008;//超过了用户最大的等级
	private static ERR_LESS_THAN__USER_LEVEL_10 = 5009;//用户等级<10
	private static ERR_NO_HERO_CLIP = 5010;//没有该英雄碎片
	private static ERR_UPGRADE_STAR = 5011;//升星错误
	private static ERR_HERO_CALLED = 5012;  //碎片不够，重复召唤
	private static ERR_PASS = 5013;  //通关错误
	private static ERR_LESS_THAN_MINIMUM_TIME = 5014;  //小于最小时间
	private static ERR_SEAT = 5015;  // seat
	private static ERR_SHOP_CLIPS_NUM = 5016;  // 商城购买英雄碎片》10；
	private static ERR_NO_DIAMOND = 5017;  // 钻石不够；
	private static ERR_NO_ID = 5018;  // ID不存在；
	private static ERR_MORE_THAN_LOTTERY_MAX = 5019;  // 抽卡超过最大次数；
	private static ERR_MORE_THAN_BUY_CARD_MAX = 5020;  // 卡包超过最大次数；
	private static ERR_NO_BUY_HERO_CLIPS = 5021;  // 卡包超过最大次数；
	private static ERR_EXPLORE = 5022;  // 领取探索物品失败；
	private static ERR_DUPLICATION_ID = 5023;  //该id已存在
	private static ERR_DUPLICATION_SIGN_IN = 5024;  //该id已存在
	private static ERR_NO_MAGIC = 5024;  //魔尘没有
	/**
     * 下一个订单序号
     */
	private static _order: number = 0;
	public static set currentOrder(v: number) {
		this._order = v;
	}
	public static get nextOrder(): number {
		return this._order + 1;
	}
}