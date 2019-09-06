import Dictionary from "../../tool/Dictionary";
import UI_TotalMessage from "../../fgui/Extend/System/UI_TotalMessage";

export default class SystemToastMessag {

    private static _Instance: SystemToastMessag;
    static get Instance(): SystemToastMessag {
        if (!SystemToastMessag._Instance) {
            SystemToastMessag._Instance = new SystemToastMessag();
        }
        return SystemToastMessag._Instance;
    }
    public closeTotal: boolean = true

    // 所有的
    private list: UI_TotalMessage[] = [];

    // 可以使用的池
    private pools: UI_TotalMessage[] = [];
    //==============================
    // 添加一个相同文本出现的时间间隔
    //------------------------------
    private lastTxt: string;
    private lastTime: number;
    private timeSpacing: number = 1;
    private moveDic: Dictionary<string, boolean> = new Dictionary<string, boolean>();
    /**
     * 浮动消息
     * @param txt 消息内容
     * @param move 是否跑马灯
     */
    toastMsg(txt: string, move: boolean = false, alwaysHave: boolean = false) {
        if (this.closeTotal && !alwaysHave) return;
        this.moveDic.add(txt, move);
        if (txt != this.lastTxt) {
            this.show(txt);
        }
        else if (new Date().getTime() - this.lastTime >= this.timeSpacing) {
            this.show(txt);
        }
    }
    private show(txt) {
        this.lastTxt = txt;
        this.lastTime = new Date().getTime();

        let item: UI_TotalMessage;
        if (this.pools.length > 0) {
            item = this.pools.pop();
        }
        else {
            item = UI_TotalMessage.createInstance();
            this.list.push(item);
        }
        if (this.moveDic.getValue(txt)) {
            item.playMove(txt, Laya.Handler.create(this, this.onItemComplete));
        }
        else {
            item.playTop(txt, Laya.Handler.create(this, this.onItemComplete));
        }
    }

    private onItemComplete(item: UI_TotalMessage) {
        this.pools.push(item);
    }
}