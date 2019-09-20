import { HaloType } from "../DataEnums/HaloType";
import TypedSignal from "../../tool/TypedSignal";
import HeroData from "./HeroData";
import Game from "../../Game";
import BattleSoldier from "../Models/BattleSoldier";
import EnemyData from "./EnemyData";
import BattleHero from "../Models/BattleHero";

/**
 * 光环
 */
export default class BattleHalo {

    private static _Instance: BattleHalo;
    static get Instance(): BattleHalo {
        if (!BattleHalo._Instance) {
            BattleHalo._Instance = new BattleHalo();
        }
        return BattleHalo._Instance;
    }
    // 附加英雄光环
    public sUpdateSign: TypedSignal<HeroData> = new TypedSignal<HeroData>();
    // 附加敌人光环
    public sUpdateSignEnemy: TypedSignal<EnemyData> = new TypedSignal<EnemyData>();
    // 增加石头血量
    public sUpdateStoneHp: TypedSignal<number> = new TypedSignal<number>();

    public init(): void {
        this.haloList = [];
        this.haloEnemy = [];
        this.sUpdateSign.add(this.addHalo, this);
        this.sUpdateSignEnemy.add(this.addEnemyHalo, this);
    }
    public unInit(): void {
        this.sUpdateSign.remove(this.addHalo, this);
        this.sUpdateSignEnemy.remove(this.addEnemyHalo, this);
        this.haloEnemy = [];
        this.haloList = [];
    }
    public addHalo(dat: HeroData): void {
        if (dat.burningGround > 0) {
            let halo = new Halo();
            halo._battleHero = dat._battleHero;
            halo.types = HaloType.BurningGround;
            halo.seatList = dat.keyList;
            halo.val = dat.curAp(0) * dat.burningGround * 0.01;
            halo.curReduceDefense = dat.curReduceDefense;
            this.haloList.push(halo);
        }
        if (dat.reduceSpeedHalo > 0) {
            let halo = new Halo();
            halo._battleHero = dat._battleHero;
            halo.types = HaloType.ReduceSpeed;
            halo.seatList = dat.keyList;
            halo.val = dat.reduceSpeedHalo;
            halo.curReduceDefense = dat.curReduceDefense;
            this.haloList.push(halo);
        }
        if (dat.noSkillHalo) {
            let halo = new Halo();
            halo._battleHero = dat._battleHero;
            halo.types = HaloType.NoSkill;
            halo.seatList = dat.keyList;
            halo.curReduceDefense = dat.curReduceDefense;
            this.haloList.push(halo);
        }
    }
    public addEnemyHalo(dat: EnemyData): void {

    }

    public haloList: Array<Halo> = [];
    public haloEnemy: Array<Halo> = [];


}

export class Halo {
    constructor() {
        this.curTime = 0;
        this.preTime = 0;
        this.interval = 2;
    }
    // 光环所在的英雄
    public _battleHero: BattleHero;
    // 光环类型
    public types: HaloType = HaloType.None;
    // 影响到的位置
    public seatList: Array<number> = [];
    // 持续时间 秒
    public duration: number = 0;
    // 间隔时间 秒
    public interval: number = 2;
    // 计时器
    public curTime: number = 0;
    // 上一秒时间
    public preTime: number = 0;
    // 伤害值
    public val: number = 0;
    // 减防
    public curReduceDefense: number = 0;

    public update(dt: number, curEnemy: BattleSoldier): void {
        this.curTime += dt;
        if (this.preTime + this.interval < this.curTime) {
            this.preTime = this.curTime;
            // 间隔时间到 生效一次
            switch (this.types) {
                case HaloType.BurningGround://灼烧场
                    {
                        Game.total.toastMsg("光环攻击灼烧场 伤害:" + Math.floor(this.val), true);
                        curEnemy.buffHit(this.val, this.curReduceDefense, HaloType.BurningGround, 1);
                    }
                    break;
            }
        }
    }
}