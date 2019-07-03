import Proto from "./Proto";
import Game from "../Game";

export default class Proto1001 extends Proto {
    protected protoid: number = 1001;

    public send(data: Object = {}): void {
        let sendData = {
            protoId: this.protoid,
            data: data,
        }
        this.request(sendData);
    }
    // any == T
    protected read(json: any): void {
        Game.userData.openid = json.openId;
        Game.userData.playerid = json.playerId;
        Game.userData.password = json.password;
        Game.playData.newbie = Boolean(json.newbie);
    }
}
