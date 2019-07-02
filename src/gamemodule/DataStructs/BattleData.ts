import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import Game from "../../Game";
import BattleScene from "../Models/BattleScene";
import { GameStatus } from "../DataEnums/GameStatus";
import HeroInfo from "../../dataInfo/HeroInfo";

export default class BattleData {

    private static _Instance: BattleData;
    static get Instance(): BattleData {
        if (!BattleData._Instance) {
            BattleData._Instance = new BattleData();
        }
        return BattleData._Instance;
    }

    public init(): void {
        EventManager.on(EventKey.MAP_REFRUSH, this, this.mapRefrush);
        EventManager.on(EventKey.GAMEWIN, this, this.mapStopRefrush, [1]);
        EventManager.on(EventKey.GAMELOSE, this, this.mapStopRefrush, [2]);
        EventManager.on(EventKey.GAMEEXIT, this, this.mapStopRefrush, [0]);
    }

    /*******************关卡相关**************************/
    private mapRefrush(): void {
        EventManager.on(EventKey.ENTER_FRAME, this, this.update);
    }
    private mapStopRefrush(v: number): void {
        EventManager.off(EventKey.ENTER_FRAME, this, this.update);
    }

    private update(): void {
        if (Game.gameStatus != GameStatus.Gaming) return;
        let dt = Laya.timer.delta * 0.001;
        Game.battleMap.curTime += dt;
        if (Game.battleMap.curTime < Game.battleMap.waveTime) {
            if (Game.battleMap.curTime >= Game.battleMap.nextCD) {
                Game.battleMap.enemyInf();
                Game.battleScene.createEnemy(Game.battleMap.wave % 2 == 1);
                if (Game.battleMap.bossInfo != null) {
                    Game.battleScene.createEnemy(Game.battleMap.wave % 2 == 0, true);
                }
            }
        }
        else {
            if (Game.battleScene.enemyList.length == 0) {
                if (Game.battleMap.curTime >= Game.battleMap.waveTime + 1) {
                    EventManager.event(EventKey.GAMEWIN);
                }
            }
        }
    }

    /*******************英雄相关**************************/

    // 当前拖拽中的英雄信息
    private _heroInf: HeroInfo;
    public get heroInf(): HeroInfo {
        return this._heroInf;
    }
    public set heroInf(v: HeroInfo) {
        this._heroInf = v;
    }


    public heroInSeat(seat: number, heroId: number): void {

    }



    /*******************敌人相关**************************/

    /*******************玩家操作相关**************************/
    public play_map: number;
    public play_level: number;

}