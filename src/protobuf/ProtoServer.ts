import EventManager from "../Tool/EventManager";
import TimerManager from "../Tool/TimerManager";
import ProtoManager from "./ProtoManager";
import EventKey from "../Tool/EventKey";
import Game from "../Game";

export default class ProtoServer {
	private static get SERVER_URL(): string {
		return "http://192.168.10.178/td2/v1/facade.php";
	}
	public static init(): void {
		EventManager.on(EventKey.ENTER_SECOND, ProtoServer, ProtoServer.update);
	}
	private static update(): void {
		ProtoServer.time++;
		if (ProtoServer.time >= 8) {
			ProtoServer.forceCall();
		}
	}
	// 请求超时时间计数器
	private static time: number = 0;
	private static calling: boolean = false;
	private static dataList: Array<Object> = [];
	public static request(data: Object): void {
		console.log("============request=========", data);
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
		wx.request(
			{
				url: ProtoServer.SERVER_URL,
				data: data,
				header: {
					"content-type": "application/text"
				},
				method: "GET",
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
					if (json.hasOwnProperty("errcode")) {
						Game.tipWin.showTip(this.errorStr(parseInt(json.errcode)), Laya.Handler.create(this, this.closeWait));
					}
					else {
						// console.log("   >>> back:", json.protoId, json);
						// // 用户数据变更
						// if (json.hasOwnProperty("userData")) {
						// 	this.parseUserData(json.userData);
						// }
						let pro = ProtoManager.getProto(json.protoId);
						console.log(json.protoId, json);
						pro.callBack(json);
					}
					ProtoServer.dataList.shift();
				}
				else {
					console.error("出错啦，订单序号有错误~~~order：", json.order);
					Game.tipWin.showTip("出错啦，订单序号有错误~~~\norder：" + json.order, Laya.Handler.create(this, this.closeWait));
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
		let str = null;
		switch (code) {
			case 4006:
				str = "金币不足";
				break;
			case 4007:
				str = "宝石不足";
				break;
			case 4008:
				str = "钻石不足";
				break;
			case 4009:
				str = "密码错误";
				break;
			case 4010:
				str = "布阵错误";
				break;
			case 4011:
				str = "已领取";
				break;
			case 4012:
				str = "无法领取";
				break;
			case 4013:
				str = "充值的金额不足，无法领取";
				break;
			case 4020:
				str = "数据出错，请联系QQ群812835839管理员";
				break;
		}
		return str;
	}
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