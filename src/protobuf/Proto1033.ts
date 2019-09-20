import Proto from "./Proto";
import Game from "../Game";
import ConfigData from "../csvInfo/ConfigData";
import HeroInfoData from "../gamemodule/DataStructs/HeroInfoData";
import Dictionary from "../tool/Dictionary";
import DayWaveRewardInfo from "../csvInfo/DayWaveRewardInfo";

export default class Proto1033 extends Proto {
    protected protoid: number = 1033;

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
        if (json.hasOwnProperty("wavechallenge")) {
            ConfigData.serverSimple(json.wavechallenge);
        }
        if (json.hasOwnProperty("award")) {
            Game.battleData.getRewards(json.award);
        }
        Game.battleData.curHeroInfoList = new Dictionary<string, HeroInfoData>();
        Game.battleData.dayFightHeroSort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let hero = json.hero1;
        let hero2 = json.hero2;
        hero = hero.concat(hero2);
        if (hero && hero.length > 0) {
            let len = hero.length;
            if (len > 12) len = 12;
            for (let i = 0; i < len; i++) {
                let heroInf = HeroInfoData.getInfo(hero[i].id);
                Game.battleData.dayFightHeroSort[i] = Number(hero[i].id);
                heroInf.quality = Number(hero[i].quality);
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
                Game.battleData.curHeroInfoList.add(heroInf.id, heroInf);
            }
        }
        Game.battleData.dayFightProgress = Number(json.progress);
        Game.battleData.dayFightWave = Number(json.wave);
    }
}
