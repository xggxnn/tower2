import Proto from "./Proto";
import Game from "../Game";
import WaveStatus from "../gamemodule/DataStructs/WaveStatus";

export default class Proto1003 extends Proto {
    protected protoid: number = 1003;

    public send(data: Object = {}): void {
        let sendData = {
            protoId: this.protoid,
            openId: Game.userData.openid,
            password: Game.userData.password,
            data: data,
        }
        this.request(sendData);
    }
    // any == T
    protected read(json: any): void {
        let data = json.data;
        let wavestatus: WaveStatus = new WaveStatus();
        wavestatus.id;
    }
}
