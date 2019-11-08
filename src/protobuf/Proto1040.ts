import Proto from "./Proto";
import Game from "../Game";
import { InviteInfo } from "../tool/UserData";

export default class Proto1040 extends Proto {
    protected protoid: number = 1040;

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
        if (json.hasOwnProperty("friends")) {
            let arr = json.friends;
            let inviteInf: Array<InviteInfo> = [];
            for (let i = 0, len = arr.length; i < len; i++) {
                let item = new InviteInfo();
                item.avatarUrl = arr[i].avatarUrl;
                item.names = arr[i].name;
                item.openId = arr[i].openId;
                item.delayTime = arr[i].time;
                inviteInf.push(item);
            }
            Game.userData.InviteData = inviteInf;
        }
    }
}
