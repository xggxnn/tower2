import Handler = Laya.Handler;
import Dictionary from "../../Tool/Dictionary";

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
    public setGmInf(tip: string, onComplete: Handler): void {
        if (this.tipList.indexOf(tip) == -1) {
            this.tipList.push(tip);
            this.handlerList.push(onComplete);
        }
    }

}