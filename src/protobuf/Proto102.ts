import Proto from "./Proto";
import Game from "../Game";
import Fun from "../tool/Fun";

export default class Proto101 extends Proto {
    protected protoid: number = 102;

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
        Game.localStorage.clear();
        let list = [];
        for (let i = 1; i < 21; i++) {
            let ok = true;
            while (ok) {
                let t = Fun.rangeBetween(1, 35);
                if (list.indexOf(t) == -1) {
                    list.push(t);
                    ok = false;
                }
            }
        }
        Game.localStorage.setString("randomwHeroList_Init", list.toString(), true);
        window["wx"].exitMiniProgram({});
    }
}
