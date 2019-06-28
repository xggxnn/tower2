import ProtoServer from "./ProtoServer";
import EventManager from "../Tool/EventManager";
import ProtoEvent from "./ProtoEvent";

export default class Proto {

	protected protoid: number;

	public send(data: Object = {}): void {

	}
	protected request(data: Object): void {
		ProtoServer.request(data);
	}

	public callBack(json: any): void {
		this.read(json);
		this.callEvent();
	}
	protected read(json: any): void {

	}
	private callEvent(): void {
		EventManager.event(ProtoEvent.getProtoEvent(this.protoid));
	}


}