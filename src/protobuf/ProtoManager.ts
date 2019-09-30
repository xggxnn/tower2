import Proto from "./Proto";
import ProtoHash from "./ProtoHash";
import Game from "../Game";
import ProtoServer from "./ProtoServer";

export default class ProtoManager {

	public static getProto(protoid: any): Proto {
		protoid = String(protoid);
		return ProtoHash.protoHash[protoid];
	}

	private sendPro(data: Object, id: number): void {
		let pro: Proto = ProtoManager.getProto(id);
		pro.send(data);
	}

	/**
	 * 获取配置表信息
	 */
	public reqConfig(): void {
		let pro: Proto = ProtoManager.getProto(1000);
		pro.send();
	}

	public addHeroClip(id: number, clips: number): void {
		let data = {
			heroId: id,
			clips: clips,
		}
		this.sendPro(data, 101);
	}
	public clearData(): void {
		let data = {
			uid: Game.userData.playerid,
		}
		this.sendPro(data, 102);
	}

	/**
	 * 登录
	 */
	public login(data: Object = {}): void {
		this.sendPro(data, 1001);
	}
	/**
     * 玩家完成新手引导后调用(一个账号只会调用一次)
     */
	public initPlay(): void {
		this.sendPro({}, 1002);
	}
	/**
     * 获取关卡数据
     * @param data 
     */
	public waveInfo(data: Object): void {
		this.sendPro(data, 1003);
	}
	/**
     * 选择关卡
     * @param data 
     */
	public selectWave(data: Object): void {
		this.sendPro(data, 1004);
	}
	/**
     * 获取布阵
     * @param data 
     */
	public getSeat(data: Object): void {
		this.sendPro(data, 1005);
	}
	/**
     * 设置布阵
     * @param data 
     */
	public setSeat(data: Object): void {
		this.sendPro(data, 1006);
	}
	/**
     * 战斗结果奖励
     * @param data 
     */
	public passWave(data: Object): void {
		this.sendPro(data, 1007);
	}
	/**
     * 升级
     * @param data 
     */
	public upLevel(data: Object): void {
		this.sendPro(data, 1008);
	}
	/**
     * 升星
     * @param data 
     */
	public upStar(data: Object): void {
		this.sendPro(data, 1009);
	}
	/**
     * 召唤，获得英雄
     * @param data 
     */
	public synthetise(data: Object): void {
		this.sendPro(data, 1010);
	}
	/**
     * 悬赏
     * @param data 
     */
	public offerReward(data: Object): void {
		this.sendPro(data, 1011);
	}
	/**
	 * 领取征服奖励
	 */
	public conquestReward(): void {
		this.sendPro({}, 1012);
	}
	/**
	 * 获取背包卡包数据
	 */
	public bagGift(): void {
		this.sendPro({}, 1013);
	}
	/**
	 * 商城获取
	 * @param data 
	 */
	public shopGain(): void {
		this.sendPro({}, 1016);
	}
	/**
	 * 商城购买
	 * @param data 
	 */
	public shopBuy(data: Object): void {
		this.sendPro(data, 1017);
	}
	/**
	 * 打开卡包
	 * @param data 
	 */
	public openCard(data: Object): void {
		this.sendPro(data, 1018);
	}
	/**
	 * 收集碎片
	 * @param data 
	 */
	public collectDebris(data: Object): void {
		this.sendPro(data, 1019);
	}
	/**
	 * 领取国王之路奖励
	 * @param data 
	 */
	public king(data: Object): void {
		this.sendPro(data, 1020);
	}
	/**
	 * 签到
	 */
	public sign(): void {
		this.sendPro({}, 1021);
	}
	/**
	 * 引导序号
	 */
	public guide(data: Object): void {
		this.sendPro(data, 1027);
	}
	/**
	 * 提升品质
	 */
	public upQuality(data: Object): void {
		this.sendPro(data, 1028);
	}
	/**
	 * 洗属性
	 */
	public resetAttribute(data: Object): void {
		this.sendPro(data, 1029);
	}
	/**
	 * 保存洗好的属性
	 */
	public saveAttribute(data: Object): void {
		this.sendPro(data, 1030);
	}
	/**
	 * 解锁的羁绊领取奖励
	 * @param data 
	 */
	public fetterReward(data: Object): void {
		this.sendPro(data, 1031);
	}
	/**
	 * 解锁羁绊
	 * @param data 
	 */
	public fetterUnlock(data: Object): void {
		this.sendPro(data, 1032);
	}
	/**
	 * 获取每日挑战数据
	 * @param data 
	 */
	public dayFightData(): void {
		this.sendPro({}, 1033);
	}
	/**
	 * 发起挑战
	 * @param data 
	 */
	public dayFightStart(data: Object): void {
		this.sendPro(data, 1034);
	}
	/**
	 * 领取挑战奖励
	 * @param data 
	 */
	public dayFightReward(data: Object): void {
		this.sendPro(data, 1035);
	}




	private temOpenIds: string = null;
	private randString(length: number = 16): string {
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var maxPos = chars.length;
		var str = '';
		for (let i = 0; i < length; i++) {
			str += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return str + new Date().getTime();
	}
	// 发送日志服务器信息
	public logUpload(data: Object): void {
		if (this.temOpenIds == null) {
			if (Laya.LocalStorage.getItem("temopenId_Init") !== null) {
				let val = Laya.LocalStorage.getItem("temopenId_Init");
				if (val === undefined || val === null || val === "") {
					val = this.randString();
				}
				this.temOpenIds = val;
			}
			else {
				this.temOpenIds = this.randString();
			}
			Laya.LocalStorage.setItem("temopenId_Init", this.temOpenIds);
		}
		let openids = "";
		if (Game.userData && Game.userData.openid) {
			openids = Game.userData.openid
		}
		let sendData = {
			openId: openids,
			temOpenIds: this.temOpenIds,
			data: data,
		}
		ProtoServer.logPost(sendData);
	}
}