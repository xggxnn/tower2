import Proto from "./Proto";
import Game from "../Game";
import Dictionary from "../Tool/Dictionary";

export default class Proto1001 extends Proto {
    protected protoid: number = 1001;

    public send(data: Object = {}): void {
        let sendData = {
            protoId: this.protoid,
            data: data,
        }
        this.request(sendData);
    }
    // any == T
    protected read(json: any): void {
        Game.userData.openid = json.openId;
        Game.userData.playerid = json.playerId;
        Game.userData.password = json.password;
        Game.playData.newbie = Boolean(json.newbie);
        if (json.hasOwnProperty("seat")) {
            Game.battleScene.seatHeroDic.clear();
            let seat = [json.seat.seat0, json.seat.seat1, json.seat.seat2];
            for (let j = 0; j < 3; j++) {
                Game.battleScene.seatHeroDic.add(j, new Dictionary<number, number>());
                let dic = Game.battleScene.seatHeroDic.getValue(j);
                for (let i = 0; i < 9; i++) {
                    dic.add(i, seat[j][i]);
                }
            }
        }
        if (json.hasOwnProperty("seatNum")) {
            Game.battleScene.seatHeroSelect = Number(json.seatNum);
        }
    }
}
