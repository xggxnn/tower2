import EventManager from "./EventManager";
import EventKey from "./EventKey";

export default class TickManager {
    private static _Instance: TickManager;
    static get Instance(): TickManager {
        if (!TickManager._Instance) {
            TickManager._Instance = new TickManager();
            TickManager._Instance.install();
        }
        return TickManager._Instance;
    }


    private list: Array<Tick> = new Array<Tick>();
    private listLength: number;
    install(): void {
        // let tick = this.addTick(1, 0, null, null);
        // tick.Start();
        EventManager.on(EventKey.ENTER_FRAME, this, this.loopUpDateTime);
    }
    /**
     * @param targetTimes 目标计数次数（共计数多少个间隔时间，小于等于0时无限循环）
     * @param clockHandler 计数时回调（每个间隔时间回调）
     * @param finishHandler 计数完成回调
     * @param uniform_speed 是否匀速，大于0表示匀速，速度为此值
     */
    addTick(targetTimes: number, clockHandler: Laya.Handler, finishHandler: Laya.Handler, uniform_speed: number = 0): Tick {
        let tick = Tick.createTick(targetTimes, clockHandler, finishHandler, uniform_speed);
        this.list.push(tick);
        this.listLength = this.list.length;
        return tick;
    }
    clearTick(tick: Tick): void {
        let index = this.list.indexOf(tick);
        if (index >= 0) {
            this.list.splice(index, 1);
        }
    }
    private loopUpDateTime(): void {
        if (this.listLength > 0) {
            for (var tick of this.list) {
                if (tick) {
                    tick.updateTime();
                }
            }
        }
    }
}
export class Tick {
    // 是否开始
    private isStart: boolean = false;
    // 当前次数
    private curTimes: number = 0;
    // 当前计时
    private curClock: number = 0;
    // 计时间隔帧数
    private distance: number;
    // 目标计时次数
    private targetTimes: number;
    // 计时点回调
    private clockHandler: Laya.Handler;
    // 完成计时回调
    private finishHandler: Laya.Handler;

    private constructor() { };

    private first_int: number = 30;
    private once_int: number = 15;
    private min_int: number = 2;
    private uniform_speed: number = 0;

    public static createTick(targetTimes: number, clockHandler: Laya.Handler, finishHandler: Laya.Handler, uniform_speed: number = 0): Tick {
        let tick = new Tick();
        tick.isStart = false;
        tick.distance = tick.first_int;
        tick.targetTimes = targetTimes;
        tick.clockHandler = clockHandler;
        tick.finishHandler = finishHandler;
        tick.uniform_speed = uniform_speed;
        if (uniform_speed > 0) {
            tick.distance = uniform_speed;
        }
        return tick;
    }
    Start() {
        this.isStart = true;
        if (this.clockHandler) {
            this.clockHandler.runWith(this.targetTimes - this.curTimes);
        }
    }
    Restart() {
        this.curTimes = 0;
        this.curClock = 0;
        this.isStart = true;
        if (this.clockHandler) {
            this.clockHandler.runWith(this.targetTimes - this.curTimes);
        }
    }
    Continue() {
        this.isStart = true;
    }
    Stop() {
        this.isStart = false;
    }
    updateTime(): void {
        if (!this.isStart) {
            return;
        }
        this.curClock++;
        if (this.curClock >= this.distance) {
            this.curClock = 0;
            this.curTimes++;
            if (this.uniform_speed <= 0) {
                if (this.distance > this.once_int) {
                    this.distance = this.once_int;
                }
                else if (this.distance > this.min_int) {
                    this.distance--;
                }
            }
            if (this.targetTimes > 0 && this.curTimes > this.targetTimes) {
                if (this.isStart) {
                    this.isStart = false;
                    if (this.finishHandler) {
                        this.finishHandler.run();
                    }
                }
                return;
            }
            if (this.clockHandler) {
                this.clockHandler.runWith(this.targetTimes - this.curTimes);
            }
        }
    }
}