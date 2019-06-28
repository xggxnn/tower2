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

export default class BattleSoldier extends BattleModel {
    public static create(isTop: boolean, isboss: boolean): BattleSoldier {
        return new BattleSoldier(isTop, isboss);
    }
    private constructor(isTop: boolean, isboss: boolean) {
        super(true);
        this._id = 1;
        if (Math.random() * 6 < 3) this._id = 28
        this._sk = Pools.skFetch("enemy_" + this._id);
        if (this._id == 1) {
            this._sk.scale(2, 2);
        }
        this.playStand();
        Game.parentObject.addChild(this.sk);
        this.sk.addLableEvent(Laya.Handler.create(this, this.frameEvent));
        this.sk.addStopEvent(Laya.Handler.create(this, this.overEvent));
        this.dataInf = new EnemyData();
        // 添加血条
        this.blood = Pools.fetch(UI_Blood);
        Game.bloodParent.addChild(this.blood);
        let monsterInf = Game.battleMap.nextMonster;
        if (isboss) {
            monsterInf = Game.battleMap.bossInfo;
        }
        this.speed = Number(monsterInf.speed);
        this.curHp = Number(monsterInf.hp);
        this.maxHp = this.curHp;
        this.blood.max = this.curHp;
        this.blood.value = this.maxHp;
        // 添加阴影
        this.shadow = Pools.fetch(UI_Shadow);

        this.shadow.setScale(1.7, 1.7);
        Game.parentObject.addChild(this.shadow.displayObject);
        this.initTop = isTop;
        this.init();
    }

    private _id = 1;
    private curHp = 0;
    private maxHp = 0;
    private speed = 0;

    private updateBlood(x, y): void {
        this.sk.pos(x, y);
        if (this.blood) {
            this.blood.setXY(x - 30, y - 150);
        }
        if (this.shadow) {
            // if (this._id == 1) {
            //     this.shadow.setXY(x - 30, y - 15);
            // }
            // else {
            this.shadow.setXY(x - 55, y - 35);
            // }
        }
    }

    private dataInf: EnemyData = null;
    private goalStone: UI_Stone = null;


    private init() {
        this.curHp = this.maxHp;
        this.blood.value = this.maxHp;
        this.blood.max = this.maxHp;
        this._haveDeath = false;
        this.blood.visible = false;
        if (this.initTop) {
            this.initPoint = this.initPointTop;
        }
        else {
            this.initPoint = this.initPointBom;
        }
        this.updateBlood(this.initPoint.x, this.initPoint.y);
        this.curMoveIndex = 1;
        this.curMoveX = -1;
        this.curStarIndex = 0;
        this.preStarIndex = 0;
        this.setMovePath();
    }
    // 当前开启下一列的点的位置
    private curStarIndex = 0;
    // 上一列开启下一列的点的位置
    private preStarIndex = 0;
    // 设置当前移动路径
    private setMovePath(): void {
        this.goalStone = null;
        this.curMoveX++;
        if (this.curMoveX >= 4) {
            // this.init();
            // 到达终点，游戏失败
            EventManager.event(EventKey.GAMELOSE);
            return;
        }
        this.movePath = [];
        this.curMoveIndex = 0;
        if (this.curMoveX == 0) {
            this.movePath.push(this.initPoint);
            if (this.initTop) {
                this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[2]));
                this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[1]));
                this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[0]));
            }
            else {
                this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[4]));
                this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[5]));
                this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[6]));
            }
        }
        else if (this.curMoveX == 3) {
            if (this.curStarIndex > 0) {
                this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[this.curStarIndex]));
                this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[3]));
                this.movePath.push(new Point(this.pathX[this.curMoveX + 1], this.pathY[3]));
            }
            else {
                let mmmtop = false;
                if (this.initTop) {
                    mmmtop = this.curMoveX % 2 == 1;
                }
                else {
                    mmmtop = this.curMoveX % 2 == 0;
                }
                if (mmmtop) {
                    for (let i = 0, len = 4; i < len; i++) {
                        this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[i]));
                    }
                }
                else {
                    for (let i = this.pathY.length - 1; i >= 3; i--) {
                        this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[i]));
                    }
                }
                this.movePath.push(new Point(this.pathX[this.curMoveX + 1], this.pathY[3]));
            }
        }
        else {
            let mmmtop = false;
            if (this.initTop) {
                mmmtop = this.curMoveX % 2 == 1;
            }
            else {
                mmmtop = this.curMoveX % 2 == 0;
            }
            if (mmmtop) {
                for (let i = this.curStarIndex, len = this.pathY.length; i < len; i++) {
                    this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[i]));
                }
            }
            else {
                let start = this.curStarIndex > 0 ? this.curStarIndex : this.pathY.length - 1;
                for (let i = start; i >= 0; i--) {
                    this.movePath.push(new Point(this.pathX[this.curMoveX], this.pathY[i]));
                }
            }
        }
        this.curStarIndex = 0;
        this.playMove();
    }
    public update(dt): void {
        super.update(dt);
        switch (this.currentState) {
            case HeroAniEnums.Move:
                {
                    // 移动
                    if (this.curMoveIndex < this.movePath.length) {
                        let disX: number = this.movePath[this.curMoveIndex].x - this.sk.x;
                        let disY: number = this.movePath[this.curMoveIndex].y - this.sk.y;
                        let dis: number = Math.pow(disX * disX + disY * disY, 0.5);
                        if (dis > this.speed) {
                            this.updateBlood(this.sk.x + disX * this.speed / dis, this.sk.y + disY * this.speed / dis);
                        }
                        else {
                            let xx = this.movePath[this.curMoveIndex].x;
                            let yy = this.movePath[this.curMoveIndex].y;
                            this.updateBlood(xx, yy);
                            let ran = Math.floor(Math.random() * 3);
                            if (ran == 1 && this._id != 1) {
                                let stone: UI_Stone = null;
                                if (xx > 500 && xx < 1100) {
                                    let index = this.curMoveX * 2;
                                    if (Math.abs(yy - 460) < 50) {
                                        if (this.preStarIndex != 1) {
                                            stone = Game.battleScene.stoneList[index];
                                            this.curStarIndex = 1;
                                            this.preStarIndex = 1;
                                        }
                                    }
                                    else if (Math.abs(yy - 640) < 50) {
                                        if (this.preStarIndex != 5) {
                                            stone = Game.battleScene.stoneList[index + 1];
                                            this.curStarIndex = 5;
                                            this.preStarIndex = 5;
                                        }
                                    }
                                }
                                if (stone && !stone.breaked) {
                                    this.goalStone = stone;
                                    this.standTime = 0;
                                    this.playAttack();
                                }
                                else {
                                    this.curMoveIndex++;
                                }
                            }
                            else {
                                this.curMoveIndex++;
                            }
                        }
                    }
                    else {
                        // console.log("移动结束");
                        this.currentState = HeroAniEnums.None;
                        this.curStarIndex = 0;
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
                Pools.skRecycle(this.sk);
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
    public skillHit(hero: BattleHero) {
        if (this.curHp <= 0) {
            return;
        }
        this.addBattleEffect(1, false);
        // this.addBattleEffect(1, false).removeNum();// 移除
        if (this.blood) {
            this.blood.visible = true;
            let sub = 100 + Math.floor(Math.random() * 50);
            let drop = Pools.fetch(UI_DriftingBlood);
            Game.bloodParent.addChild(drop);
            drop.setXY(this.blood.x - 50 + Math.random() * 50, this.blood.y);
            drop.title = "-" + sub;
            drop.m_t0.play(Laya.Handler.create(this, () => {
                Pools.recycle(drop);
            }), 1);
            this.curHp -= sub;
            this.blood.value = this.curHp;
            if (this.curHp <= 0) {
                this.enemyDeath();
            }
        }
    }

}