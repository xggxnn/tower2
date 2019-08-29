import Handler = Laya.Handler;
import UI_TipWin from "../../fgui/Extend/System/UI_TipWin";

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

    /**
     * 提示窗口
     * @param txt 提示内容
     * @param showCancel 是否显示取消按钮，默认false不显示
     * @param onComplete 确定按钮的回调函数
     */
    showTip(txt: string, showCancel: boolean = false, onComplete?: Handler, cancelHandler?: Handler, okTitle?: string, cancelTitle?: string) {
        if (this._onCompleteHandler) {
            this._onCompleteHandler.recover();
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
        item.showTxt(txt, showCancel, Handler.create(this, this.onItemComplete), cancelHandler, okTitle, cancelTitle);
    }

    private onItemComplete(item: UI_TipWin) {
        this.pools.push(item);
        if (this._onCompleteHandler) {
            this._onCompleteHandler.runWith(this);
            this._onCompleteHandler.recover();
            this._onCompleteHandler = null;
        }
    }

}