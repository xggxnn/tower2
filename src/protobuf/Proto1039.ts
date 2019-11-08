import Proto from "./Proto";
import Game from "../Game";
import RewardItem from "../gamemodule/DataStructs/RewardItem";

export default class Proto1039 extends Proto {
    protected protoid: number = 1039;

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
        if (json.hasOwnProperty("gold")) {
            let item = new RewardItem();
            item.itemId = 1;
            item.itemNum = json.gold.award;
            Game.playData.BoxInfo.reward.add(0, item);
            Game.playData.BoxInfo.haveNum.add(0, json.gold.num);
            Game.playData.BoxInfo.setCd(0, json.gold.cd);
        }
        if (json.hasOwnProperty("diamond")) {
            let item = new RewardItem();
            item.itemId = 4;
            item.itemNum = json.diamond.award;
            Game.playData.BoxInfo.reward.add(1, item);
            Game.playData.BoxInfo.haveNum.add(1, json.diamond.num);
            Game.playData.BoxInfo.setCd(1, json.diamond.cd);
        }
        if (json.hasOwnProperty("jadeite")) {
            let item = new RewardItem();
            item.itemId = 2;
            item.itemNum = json.jadeite.award;
            Game.playData.BoxInfo.reward.add(2, item);
            Game.playData.BoxInfo.haveNum.add(2, json.jadeite.num);
            Game.playData.BoxInfo.setCd(2, json.jadeite.cd);
        }
        if (json.hasOwnProperty("resData")) {
            Game.playData.getRewards(json.resData);
        }
    }
}
