import Proto from "./Proto";
import Game from "../Game";

export default class Proto1008 extends Proto {
    protected protoid: number = 1008;

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
        Game.playData.curLevel = Number(json.level);
        for (var key in json.resData) {
            Game.playData.addResource(key, json.resData[key]);
        }
    }
}
