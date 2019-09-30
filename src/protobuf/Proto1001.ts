import Proto from "./Proto";
import Game from "../Game";
import Dictionary from "../tool/Dictionary";
import HeroInfoData from "../gamemodule/DataStructs/HeroInfoData";

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
        // 资源情况
        for (var key in json.resData) {
            Game.playData.addResource(key, json.resData[key]);
        }
        // 征服时间
        if (json.hasOwnProperty("conquestTime")) {
            Game.playData.conqueTime = json.conquestTime;
        }
        // 以领取奖励的羁绊列表
        if (json.hasOwnProperty("associationattribute")) {
            Game.playData.associationattribute = json.associationattribute;
        }
        // 以领取奖励的羁绊列表
        if (json.hasOwnProperty("unlockAssociationattribute")) {
            Game.playData.unlockAssociationattribute = json.unlockAssociationattribute;
        }
        if (json.hasOwnProperty("challengeProgress")) {
            Game.battleData.dayFightProgress = json.challengeProgress;
        }
        // 英雄等级和星级
        Game.playData.curLevel = Number(json.level);
        Game.playData.preSkillUnLock = Game.playData.curLevel;
        Game.playData.curStar = Number(json.star);
        // 布阵情况
        if (json.hasOwnProperty("seat") && json.seat.seat0 && json.seat.seat1 && json.seat.seat2) {
            Game.battleScene.seatHeroList = [json.seat.seat0, json.seat.seat1, json.seat.seat2];
        }
        else {
            Game.battleScene.seatHeroList = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
        }
        // 当前那个阵
        Game.battleScene.seatHeroSelect = Number(json.seatNum);
        Game.playData.curPlaySkillIndex = Number(json.skillIndex);
        // 拥有的英雄
        Game.playData.curHeroInfoList = new Dictionary<string, HeroInfoData>();
        let hero = json.heros;
        if (hero && hero.length > 0) {
            for (let i = 0, len = hero.length; i < len; i++) {
                let heroInf = HeroInfoData.getInfo(hero[i].id);
                heroInf.quality = Number(hero[i].quality);
                if (heroInf.quality == 5) {
                    let atk = Number(hero[i].attack);
                    let speed = Number(hero[i].cd);
                    let crit = Number(hero[i].crit);
                    let burst = Number(hero[i].burst);
                    if (atk > 0) {
                        heroInf.basicattckpointCur = atk;
                    }
                    if (speed > 0) {
                        heroInf.cd = 1 / speed;
                    }
                    if (crit > 0) {
                        heroInf.crit = crit;
                    }
                    if (burst > 0) {
                        heroInf.burst = burst;
                    }
                }
                Game.playData.curHeroInfoList.add(heroInf.id, heroInf);
            }
        }
        // 关卡情况
        if (json.hasOwnProperty("map")) {
            Game.battleMap.init(json.map);
        }
        Game.playData.unlockLoginInit = Game.playData.unlockIndex;
        Game.playData.unlockInit = 0;
        if (Game.localStorage.hasItem("unlock_Init", true)) {
            let saveInit = Game.localStorage.getInt("unlock_Init", true);
            if (saveInit >= 8) {
                Game.playData.unlockInit = saveInit;
            }
        }
        // 关卡情况
        if (json.hasOwnProperty("king")) {
            Game.playData.kingSet(json.king);
        }
        // 签到情况
        Game.playData.signInIndex = Number(json.signInIndex);
        Game.playData.isSign = Boolean(json.isSignedIn);
        Game.playData.guideIndex = Number(json.guideIndex);
    }
}
