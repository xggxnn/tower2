import Proto from "./Proto";
import Game from "../Game";

export default class Proto1047 extends Proto {
    protected protoid: number = 1047;

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
        if (json.hasOwnProperty("progress")) {
            Game.battleData.endlessMy.progress = json.progress;
        }
        if (json.hasOwnProperty("resData")) {
            Game.playData.getBattleReward(json.resData);
        }
    }
}
