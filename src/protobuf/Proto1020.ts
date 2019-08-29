import Proto from "./Proto";
import Game from "../Game";
import KingInfo from "../csvInfo/KingInfo";

export default class Proto1020 extends Proto {
    protected protoid: number = 1020;

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
        let showCount: number = 0;
        if (json.hasOwnProperty("id") && json.hasOwnProperty("type")) {
            let item = {
                id: Number(json.id),
                type: Number(json.type),
            }
            Game.playData.kingSet([item]);
            let kingInf = KingInfo.getInfo(item.id);
            if (item.type == 1) {
                showCount = kingInf.count1;
            }
            else {
                showCount = kingInf.count2;
            }
        }
        if (json.hasOwnProperty("resData")) {
            Game.playData.getRewards(json.resData, showCount);
        }
    }
}
