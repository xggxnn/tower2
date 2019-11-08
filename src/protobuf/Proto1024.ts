import Proto from "./Proto";
import Game from "../Game";
import RewardItem from "../gamemodule/DataStructs/RewardItem";
import ResourceInfo from "../csvInfo/ResourceInfo";

export default class Proto1024 extends Proto {
    protected protoid: number = 1024;

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
        Game.task.sUpdateStatus.dispatch(8);
        Game.playData.freeGetReward = new RewardItem();
        Game.playData.videoLottryNum++;
        Game.playData.freeGetReward.id = json.id;
        for (var key in json.resData) {
            let ids = Number(key);
            let vals = Number(json.resData[key]);
            let resource = ResourceInfo.getInfo(ids);
            let curVal = vals;
            if (resource && resource.type == 6) {
                let add = true;
                for (let i = 0, len = Game.playData.curGift.length; i < len; i++) {
                    if (Game.playData.curGift[i].itemId == ids) {
                        curVal = vals - Game.playData.curGift[i].itemNum;
                        Game.playData.curGift[i].itemNum = vals;
                        add = false;
                        break;
                    }
                }
                if (add) {
                    let item = new RewardItem();
                    item.itemId = ids;
                    item.itemNum = vals;
                    Game.playData.curGift.push(item);
                    Game.playData.freeGetReward.itemId = ids;
                    Game.playData.freeGetReward.itemNum = vals;
                }
                Game.redData.bagRed = true;
            }
            if (ids > 1000) {
                let heroId = ids - 1000;
                if (Game.playData.curClips.hasKey(heroId)) {
                    vals -= Game.playData.curClips.getValue(heroId);
                }
                Game.playData.curClips.add(heroId, curVal);
                if (vals > 0) {
                    Game.task.sUpdateStatus.dispatch(3);
                    Game.playData.freeGetReward.itemId = heroId + 11;
                    Game.playData.freeGetReward.itemNum = vals;
                    Game.playData.freeGetReward.isClips = true;
                }
            }
            else {
                switch (ids) {
                    case 1:
                        {
                            curVal = vals - Game.playData.curGold;
                            Game.playData.curGold = vals;
                        }
                        break;
                    case 2:
                        {
                            curVal = vals - Game.playData.curJadeite;
                            Game.playData.curJadeite = vals;
                        }
                        break;
                    case 3:
                        {
                            curVal = vals - Game.playData.curMagic;
                            Game.playData.curMagic = vals;
                        }
                        break;
                    case 4:
                        {
                            curVal = vals - Game.playData.curDiamond;
                            Game.playData.curDiamond = vals;
                        }
                        break;
                    case 5:
                        {
                            curVal = vals - Game.playData.curPearl;
                            Game.playData.curPearl = vals;
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        // 礼包
                        break;
                }
                if (curVal > 0) {
                    Game.playData.freeGetReward.itemId = ids;
                    Game.playData.freeGetReward.itemNum = curVal;
                }
            }
        }
    }
}
