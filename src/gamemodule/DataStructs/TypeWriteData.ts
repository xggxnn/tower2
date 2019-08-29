export default class TypeWriteData {
    private static _Instance: TypeWriteData;
    static get Instance(): TypeWriteData {
        if (!TypeWriteData._Instance) {
            TypeWriteData._Instance = new TypeWriteData();
        }
        return TypeWriteData._Instance;
    }

    //当前打字机索引
    public charIndex: number;
    //结束调用
    private completeFunc: Laya.Handler;
    //是否完成
    private isComplete: boolean;
    //目标字符串
    private src: string;
    //当前字符串
    private curString: string;
    //文本
    private textField: any;
    //唯一id;
    public id: number;

    constructor() { }

    /**
     * 打字机效果
     * @param delay 间隔时间
     * @param src 目标文本
     * @param textField 文本 
     * @param complete 完成回调函数
     * @param update 更新回调函数
     */
    public startTypeWrite(delay: number, src: string, textField: any, complete: Laya.Handler): void {
        this.stopTypeWrite();

        this.src = src;
        this.completeFunc = complete;
        this.textField = textField;
        this.charIndex = 0;
        this.curString = "";
        Laya.timer.loop(delay, this, this.updateTime);
        this.updateTime();
    }

    //停止
    public stopTypeWrite(): void {
        Laya.timer.clear(this, this.updateTime);
    }

    //设置定时间隔
    public setDelay(delay: number): void {
        Laya.timer.loop(delay, this, this.updateTime);
    }

    //直接完成
    public completeTypeWrite(): void {
        this.charByTimeComplete();
    }

    //定时执行
    private updateTime(): void {
        if (this.charIndex >= this.src.length) {
            this.charByTimeComplete();
        }
        else {
            this.charByTimeUpdate();
            this.charIndex++;
        }
    }

    //完成打字效果
    private charByTimeComplete(): void {
        //直接显示
        this.textField.text = this.src;
        //有回调掉用
        if (this.completeFunc) {
            this.completeFunc.run();
        }
        //停止
        this.stopTypeWrite();
    }

    //更新打字效果
    private charByTimeUpdate(): void {
        this.curString += this.src.charAt(this.charIndex);
        if (this.textField) {
            this.textField.text = this.curString;
        }
    }
}