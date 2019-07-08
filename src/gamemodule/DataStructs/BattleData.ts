import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import Game from "../../Game";
import BattleScene from "../Models/BattleScene";
import { GameStatus } from "../DataEnums/GameStatus";
import HeroInfo from "../../dataInfo/HeroInfo";
import Association from "./Association";
import UI_PropBtn from "../../fgui/Extend/Arrangement/UI_PropBtn";

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



    private _startDrag: boolean = false;
    public get startDrag(): boolean {
        return this._startDrag;
    }
    public set startDrag(v: boolean) {
        this._startDrag = v;
    }

    // 当前拖拽中的英雄信息
    private _heroInf: HeroInfo = null;
    public get heroInf(): HeroInfo {
        return this._heroInf;
    }
    public set heroInf(v: HeroInfo) {
        this._heroInf = v;
    }
    // 当前拖拽中的英雄在阵上那个点
    private _seatPos: number = -1;
    public get seatPos(): number {
        return this._seatPos;
    }
    public set seatPos(v: number) {
        this._seatPos = v;
    }
    // 拖拽前的按钮
    private _seatBtn: UI_PropBtn = null;
    public get seatBtn(): UI_PropBtn {
        return this._seatBtn;
    }
    public set seatBtn(v: UI_PropBtn) {
        this._seatBtn = v;
    }
    // 当前显示那个英雄详情
    private _clickHeroInf: HeroInfo = null;
    public get clickHeroInf(): HeroInfo {
        return this._clickHeroInf;
    }
    public set clickHeroInf(v: HeroInfo) {
        this._clickHeroInf = v;
    }




    // 当前展示那个羁绊信息
    private _association: Association = null;
    public get association(): Association {
        return this._association;
    }
    public set association(v: Association) {
        this._association = v;
    }




    /*******************敌人相关**************************/

    /*******************玩家操作相关**************************/
    public map_skills: number[] = [1, 2, 3];
    public wave_id: number = 1;
    public fight_type: number = 0;
    public play_map: number = 1;
    public play_level: number = 1;

}