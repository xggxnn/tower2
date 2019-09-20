import Proto from "./Proto";
import Game from "../Game";

export default class Proto1031 extends Proto {
    protected protoid: number = 1031;

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
        if (json.hasOwnProperty("id")) {
            let id = json.id;
            if (Game.playData.associationattribute.indexOf(id) == -1) {
                Game.playData.associationattribute.push(id);
            }
        }
        if (json.hasOwnProperty("resData")) {
            Game.playData.getRewards(json.resData);
        }
    }
}
