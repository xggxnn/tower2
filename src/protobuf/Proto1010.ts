import Proto from "./Proto";
import Game from "../Game";
import HeroInfoData from "../gamemodule/DataStructs/HeroInfoData";

export default class Proto1010 extends Proto {
    protected protoid: number = 1010;

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
        let heroid: number = 0;
        let clips: number = 0;
        for (var key in json.resData) {
            Game.playData.addResource(key, json.resData[key]);
            heroid = Number(key) - 1000;
            clips = Number(json.resData[key]);
        }
        if (heroid > 0) {
            let clipsDic = Game.playData.curClips;
            if (clipsDic.hasKey(heroid)) {
                if (clips > 0) {
                    clipsDic.set(heroid, clips);
                }
                else {
                    clipsDic.remove(heroid);
                }
            }
            if (!Game.playData.curHeroInfoList.hasKey(heroid)) {
                let hero = HeroInfoData.getInfo(heroid);
                Game.playData.curHeroInfoList.add(heroid, hero);
                Game.playData.synthetise = heroid;
            }
            // if (Game.playData.curHero.indexOf(heroid) == -1) {
            //     Game.playData.curHero.push(heroid);
            //     Game.playData.synthetise = heroid;
            // }
        }
    }
}
