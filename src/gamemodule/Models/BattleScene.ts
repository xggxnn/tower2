import Dictionary from "../../Tool/Dictionary";
import BattleSeat from "./BattleSeat";
import BattleSoldier from "./BattleSoldier";
import Game from "../../Game";
import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import { GameStatus } from "../DataEnums/GameStatus";
import BattleHero from "./BattleHero";
import UI_Stone from "../../fgui/Extend/Battle/UI_Stone";
import EnemyData from "../DataStructs/EnemyData";

export default class BattleScene {

    private static _Instance: BattleScene;
    static get Instance(): BattleScene {
        if (!BattleScene._Instance) {
            BattleScene._Instance = new BattleScene();
        }
        return BattleScene._Instance;
    }
    init(): void {
        EventManager.on(EventKey.RE_TRYPLAY, this, this.reTryPlay);
    }

    // 敌人列表
    public enemyList: Array<BattleSoldier> = new Array<BattleSoldier>();
    // 英雄列表
    public heroList: Array<BattleHero> = new Array<BattleHero>();
    // 指定为位置的英雄字典
    public seatHeroList: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    // 当前那一列阵容生效
    public seatHeroSelect: number = 0;
    // 石头列表
    public stoneList: Array<UI_Stone> = new Array<UI_Stone>();
    // 底座列表
    public battleSeat: Array<BattleSeat> = new Array<BattleSeat>();
    // 敌人所在的攻击范围
    public atkCellDIc: Dictionary<number, Array<BattleSoldier>> = new Dictionary<number, Array<BattleSoldier>>();
    public activationEnemy: BattleSoldier = null;

    // 生成敌人
    createEnemy(initPos: number, isboss: boolean, monster: EnemyData, initPoint: Laya.Point = null) {
        let soldier = BattleSoldier.create(initPos, isboss, monster, initPoint);
        // Game.total.toastMsg("出现第" + Game.battleMap.levelWave + "个敌人" + Game.battleMap.curTime, true);
        this.enemyList.push(soldier);
    }
    // 重新开始游戏
    reTryPlay(): void {
        this.stoneReset();
        this.clearEnemy();
        Game.battleMap.openMap();
    }
    clearBattleScene(): void {
        this.stoneReset();
        this.clearEnemy();
        this.clearHero();
    }
    // 石头重生
    stoneReset(): void {
        if (this.stoneList) {
            for (let i = 0; i < 6; i++) {
                if (this.stoneList[i]) {
                    this.stoneList[i].reInit();
                }
            }
        }
    }
    // 战斗结束，移除怪物
    clearEnemy(): void {
        if (this.enemyList.length > 0) {
            for (let i = this.enemyList.length - 1; i >= 0; i--) {
                var enemy: BattleSoldier = this.enemyList[i];
                if (enemy) {
                    enemy.clearThis();
                }
                this.enemyList.splice(i, 1);
            }
        }
        this.atkCellDIc.clear();
    }
    // 战斗结束，移除英雄
    clearHero(): void {
        Game.halo.unInit();
        for (let i = this.heroList.length - 1; i >= 0; i--) {
            var hero: BattleHero = this.heroList[i] as BattleHero;
            this.heroList.splice(i, 1);
            hero.removeThis();
        }
        this.atkCellDIc.clear();
    }
    // 在指定位置刷新英雄
    refrushHeroInSeat(index: number, send: boolean = true): void {
        for (let i = this.heroList.length - 1; i >= 0; i--) {
            var hero: BattleHero = this.heroList[i] as BattleHero;
            if (hero.index == index) {
                this.heroList.splice(i, 1);
                hero.removeThis();
                break;
            }
        }
        let list: number[] = this.seatHeroList[this.seatHeroSelect];
        if (list[index] > 0) {
            let hero = BattleHero.create(list[index], index);
            this.heroList.push(hero);
            this.battleSeat[index].heroInf = hero.dataInf.heroInf;
        }
        if (send) {
            this.setSeat();
        }
    }

    public setSeat(): void {
        let data = {
            // "seat": [this.seatHeroList[0].concat(), this.seatHeroList[1].concat(), this.seatHeroList[2].concat()],
            "seat": {
                "seat0": this.seatHeroList[0].concat(),
                "seat1": this.seatHeroList[1].concat(),
                "seat2": this.seatHeroList[2].concat(),
            },
            "seatNum": this.seatHeroSelect,
            "skillIndex": Game.playData.curPlaySkillIndex,
        }
        Game.proto.setSeat(data);
    }
    /**
     * 初始化所有英雄
     */
    initHeroSeat(): void {
        Game.halo.init();
        let list: number[] = this.seatHeroList[this.seatHeroSelect];
        for (let i = 0, len = list.length; i < len; i++) {
            if (list[i] > 0) {
                let hero = BattleHero.create(list[i], i);
                this.heroList.push(hero);
                this.battleSeat[i].heroInf = hero.dataInf.heroInf;
            }
            else {
                this.battleSeat[i].heroInf = null;
            }
        }
    }
}

