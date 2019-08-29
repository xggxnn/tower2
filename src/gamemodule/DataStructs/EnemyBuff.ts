/**
 * 敌人身上的buff
 */
export default class EnemyBuff {
    public static create(types: number, duration: number, effectvalue: number): EnemyBuff {
        return new EnemyBuff(types, duration, effectvalue);
    }
    private constructor(types: number, duration: number, effectvalue: number) {
        this.types = types;
        this.duration = duration;
        this.effectvalue = effectvalue;
    }


    private _types: number = 0;
    /**
     * 1, 加血-配合高爆
     * 2, 加速-配合高频
     * 3, 加防-配合均衡、高爆
     * 4, 减攻速-配合高频
     * 5, 减攻击-配合高爆
     */
    public get types(): number {
        return this._types;
    }
    public set types(v: number) {
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

    public update(dt: number): boolean {
        if (this.duration > 0) {
            this.duration -= dt;
        }
        else {
            return true;
        }
        return false;
    }





}