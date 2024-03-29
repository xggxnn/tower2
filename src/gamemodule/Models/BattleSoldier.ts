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
    public static create(initPos: number, isboss: boolean, monster: EnemyData, initPoint: Point = null): BattleSoldier {
        return new BattleSoldier(initPos, isboss, monster, initPoint);
    }
    private constructor(initPos: number, isboss: boolean, monster: EnemyData, initPoint: Point = null) {
        super();
        Game.battleMap.sUpdateExitBattleMain.add(this.clearThis, this);
        this._showEffectAndClear = false;
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
        this._sk = BattleBaseSK.create("enemy_" + skid);
        if (this.dataInf.monsterInf.boss == 1) {
            this._sk.scale(-1, 1);
            this.skScaleX = -1;
            this.skScaleY = 1;
        }
        else {
            this._sk.scale(-0.7, 0.7);
            this.skScaleX = -0.7;
            this.skScaleY = 0.7;
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
        Game.shadowParent.addChild(this.shadow.displayObject);
        this.initPos = initPos;

        // 添加血条
        this.blood = Pools.fetch(UI_Blood);
        this.addChild(this.blood.displayObject);
        this.blood.max = this.dataInf.curHp;
        this.blood.value = this.dataInf.maxHp;
        if (this.blood) {
            this.blood.setXY(0, - 100);
        }
        if (this.shadow) {
            this.shadow.setXY(0, 0);
        }
        this.bossStand = false;
        for (let i = 1; i < 6; i++) {
            this.huoyanPos(i);
        }
        if (this.dataInf.monsterInf.sk == 40 || this.dataInf.monsterInf.sk == 41 || this.dataInf.monsterInf.sk == 42 || this.dataInf.monsterInf.sk == 43) {
            if (this.dataInf.resurrection > 0) {
                let huoPos = this.huoyanPos(this.dataInf.resurrection);
                for (let i = 0; i < this.dataInf.resurrection; i++) {
                    let huoyan = this.addBattleEffectDouble(1031, true);
                    huoyan.sk.pos(huoPos[i].x, huoPos[i].y);
                    this.dengeHuoyan.push(huoyan);
                }
            }
        }
        this.byRepel = false;
        if (isboss) {
            this.bossInit(initPoint);
        }
        else {
            this.init(initPoint);
        }
    }

    private dengeHuoyan: Array<BattleEffectEnemy> = [];
    private angleDengeHuoyan: Array<number> = [];
    private huoyanPos(num: number): Array<Point> {
        let huoPos: Array<Point> = [];
        let a = 360 / num;
        this.angleDengeHuoyan = [];
        for (let i = 0; i < num; i++) {
            let aa = a * (i + 1);
            if (aa >= 360) aa = 0;
            this.angleDengeHuoyan.push(aa);
            aa = aa * Math.PI / 180;
            let pos = new Point(25 + 15 * Math.cos(aa), -50 + 15 * Math.sin(aa));
            huoPos.push(pos);
        }
        return huoPos;
    }
    private onRotationHuoYan(): void {
        if (this.dengeHuoyan.length > 0) {
            for (let i = this.dengeHuoyan.length - 1; i >= 0; i--) {
                this.angleDengeHuoyan[i] += 5;
                if (this.angleDengeHuoyan[i] >= 360) this.angleDengeHuoyan[i] -= 360;
                let aa = this.angleDengeHuoyan[i] * Math.PI / 180;
                this.dengeHuoyan[i].sk.pos(25 + 15 * Math.cos(aa), -50 + 15 * Math.sin(aa));
            }
        }
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
    protected initPointTop: Point = new Point(1500, 480);
    protected initPointBom: Point = new Point(1500, 580);
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
    private _canHit: boolean = true;
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
    private isHaveSpeedBuff: number = 0;
    private get speed() {
        return this.dataInf.monsterInf.move_speed * this.dataInf.moveSpeedScale * this.buffScaleSpeed * (100 + this.dataInf.buffAddSpeed) * 0.01;
    }

    private skScaleX: number = 1;
    private skScaleY: number = 1;
    private updatePos(x, y): void {
        this.pos(x, y);
        if (Game.playData.guideDeathEnemy == 6 && x <= 1150) {
            Game.playData.guideDeathEnemy = -1;
            EventManager.event(EventKey.GUIDE_PLAY_SKILL);
        }
        if (this.shadow) {
            this.shadow.setXY(x, y);
        }
    }

    private dataInf: EnemyData = null;
    private goalStone: UI_Stone = null;

    // boss初始化
    private bossInit(initPoint: Point) {
        if (this.initPos == 2) {
            this.init(initPoint);
        }
        else {
            this.bossStand = true;
            this.isHaveSpeedBuff = 0;
            this.dataInf.curHp = this.dataInf.maxHp;
            this.blood.value = this.dataInf.maxHp;
            this.blood.max = this.dataInf.maxHp;
            this._haveDeath = false;
            this.initPoint = new Point(1500, 400);;
            this.updatePos(this.initPoint.x, this.initPoint.y);
            this.playMove();
            fairygui.tween.GTween.to2(this.x, this.y, 1200, this.y, 2)
                .setTarget(this, this.updatePos)
                .setEase(fairygui.tween.EaseType.Linear)
                .onComplete(this.bossMoveOver, this);
        }
    }
    private bossMoveOver(): void {
        this.playStand();
    }
    public bossStand: boolean = false;

    public bossStartMove(): void {
        this.playMove();
        this.bossStand = false;
        fairygui.tween.GTween.to2(this.x, this.y, 1200, 480, 1)
            .setTarget(this, this.updatePos)
            .setEase(fairygui.tween.EaseType.Linear)
            .onComplete(this.bossStartEnterScene, this);
    }
    private bossStartEnterScene(): void {
        this.initPoint = new Point(1200, 480);
        this.setMovePath();
    }
    // 普通怪初始化
    private init(initPoint: Point) {
        this.isHaveSpeedBuff = 0;
        this.dataInf.curHp = this.dataInf.maxHp;
        this.blood.value = this.dataInf.maxHp;
        this.blood.max = this.dataInf.maxHp;
        this._haveDeath = false;
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
        if (this.dataInf == null || this.dataInf.curHp <= 0) {
            return;
        }
        this.onRotationHuoYan();
        dt = dt * 0.001;
        if (this.byRepel) {
            // 被击退过程中
            this._frame++;
            if (this._frame >= 30) {
                this._sk.y = 0;
                this._sk.x = 0;
                this.byRepelOver();
            } else {
                this._sk.y = ((15 - this._frame) * (15 - this._frame) - 160 / 0.5) * 0.5;
                this._sk.x += (this.byRepelX - this.x) / 30;
                if (this.shadow) {
                    this.shadow.setXY(this.x + this._sk.x, this.y);
                }
            }
            return;
        }
        if (this.byTimeMachine) {
            if (this.timeMachineTime > 0) {
                this.timeMachineTime -= dt;
                if (this.timeMachineTime <= 0) {
                    this.timeMachineTime = -1;
                    this.timeMachineAction();
                    return;
                }
            } else {
                return;
            }
        }

        if (this.bossStand) {
            for (let i = this.soldierBuff.length - 1; i >= 0; i--) {
                if (this.soldierBuff[i].update(dt)) {
                    this.dataInf.unActionBuff(this.soldierBuff[i], this);
                    this.soldierBuff.splice(i, 1);
                }
            }
            if (this.dataInf.skill && this.dataInf.skillInfoGetReady(dt)) {
                if (this.currentState == HeroAniEnums.Stand || this.currentState == HeroAniEnums.Move) {
                    this.dataInf.cast();
                    this.playCast();
                }
            }
        }
        if (!this.initOver) return;
        // boss技能触发的buff
        for (let i = this.soldierBuff.length - 1; i >= 0; i--) {
            if (this.soldierBuff[i].update(dt)) {
                this.dataInf.unActionBuff(this.soldierBuff[i], this);
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
        this.buffScaleSpeed = 1;
        let enterReduce = true;
        if (Game.halo.haloList.length > 0) {
            for (let i = Game.halo.haloList.length - 1; i >= 0; i--) {
                let halo: Halo = Game.halo.haloList[i];
                if (halo.types == HaloType.NoSkill) {
                    // 禁止释放技能  
                    canSkill = false;
                } else {
                    // 处于光环范围内的敌人才生效
                    if (halo.seatList.indexOf(this.atkRangIndex) != -1) {
                        switch (halo.types) {
                            case HaloType.BurningGround:
                                halo.update(dt, this);
                                break;
                            case HaloType.ReduceSpeed:
                                this.buffScaleSpeed = (100 - halo.val) * 0.01;
                                this.isHaveSpeedBuff = 100;
                                this.sk.addTimerFilter("9", 300);
                                enterReduce = false;
                                break;
                        }
                    }
                }
            }
        }
        if (enterReduce) {
            if (this.isHaveSpeedBuff > 0) {
                this.isHaveSpeedBuff = 0;
                this.sk.addTimerFilter("9", 0);
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
                    this.playMove();
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
        if (canSkill && this.x <= 1200 && this.dataInf.skill) {
            if (this.currentState == HeroAniEnums.Stand || this.currentState == HeroAniEnums.Move) {
                this.dataInf.cast();
                this.playCast();
            }
        }
    }
    // 敌人死亡
    private enemyDeath(clear: boolean = false): void {
        this.sk.clearFilters();
        this._haveDeath = true;
        if (this.blood) {
            // 回收血条
            this.blood.displayObject.removeSelf();
            Pools.recycle(this.blood)
            this.blood = null;
        }
        if (this.shadow) {
            // 回收血条
            this.shadow.displayObject.removeSelf();
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
        if (clear) {
            this.clearThis();
        }
        else {
            this.playDeath();
        }
    }
    private enemy_death(): void {
        this._canHit = false;
        let showDeath: boolean = true;
        let delayClear: number = 1000;
        if (Game.gameStatus == GameStatus.Gaming) {
            if (this.dataInf.resurrection > 0) {
                showDeath = false;
                if (this.dengeHuoyan.length > 0) {
                    Game.battleData.sUpdateResurrection.dispatch([1031, this.x, this.y]);
                }
                this.dataInf.resurrectionEnemy();
                let point1: Laya.Point = new Laya.Point(this.x + Game.battleMap.mathrandomBattle.random(20) - 10, this.y);
                Game.battleScene.createEnemy(2, true, this.dataInf, point1);
            } else if (this.dataInf.monsterInf.split > 0) {
                showDeath = false;
                Game.battleData.sUpdateResurrection.dispatch([1030, this.x, this.y]);
                setTimeout(() => {
                    for (let i = 0; i < this.dataInf.monsterInf.split; i++) {
                        let data1 = EnemyData.createSplitNew(this.dataInf);
                        let point1: Laya.Point = new Laya.Point(this.x + Game.battleMap.mathrandomBattle.random(60) - 30, this.y + Game.battleMap.mathrandomBattle.random(60) - 30);
                        Game.battleScene.createEnemy(2, true, data1, point1);
                    }
                }, 200);
            }
        }
        if (showDeath) {
            this.enemyDeath();
        } else {
            this.clearThis();
        }
    }
    onDestroy(): void {
        EventManager.offAllCaller(this);
    }
    public addClearEvent(): void {
        EventManager.on(EventKey.GAMEWIN, this, this.enemyDeath, [false]);
        EventManager.on(EventKey.GAMEEXIT, this, this.enemyDeath, [true]);
        EventManager.on(EventKey.GAMELOSE, this, this.enemyDeath, [false]);
    }
    public clearThis() {
        this._haveDeath = true;
        if (this.blood) {
            // 回收血条
            this.blood.displayObject.removeSelf();
            Pools.recycle(this.blood)
            this.blood = null;
        }
        if (this.shadow) {
            // 回收血条
            this.shadow.displayObject.removeSelf();
            Pools.recycle(this.shadow)
            this.shadow = null;
        }
        // Pools.pushs(this.sk);
        this.sk.destroySk();
        let effList = this.battleEffectList.getValues();
        for (let i = effList.length - 1; i >= 0; i--) {
            if (effList[i]) {
                effList[i].sk.destroySk();
                effList[i] = null;
            }
        }
        for (let i = this.battleEffList.length - 1; i >= 0; i--) {
            if (this.battleEffList[i]) {
                this.battleEffList[i].sk.destroySk();
                this.battleEffList[i] = null;
            }
        }
        this.battleEffList = [];
        this.battleEffectList.clear();
        Game.battleMap.sUpdateExitBattleMain.remove(this.clearThis, this);
        this.destroy();
    }
    private _showEffectAndClear: boolean = false;
    // 看视频清场
    public showEffectAndClear(): void {
        this._showEffectAndClear = true;
        this.enemyDeath(false);
    }

    private overEvent(): void {
        switch (this.currentState) {
            case HeroAniEnums.Death:
                {
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
                        switch (this.dataInf.skill.types) {
                            case 1:
                            case 2:
                            case 3:
                                {
                                    //* 1, 加血 - 配合高爆
                                    for (let i = Game.battleScene.enemyList.length - 1; i >= 0; i--) {
                                        var enemy = Game.battleScene.enemyList[i];
                                        if (enemy && !enemy.haveDeath) {
                                            let buff = EnemyBuff.create(this.dataInf.skill.types, this.dataInf.skill.effecttime, this.dataInf.skill.effectvalue);
                                            enemy.dataInf.actionBuff(buff, enemy);
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
                                            let buff = EnemyBuff.create(this.dataInf.skill.types, this.dataInf.skill.effecttime, this.dataInf.skill.effectvalue);
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
        if (!this.canHit) {
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
                case 4:
                    {
                        // 时间机器，敌人specialvalue时间后，被拽回来
                        this.timeMachine(heroSkillinf.specialvalue);
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

                if (Game.playData.guideIndex >= GuideType.sixWin && hero.dataInf.curCrit(this.dataInf.byCrit, userSkill)) {
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
                this.enemy_death();
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
                    let buff = HurtBuff.create(HaloType.ReduceSpeed, 5, reduce, 0, -1);
                    this.hurtBuff.push(buff);
                    this.sk.addTimerFilter("9", 5 * 60);
                }
                // 中毒
                let pois = hero.dataInf.poisoningTime(userSkill);
                if (pois > 0) {
                    this.poisoningEffectTime += 5;
                    if (this.poisoningEffect == null) {
                        this.poisoningEffect = this.addBattleEffect(1017, true);
                    }
                    else {
                        this.poisoningEffect.replay(true);
                    }
                    let buff = HurtBuff.create(HaloType.Poisoning, 5, sub * pois * 0.01, hero.dataInf.curReduceDefense);
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
                    this.burningGroundTime += 5;
                    if (this.burningGroundEffect == null) {
                        this.burningGroundEffect = this.addBattleEffect(1015, true);
                    }
                    else {
                        this.burningGroundEffect.replay(true);
                    }
                    let buff = HurtBuff.create(HaloType.BurningGround, 5, sub * burn * 0.01, hero.dataInf.curReduceDefense);
                    this.hurtBuff.push(buff);
                }
                // 击退
                if (repel) {
                    // 需要重新计算怪物的移动路径
                    switch (this.atkRangIndex) {
                        case 0:
                            {
                                this.repelPos(this.pathX[4], this.y);
                                this.repelSetMovePath(3, 0);
                            }
                            break;
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                            {
                                this.repelPos(this.pathX[2], this.y);
                                this.repelSetMovePath(2, this.atkRangIndex);
                            }
                            break;
                        case 15:
                        case 16:
                            {
                                this.repelPos(this.pathX[2], this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 21:
                        case 22:
                            {
                                this.repelPos(this.pathX[2] + 110, this.y);
                                this.repelSetMovePath(2, this.atkRangIndex);
                            }
                            break;
                        case 25:
                        case 26:
                            {
                                this.repelPos(this.pathX[2] + 110, this.y);
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
                                this.repelPos(this.pathX[2], this.y);
                                this.repelSetMovePath(2, this.atkRangIndex);
                            }
                            break;
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                            {
                                this.repelPos(this.pathX[1], this.y);
                                this.repelSetMovePath(1, this.atkRangIndex);
                            }
                            break;
                        case 35:
                        case 36:
                            {
                                this.repelPos(this.pathX[1], this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 41:
                        case 42:
                            {
                                this.repelPos(this.pathX[1] + 110, this.y);
                                this.repelSetMovePath(1, this.atkRangIndex);
                            }
                            break;
                        case 45:
                        case 46:
                            {
                                this.repelPos(this.pathX[1] + 110, this.y);
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
                                this.repelPos(this.pathX[1], this.y);
                                this.repelSetMovePath(1, this.atkRangIndex);
                            }
                            break;
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                            {
                                this.repelPos(this.pathX[0], this.y);
                                this.repelSetMovePath(0, this.atkRangIndex);
                            }
                            break;
                        case 55:
                        case 56:
                            {
                                this.repelPos(this.pathX[0], this.y);
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
                                this.repelPos(this.pathX[0], this.y);
                                this.repelSetMovePath(0, this.atkRangIndex);
                            }
                            break;
                        case 65:
                        case 66:
                            {
                                this.repelPos(this.pathX[0], this.y);
                                this.currentState = HeroAniEnums.None;
                                this.dataInf.curStarIndex = 0;
                                this.dataInf.curMoveX--;
                                this.setMovePath();
                            }
                            break;
                        case 60:
                            {
                                this.repelPos(this.pathX[0] + 110, this.y);
                                this.repelSetMovePath(0, this.atkRangIndex);
                            }
                            break;
                        case 70:
                            {
                                this.repelPos(this.pathX[0] + 220, this.y);
                                this.repelSetMovePath(0, this.atkRangIndex);
                            }
                            break;
                    }
                }
            }
        }
    }
    public buffHit(hitVal: number, curReduceDefense: number, haloType: HaloType = HaloType.None, durTime: number = 0): void {
        if (!this.canHit) return;
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
        this.dropBlood(hitVal);
        if (this.blood) {
            this.blood.visible = true;
            this.blood.value = this.dataInf.curHp;
        }
        if (this.dataInf.curHp <= 0) {
            this.enemy_death();
        }
    }
    private addHpEffect: BattleEffectEnemy = null;
    public addHp(sub: number): void {
        if (this.addHpEffect == null) {
            this.addHpEffect = this.addBattleEffect(1023, false);
        }
        else {
            this.addHpEffect.replay(false);
        }
        this.dataInf.curHp += sub;
        if (this.dataInf.curHp > this.dataInf.maxHp) {
            this.dataInf.curHp = this.dataInf.maxHp;
        }
        this.dropBlood(sub * -1);
        if (this.blood) {
            this.blood.visible = true;
            this.blood.value = this.dataInf.curHp;
        }
    }
    private addSpeedEffect: BattleEffectEnemy = null;
    public addSpeedOrHideSpeed(v: boolean): void {
        if (v) {
            if (this.addSpeedEffect == null) {
                this.addSpeedEffect = this.addBattleEffect(1024, true);
            }
            else {
                this.addSpeedEffect.replay(true);
            }
        }
        else {
            if (this.addSpeedEffect) {
                this.addSpeedEffect.stopeAndHide();
            }
        }
    }
    private reduceDefEffect: BattleEffectEnemy = null;
    public reduceDefOrHideSpeed(v: boolean): void {
        if (v) {
            if (this.reduceDefEffect == null) {
                this.reduceDefEffect = this.addBattleEffect(1026, true);
            }
            else {
                this.reduceDefEffect.replay(true);
            }
        }
        else {
            if (this.reduceDefEffect) {
                this.reduceDefEffect.stopeAndHide();
            }
        }
    }

    private dropBlood(sub: number, _crit: number = 1): void {
        if (_crit <= 1 && sub > 0) {
            return;
        }
        // 飘血
        let subStr = Fun.formatNumberUnitBattle(sub);
        var txt: Laya.Text = Laya.Pool.getItemByClass("txt", Laya.Text);
        txt.scale(1, 1, true);
        txt.alpha = 1;
        Laya.Tween.clearAll(txt);
        this.addChild(txt);
        if (sub < 0) {
            subStr = Fun.formatNumberUnitBattle(sub);
            txt.font = "num_battle_3";
        }
        else if (_crit > 1) {
            subStr = "B" + subStr;
            txt.font = "num_battle_2";
        } else {
            txt.font = "num_battle_1";
        }
        txt.changeText(subStr);
        // txt.text = subStr;
        txt.pivotX = txt.width / 2;
        txt.x = 0;
        txt.y = -100;
        Laya.Tween.to(txt, { y: -150 }, 500, null, null);
        Laya.Tween.to(txt, { scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 300, null, Laya.Handler.create(this, this.hpRemove, [txt]), 500);
    }
    private hpRemove(txt: Laya.Text): void {
        this.removeChild(txt);
        Laya.Pool.recover("txt", txt);
    }

    private byTimeMachine: boolean = false;
    private timeMachineTime: number = -1;
    private timeMachineX: number = 0;
    private timeMachineY: number = 0;
    private timeMachineMoveX: number = 0;
    private timeMachineEffect: BattleEffectEnemy = null;
    private timeMachineEffect2: BattleEffectEnemy = null;
    private timeMachineEffect3: BattleEffectEnemy = null;

    // 敌人将在规定时间后，被移动回来这个位置
    private timeMachine(specialvalue: number): void {
        if (!this.byTimeMachine) {
            if (this.timeMachineEffect == null) {
                this.timeMachineEffect = this.addBattleEffect(1036, true);
                this.timeMachineEffect.sk.scale(1, 1, true);
                this.timeMachineEffect.sk.pos(0, -100);
            } else {
                this.timeMachineEffect.replay(true);
            }
            this.timeMachineTime = specialvalue;
            this.byTimeMachine = true;
            this.timeMachineX = this.x;
            this.timeMachineY = this.y;
            this.timeMachineMoveX = this.dataInf.curMoveX;
        }
    }
    // 时间机器生效
    private timeMachineAction(): void {
        this.timeMachineEffect.stopeAndHide();
        if (this.timeMachineEffect2 == null) {
            this.timeMachineEffect2 = this.addBattleEffect(1037, false);
            this.timeMachineEffect2.sk.scale(1, 1, true);
        } else {
            this.timeMachineEffect2.replay(false);
        }
        this._canHit = false;
        this.currentState = HeroAniEnums.None;
        Laya.Tween.to(this.sk, { scaleX: -0.1, scaleY: 0.1 }, 200, null, Laya.Handler.create(this, this.machineSmallok));
    }
    private machineSmallok(): void {
        if (this.timeMachineEffect3 == null) {
            this.timeMachineEffect3 = this.addBattleEffect(1034, false);
            this.timeMachineEffect3.sk.scale(1, 1, true);
        } else {
            this.timeMachineEffect3.replay(false);
        }
        this.updatePos(this.timeMachineX, this.timeMachineY);
        Laya.Tween.to(this.sk, { scaleX: this.skScaleX, scaleY: this.skScaleY }, 200, null, Laya.Handler.create(this, this.machineBigOk));
    }
    private machineBigOk(): void {
        let curY = 0;
        switch (this.timeMachineMoveX % 10) {
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
        this.dataInf.curMoveX = this.timeMachineMoveX;
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
        this.byTimeMachine = false;
        this._canHit = true;
        this.playMove();
    }

    // 被击退中
    private byRepel: boolean = false;
    private _frame: number = 0;
    private byRepelX: number = 0;
    private byRepelY: number = 0;
    /**
     * 准备被击退到哪个位置
     * @param x 
     * @param y 
     */
    private repelPos(x: number, y: number): void {
        this.byRepelX = x;
        this.byRepelY = y;
        this._frame = 0;
        this._sk.rotation = 90;
        this._canHit = false;
        this.byRepel = true;
    }
    private byRepelOver(): void {
        this._sk.rotation = 0;
        this.updatePos(this.byRepelX, this.byRepelY);
        this._canHit = true;
        this.byRepel = false;
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
    private battleEffList: Array<BattleEffectEnemy> = [];
    public addBattleEffectDouble(id: number, loop: boolean): BattleEffectEnemy {
        let _effect: BattleEffectEnemy = BattleEffectEnemy.create(id, loop);
        this.addChild(_effect.sk);
        this.battleEffList.push(_effect);
        let _size = 0.5;
        _effect.sk.scale(_size, _size, true);
        return _effect;
    }
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
                _effect.sk.destroySk();
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