import BaseSK from "../../base/BaseSK";
import { HeroAniEnums } from "../DataEnums/HeroAniEnums";
import Game from "../../Game";
import Point = Laya.Point;
import EnemyData from "../DataStructs/EnemyData";
import EventKey from "../../Tool/EventKey";
import Dictionary from "../../Tool/Dictionary";
import BattleHero from "./BattleHero";
import Pools from "../../Tool/Pools";
import EventManager from "../../Tool/EventManager";
import BattleModel from "./BattleModel";
import UI_Blood from "../../fgui/Extend/Battle/UI_Blood";
import UI_Shadow from "../../fgui/Extend/Battle/UI_Shadow";
import UI_Stone from "../../fgui/Extend/Battle/UI_Stone";
import UI_DriftingBlood from "../../fgui/Extend/Battle/UI_DriftingBlood";
import MonsterInfo from "../../dataInfo/MonsterInfo";
import { GameStatus } from "../DataEnums/GameStatus";
import BattleSkillAttack from "./BattleSkillAttack";
import Fun from "../../Tool/Fun";

export default class BattleSoldier extends BattleModel {
    public static create(initPos: number, isboss: boolean, monster: EnemyData, initPoint: Laya.Point = null): BattleSoldier {
        return new BattleSoldier(initPos, isboss, monster, initPoint);
    }
    private constructor(initPos: number, isboss: boolean, monster: EnemyData, initPoint: Laya.Point = null) {
        super(true);
        this.dataInf = monster;
        if (initPos == 0 || initPos == 1) {
            this._id = 1;
            if (Math.random() * 6 < 3) this._id = 28
            this._sk = Pools.skFetch("enemy_" + this._id);
            if (this._id == 1) {
                this._sk.scale(2, 2);
            }
            this.dataInf.skId = this._id;
            this.dataInf.scales = new Laya.Point(this._sk.scaleX, this._sk.scaleY);
            this.dataInf.shadowScales = new Laya.Point(1.7, 1.7);
        }
        else if (initPos == 2) {
            this._sk = Pools.skFetch("enemy_" + this.dataInf.skId);
            this._sk.scale(this.dataInf.scales.x, this.dataInf.scales.y);
        }
        this.playStand();
        Game.parentObject.addChild(this.sk);
        this.sk.addLableEvent(Laya.Handler.create(this, this.frameEvent));
        this.sk.addStopEvent(Laya.Handler.create(this, this.overEvent));
        // 添加血条
        this.blood = Pools.fetch(UI_Blood);
        Game.bloodParent.addChild(this.blood);
        this.speed = this.dataInf.monsterInf.move_speed * 0.1;
        this.blood.max = this.dataInf.curHp;
        this.blood.value = this.dataInf.maxHp;
        // 添加阴影
        this.shadow = Pools.fetch(UI_Shadow);

        this.shadow.setScale(this.dataInf.shadowScales.x, this.dataInf.shadowScales.y);
        Game.parentObject.addChild(this.shadow.displayObject);
        this.initPos = initPos;
        this.init(initPoint);
    }
    private _id = 1;
    private speed = 0;

    private updateBlood(x, y): void {
        this.sk.pos(x, y);
        if (this.blood) {
            this.blood.setXY(x, y - 150);
        }
        if (this.shadow) {
            this.shadow.setXY(x, y);
        }
    }

    private dataInf: EnemyData = null;
    private goalStone: UI_Stone = null;


    private init(initPoint) {
        this.dataInf.curHp = this.dataInf.maxHp;
        this.blood.value = this.dataInf.maxHp;
        this.blood.max = this.dataInf.maxHp;
        this._haveDeath = false;
        this.blood.visible = false;
        if (this.initPos == 1) {
            this.initPoint = this.initPointTop;
        }
        else if (this.initPos == 0) {
            this.initPoint = this.initPointBom;
        }
        else {
            this.initPoint = initPoint;
        }
        this.updateBlood(this.initPoint.x, this.initPoint.y);
        if (this.initPos != 2) {
            this.setMovePath();
        }
        else {
            this.playMove();
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
        if (this.dataInf.curMoveX == 0) {
            this.dataInf.movePath.push(this.initPoint);
            if (this.initPos) {
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[2]));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[1]));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[0]));
            }
            else {
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[4]));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[5]));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[6]));
            }
        }
        else if (this.dataInf.curMoveX == 3) {
            if (this.dataInf.curStarIndex > 0) {
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[this.dataInf.curStarIndex]));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[3]));
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX + 1], this.pathY[3]));
            }
            else {
                let mmmtop = false;
                if (this.initPos) {
                    mmmtop = this.dataInf.curMoveX % 2 == 1;
                }
                else {
                    mmmtop = this.dataInf.curMoveX % 2 == 0;
                }
                if (mmmtop) {
                    for (let i = 0, len = 4; i < len; i++) {
                        this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[i]));
                    }
                }
                else {
                    for (let i = this.pathY.length - 1; i >= 3; i--) {
                        this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[i]));
                    }
                }
                this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX + 1], this.pathY[3]));
            }
        }
        else {
            let mmmtop = false;
            if (this.initPos) {
                mmmtop = this.dataInf.curMoveX % 2 == 1;
            }
            else {
                mmmtop = this.dataInf.curMoveX % 2 == 0;
            }
            if (mmmtop) {
                for (let i = this.dataInf.curStarIndex, len = this.pathY.length; i < len; i++) {
                    this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[i]));
                }
            }
            else {
                let start = this.dataInf.curStarIndex > 0 ? this.dataInf.curStarIndex : this.pathY.length - 1;
                for (let i = start; i >= 0; i--) {
                    this.dataInf.movePath.push(new Point(this.pathX[this.dataInf.curMoveX], this.pathY[i]));
                }
            }
        }
        this.dataInf.curStarIndex = 0;
        this.playMove();
    }
    public update(dt): void {
        super.update(dt);
        switch (this.currentState) {
            case HeroAniEnums.Move:
                {
                    // 移动
                    if (this.dataInf.curMoveIndex < this.dataInf.movePath.length) {
                        let disX: number = this.dataInf.movePath[this.dataInf.curMoveIndex].x - this.sk.x;
                        let disY: number = this.dataInf.movePath[this.dataInf.curMoveIndex].y - this.sk.y;
                        let dis: number = Math.pow(disX * disX + disY * disY, 0.5);
                        if (dis > this.speed) {
                            this.updateBlood(this.sk.x + disX * this.speed / dis, this.sk.y + disY * this.speed / dis);
                        }
                        else {
                            let xx = this.dataInf.movePath[this.dataInf.curMoveIndex].x;
                            let yy = this.dataInf.movePath[this.dataInf.curMoveIndex].y;
                            this.updateBlood(xx, yy);
                            let ran = Math.floor(Math.random() * 3);
                            if (ran == 1 && this._id != 1) {
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
                                if (stone && !stone.breaked) {
                                    this.goalStone = stone;
                                    this.standTime = 0;
                                    this.playAttack();
                                }
                                else {
                                    this.dataInf.curMoveIndex++;
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
                if (this._posState == 0) {
                    console.log("break");
                    break;
                }
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
    }

    private frameEvent(event: Laya.EventData): void {
        if (event.name == "cast_time") {
            switch (this.currentState) {
                case HeroAniEnums.Attack:
                    this.hitStone();
                    break;
            }
        }
    }
    private overEvent(): void {
        switch (this.currentState) {
            case HeroAniEnums.Death:
                let point1: Laya.Point = new Laya.Point(this.sk.x, this.sk.y + 15 + Math.random() * 10);
                let point2: Laya.Point = new Laya.Point(this.sk.x, this.sk.y - 15 - Math.random() * 10);
                Pools.skRecycle(this.sk);
                if (Game.gameStatus == GameStatus.Gaming) {
                    if (this.dataInf.resurrection > 0) {
                        this.dataInf.resurrectionEnemy();
                        Game.battleScene.createEnemy(2, true, this.dataInf, point1);
                    }
                    else if (this.dataInf.splits > 0) {
                        let data1 = EnemyData.createSplitNew(this.dataInf);
                        let data2 = EnemyData.createSplitNew(this.dataInf);

                        Game.battleScene.createEnemy(2, true, data1, point1);
                        Game.battleScene.createEnemy(2, true, data2, point2);
                    }
                }
                this.destroy();
                break;
            case HeroAniEnums.Attack:
                {
                    if (this.goalStone == null || this.goalStone.breaked) {
                        this.currentState = HeroAniEnums.None;
                        this.setMovePath();
                    }
                    else if (this.dataInf.interval > 0) {
                        this.standTime = 0;
                        this._posState = 1;
                        this.playStand();
                    }
                    else {
                        this.playAttack();
                    }
                }
                break;
        }
    }
    // 攻击石头
    private hitStone(): void {
        if (this.goalStone && !this.goalStone.breaked) {
            this.goalStone.hit(1);
        }
    }
    // 受到攻击
    public skillHit(hero: BattleHero, skill: BattleSkillAttack) {
        if (this.dataInf.curHp <= 0) {
            return;
        }
        this.addBattleEffect(1, false);
        // this.addBattleEffect(1, false).removeNum();// 移除
        if (this.blood) {
            this.blood.visible = true;
            // 受伤害
            let sub = skill.skillInfo.atk;
            let _crit: number = 1;
            if (/*!Game.playData.newbie &&*/ Math.random() < skill.skillInfo.crit * 10) {
                _crit = 2 * skill.skillInfo.burst;
            }
            sub *= _crit;

            // 飘血
            let drop = Pools.fetch(UI_DriftingBlood);
            Game.bloodParent.addChild(drop);
            drop.setXY(this.blood.x - 50 + Math.random() * 50, this.blood.y);
            if (_crit > 1) {
                drop.m_c1.setSelectedIndex(1);
            }
            else {
                drop.m_c1.setSelectedIndex(0);
            }
            drop.title = Fun.format("-{0}", sub);
            drop.m_t0.play(Laya.Handler.create(this, () => {
                Pools.recycle(drop);
            }), 1);
            this.dataInf.curHp -= sub;
            this.blood.value = this.dataInf.curHp;
            if (this.dataInf.curHp <= 0) {
                this.enemyDeath();
            }
        }
    }

}