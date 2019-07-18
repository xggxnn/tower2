import Proto from "./Proto";
import Game from "../Game";
import RewardItem from "../gamemodule/DataStructs/RewardItem";

export default class Proto1017 extends Proto {
    protected protoid: number = 1017;

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
        let rewardList: Array<RewardItem> = [];
        if (json.hasOwnProperty("gold")) {
            if (json.gold - Game.playData.curGold > 0) {
                let item: RewardItem = new RewardItem();
                item.itemId = 10002;
                item.itemNum = json.gold - Game.playData.curGold;
                Game.playData.curGold = json.gold;
                rewardList.push(item);
            }
        }
        if (json.hasOwnProperty("diamond")) {
            if (json.diamond - Game.playData.curDiamond > 0) {
                let item: RewardItem = new RewardItem();
                item.itemId = 10001;
                item.itemNum = json.diamond - Game.playData.curDiamond;
                Game.playData.curDiamond = json.diamond;
                rewardList.push(item);
            }
        }
        if (json.hasOwnProperty("jadeite")) {
            if (json.jadeite - Game.playData.curJadeite > 0) {
                let item: RewardItem = new RewardItem();
                item.itemId = 10003;
                item.itemNum = json.jadeite - Game.playData.curJadeite;
                Game.playData.curJadeite = json.jadeite;
                rewardList.push(item);
            }
        }
        if (json.hasOwnProperty("cardId")) {
            let item: RewardItem = new RewardItem();
            item.itemId = 10005;
            item.itemNum = json.cardNum;
            rewardList.push(item);
        }
        Game.playData.rewardList = rewardList;
    }
}
