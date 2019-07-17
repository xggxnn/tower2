import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import TypedSignal from "../../Tool/TypedSignal";

export default class WaveStatus {

    // 关卡id
    private _id: number = 0;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    private _level: number = 0;
    /**
     * 试炼第几小关
     */
    public get level(): number {
        return this._level;
    }
    public set level(v: number) {
        this._level = v;
    }
    // 探索时间
    private _time: number = 0;
    public get time(): number {
        return this._time;
    }
    public set time(v: number) {
        this._time = v;
    }
    // 挑战cd
    private _fightCd: number = 0;
    public get fightCd(): number {
        return this._fightCd;
    }
    public set fightCd(v: number) {
        this._fightCd = v;
        EventManager.off(EventKey.ENTER_SECOND, this, this.update);
        EventManager.on(EventKey.ENTER_SECOND, this, this.update);
    }
    public sUpdateFightCd: TypedSignal<number> = new TypedSignal<number>();
    private update(): void {
        if (this._fightCd > 0) {
            this._fightCd--;
        }
        else {
            this._fightCd = 0;
            EventManager.off(EventKey.ENTER_SECOND, this, this.update);
        }
        this.sUpdateFightCd.dispatch(this._fightCd);
    }

}