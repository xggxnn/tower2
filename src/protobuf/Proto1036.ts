import Proto from "./Proto";
import Game from "../Game";
import FreeRewardInfo from "../csvInfo/FreeRewardInfo";

export default class Proto1036 extends Proto {
    protected protoid: number = 1036;

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
        FreeRewardInfo.serverSimple(json.config);
        Game.playData.videoLottryNum = json.videoLottryNum;
        Game.playData.totalVideoLottryNum = json.totalVideoLottryNum;
    }
}
