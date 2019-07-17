import Proto from "./Proto";
import ProtoHash from "./ProtoHash";

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
		// let pro: Proto = ProtoManager.getProto(1000);
		// pro.send();
	}

	public addHeroClip(id: number, clips: number): void {
		let data = {
			heroId: id,
			clips: clips,
		}
		this.sendPro(data, 101);
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
	public shopBuy(data: Object): void {
		this.sendPro(data, 1017);
	}
}