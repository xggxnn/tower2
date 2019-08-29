import Proto from "./Proto";
import Game from "../Game";
import HeroInfoData from "../gamemodule/DataStructs/HeroInfoData";

export default class Proto1028 extends Proto {
    protected protoid: number = 1028;

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
        let heroid: number = Number(json.heroId);
        let hero = HeroInfoData.getInfo(heroid);
        hero.quality = Number(json.quality);
        let clipsDic = Game.playData.curClips;
        let clips: number = Number(json.clips);
        if (clipsDic.hasKey(heroid)) {
            if (clips > 0) {
                clipsDic.set(heroid, clips);
            }
            else {
                clipsDic.remove(heroid);
            }
        }
        Game.playData.synthetise = heroid;
    }
}
