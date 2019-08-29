import Proto from "./Proto";
import Game from "../Game";
import RewardItem from "../gamemodule/DataStructs/RewardItem";

export default class Proto1019 extends Proto {
    protected protoid: number = 1019;

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
        if (json.hasOwnProperty("map")) {
            Game.battleMap.init([json.map]);
        }
        if (json.hasOwnProperty("resData")) {
            Game.playData.getRewards(json.resData);
        }
    }
}
