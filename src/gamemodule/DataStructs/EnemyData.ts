import Point = Laya.Point;
import Game from "../../Game";
import MonsterInfo from "../../csvInfo/MonsterInfo";
import BattleSoldier from "../Models/BattleSoldier";
import { HaloType } from "../DataEnums/HaloType";
import EnemyBuff from "./EnemyBuff";
import BossSkillInfo from "../../csvInfo/BossSkillInfo";
import HurtBuff from "./HurtBuff";

export default class EnemyData {
    public constructor() { }


    private _monsterInf: MonsterInfo;
    public get monsterInf(): MonsterInfo {
        return this._monsterInf;
    }
    public set monsterInf(v: MonsterInfo) {
        this._monsterInf = v;
        if (this._monsterInf) {
            this.splits = this._monsterInf.split;
            this.resurrection = this._monsterInf.resurrection;
            let dif = Game.battleMap.waveDifEfficiency
            if (Game.battleMap.waveInfo.type == 1 || Game.battleMap.waveInfo.type == 2) {
                dif = 1;
            }
            this.curHp = this._monsterInf.hp * Game.battleMap.timeHouseVal * Game.battleMap._heroTypeInf.benchmark_atk * 0.01 * dif;
            this.maxHp = this.curHp;
            if (this.monsterInf.boss == 1) {
                console.log(this.monsterInf.id, this.monsterInf.skill_id);
            }
            if (this.monsterInf.skill_id > 0) {
                this.skillcd = 0;
                this.skill = BossSkillInfo.getInfo(this.monsterInf.skill_id);
            }
        }
    }


    private _initPos: number = 0;
    public get initPos(): number {
        return this._initPos;
    }
    public set initPos(v: number) {
        this._initPos = v;
    }

    public skill: BossSkillInfo = null;
    private skillcd: number = 0;
    public skillInfoGetReady(dt: number): boolean {
        this.skillcd -= dt;
        return this.skillcd <= 0;
    }
    public cast(): void {
        this.skillcd = this.skill.cooldown;
    }

    public actionBuff(buff: EnemyBuff): void {
        switch (buff.types) {
            case 1:
                {
                    //* 1, 加血 - 配合高爆
                    if (this.curHp > 0) {
                        let addHp = this.maxHp * buff.effectvalue * 0.01;
                        this.curHp += addHp;
                    }
                }
                break;
            case 2:
                {
                    // * 2, 加速 - 配合高频
                    this.buffAddSpeed = buff.effectvalue;
                }
                break;
            case 3:
                {
                    // * 3, 加防 - 配合均衡、高爆
                    this.buffAddDefine = buff.effectvalue;
                }
                break;
        }
    }
    public unActionBuff(buff: EnemyBuff): void {
        switch (buff.types) {
            case 2:
                {
                    // * 2, 加速 - 配合高频
                    this.buffAddSpeed -= buff.effectvalue;
                    if (this.buffAddSpeed < 0) this.buffAddSpeed = 0;
                }
                break;
            case 3:
                {
                    // * 3, 加防 - 配合均衡、高爆
                    this.buffAddDefine -= buff.effectvalue;
                    if (this.buffAddDefine < 0) this.buffAddDefine = 0;
                }
                break;
        }
    }
    /**
     * buff增加的速度
     */
    public buffAddSpeed: number = 0;
    /**
     * buff增加的防御
     */
    private buffAddDefine: number = 0;

    public hurtAction(buff: HurtBuff, curEnemy: BattleSoldier): void {
        switch (buff.types) {
            case HaloType.ReduceSpeed:
                {
                    this._speedScale = buff.effectvalue * 0.01;
                }
                break;
            case HaloType.Poisoning:
                {
                    curEnemy.buffHit(buff.effectvalue, buff.reduceDefene, buff.types, buff.duration);
                }
                break;
            case HaloType.BurningGround:
                {
                    curEnemy.buffHit(buff.effectvalue, buff.reduceDefene, HaloType.BurningGround, buff.duration);
                }
                break;
            case HaloType.Dizzines:
                {
                    this.isDizzines = true;
                }
                break;
        }
    }
    public unHurtAction(buff: HurtBuff): void {
        switch (buff.types) {
            case HaloType.ReduceSpeed:
                {
                    this._speedScale = 1;
                }
                break;
            case HaloType.Dizzines:
                {
                    this.isDizzines = false;
                }
                break;
        }
    }


    /*** 晕眩 ********************************  */
    public isDizzines: boolean = false;


    /*** 减速 ********************************  */

    private _speedScale: number = 1;
    // 移动比例
    public get moveSpeedScale(): number {
        return this._speedScale;
    }
    public set moveSpeedScale(v: number) {
        this._speedScale = v;
    }

    /****   以下技能buff相关    ********************************* */

    private _byCrit: number = 0;
    // 被暴击率增加
    public get byCrit(): number {
        return this._byCrit;
    }
    public set byCrit(v: number) {
        this._byCrit = v;
    }

    private _byBurst: number = 0;
    public get byBurst(): number {
        return this._byBurst;
    }
    public set byBurst(v: number) {
        this._byBurst = v;
    }


    // 分裂次数
    private _splits: number = 0;
    public get splits(): number {
        return this._splits;
    }
    public set splits(v: number) {
        this._splits = v;
    }
    // 复活次数
    private _resurrection: number = 0;
    public get resurrection(): number {
        return this._resurrection;
    }
    public set resurrection(v: number) {
        this._resurrection = v;
    }

    // 当前开启下一列的点的位置
    private _curStarIndex: number = 0;
    public get curStarIndex(): number {
        return this._curStarIndex;
    }
    public set curStarIndex(v: number) {
        this._curStarIndex = v;
    }
    // 上一列开启下一列的点的位置
    private _preStarIndex: number = 0;
    public get preStarIndex(): number {
        return this._preStarIndex;
    }
    public set preStarIndex(v: number) {
        this._preStarIndex = v;
    }

    // 当前移动点
    private _curMoveIndex: number = 0;
    public get curMoveIndex(): number {
        return this._curMoveIndex;
    }
    public set curMoveIndex(v: number) {
        this._curMoveIndex = v;
    }

    private _curMoveX: number = -1;
    /**
     * 当前处于那一列
     */
    public get curMoveX(): number {
        return this._curMoveX;
    }
    public set curMoveX(v: number) {
        this._curMoveX = v;
    }
    // 移动路径
    private _movePath: Array<Point>;
    public get movePath(): Array<Point> {
        return this._movePath;
    }
    public set movePath(v: Array<Point>) {
        this._movePath = v;
    }
    // 当前血量
    private _curHp: number = 0;
    public get curHp(): number {
        return this._curHp;
    }
    public set curHp(v: number) {
        if (v < 0) v = 0;
        this._curHp = v;
    }
    // 最大血量
    private _maxHp: number = 1;
    public get maxHp(): number {
        return this._maxHp;
    }
    public set maxHp(v: number) {
        this._maxHp = v;
        if (this._maxHp < 1) this._maxHp = 1;
    }
    /**
     * 防御系数，攻击值需要×这个值
     */
    public get defence() {
        let defen = (100 - this.monsterInf.defence) * 0.01;
        defen *= ((100 + this.buffAddDefine) * 0.01);
        return defen;
    }
    // 阴影大小
    private _shadowScales: Point;
    public get shadowScales(): Point {
        return this._shadowScales;
    }
    public set shadowScales(v: Point) {
        this._shadowScales = v;
    }


    // 复活敌人
    public resurrectionEnemy(): void {
        this.resurrection--;
        this.curHp = this.maxHp;
    }

    // 分裂敌人
    public static createSplitNew(old: EnemyData): EnemyData {
        let dat = new EnemyData;
        dat.monsterInf = MonsterInfo.getInfo(old.monsterInf.split_id);
        dat.curStarIndex = old.curStarIndex;
        dat.preStarIndex = old.preStarIndex;
        dat.curMoveIndex = old.curMoveIndex;
        dat.curMoveX = old.curMoveX;
        dat.movePath = old.movePath;
        dat.initPos = old.initPos;
        return dat;
    }


    public get interval(): number {
        return this.monsterInf.atk_speed;
    }

}