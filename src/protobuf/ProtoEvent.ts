export default class ProtoEvent {

	public static getProtoEvent(protoid: any): string {
		return "PROTO_CALL_BACK_" + protoid;
	}

	public static get CONFIG_CALL_BACK(): string {
		return this.getProtoEvent(1000);
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
	public static get CONQUESTREWARD_CALL_BACK(): string {
		return this.getProtoEvent(1012);
	}
	public static get BAGGIFT_CALL_BACK(): string {
		return this.getProtoEvent(1013);
	}
	public static get SHOPGAIN_CALL_BACK(): string {
		return this.getProtoEvent(1016);
	}
	public static get SHOPBUY_CALL_BACK(): string {
		return this.getProtoEvent(1017);
	}
	public static get OPENCARD_CALL_BACK(): string {
		return this.getProtoEvent(1018);
	}
	public static get COLLECTDEBRIS_CALL_BACK(): string {
		return this.getProtoEvent(1019);
	}
	public static get KING_CALL_BACK(): string {
		return this.getProtoEvent(1020);
	}
	public static get SIGN_CALL_BACK(): string {
		return this.getProtoEvent(1021);
	}
	public static get UPQUALITY_CALL_BACK(): string {
		return this.getProtoEvent(1028);
	}
	public static get RESETATT_CALL_BACK(): string {
		return this.getProtoEvent(1029);
	}
	public static get SAVEATT_CALL_BACK(): string {
		return this.getProtoEvent(1030);
	}
	public static get FETTERREWARD_CALL_BACK(): string {
		return this.getProtoEvent(1031);
	}
	public static get DAYFIGHTDATA_CALL_BACK(): string {
		return this.getProtoEvent(1033);
	}
	public static get DAYFIGHTSTART_CALL_BACK(): string {
		return this.getProtoEvent(1034);
	}
	public static get DAYFIGHTREWARD_CALL_BACK(): string {
		return this.getProtoEvent(1035);
	}

}