import Proto from "./Proto";
import Game from "../Game";

export default class Proto1021 extends Proto {
    protected protoid: number = 1021;

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
        if (json.hasOwnProperty("resData")) {
            Game.playData.getRewards(json.resData);
        }
        Game.playData.signInIndex = Number(json.signInIndex);
        Game.playData.isSign = Boolean(json.isSignedIn);
    }
}
