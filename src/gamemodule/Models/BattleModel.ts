import Game from "../../Game";
import BaseSK from "../../base/BaseSK";
import { HeroAniEnums } from "../DataEnums/HeroAniEnums";
import Point = Laya.Point;
import EventManager from "../../Tool/EventManager";
import Pools from "../../Tool/Pools";
import BattleEffectEnemy from "./BattleEffectEnemy";
import Dictionary from "../../Tool/Dictionary";
import EventKey from "../../Tool/EventKey";
import UI_Blood from "../../fgui/Extend/Battle/UI_Blood";
import UI_Shadow from "../../fgui/Extend/Battle/UI_Shadow";

export default class BattleModel extends Laya.Sprite {
    protected constructor(isUp: boolean) {
        super();
        // 模型动作暂停和恢复控制
    }
    protected _destination: Laya.Point = new Laya.Point();
    protected _posState: number = 0;
    protected _sk: BaseSK = null;
    public get sk(): BaseSK {
        return this._sk;
    }
    protected currentState = HeroAniEnums.None;
    // 出生点
    protected initPointTop: Point = new Point(1380, 480);
    protected initPointBom: Point = new Point(1380, 580);
    protected initPoint: Point = new Point();
    protected initTop: boolean = false;
    // 移动路径
    protected movePath: Array<Point> = [];
    // 当前移动点
    protected curMoveIndex: number = 0;
    // 当前处于那一列
    protected curMoveX: number = 0;
    // 下一个动作攻击
    protected nextAttack: HeroAniEnums = HeroAniEnums.None;
    // 基础移动点
    protected pathX: Array<number> = [1000, 780, 560, 340, 220];
    protected pathY: Array<number> = [280, 460, 480, 550, 580, 640, 800];
    // update中的时间
    protected standTime: number = 0;
    // 血条
    protected blood: UI_Blood = null;
    // 脚下阴影
    protected shadow: UI_Shadow = null;
    // 战斗特效列表
    protected battleEffectList: Dictionary<string, BattleEffectEnemy> = new Dictionary<string, BattleEffectEnemy>();

    public update(dt): void {

    }

    protected playPause(): void {
        if (this.currentState == HeroAniEnums.Death) return;
        this._sk.pauseAni();
    }
    protected playResume(): void {
        this._sk.resumeAni();
    }
    protected playStand(): void {
        this.playAnimation(HeroAniEnums.Stand, true);
    }
    protected playMove(): void {
        this.playAnimation(HeroAniEnums.Move, true);
    }
    protected playAttack(): void {
        this.playAnimation(HeroAniEnums.Attack, false);
    }
    protected skillPrevState: HeroAniEnums = HeroAniEnums.None;
    protected playCast(): void {
        this.skillPrevState = this.currentState;
        this.playAnimation(HeroAniEnums.Skill, false);
    }
    protected playStun(): void {
        this.playAnimation(HeroAniEnums.Stun, true);
    }
    protected playDeath(): void {
        if (this.currentState == HeroAniEnums.Death) return;
        this.playAnimation(HeroAniEnums.Death, false);
    }
    protected playAnimation(state: HeroAniEnums, loop: boolean): void {
        this.currentState = state;
        this._sk.play(state, loop);
    }

    public onDisable(): void {
        EventManager.offAllCaller(this);
    }

    // 是否已死亡
    protected _haveDeath: boolean = false;
    public get haveDeath(): boolean {
        return this._haveDeath;
    }
    // 能否被攻击
    protected _canHit: boolean = true;
    public get canHit(): boolean {
        return this._canHit && !this._haveDeath;
    }

    // 敌人死亡
    protected enemyDeath(): void {
        Game.battleScene.enemyList.splice(1, 0);
        this._haveDeath = true;
        if (this.blood) {
            // 回收血条
            Pools.recycle(this.blood)
            this.blood = null;
        }
        if (this.shadow) {
            // 回收血条
            Pools.recycle(this.shadow)
            this.shadow = null;
        }
        this.playDeath();
    }
    public addClearEvent(): void {
        EventManager.on(EventKey.GAMEWIN, this, this.clearThis);
        EventManager.on(EventKey.GAMEEXIT, this, this.clearThis);
        EventManager.on(EventKey.GAMELOSE, this, this.clearThis);
    }
    public clearThis() {
        this._haveDeath = true;
        if (this.blood) {
            // 回收血条
            Pools.recycle(this.blood)
            this.blood = null;
        }
        if (this.shadow) {
            // 回收血条
            Pools.recycle(this.shadow)
            this.shadow = null;
        }
        Pools.skRecycle(this.sk);
        this.destroy();
    }

    // 受击特效
    public addBattleEffect(id: number, loop: boolean): BattleEffectEnemy {
        let key: string = "" + id;
        let _effect: BattleEffectEnemy = null;
        if (this.battleEffectList.hasKey(key)) {
            _effect = this.battleEffectList.getValue(key);
            let _style: Laya.SpriteStyle = _effect.getStyle();
            if (_style) {
                _effect.replay(loop);
            } else {
                Pools.skRecycle(_effect.sk)
                _effect.destroy();
                _effect = null;
            }
        }
        if (_effect == null) {
            _effect = BattleEffectEnemy.create(id, loop, this.sk);
            this.battleEffectList.add(key, _effect);
        }
        let _size = 1;
        _effect.scale(_size, _size, true);
        _effect.sk.pos(0, -50);
        return _effect;
    }

}