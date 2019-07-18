import Handler = Laya.Handler;
import UI_GainRewards from "../../fgui/Extend/System/UI_GainRewards";

export default class SystemRewardWin {

    private static _Instance: SystemRewardWin;
    static get Instance(): SystemRewardWin {
        if (!SystemRewardWin._Instance) {
            SystemRewardWin._Instance = new SystemRewardWin();
        }
        return SystemRewardWin._Instance;
    }

    // 所有的
    private list: UI_GainRewards[] = [];

    // 可以使用的池
    private pools: UI_GainRewards[] = [];

    showReward() {
        let item: UI_GainRewards;
        if (this.pools.length > 0) {
            item = this.pools.pop();
        }
        else {
            item = UI_GainRewards.createInstance();
            this.list.push(item);
        }
        item.setData(Handler.create(this, this.onItemComplete));
    }

    private onItemComplete(item: UI_GainRewards) {
        this.pools.push(item);
    }

}