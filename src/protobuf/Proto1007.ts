import Proto from "./Proto";
import Game from "../Game";

export default class Proto1007 extends Proto {
    protected protoid: number = 1007;

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
        Game.playData.getBattleReward(json.resData)

        if (json.hasOwnProperty("map")) {
            Game.battleMap.init([json.map]);
        }

        // 征服时间
        if (json.hasOwnProperty("conquestTime")) {
            Game.playData.conqueTime = json.conquestTime
        }
    }
}
