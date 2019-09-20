import Proto from "./Proto";
import Game from "../Game";

export default class Proto1032 extends Proto {
    protected protoid: number = 1032;

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
            if (Game.playData.unlockAssociationattribute.indexOf(id) == -1) {
                Game.playData.unlockAssociationattribute.push(id);
            }
        }
    }
}
