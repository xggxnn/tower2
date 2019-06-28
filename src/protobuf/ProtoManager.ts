import Proto from "./Proto";
import ProtoHash from "./ProtoHash";

export default class ProtoManager {

	public static getProto(protoid: any): Proto {
		protoid = String(protoid);
		return ProtoHash.protoHash[protoid];
	}

	public reqConfig(): void {
		let pro: Proto = ProtoManager.getProto(1000);
		pro.send();
	}

	/**
	 * 登录
	 * @param data 登录的实例类proto
	 * @param encode 发送到服务器是的数据编码方法
	 * @param decode 收到服务器数据的解码方法
	 * @example 
	 * let encode: Function = Loginpackage.LoginReq.encode;
	 * let decode: Function = Loginpackage.LoginResp.decode;
	 */
	public login(data: Object = {}): void {
		let pro: Proto = ProtoManager.getProto(1001);
		pro.send(data);
	}
}