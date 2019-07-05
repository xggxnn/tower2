export default class ProtoEvent {

	public static getProtoEvent(protoid: any): string {
		return "PROTO_CALL_BACK_" + protoid;
	}

	public static get LOGIN_CALL_BACK(): string {
		return this.getProtoEvent(1001);
	}
	public static get WAVEINFO_CALL_BACK(): string {
		return this.getProtoEvent(1003);
	}

}