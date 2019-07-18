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
	public static get SELECTWAVE_CALL_BACK(): string {
		return this.getProtoEvent(1004);
	}
	public static get SETSEAT_CALL_BACK(): string {
		return this.getProtoEvent(1006);
	}
	public static get PASSWAVE_CALL_BACK(): string {
		return this.getProtoEvent(1007);
	}
	public static get SYNTHETISE_CALL_BACK(): string {
		return this.getProtoEvent(1010);
	}
	public static get BAGGIFT_CALL_BACK(): string {
		return this.getProtoEvent(1013);
	}
	public static get SHOPBUY_CALL_BACK(): string {
		return this.getProtoEvent(1017);
	}
	public static get OPENCARD_CALL_BACK(): string {
		return this.getProtoEvent(1018);
	}

}