import Dictionary from "../../Tool/Dictionary";
import BattleModel from "./BattleModel";
import BattleSeat from "./BattleSeat";
import BattleSoldier from "./BattleSoldier";
import Game from "../../Game";
import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import { GameStatus } from "../DataEnums/GameStatus";
import BattleHero from "./BattleHero";
import UI_Stone from "../../fgui/Extend/Battle/UI_Stone";

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
    public enemyList: Array<BattleModel> = new Array<BattleModel>();
    // 英雄列表
    public heroList: Array<BattleModel> = new Array<BattleModel>();
    // 指定为位置的英雄字典
    public seatHeroDic: Dictionary<number, Dictionary<number, number>> = new Dictionary<number, Dictionary<number, number>>();
    // 当前那一列阵容生效
    public seatHeroSelect: number = 0;
    // 石头列表
    public stoneList: Array<UI_Stone> = new Array<UI_Stone>();
    // 底座列表
    public battleSeat: Array<BattleSeat> = new Array<BattleSeat>();


    // 生成敌人
    createEnemy(isTop: boolean, isboss: boolean = false) {
        let soldier = BattleSoldier.create(isTop, isboss);
        Game.total.toastMsg("出现第" + Game.battleMap.wave + "个敌人" + Game.battleMap.curTime, true);
        this.enemyList.push(soldier);
    }
    // 重新开始游戏
    reTryPlay(): void {
        this.stoneReset();
        this.clearEnemy();
        Game.battleMap.openMap(1, 1);
        Game.gameStatus = GameStatus.Gaming;
    }
    // 石头重生
    stoneReset(): void {
        for (let i = 0; i < 6; i++) {
            this.stoneList[i].reInit();
        }
    }
    // 战斗结束，移除怪物
    clearEnemy(): void {
        if (this.enemyList.length > 0) {
            for (let i = this.enemyList.length - 1; i >= 0; i--) {
                var enemy: BattleModel = this.enemyList[i];
                if (enemy) {
                    enemy.clearThis();
                }
                this.enemyList.splice(i, 1);
            }
        }
    }
    // 战斗结束，移除英雄
    clearHero(): void {
        for (let i = this.heroList.length - 1; i >= 0; i--) {
            var hero: BattleHero = this.heroList[i] as BattleHero;
            this.heroList.splice(i, 1);
            hero.removeThis();
        }
    }
    // 在指定位置生成英雄
    initHeroSeat(): void {
        if (this.seatHeroDic.hasKey(this.seatHeroSelect)) {
            let cur = this.seatHeroDic.getValue(this.seatHeroSelect);
            let list: number[] = cur.getKeys();
            for (let i = 0, len = list.length; i < len; i++) {
                let hero = BattleHero.create(cur.getValue(list[i]), list[i]);
                Game.battleScene.heroList.push(hero);
            }
        }
    }
}

