import Proto from "./Proto";
import Game from "../Game";
import HeroInfoData from "../gamemodule/DataStructs/HeroInfoData";

export default class Proto1029 extends Proto {
    protected protoid: number = 1029;

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
        Game.playData.resetAttribute.clear();
        Game.playData.resetAttribute.add(json.attribute, Number(json.attributeVal));
    }
}
