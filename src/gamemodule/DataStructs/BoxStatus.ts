import RewardItem from "./RewardItem";
import Dictionary from "../../tool/Dictionary";
import Game from "../../Game";
import EventManager from "../../tool/EventManager";
import EventKey from "../../tool/EventKey";
import TimerManager from "../../tool/TimerManager";

export default class BoxStatus {
    constructor() {
        this.reward.clear();
        this.haveNum.clear();
    }

    public reward: Dictionary<number, RewardItem> = new Dictionary<number, RewardItem>();
    public haveNum: Dictionary<number, number> = new Dictionary<number, number>();
    public setCd(index: number, cd: number): void {
        TimerManager.setTimeUpdate("freeBox_" + index, cd);
    }

    public get showRed(): boolean {
        if (this.haveNum.count <= 0) {
            return false;
        }
        for (let i = 0; i < 3; i++) {
            if (this.haveNum.getValue(i) < 5 && TimerManager.getTimeUpdate("freeBox_" + i) <= 0) {
                return true;
            }
        }
        return false;
    }
}