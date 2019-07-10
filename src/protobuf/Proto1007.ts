import Proto from "./Proto";
import Game from "../Game";
import ItemInfo from "../gamemodule/DataStructs/ItemInfo";

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
        Game.battleData.fight_result = [];
        if (json.hasOwnProperty("diamond")) {
            let item: ItemInfo = new ItemInfo();
            item.itemId = 10001;
            item.itemNum = json.diamond - Game.playData.curDiamond;
            Game.playData.curDiamond = json.diamond;
            Game.battleData.fight_result.push(item);
        }
        if (json.hasOwnProperty("gold")) {
            let item: ItemInfo = new ItemInfo();
            item.itemId = 10001;
            item.itemNum = json.gold - Game.playData.curGold;
            Game.playData.curGold = json.gold;
            Game.battleData.fight_result.push(item);
        }
    }
}
