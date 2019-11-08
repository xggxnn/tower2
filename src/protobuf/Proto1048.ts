import Proto from "./Proto";
import Game from "../Game";
import EndlessRankData from "../gamemodule/DataStructs/EndlessRankData";

export default class Proto1048 extends Proto {
    protected protoid: number = 1048;

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
        if (json.hasOwnProperty("myRank")) {
            let item = json.myRank;
            Game.battleData.endlessMy = new EndlessRankData(item.id, item.openId, item.name, item.avatarUrl, item.progress);
        }
        if (json.hasOwnProperty("rank")) {
            let list = json.rank;
            Game.battleData.endlessRank = [];
            if (list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    Game.battleData.endlessRank.push(new EndlessRankData(item.id, item.openId, item.name, item.avatarUrl, item.progress));
                }
                if (list.length < 10 && Game.battleData.endlessMy.progress == 0) {
                    Game.battleData.endlessRank.push(Game.battleData.endlessMy);
                }
            } else {
                Game.battleData.endlessRank.push(Game.battleData.endlessMy);
            }
        }
    }
}
