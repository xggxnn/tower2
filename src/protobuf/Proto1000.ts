import Proto from "./Proto";
import Game from "../Game";

export default class Proto1000 extends Proto {
	protected protoid: number = 1000;

	public send(data: Object = {}): void {
		let sendData = {
			protoId: this.protoid,
			data: data,
		}
		this.request(sendData);
	}

	protected read(json: any): void {
		Game.configs.setCSVInit(json);
	}
}