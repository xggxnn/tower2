import Proto from "./Proto";
import Game from "../Game";
import Dictionary from "../Tool/Dictionary";

export default class Proto1001 extends Proto {
    protected protoid: number = 1001;

    public send(data: Object = {}): void {
        let sendData = {
            protoId: this.protoid,
            data: data,
        }
        this.request(sendData);
    }
    // any == T
    protected read(json: any): void {
        Game.userData.openid = json.openId;
        Game.userData.playerid = json.playerId;
        Game.userData.password = json.password;
        Game.playData.newbie = Boolean(json.newbie);
        // 货币情况
        Game.playData.curGold = Number(json.gold);
        Game.playData.curJadeite = Number(json.jadeite);
        Game.playData.curMagic = Number(json.magic);
        // 英雄等级和星级
        Game.playData.curLevel = Number(json.level);
        Game.playData.curStar = Number(json.star);
        // 布阵情况
        Game.battleScene.seatHeroDic.clear();
        let seat = [json.seat.seat0, json.seat.seat1, json.seat.seat2];
        for (let j = 0; j < 3; j++) {
            Game.battleScene.seatHeroDic.add(j, new Dictionary<number, number>());
            let dic = Game.battleScene.seatHeroDic.getValue(j);
            for (let i = 0; i < 9; i++) {
                dic.add(i, seat[j][i]);
            }
        }
        // 当前那个阵
        Game.battleScene.seatHeroSelect = Number(json.seatNum);
        // 拥有的英雄
        Game.playData.curHero = json.heros;
        // 拥有的碎片
        let clips = json.clips;
        let clipsDic = Game.playData.curClips;
        for (let i = clips.length - 1; i >= 0; i--) {
            clipsDic.add(clips[i].id, clips[i].clips);
        }
        // 关卡情况
        if (json.hasOwnProperty("map")) {
            Game.battleMap.init(json.map);
        }
    }
}
