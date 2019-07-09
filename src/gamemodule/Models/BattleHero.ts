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
            var useSkillNum = canUserList.pop(); //优先使用特殊技能
            this.sk.scaleX = this.curEnemy.sk.x > this.sk.x ? 1 : -1;
            this.curHitEnemy = this.curEnemy;
            this.playAttack();
            this.attackSkillList[useSkillNum].cast();
        }
    }

    // 查找可攻击敌人
    findEnemy() {
        // 当前攻击敌人是否可继续攻击
        if (this.curEnemy != null && !this.curEnemy.canHit) {
            this.curEnemy = null;
        }
        // 此处需判断当前敌人是否在英雄的工具范围内
        if (this.curEnemy != null) {
            if (this.keyList.indexOf(this.curEnemy.atkRangIndex) == -1) {
                this.curEnemy = null;
            }
            else {
                return;
            }
        }
        if (Game.battleScene.atkCellDIc.count == 0) return;
        if (this.keyList.length == 0) {
            this.checkKeyList();
        }
        else {
            for (let i = 0, len = this.keyList.length; i < len; i++) {
                if (Game.battleScene.atkCellDIc.hasKey(this.keyList[i])) {
                    let list = Game.battleScene.atkCellDIc.getValue(this.keyList[i]);
                    if (list.length > 0) {
                        this.curEnemy = list[0] as BattleSoldier;
                        break;
                    }
                }
            }
        }
    }
    private checkKeyList(): void {
        // 一格攻击范围
        this.keyList = [];
        let ten0 = Math.floor(this._index % 3);
        let ten = 1;
        if (ten0 == 1) {
            ten = 3;
        }
        else if (ten0 == 2) {
            ten = 5;
        }
        if (this._index < 3) {
            let sim = 1;
            for (let i = 0; i < 9; i++) {
                this.keyList.push(ten * 10 + sim);
                sim += 2;
                if (sim > 5) {
                    ten++;
                    sim = 1;
                }
            }
        }
        else if (this._index < 6) {
            let sim = 0;
            for (let i = 0; i < 9; i++) {
                this.keyList.push(ten * 10 + sim);
                sim++;
                if (sim > 2) {
                    ten++;
                    sim = 0;
                }
            }
        }
        else {
            let sim = 2;
            for (let i = 0; i < 9; i++) {
                this.keyList.push(ten * 10 + sim);
                sim += 2;
                if (sim > 6) {
                    ten++;
                    sim = 2;
                }
            }
        }
        for (let i = 0, len = this.keyList.length; i < len; i++) {
            if (Game.battleScene.atkCellDIc.hasKey(this.keyList[i])) {
                let list = Game.battleScene.atkCellDIc.getValue(this.keyList[i]);
                if (list.length > 0) {
                    this.curEnemy = list[0] as BattleSoldier;
                    break;
                }
            }
        }
    }
    // 可攻击到的格子范围
    private keyList: number[] = [];

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
        Pools.skRecycle(this.sk);
        this.destroy();
    }

}