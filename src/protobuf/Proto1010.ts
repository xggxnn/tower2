import Proto from "./Proto";
import Game from "../Game";
import HeroInfo from "../dataInfo/HeroInfo";

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
        let clipsDic = Game.playData.curClips;
        if (clipsDic.hasKey(json.heroId)) {
            if (json.hasOwnProperty("clips") && Number(json.clips) > 0) {
                clipsDic.set(json.heroId, Number(json.clips));
            }
            else {
                clipsDic.remove(json.heroId);
            }
        }
        if (Game.playData.curHero.indexOf(json.heroId) == -1) {
            Game.playData.curHero.push(json.heroId);
            let heroInf = HeroInfo.getInfo(json.heroId);
            Game.tipWin.showTip("恭喜你合成新英雄 " + heroInf.name);
        }
    }
}
