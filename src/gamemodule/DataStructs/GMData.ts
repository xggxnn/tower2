import Handler = Laya.Handler;
import Dictionary from "../../Tool/Dictionary";
import TypedSignal from "../../Tool/TypedSignal";

export default class GMData {

    private static _Instance: GMData;
    static get Instance(): GMData {
        if (!GMData._Instance) {
            GMData._Instance = new GMData();
        }
        return GMData._Instance;
    }

    public tipList: Array<string> = [];
    public handlerList: Array<Handler> = [];
    // 添加gm事件
    public setGmInf(tip: string, onComplete: Handler): void {
        if (this.tipList.indexOf(tip) == -1) {
            this.tipList.push(tip);
            this.handlerList.push(onComplete);
        }
    }
    // 移除gm事件
    public removeGmInf(tip: string): void {
        let index = this.tipList.indexOf(tip);
        if (index != -1) {
            this.tipList.splice(index, 1);
            this.handlerList.splice(index, 1);
        }
    }

    public closeHeroTip: boolean = false;
    public sUpdateCloseHeroTip: TypedSignal<boolean> = new TypedSignal<boolean>();

}