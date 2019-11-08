import TaskInfo from "../../csvInfo/TaskInfo";
import Dictionary from "../../tool/Dictionary";
import TypedSignal from "../../tool/TypedSignal";
import Signal from "../../tool/Signal";

export default class TaskData {

    private static _Instance: TaskData;
    static get Instance(): TaskData {
        if (!TaskData._Instance) {
            TaskData._Instance = new TaskData();
        }
        return TaskData._Instance;
    }

    public sUpdateStatus: TypedSignal<number> = new TypedSignal<number>();
    public sUpdateRed: Signal = new Signal();

    // 初始化
    public init(json: any, isInit: boolean = false): void {
        this._showRed = 0;
        for (var key in json) {
            let item = json[key];
            if (item.id < 9) {
                this._taskInf.add(item.id, TaskInfo.getInfo(item.id));
            }
            let arr: TaskItem = new TaskItem();
            arr.id = item.id;
            arr.ispicked = item.ispicked;
            arr.max = item.max;
            arr.num = item.num;
            arr.progress = item.progress;
            arr.rid = item.rid;
            if (arr.ispicked) {
                arr.status = 2;
            } else if (arr.progress >= arr.max) {
                arr.status = 1;
                this._showRed++;
            } else {
                arr.status = 0;
            }
            this._taskStatus.add(item.id, arr);
        }
        if (isInit) {
            this.sUpdateStatus.add(this.refrushStatus, this);
        }
    }
    // 配置信息
    private _taskInf: Dictionary<string, TaskInfo> = new Dictionary<string, TaskInfo>();
    public get taskInf(): Dictionary<string, TaskInfo> {
        return this._taskInf;
    }

    // 任务状态
    private _taskStatus: Dictionary<string, TaskItem> = new Dictionary<string, TaskItem>();
    public get taskStatus(): Dictionary<string, TaskItem> {
        return this._taskStatus;
    }
    public get showTaskNum(): number {
        for (let i = 1; i < 9; i++) {
            let item = this._taskStatus.getValue(i);
            if (item && item.status == 1) {
                return i - 1;
            }
        }
        return 0;
    }
    // 增加一次任务完成数量
    private refrushStatus(types: number): void {
        let dat = this._taskStatus.getValue(types);
        if (dat && !dat.ispicked && dat.status == 0) {
            dat.progress++;
            if (dat.progress >= dat.max) {
                dat.status = 1;
                this._showRed++;
                let big = this._taskStatus.getValue(9);
                if (big && !big.ispicked && big.status == 0) {
                    big.progress++;
                    if (big.progress >= big.max) {
                        big.status = 1;
                        this._showRed++;
                    }
                    this._taskStatus.set(9, big);
                }
            }
        }
        this._taskStatus.set(types, dat);
        this.sUpdateRed.dispatch();
    }
    // 领奖一次
    public gainTask(types: number): void {
        let dat = this._taskStatus.getValue(types);
        if (dat && !dat.ispicked) {
            dat.ispicked = true;
            dat.status = 2;
            this._showRed--;
            this._taskStatus.set(types, dat);
        }
        this.sUpdateRed.dispatch();
    }

    private _showRed = 0;
    public get showRed(): boolean {
        return this._showRed > 0;
    }

}

export class TaskItem {
    public id: number;
    public ispicked: boolean;
    public max: number;
    public num: number;
    public progress: number;
    public rid: number;
    public status: number;
}