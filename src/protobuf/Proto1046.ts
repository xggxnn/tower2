import Proto from "./Proto";
import Game from "../Game";
import WaveInfo from "../csvInfo/WaveInfo";
import WaveformInfo from "../csvInfo/WaveformInfo";
import WaveRewardInfo from "../csvInfo/WaveRewardInfo";

export default class Proto1046 extends Proto {
    protected protoid: number = 1046;

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
        Game.battleData.level_id = json.waveId;
        Game.battleData.endlessMy.progress = json.progress;
        if (json.hasOwnProperty("wave")) {
            WaveInfo.serverSimple(json.wave);
        }
        if (json.hasOwnProperty("waveform")) {
            WaveformInfo.serverSimple(json.waveform);
        }
        if (json.hasOwnProperty("wavereward")) {
            WaveRewardInfo.serverSimple(json.wavereward);
        }
    }
}
