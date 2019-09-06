import { HeroAniEnums } from "../DataEnums/HeroAniEnums";
import Game from "../../Game";
import Point = Laya.Point;
import EnemyData from "../DataStructs/EnemyData";
import EventKey from "../../tool/EventKey";
import Dictionary from "../../tool/Dictionary";
import BattleHero from "./BattleHero";
import Pools from "../../tool/Pools";
import EventManager from "../../tool/EventManager";
import UI_Blood from "../../fgui/Extend/Battle/UI_Blood";
import UI_Shadow from "../../fgui/Extend/Battle/UI_Shadow";
import UI_Stone from "../../fgui/Extend/Battle/UI_Stone";
// import UI_DriftingBlood from "../../fgui/Extend/Battle/UI_DriftingBlood";
import { GameStatus } from "../DataEnums/GameStatus";
import Fun from "../../tool/Fun";
import { HaloType } from "../DataEnums/HaloType";
import { Halo } from "../DataStructs/BattleHalo";
import BattleBaseSK from "../../base/BattleBaseSK";
import BattleEffectEnemy from "./BattleEffectEnemy";
import EnemyBuff from "../DataStructs/EnemyBuff";
import HurtBuff from "../DataStructs/HurtBuff";
import { GuideType } from "../DataEnums/GuideType";

export default class BattleSoldier extends Laya.Sprite {
    public static create(initPos: number, isboss: boolean, monster: EnemyData, initPoint: Laya.Point = null): BattleSoldier {
        return new BattleSoldier(initPos, isboss, monster, initPoint);
    }
    private constructor(initPos: number, isboss: boolean, monster: EnemyData, initPoint: Laya.Point = null) {
        super();
        // 初始化时，清空buff列表
        this.soldierBuff = [];
        this.hurtBuff = [];
        this.initOver = false;
        this.dataInf = monster;
        let skid = this.dataInf.monsterInf.sk;
        if (Game.haveEnemyTem.indexOf(skid) == -1) {
            console.log("no sk -> sk:", skid, "  enemyId:", this.dataInf.monsterInf.id);
            skid = 3;
        }
        // this._sk = Pools.pops("enemy_" + skid);
        this._sk = BattleBaseSK.create("enemy_" + skid);
        if (this.dataInf.monsterInf.boss == 1) {
            this._sk.scale(-1, 1);
        }
        else {
            this._sk.scale(-0.7, 0.7);
        }
        this.dataInf.shadowScales = new Laya.Point(1.7, 1.7);

        this.playStand();
        this.addChild(this.sk);
        Game.parentObject.addChild(this);
        this.sk.addLableEvent(Laya.Handler.create(this, this.frameEvent));
        this.sk.addStopEvent(Laya.Handler.create(this, this.overEvent));
        // 添加阴影
        this.shadow = Pools.fetch(UI_Shadow);

        this.shadow.setScale(this.dataInf.shadowScales.x, this.dataInf.shadowScales.y);
        // this.addChild(this.shadow.displayObject);
        Game.shadowParent.addChild(this.shadow.displayObject);
        this.initPos = initPos;

        // 添加血条
        this.blood = Pools.fetch(UI_Blood);
        this.addChild(this.blood.displayObject);
        // Game.bloodParent.addChild(this.blood);
        this.blood.max = this.dataInf.curHp;
        this.blood.value = this.dataInf.maxHp;
        if (this.blood) {
            this.blood.setXY(0, - 100);
        }
        if (this.shadow) {
            this.shadow.setXY(0, 0);
        }
        this.init(initPoint);
    }

    protected _sk: BattleBaseSK = null;
    public get sk(): BattleBaseSK {
        return this._sk;
    }
    protected playStand(): void {
        this.playAnimation(HeroAniEnums.Stand, true);
    }
    protected playMove(): void {
        this.playAnimation(HeroAniEnums.Move, true);
    }
    protected playAttack(speed: number = 1): void {
        this.playAnimation(HeroAniEnums.Attack, false, speed);
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
    protected playAnimation(state: HeroAniEnums, loop: boolean, speed: number = 1): void {
        this.currentState = state;
        this._sk.speed = speed;
        this._sk.play(state, loop);
    }

    protected currentState = HeroAniEnums.None;
    // 出生点
    protected initPointTop: Point = new Point(1380, 480);
    protected initPointBom: Point = new Point(1380, 580);
    protected initPoint: Point = new Point();
    protected initPos: number = 0;
    // 下一个动作攻击
    protected nextAttack: HeroAniEnums = HeroAniEnums.None;
    // 基础移动点
    protected pathX: Array<number> = [1015, 795, 575, 355, 235];
    protected pathY: Array<number> = [280, 460, 480, 550, 580, 640, 800];
    // 血条
    protected blood: UI_Blood = null;
    // 脚下阴影
    protected shadow: UI_Shadow = null;

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
    /**
     * 触发的技能buff 持续性
     */
    public soldierBuff: Array<EnemyBuff> = [];
    /**
     * 触发的buff 间隔性触发
     */
    public hurtBuff: Array<HurtBuff> = [];
    // 敌人在那个攻击范围的格子内
    private _atkRangIndex: number = -1;
    public get atkRangIndex(): number {
        return this._atkRangIndex;
    }
    public set atkRangIndex(v: number) {
        this._atkRangIndex = v;
    }
    // update中的时间
    protected standTime: number = 0;

    // buff光环对速度的英雄
    private buffScaleSpeed: number = 1;
    private get speed() {
        return this.dataInf.monsterInf.move_speed * this.dataInf.moveSpeedScale * this.buffScaleSpeed * (100 + this.dataInf.buffAddSpeed) * 0.01;
    }

    private updatePos(x, y): void {
        this.pos(x, y);
        if (Game.playData.guideIndex == GuideType.fiveMoveHeroSeat && x < 682) {
            Game.playData.guideIndex = GuideType.fiveMoveHeroSeat2;
            Game.gameStatus = GameStatus.Pause;
            EventManager.event(EventKey.GUIDEMOVEHERO);
        }
        // if (this.blood) {
        //     this.blood.setXY(x, y - 100);
        // }
        if (this.shadow) {
            this.shadow.setXY(x, y);
        }
        // if (this.isActivation) {
        //     this.activationEff.sk.pos(x, y - 5);
        // }
    }

    private dataInf: EnemyData = null;
    private goalStone: UI_Stone = null;


    private init(initPoint) {
        this.dataInf.curHp = this.dataInf.maxHp;
        this.blood.value = this.dataInf.maxHp;
        this.blood.max = this.dataInf.maxHp;
        this._haveDeath = false;
        // this.blood.visible = false;
        if (this.initPos == 1) {
            this.initPoint = this.initPointTop;
        }
        else if (this.initPos == 0) {
            this.initPoint = this.initPointBom;
        }
        else {
            this.initPoint = initPoint;
        }
        this.updatePos(this.initPoint.x, this.initPoint.y);
        if (this.initPos != 2) {
            this.setMovePath();
        }
        else {
            this.initPos = this.dataInf.initPos;
            this.playMove();
            this.initOver = true;
        }
    }
    // 设置当前移动路径
    private setMovePath(): void {
        this.goalStone = null;
        this.dataInf.curMoveX++;
        if (this.dataInf.curMoveX >= 4) {
            // 到达终点，游戏失败
            EventManager.event(EventKey.GAMELOSE);
            return;
        }
        this.dataInf.movePath = [];
        this.dataInf.curMoveIndex = 0;
        let randomX = Game.battleMap.mathrandomBattle.random(10) * -1 - 5;
        let randomX2 = Game.battleMap.mathrandomBattle.random(10) + 5;
        let randomY = 0;
        if (this.dataInf.curMoveX == 0) {
            this.dataInf.movePath.push(this.initPoint);
            if (this.initPos == 1) {
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[2] + randomY));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[1] + randomY));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[0] + randomY));
            }
            else {
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX2, this.pathY[4] + randomY));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX2, this.pathY[5] + randomY));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX2, this.pathY[6] + randomY));
            }
        }
        else if (this.dataInf.curMoveX == 3) {
            if (this.dataInf.curStarIndex > 0) {
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[this.dataInf.curStarIndex] + randomY));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[3] + randomY));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX + 1] + randomX, this.pathY[3] + randomY));
            }
            else {
                let mmmtop = false;
                if (this.initPos == 1) {
                    mmmtop = this.dataInf.curMoveX % 2 == 1;
                }
                else {
                    mmmtop = this.dataInf.curMoveX % 2 == 0;
                }
                if (mmmtop) {
                    for (let i = 0, len = 4; i < len; i++) {
                        this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[i] + randomY));
                    }
                }
                else {
                    for (let i = this.pathY.length - 1; i >= 3; i--) {
                        this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX2, this.pathY[i] + randomY));
                    }
                }
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX + 1] + randomX, this.pathY[3] + randomY));
            }
        }
        else {
            let mmmtop = false;
            if (this.initPos == 1) {
                mmmtop = this.dataInf.curMoveX % 2 == 1;
            }
            else {
                mmmtop = this.dataInf.curMoveX % 2 == 0;
            }
            if (mmmtop) {
                for (let i = this.dataInf.curStarIndex, len = this.pathY.length; i < len; i++) {
                    this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX2, this.pathY[i] + randomY));
                }
            }
            else {
                let start = this.dataInf.curStarIndex > 0 ? this.dataInf.curStarIndex : this.pathY.length - 1;
                for (let i = start; i >= 0; i--) {
                    this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[i] + randomY));
                }
            }
        }
        this.dataInf.curStarIndex = 0;
        this.playMove();
        this.initOver = true;
    }
    private initOver: boolean = false;
    private isPause: boolean = false;
    private preStatus: HeroAniEnums = HeroAniEnums.None;
    public update(dt): void {
        dt = dt * 0.001;
        if (!this.initOver) return;
        if (this.dataInf == null || this.dataInf.curHp <= 0) {
            return;
        }
        // boss技能触发的buff
        for (let i = this.soldierBuff.length - 1; i >= 0; i--) {
            if (this.soldierBuff[i].update(dt)) {
                this.dataInf.unActionBuff(this.soldierBuff[i]);
                this.soldierBuff.splice(i, 1);
            }
        }
        // 英雄技能触发的buff
        for (let i = this.hurtBuff.length - 1; i >= 0; i--) {
            let buff = this.hurtBuff[i];
            let result = buff.update(dt);
            if (result == -1) {
                this.dataInf.unHurtAction(buff);
                this.hurtBuff.splice(i, 1);
            }
            else if (result == 1) {
                this.dataInf.hurtAction(buff, this);
            }
        }
        // 中毒特效
        if (this.poisoningEffectTime > 0) {
            this.poisoningEffectTime -= dt;
            if (this.poisoningEffectTime <= 0) {
                if (this.poisoningEffect) {
                    this.poisoningEffect.stopeAndHide();
                }
            }
        }
        // 灼烧特效
        if (this.burningGroundTime > 0) {
            this.burningGroundTime -= dt;
            if (this.burningGroundTime <= 0) {
                if (this.burningGroundEffect) {
                    this.burningGroundEffect.stopeAndHide();
                }
            }
        }
        let canSkill = this.dataInf.skillInfoGetReady(dt);
        this.sk.updateFilter();
        this.buffScaleSpeed = 1;
        if (Game.halo.haloList.length > 0) {
            for (let i = Game.halo.haloList.length - 1; i >= 0; i--) {
                let halo: Halo = Game.halo.haloList[i];
                // 处于光环范围内的敌人才生效
                if (halo.seatList.indexOf(this.atkRangIndex) != -1) {
                    switch (halo.types) {
                        case HaloType.BurningGround:
                            halo.update(dt, this);
                            break;
                        case HaloType.ReduceSpeed:
                            this.buffScaleSpeed = (100 - halo.val) * 0.01;
                            break;
                        case HaloType.NoSkill:
                            // 禁止释放技能  
                            canSkill = false;
                            break;
                    }
                }
            }
        }
        if (this.dataInf.isDizzines) {
            if (!this.isPause) {
                this.isPause = true;
                this.preStatus = this.currentState;
                // 晕眩中，无操作
                this.playStun();
            }
            return;
        }
        else {
            if (this.isPause) {
                this.isPause = false;
                this.currentState = this.preStatus;
                if (this.currentState == HeroAniEnums.Move) {
                    this.playMove(); 0
                }
            }
        }
        switch (this.currentState) {
            case HeroAniEnums.Move:
                {
                    // 移动
                    if (this.dataInf.curMoveIndex < this.dataInf.movePath.length) {
                        let disX: number = this.dataInf.movePath[this.dataInf.curMoveIndex].x - this.x;
                        let disY: number = this.dataInf.movePath[this.dataInf.curMoveIndex].y - this.y;
                        let dis: number = Math.pow(disX * disX + disY * disY, 0.5);
                        let temSpeed = this.speed * dt * 6;
                        if (dis > temSpeed) {
                            this.updatePos(this.x + disX * temSpeed / dis, this.y + disY * temSpeed / dis);
                        }
                        else {
                            let xx = this.dataInf.movePath[this.dataInf.curMoveIndex].x;
                            let yy = this.dataInf.movePath[this.dataInf.curMoveIndex].y;
                            this.updatePos(xx, yy);
                            let stone: UI_Stone = null;
                            if (xx > 500 && xx < 1100) {
                                let index = this.dataInf.curMoveX * 2;
                                if (Math.abs(yy - 460) < 50) {
                                    if (this.dataInf.preStarIndex != 1) {
                                        stone = Game.battleScene.stoneList[index];
                                        this.dataInf.curStarIndex = 1;
                                        this.dataInf.preStarIndex = 1;
                                    }
                                }
                                else if (Math.abs(yy - 640) < 50) {
                                    if (this.dataInf.preStarIndex != 5) {
                                        stone = Game.battleScene.stoneList[index + 1];
                                        this.dataInf.curStarIndex = 5;
                                        this.dataInf.preStarIndex = 5;
                                    }
                                }
                            }
                            if (Math.floor(Game.battleMap.mathrandomBattle.random(3)) == 1) {
                                if (stone && !stone.breaked && this.dataInf.monsterInf.atk > 0) {
                                    this.goalStone = stone;
                                    this.standTime = 0;
                                    this.playAttack();
                                }
                                else {
                                    if (stone && stone.breaked) {
                                        this.currentState = HeroAniEnums.None;
                                        this.setMovePath();
                                    }
                                    else {
                                        this.dataInf.curMoveIndex++;
                                    }
                                }
                            }
                            else {
                                this.dataInf.curMoveIndex++;
                            }
                        }
                    }
                    else {
                        this.currentState = HeroAniEnums.None;
                        this.dataInf.curStarIndex = 0;
                        this.setMovePath();
                    }
                }
                break;
            case HeroAniEnums.Attack:
                {
                    if (this.goalStone == null || this.goalStone.breaked) {
                        break;
                    }
                    else {
                        // 攻击
                        this.standTime += dt;
                        if (this.standTime >= this.dataInf.interval) {
                            this.standTime = 0;
                            this.playAttack();
                        }
                    }
                }
                break;
            case HeroAniEnums.Stand:
                if (this.goalStone == null || this.goalStone.breaked) {
                    this.currentState = HeroAniEnums.None;
                    this.setMovePath();
                } else {
                    this.standTime += dt;
                    if (this.standTime >= this.dataInf.interval) {
                        this.playAttack();
                    }
                }
                break;
        }
        if (this.x <= 1200 && this.dataInf.skill && canSkill) {
            if (this.currentState == HeroAniEnums.Stand || this.currentState == HeroAniEnums.Move) {
                console.error("=====敌人释放技能");
                this.dataInf.cast();
                this.playCast();
            }
        }
    }
    // 敌人死亡
    protected enemyDeath(): void {
        this.sk.clearFilters();
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
        if (Game.playData.guideDeathEnemy >= 0) {
            Game.playData.guideDeathEnemy++;
        }
        // 清除集火特效
        if (this.activationEff) {
            this.activationEff.removeNum();
        }
        this.playDeath();
    }
    public addClearEvent(): void {
        EventManager.on(EventKey.GAMEWIN, this, this.enemyDeath);
        EventManager.on(EventKey.GAMEEXIT, this, this.enemyDeath);
        EventManager.on(EventKey.GAMELOSE, this, this.enemyDeath);
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
        // Pools.pushs(this.sk);
        this.sk.destroy();
        let effList = this.battleEffectList.getValues();
        for (let i = effList.length - 1; i >= 0; i--) {
            if (effList[i]) {
                effList[i].sk.destroy();
                effList[i].destroy();
                effList[i] = null;
            }
        }
        this.battleEffectList.clear();
        // if (this._node) {
        //     Pools.recycle(this._node);
        // }
        this.destroy();
    }


    private overEvent(): void {
        switch (this.currentState) {
            case HeroAniEnums.Death:
                {
                    if (Game.gameStatus == GameStatus.Gaming) {
                        if (this.dataInf.resurrection > 0) {
                            this.dataInf.resurrectionEnemy();
                            let point1: Laya.Point = new Laya.Point(this.x + Game.battleMap.mathrandomBattle.random(20) - 10, this.y);
                            Game.battleScene.createEnemy(2, true, this.dataInf, point1);
                        }
                        else if (this.dataInf.monsterInf.split > 0) {
                            for (let i = 0; i < this.dataInf.monsterInf.split; i++) {
                                let data1 = EnemyData.createSplitNew(this.dataInf);
                                let point1: Laya.Point = new Laya.Point(this.x + Game.battleMap.mathrandomBattle.random(20) - 10, this.y);
                                Game.battleScene.createEnemy(2, true, data1, point1);
                            }
                        }
                    }
                    this.clearThis();
                }
                break;
            case HeroAniEnums.Attack:
                {
                    if (this.goalStone == null || this.goalStone.breaked) {
                        this.currentState = HeroAniEnums.None;
                        this.setMovePath();
                    }
                    else if (this.dataInf.interval > 0) {
                        this.standTime = 0;
                        this.playStand();
                    }
                    else {
                        this.playAttack();
                    }
                }
                break;
            case HeroAniEnums.Skill:
                {
                    if (this.skillPrevState == HeroAniEnums.Stand) {
                        this.playStand();
                    } else if (this.skillPrevState == HeroAniEnums.Move) {
                        this.playMove();
                    } else if (this.skillPrevState == HeroAniEnums.Attack) {
                        this.playStand();
                    } else {
                        this.playMove();
                    }
                }
                break;
        }
    }
    private frameEvent(event: Laya.EventData): void {
        if (event.name == "cast_time") {
            switch (this.currentState) {
                case HeroAniEnums.Attack:
                    this.hitStone();
                    break;
                case HeroAniEnums.Skill:
                    // 释放技能    
                    {
                        let buff = EnemyBuff.create(this.dataInf.skill.types, this.dataInf.skill.effecttime, this.dataInf.skill.effectvalue);
                        switch (this.dataInf.skill.types) {
                            case 1:
                            case 2:
                            case 3:
                                {
                                    //* 1, 加血 - 配合高爆
                                    for (let i = Game.battleScene.enemyList.length - 1; i >= 0; i--) {
                                        var enemy = Game.battleScene.enemyList[i];
                                        if (enemy && !enemy.haveDeath) {
                                            enemy.dataInf.actionBuff(buff);
                                            enemy.soldierBuff.push(buff);
                                        }
                                    }
                                }
                                break;
                            case 4:
                            case 5:
                                {
                                    // * 5, 减攻击 - 配合高爆
                                    for (let i = Game.battleScene.heroList.length - 1; i >= 0; i--) {
                                        var hero: BattleHero = Game.battleScene.heroList[i] as BattleHero;
                                        if (hero) {
                                            hero.dataInf.actionBuff(buff);
                                            hero.soldierBuff.push(buff);
                                        }
                                    }
                                }
                                break;
                        }
                    }
                    break;
            }
        }
    }
    // 攻击石头
    private hitStone(): void {
        if (this.goalStone && !this.goalStone.breaked) {
            this.goalStone.hit(this.dataInf.monsterInf.atk);
        }
    }
    // 受到攻击
    public skillHit(hero: BattleHero, userSkill: number) {
        if (this.dataInf.curHp <= 0) {
            return;
        }
        if (Game.gameStatus != GameStatus.Gaming) {
            return;
        }
        // this.addBattleEffect(1, false).removeNum();// 移除
        if (this.blood) {
            this.blood.visible = true;
            // 技能判断
            // 减速加伤{0}%
            let additionalSub: number = 0;
            // 灼烧加伤
            let burnSub: number = 0;
            // 残血斩杀
            let secondsKill: boolean = false;
            let repel: boolean = false;

            let heroSkillinf = hero.dataInf.attackSkillList[userSkill];
            this.addBattleEffect(heroSkillinf.hiteffect_id, false);
            switch (heroSkillinf.types) {
                case 2: //  2、高暴率buff，敌人身上buff，被暴击率 + {specialvalue}%，不可叠加，永不消失     
                    {
                        this.dataInf.byCrit = heroSkillinf.specialvalue;
                    }
                    break;
                case 6: //  6、减速加伤   正常敌人，正常伤害，  被减速的敌人，造成正常伤害，再额外加伤害{0}
                    {
                        if (this.dataInf.moveSpeedScale < 1) {
                            additionalSub = heroSkillinf.specialvalue;
                        }
                    }
                    break;
                case 7: //  7、灼烧加伤   同上  
                    {
                        for (let i = this.hurtBuff.length - 1; i >= 0; i--) {
                            if (this.hurtBuff[i].types == HaloType.BurningGround) {
                                burnSub = heroSkillinf.specialvalue;
                            }
                        }
                    }
                    break;
                case 8: //  8、残血斩杀      敌人血量低于{0}%，秒杀，否则正常伤害
                    {
                        if (this.dataInf.curHp < this.dataInf.maxHp * heroSkillinf.specialvalue * 0.01) {
                            secondsKill = true;
                        }
                    }
                    break;
                case 9: //  9、高爆伤buff1（施加在敌人身上，使其收到额外伤害）   敌人身上buff，被暴击伤害 + {0}%，不可叠加，永不消失
                    {
                        this.dataInf.byBurst = heroSkillinf.specialvalue;
                    }
                    break;
                case 12:    //  12、芭蕉扇（击退/击飞敌人）      击退2格
                    {
                        repel = true;
                    }
                    break;
            }
            let _crit: number = 1;
            let sub: number = 0;
            if (secondsKill) {
                sub = this.dataInf.curHp;
            }
            else {
                // 受伤害
                let defence = this.dataInf.defence - hero.dataInf.curReduceDefense;
                if (defence < 0) defence = 0;
                sub = hero.dataInf.curAp(userSkill) * (100 - this.dataInf.defence) * 0.01;

                if (/*!Game.playData.newbie &&*/ hero.dataInf.curCrit(this.dataInf.byCrit, userSkill)) {
                    _crit = hero.dataInf.curBurst(this.dataInf.byBurst, userSkill);
                }
                sub *= _crit;
                sub = Math.floor(sub * (100 + additionalSub) * 0.01 * (100 + burnSub) * 0.01);
            }
            // 飘血
            this.dropBlood(sub, _crit);
            this.dataInf.curHp -= sub;
            this.blood.value = this.dataInf.curHp;
            if (this.dataInf.curHp <= 0) {
                this.enemyDeath();
            }
            else {
                if (Game.playData.gameSpeed < 1.5) {
                    this.sk.addTimerFilter("10", 6);
                    this.sk.addTimerFilter("4", 3);
                }
                // 附加状态
                // 减速
                let reduce = hero.dataInf.reduceEnemyMoveSpeedTime(userSkill);
                if (reduce > 0) {
                    let buff = HurtBuff.create(HaloType.ReduceSpeed, reduce, 50, 0, -1);
                    this.hurtBuff.push(buff);
                    this.sk.addTimerFilter("9", Math.round(reduce / 16.667));
                }
                // 中毒
                let pois = hero.dataInf.poisoningTime(userSkill);
                if (pois > 0) {
                    if (this.poisoningEffectTime < pois) {
                        this.poisoningEffectTime = pois;
                        if (this.poisoningEffect == null) {
                            this.poisoningEffect = this.addBattleEffect(1017, true);
                        }
                        else {
                            this.poisoningEffect.replay(true);
                        }
                    }
                    let buff = HurtBuff.create(HaloType.Poisoning, pois, sub * 0.1, hero.dataInf.curReduceDefense);
                    this.hurtBuff.push(buff);
                }
                // 晕眩
                let dizz = hero.dataInf.dizzinessTime(userSkill);
                if (dizz > 0) {
                    let buff = HurtBuff.create(HaloType.Dizzines, dizz, 0, 0, -1);
                    this.hurtBuff.push(buff);
                }
                // 灼烧
                let burn = hero.dataInf.burnHurt(userSkill);
                if (burn > 0) {
                    if (this.burningGroundTime < burn) {
                        this.burningGroundTime = burn;
                        if (this.burningGroundEffect == null) {
                            this.burningGroundEffect = this.addBattleEffect(1015, true);
                        }
                        else {
                            this.burningGroundEffect.replay(true);
                        }
                    }
                    let buff = HurtBuff.create(HaloType.BurningGround, burn, sub * 0.1, hero.dataInf.curReduceDefense);
                    this.hurtBuff.push(buff);
                }
                // 击退
                if (repel) {
                    // 需要重新计算怪物的移动路径
                    switch (this.atkRangIndex) {
                        case 0:
                            {
                                this.updatePos(this.pathX[4], this.y);
                                this.repelSetMovePath(3, 0);
                            }
                            break;
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                            {
                                this.updatePos(this.pathX[2], this.y);
                                this.repelSetMovePath(2, this.atkRangIndex);
                            }
                            break;
                        case 15:
                        case 16:
                            {
                                this.updatePos(this.pathX[2], this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 21:
                        case 22:
                            {
                                this.updatePos(this.pathX[2] + 110, this.y);
                                this.repelSetMovePath(2, this.atkRangIndex);
                            }
                            break;
                        case 25:
                        case 26:
                            {
                                this.updatePos(this.pathX[2] + 110, this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 20:
                        case 23:
                        case 24:
                            {
                                this.updatePos(this.pathX[2], this.y);
                                this.repelSetMovePath(2, this.atkRangIndex);
                            }
                            break;
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                            {
                                this.updatePos(this.pathX[1], this.y);
                                this.repelSetMovePath(1, this.atkRangIndex);
                            }
                            break;
                        case 35:
                        case 36:
                            {
                                this.updatePos(this.pathX[1], this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 41:
                        case 42:
                            {
                                this.updatePos(this.pathX[1] + 110, this.y);
                                this.repelSetMovePath(1, this.atkRangIndex);
                            }
                            break;
                        case 45:
                        case 46:
                            {
                                this.updatePos(this.pathX[1] + 110, this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 40:
                        case 43:
                        case 44:
                            {
                                this.updatePos(this.pathX[1], this.y);
                                this.repelSetMovePath(1, this.atkRangIndex);
                            }
                            break;
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                            {
                                this.updatePos(this.pathX[0], this.y);
                                this.repelSetMovePath(0, this.atkRangIndex);
                            }
                            break;
                        case 55:
                        case 56:
                            {
                                this.updatePos(this.pathX[0], this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 61:
                        case 62:
                        case 63:
                        case 64:
                            {
                                this.updatePos(this.pathX[0], this.y);
                                this.repelSetMovePath(0, this.atkRangIndex);
                            }
                            break;
                        case 65:
                        case 66:
                            {
                                this.updatePos(this.pathX[0], this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 60:
                            {
                                this.updatePos(this.pathX[0] + 110, this.y);
                                this.repelSetMovePath(0, this.atkRangIndex);
                            }
                            break;
                        case 70:
                            {
                                this.updatePos(this.pathX[0] + 220, this.y);
                                this.repelSetMovePath(0, this.atkRangIndex);
                            }
                            break;
                    }
                }
            }
        }
    }
    public buffHit(hitVal: number, curReduceDefense: number, haloType: HaloType = HaloType.None, durTime: number = 0): void {
        if (haloType != HaloType.None && durTime > 0) {
            // 添加对应受击特效
            switch (haloType) {
                case HaloType.Poisoning:
                    {
                        if (this.poisoningEffectTime < durTime) {
                            this.poisoningEffectTime = durTime;
                            if (this.poisoningEffect == null) {
                                this.poisoningEffect = this.addBattleEffect(1017, true);
                            }
                            else {
                                this.poisoningEffect.replay(true);
                            }
                        }
                    }
                    break;
                case HaloType.BurningGround:
                    {
                        if (this.burningGroundTime < durTime) {
                            this.burningGroundTime = durTime;
                            if (this.burningGroundEffect == null) {
                                this.burningGroundEffect = this.addBattleEffect(1015, true);
                            }
                            else {
                                this.burningGroundEffect.replay(true);
                            }
                        }
                    }
                    break;
            }
        }
        let defence = this.dataInf.defence - curReduceDefense;
        if (defence < 0) defence = 0;
        hitVal = hitVal * (100 - this.dataInf.defence) * 0.01;
        this.dataInf.curHp -= hitVal;
        if (this.blood) {
            this.blood.visible = true;
            this.dropBlood(hitVal);
            this.blood.value = this.dataInf.curHp;
        }
        if (this.dataInf.curHp <= 0) {
            this.enemyDeath();
        }
    }

    private dropBlood(sub: number, _crit: number = 1): void {
        // 飘血
        // let drop = Pools.fetch(UI_DriftingBlood);
        // this.blood.addChild(drop);
        // drop.setXY(0, 80);
        // if (_crit > 1) {
        //     drop.m_c1.setSelectedIndex(1);
        // }
        // else {
        //     drop.m_c1.setSelectedIndex(0);
        // }
        let subStr = Fun.formatNumberUnitBattle(Math.max(sub, 1));
        // drop.title = subStr;
        // drop.m_t0.play(Laya.Handler.create(this, () => {
        //     Pools.recycle(drop);
        // }), 1);
        var txt: Laya.Text;
        if (Game.playData.gameSpeed > 1.5 && this.hpTxt) {
            txt = this.hpTxt;
            txt.scale(1, 1, true);
            txt.alpha = 1;
            Laya.Tween.clearAll(txt);
        } else {
            txt = new Laya.Text();
            this.addChild(txt);
        }
        // txt.fontSize = 30;
        if (sub < 0) {
            txt.font = "num_battle_3";
        }
        else if (_crit > 1) {
            subStr = "B" + subStr;
            txt.font = "num_battle_2";
        } else {
            txt.font = "num_battle_1";
        }
        txt.text = subStr;
        txt.pivotX = txt.width / 2;
        txt.y = -100;
        Laya.Tween.to(txt, { y: -150 }, 500, null, null);
        if (Game.playData.gameSpeed > 1.5) {
            this.hpTxt = txt;
            Laya.Tween.to(txt, { scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 300, null, Laya.Handler.create(this, this.hpRemove), 500);
        } else {
            Laya.Tween.to(txt, { scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 300, null, Laya.Handler.create(txt, txt.destroy), 500);
        }
    }
    private hpTxt: Laya.Text = null;
    private hpRemove(): void {
        this.hpTxt.destroy();
        this.hpTxt = null;
    }

    /**
     * 击退后设置当前移动路径
     * @param repelX 被击退到那一列
     * @param repelY 当前处于哪一行
     */
    private repelSetMovePath(repelX: number, repelY: number): void {
        this.currentState = HeroAniEnums.None;
        let curY = 0;
        let curyy = repelY % 10;
        switch (curyy) {
            case 0:
                curY = 3;
                break;
            case 1:
                curY = 2;
                break;
            case 2:
                curY = 4;
                break;
            case 3:
                curY = 1;
                break;
            case 4:
                curY = 5;
                break;
            case 5:
                curY = 0;
                break;
            case 6:
                curY = 6;
                break;
        }
        this.goalStone = null;
        this.dataInf.curMoveX = repelX;
        this.dataInf.movePath = [];
        this.dataInf.curMoveIndex = 0;
        let randomX = Game.battleMap.mathrandomBattle.random(20) - 10;
        let randomY = 0;
        if (this.dataInf.curMoveX == 0) {
            // 除了出生的，其他路径均要行走
            if (this.initPos == 1) {
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[0] + randomY));
            }
            else {
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[6] + randomY));
            }
        }
        else if (this.dataInf.curMoveX == 3) {
            // 直接移动到终点
            this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX + 1] + randomX, this.pathY[3] + randomY));
        }
        else {
            let mmmtop = false;
            if (this.initPos == 1) {
                mmmtop = this.dataInf.curMoveX % 2 == 1;
            }
            else {
                mmmtop = this.dataInf.curMoveX % 2 == 0;
            }
            if (mmmtop) {
                for (let i = curY + 1, len = this.pathY.length; i < len; i++) {
                    this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[i] + randomY));
                }
            }
            else {
                let start = curY > 0 ? curY : this.pathY.length - 1;
                for (let i = start - 1; i >= 0; i--) {
                    this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX] + randomX, this.pathY[i] + randomY));
                }
            }
        }
        this.dataInf.curStarIndex = 0;
        this.playMove();
    }

    /**
     * 中毒持续时间
     */
    private poisoningEffectTime: number = 0;
    /**
     * 中毒特效
     */
    private poisoningEffect: BattleEffectEnemy = null;
    /**
     * 灼烧持续时间
     */
    private burningGroundTime: number = 0;
    /**
     * 灼烧特效
     */
    private burningGroundEffect: BattleEffectEnemy = null;

    // 战斗特效列表
    protected battleEffectList: Dictionary<string, BattleEffectEnemy> = new Dictionary<string, BattleEffectEnemy>();
    // 受击特效
    public addBattleEffect(id: number, loop: boolean): BattleEffectEnemy {
        let key: string = String(id);
        let _effect: BattleEffectEnemy = null;
        if (this.battleEffectList.hasKey(key)) {
            _effect = this.battleEffectList.getValue(key);
            let _style: Laya.SpriteStyle = _effect.getStyle();
            if (_style) {
                _effect.replay(loop);
            } else {
                _effect.sk.destroy();
                _effect.destroy();
                _effect = null;
            }
        }
        if (_effect == null) {
            _effect = BattleEffectEnemy.create(id, loop);
            this.addChild(_effect.sk);
            this.battleEffectList.add(key, _effect);
        }
        let _size = 0.5;
        _effect.sk.scale(_size, _size, true);
        return _effect;
    }
    protected activationEff: BattleEffectEnemy = null;
    // 是否被激火
    public activationBy(v: boolean): void {
        if (v) {
            if (this.activationEff == null) {
                this.activationEff = this.addBattleEffect(3, true);
                this.activationEff.sk.pos(0, -50);
            }
            else {
                this.activationEff.replay(true);
            }
        }
        else {
            if (this.activationEff) {
                this.activationEff.stopeAndHide();
            }
        }
    }

}