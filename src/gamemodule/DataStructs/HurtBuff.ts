import { HaloType } from "../DataEnums/HaloType";

/**
 * 敌人身上的buff  间隔性触发
 */
export default class HurtBuff {
    /**
     * 
     * @param types 类型 HaloType
     * @param duration 持续时间
     * @param effectvalue 具体的伤害值
     * @param reduceDefene 减防
     * @param interval 间隔时长，不触发一直生效的为-1，默认1秒
     */
    public static create(types: HaloType, duration: number, effectvalue: number, reduceDefene: number, interval: number = 1): HurtBuff {
        return new HurtBuff(types, duration, effectvalue, reduceDefene, interval);
    }
    private constructor(types: HaloType, duration: number, effectvalue: number, reduceDefene: number, interval: number = 1) {
        this.types = types;
        this.duration = duration;
        this.effectvalue = effectvalue;
        this.currTime = 0;
        this.interval = interval;
        this.reduceDefene = reduceDefene;
    }


    private _types: HaloType = HaloType.None;
    /**
     * 1, 灼烧
     * 2, 减速
     * 3, 无法释放技能
     * 4, 中毒
     * 5, 晕
     */
    public get types(): HaloType {
        return this._types;
    }
    public set types(v: HaloType) {
        this._types = v;
    }

    private _effectvalue: number;
    /**
     * 具体数值 百分比
     */
    public get effectvalue(): number {
        return this._effectvalue;
    }
    public set effectvalue(v: number) {
        this._effectvalue = v;
    }

    private _reduceDefene: number = 0;
    /**
     * 附加减防数值
     */
    public get reduceDefene(): number {
        return this._reduceDefene;
    }
    public set reduceDefene(v: number) {
        this._reduceDefene = v;
    }


    private _currTime: number = 0;
    /**
     * 开始时间
     */
    public get currTime(): number {
        return this._currTime;
    }
    public set currTime(v: number) {
        this._currTime = v;
    }

    private _duration: number = 0;
    /**
     * 持续时间
     */
    public get duration(): number {
        return this._duration;
    }
    public set duration(v: number) {
        this._duration = v;
    }

    private _interval: number = 1;
    /**
     * 触发间隔
     */
    public get interval(): number {
        return this._interval;
    }
    public set interval(v: number) {
        this._interval = v;
    }


    public update(dt: number): number {
        if (this.duration <= this.currTime) {
            return -1;
        }
        this.currTime += dt;
        if (this.interval < 0) {
            this.interval = this.duration + this.duration;
            return 1;
        }
        else {
            if (this.currTime >= this.interval) {
                this.interval++;
                return 1;
            }
        }
        return 0;
    }





}