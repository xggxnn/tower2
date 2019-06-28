import Proto from "./Proto";

export default class Proto1000 extends Proto {
	protected protoid: number = 1000;

	public send(data: Object = {}): void {
		let sendData = {
			protoid: this.protoid,
			data: data,
		}
		this.request(sendData);
	}

	protected read(json: any): void {
		console.log(json);
	}
}