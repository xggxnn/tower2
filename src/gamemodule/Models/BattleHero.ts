import BaseSK from "../../base/BaseSK";
import { HeroAniEnums } from "../DataEnums/HeroAniEnums";
import Game from "../../Game";
import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import BattleSoldier from "./BattleSoldier";
import Dictionary from "../../Tool/Dictionary";
import Pools from "../../Tool/Pools";
import { HeroEnemyDis } from "../DataEnums/HeroEnemyDis";
import Fun from "../../Tool/Fun";
import BattleSkillAttack from "./BattleSkillAttack";
import BattleModel from "./BattleModel";
import BattleSkillHalo from "./BattleSkillHalo";

export default class BattleHero extends BattleModel {
    public static create(id: string | number, index: number | string): BattleHero {
        return new BattleHero(id, index);
    }
    private constructor(id: string | number, index: number | string) {
        super(true);
        this._id = 12;//id;
        this._index = Number(index);
        this._sk = Pools.skFetch("hero_" + this._id);
        this.sk.addStopEvent(Laya.Handler.create(this, this.overEvent));
        this.sk.addLableEvent(Laya.Handler.create(this, this.frameEvent));
        Game.parentObject.addChild(this.sk);

        this.interval = 1500 + Math.random() * 1000;
        this.attackSkillList[0] = BattleSkillAttack.create(0);
        this.init();
        EventManager.event(EventKey.ADD_HERO, [index, this]);
    }
    private interval: number = 0;
    private _id: string | number;
    private _index: number;
    public get index(): number {
        return this._index;
    }
    private posX: number = 0;
    private posY: number = 0;
    // 当前可攻击列表
    private attackList: Array<BattleSoldier> = [];
    // 可攻击列表敌人相对于英雄的关系
    private enemyTypeList: Dictionary<HeroEnemyDis, BattleSoldier> = new Dictionary<HeroEnemyDis, BattleSoldier>();
    // 当前正在攻击的敌人
    private curEnemy: BattleSoldier = null;
    // 当前已经攻击的敌人
    private curHitEnemy: BattleSoldier = null;
    // 技能列表
    private attackSkillList: Array<BattleSkillAttack> = [null, null];
    private haloSkillList: Array<BattleSkillHalo> = [null, null];
    public get haloList(): Array<BattleSkillHalo> {
        return this.haloSkillList;
    }

    private init() {
        this.playStand();
        this.posX = 458 + Math.floor(this._index % 3) * 224;
        this.posY = 361 + Math.floor(this._index / 3) * 162;
        this.sk.pos(this.posX, this.posY);
    }

    public update(dt): void {
        super.update(dt);
        this.findEnemy();

        let canUserList: Array<number> = [];
        for (let i = 0; i < this.attackSkillList.length; i++) {
            if (this.attackSkillList[i] != null) {
                var attackSkill: BattleSkillAttack = this.attackSkillList[i];
                if (attackSkill.getReady(dt)) {
                    canUserList.push(i);
                }
            }
        }

        if (this.currentState == HeroAniEnums.Attack || this.currentState == HeroAniEnums.Skill) {
            this.standTime += dt;
            if (this.standTime > this.interval) {
                this.playStand();
            }
            return;
        }
        else {
            this.standTime = 0;
        }

        if (this.currentState != HeroAniEnums.Stand) return;

        if (this.curEnemy != null && canUserList.length) {
            var useSkillNum = canUserList.pop();//优先使用特殊技能
            this.sk.scaleX = this.curEnemy.sk.x > this.sk.x ? 1 : -1;
            this.curHitEnemy = this.curEnemy;
            this.playAttack();
            this.attackSkillList[useSkillNum].cast();
        }
    }

    // 查找可攻击敌人
    findEnemy() {
        // 当前攻击敌人是否可继续攻击
        if (this.curEnemy != null && !this.curEnemy.haveDeath && this.enemyInAttackRange(this.curEnemy)) {
            return;
        }
        this.curEnemy = null;
        // 遍历查找可攻击敌人
        this.attackList = [];
        this.enemyTypeList.clear();
        for (let i = Game.battleScene.enemyList.length - 1; i >= 0; i--) {
            let soldier = Game.battleScene.enemyList[i] as BattleSoldier;
            if (soldier && !soldier.haveDeath && soldier.canHit && this.enemyInAttackRange(soldier)) {
                this.attackList.push(soldier);
            }
        }
        if (this.attackList.length < 1) {
            return;
        }
        else if (this.attackList.length == 1) {
            this.curEnemy = this.attackList[0];
        }
        else {
            this.enemyHeroDis();
        }
    }
    // 敌人是否在英雄攻击范围内
    enemyInAttackRange(enemy: BattleSoldier): boolean {
        let skx = enemy.sk.x;
        let sky = enemy.sk.y;
        if (Math.abs(this.posX - skx) < 182 && Math.abs(this.posY - sky) < 125) {
            return true;
        }
        return false;
    }
    // 敌人相对于英雄的关系
    enemyHeroDis(): void {
        for (let i = 0, len = this.attackList.length; i < len; i++) {
            let item = this.attackList[i];
            // 最危险，也就是最快能到达终点的
            if (this.enemyTypeList.hasKey(HeroEnemyDis.Danger)) {
                let item2 = this.enemyTypeList.getValue(HeroEnemyDis.Danger);
                if (item.sk.x < item2.sk.x) {
                    this.enemyTypeList.set(HeroEnemyDis.Danger, item);
                }
            }
            else {
                this.enemyTypeList.add(HeroEnemyDis.Danger, item);
            }
            // // 距离自己最近
            // if (this.enemyTypeList.hasKey(HeroEnemyDis.MinDis)) {
            //     let item2 = this.enemyTypeList.getValue(HeroEnemyDis.MinDis);
            //     let dis1 = Fun.twoPositionDistance(item.sk.x, item.sk.y, this.sk.x, this.sk.y)
            //     let dis2 = Fun.twoPositionDistance(item2.sk.x, item2.sk.y, this.sk.x, this.sk.y)
            //     if (dis1 < dis2) {
            //         this.enemyTypeList.set(HeroEnemyDis.MinDis, item);
            //     }
            // }
            // else {
            //     this.enemyTypeList.add(HeroEnemyDis.MinDis, item);
            // }
            // // 距离自己最远
            // if (this.enemyTypeList.hasKey(HeroEnemyDis.MaxDis)) {
            //     let item2 = this.enemyTypeList.getValue(HeroEnemyDis.MaxDis);
            //     let dis1 = Fun.twoPositionDistance(item.sk.x, item.sk.y, this.sk.x, this.sk.y)
            //     let dis2 = Fun.twoPositionDistance(item2.sk.x, item2.sk.y, this.sk.x, this.sk.y)
            //     if (dis1 > dis2) {
            //         this.enemyTypeList.set(HeroEnemyDis.MaxDis, item);
            //     }
            // }
            // else {
            //     this.enemyTypeList.add(HeroEnemyDis.MaxDis, item);
            // }
        }
        // 攻击 最危险，也就是最快能到达终点的
        this.curEnemy = this.enemyTypeList.getValue(HeroEnemyDis.Danger);
    }


    private overEvent(): void {
        if (this.currentState != HeroAniEnums.Attack && this.currentState != HeroAniEnums.Skill) return;
        this.playStand();
    }
    private frameEvent(event: Laya.EventData): void {
        if (this.curHitEnemy == null || this.curHitEnemy.haveDeath) return;
        if (event.name == "cast_time") {
            this.curHitEnemy.skillHit(this);
        }
    }

    public removeThis(): void {
        EventManager.event(EventKey.ADD_HERO, [this._index, this]);
        EventManager.offAllCaller(this);
        this.curEnemy = null;
        this.attackList = [];
        this.enemyTypeList.clear();
        Pools.skRecycle(this.sk);
        this.destroy();
    }

}