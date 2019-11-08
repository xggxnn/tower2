import Proto from "./Proto";
import Game from "../Game";

export default class Proto1042 extends Proto {
    protected protoid: number = 1042;

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
        Game.playData.wishingState = 3;
        if (json.hasOwnProperty("state")) {
            Game.playData.wishingState = Number(json.state);
        }
        if (json.hasOwnProperty("resData")) {
            Game.playData.getRewards(json.resData);
        }
    }
}
