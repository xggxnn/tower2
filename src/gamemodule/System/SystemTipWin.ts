import Handler = Laya.Handler;
import UI_TipWin from "../../fgui/Extend/System/UI_TipWin";
import UI_DoubleGainTipWin from "../../fgui/Extend/System/UI_DoubleGainTipWin";
import RewardItem from "../DataStructs/RewardItem";

export default class SystemTipWin {

    private static _Instance: SystemTipWin;
    static get Instance(): SystemTipWin {
        if (!SystemTipWin._Instance) {
            SystemTipWin._Instance = new SystemTipWin();
        }
        return SystemTipWin._Instance;
    }

    // 所有的
    private list: UI_TipWin[] = [];

    // 可以使用的池
    private pools: UI_TipWin[] = [];

    private _onCompleteHandler: Handler;
    private _onCancelHandler: Handler;

    /**
     * 提示窗口
     * @param txt 提示内容
     * @param showCancel 是否显示取消按钮，默认false不显示
     * @param onComplete 确定按钮的回调函数
     */
    showTip(txt: string, showCancel: boolean = false, onComplete?: Handler, cancelHandler?: Handler, okTitle?: string, cancelTitle?: string, delcloseTime?: number) {
        if (this._onCompleteHandler) {
            this._onCompleteHandler.recover();
        }
        if (this._onCancelHandler) {
            this._onCancelHandler.recover();
        }
        let item: UI_TipWin;
        if (this.pools.length > 0) {
            item = this.pools.pop();
        }
        else {
            item = UI_TipWin.createInstance();
            this.list.push(item);
        }
        this._onCompleteHandler = onComplete;
        this._onCancelHandler = cancelHandler;
        if (item) {
            item.showTxt(txt, showCancel, Handler.create(this, this.onItemComplete), Handler.create(this, this.onCancelItem), okTitle, cancelTitle, delcloseTime);
        }
    }
    battleSkip(onComplete: Handler, cancelHandler: Handler, delcloseTime: number): void {
        if (this._onCompleteHandler) {
            this._onCompleteHandler.recover();
        }
        if (this._onCancelHandler) {
            this._onCancelHandler.recover();
        }
        let item: UI_TipWin;
        if (this.pools.length > 0) {
            item = this.pools.pop();
        }
        else {
            item = UI_TipWin.createInstance();
            this.list.push(item);
        }
        this._onCompleteHandler = onComplete;
        this._onCancelHandler = cancelHandler;
        item.battleSkip(Handler.create(this, this.onItemComplete), Handler.create(this, this.onCancelItem), delcloseTime);
    }

    private onItemComplete(item: UI_TipWin) {
        this.pools.push(item);
        if (this._onCompleteHandler) {
            this._onCompleteHandler.runWith(this);
            this._onCompleteHandler = null;
        }
        if (this._onCancelHandler) {
            this._onCancelHandler.recover();
            this._onCancelHandler = null;
        }
    }
    private onCancelItem(item: UI_TipWin): void {
        this.pools.push(item);
        if (this._onCancelHandler) {
            this._onCancelHandler.runWith(this);
            this._onCancelHandler = null;
        }
        if (this._onCompleteHandler) {
            this._onCompleteHandler = null;
        }
    }

    // 所有的
    private list2: UI_DoubleGainTipWin[] = [];

    // 可以使用的池
    private pools2: UI_DoubleGainTipWin[] = [];

    private _onCompleteHandler2: Handler;
    private _onDoubleCompleteHandler2: Handler;

    showDoubleGain(list: Array<RewardItem>, onComplete: Handler, doubleHandler: Handler): void {
        if (this._onCompleteHandler2) {
            this._onCompleteHandler2.recover();
        }
        let item: UI_DoubleGainTipWin;
        if (this.pools2.length > 0) {
            item = this.pools2.pop();
        }
        else {
            item = UI_DoubleGainTipWin.createInstance();
            this.list2.push(item);
        }
        this._onCompleteHandler2 = onComplete;
        this._onDoubleCompleteHandler2 = doubleHandler;
        item.showList(list, Handler.create(this, this.onItemComplete2), Handler.create(this, this.onDoubleItem), Handler.create(this, this.onCancelItem2));
    }
    private onItemComplete2(item: UI_DoubleGainTipWin) {
        this.pools2.push(item);
        if (this._onCompleteHandler2) {
            this._onCompleteHandler2.runWith(this);
            this._onCompleteHandler2 = null;
        }
        if (this._onDoubleCompleteHandler2) {
            this._onDoubleCompleteHandler2 = null;
        }
    }
    private onDoubleItem(item: UI_DoubleGainTipWin) {
        this.pools2.push(item);
        if (this._onDoubleCompleteHandler2) {
            this._onDoubleCompleteHandler2.runWith(this);
            this._onDoubleCompleteHandler2 = null;
        }
        if (this._onCompleteHandler2) {
            this._onCompleteHandler2 = null;
        }
    }
    private onCancelItem2(item: UI_DoubleGainTipWin) {
        this.pools2.push(item);
        if (this._onDoubleCompleteHandler2) {
            this._onDoubleCompleteHandler2 = null;
        }
        if (this._onCompleteHandler2) {
            this._onCompleteHandler2 = null;
        }
    }

}