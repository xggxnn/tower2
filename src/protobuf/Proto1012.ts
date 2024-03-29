import Proto from "./Proto";
import Game from "../Game";

export default class Proto1012 extends Proto {
    protected protoid: number = 1012;

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
        // 征服时间
        if (json.hasOwnProperty("conquestTime")) {
            Game.playData.conqueTime = json.conquestTime
        }
        for (var key in json.resData) {
            Game.playData.addResource(key, json.resData[key]);
        }
        Game.task.sUpdateStatus.dispatch(6);
    }
}
