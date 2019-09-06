import EventManager from "../../tool/EventManager";
import EventKey from "../../tool/EventKey";
import TypedSignal from "../../tool/TypedSignal";
import Game from "../../Game";

export default class WaveStatus {

    constructor() { }

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
    private _exploreTime: number = 0;
    public get exploreTime(): number {
        return this._exploreTime;
    }
    public set exploreTime(v: number) {
        this._exploreTime = v;
        EventManager.off(EventKey.ENTER_SECOND, this, this.update2);
        EventManager.on(EventKey.ENTER_SECOND, this, this.update2);
    }

    private _exploreTotalTime: number = 1;
    public get exploreTotalTime(): number {
        return this._exploreTotalTime;
    }
    public set exploreTotalTime(v: number) {
        this._exploreTotalTime = v;
    }

    private update2(): void {
        if (this._exploreTime > 0) {
            this._exploreTime--;
        }
        else {
            this._exploreTime = 0;
            EventManager.off(EventKey.ENTER_SECOND, this, this.update2);
        }
        Game.battleMap.sUpdateExploreTime.dispatch(this);
    }

    private _exploreHeroId: number = 0;
    public get exploreHeroId(): number {
        return this._exploreHeroId;
    }
    public set exploreHeroId(v: number) {
        this._exploreHeroId = v;
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
    private update(): void {
        if (this._fightCd > 0) {
            this._fightCd--;
        }
        else {
            this._fightCd = 0;
            EventManager.off(EventKey.ENTER_SECOND, this, this.update);
        }
        Game.battleMap.sUpdateFightCd.dispatch(this);
    }

}