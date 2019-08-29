import Proto from "./Proto";
import Game from "../Game";

export default class Proto1016 extends Proto {
    protected protoid: number = 1016;

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
        Game.playData.checkShopInf(json.resData);
    }
}
