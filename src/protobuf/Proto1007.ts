import Proto from "./Proto";
import Game from "../Game";
import RewardItem from "../gamemodule/DataStructs/RewardItem";

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
            if (json.diamond - Game.playData.curDiamond > 0) {
                let item: RewardItem = new RewardItem();
                item.itemId = 10001;
                item.itemNum = json.diamond - Game.playData.curDiamond;
                Game.playData.curDiamond = json.diamond;
                Game.battleData.fight_result.push(item);
            }
        }
        if (json.hasOwnProperty("gold")) {
            if (json.gold - Game.playData.curGold > 0) {
                let item: RewardItem = new RewardItem();
                item.itemId = 10002;
                item.itemNum = json.gold - Game.playData.curGold;
                Game.playData.curGold = json.gold;
                Game.battleData.fight_result.push(item);
            }
        }
        if (json.hasOwnProperty("map")) {
            Game.battleMap.init([json.map]);
        }
        if (json.hasOwnProperty("clips")) {
            let clips = json.clips;
            let clipsDic = Game.playData.curClips;
            for (let i = clips.length - 1; i >= 0; i--) {
                let num = clips[i].clips;
                if (clipsDic.hasKey(clips[i].id)) {
                    num -= clipsDic.getValue(clips[i].id);
                }
                clipsDic.add(clips[i].id, clips[i].clips);
                if (num > 0) {
                    let item: RewardItem = new RewardItem();
                    item.itemId = clips[i].id;
                    item.itemNum = num;
                    Game.battleData.fight_result.push(item);
                }
            }
        }
    }
}
