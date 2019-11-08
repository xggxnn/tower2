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
        Game.playData.synUpReset = 3;
        let heroid: number = json.heroId;
        let hero = HeroInfoData.getInfo(heroid);
        let clips: number = json.clips;
        if (Game.playData.curClips.hasKey(heroid)) {
            if (clips > 0) {
                Game.playData.curClips.set(heroid, clips);
            }
            else {
                Game.playData.curClips.remove(heroid);
            }
        }
        Game.playData.resetAttribute.clear();
        Game.playData.resetAttribute.add(json.attribute, json.attributeVal);
    }
}
