import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import Game from "../../Game";
import BattleScene from "../Models/BattleScene";
import { GameStatus } from "../DataEnums/GameStatus";
import HeroInfo from "../../dataInfo/HeroInfo";
import Association from "./Association";
import UI_PropBtn from "../../fgui/Extend/Arrangement/UI_PropBtn";
import Dictionary from "../../Tool/Dictionary";
import AssociationRaceInfo from "../../dataInfo/AssociationRaceInfo";
import FiveElementsInfo from "../../dataInfo/FiveElementsInfo";
import AssociationCareerInfo from "../../dataInfo/AssociationCareerInfo";
import EnemyData from "./EnemyData";

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
                let dataInf = new EnemyData();
                dataInf.monsterInf = Game.battleMap.nextMonster
                Game.battleScene.createEnemy(Game.battleMap.wave % 2, false, dataInf);
                if (Game.battleMap.bossInfo != null) {
                    let dataInf2 = new EnemyData();
                    dataInf2.monsterInf = Game.battleMap.bossInfo
                    Game.battleScene.createEnemy(Game.battleMap.wave % 2, true, dataInf2);
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

    // 刷新当前阵型上阵英雄的羁绊信息
    public refrushAssociation(): Array<Association> {
        let association: Array<Association> = [];
        let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
        let seatList = dic.getValues();
        let raceDic: Dictionary<number, number> = new Dictionary<number, number>();
        let careerDic: Dictionary<number, number> = new Dictionary<number, number>();
        // 各位置英雄判断
        for (let i = 0; i < 9; i++) {
            if (seatList[i] > 0) {
                let hero = HeroInfo.getInfo(seatList[i]);
                let race = hero.race;
                let career = hero.career;
                if (!raceDic.hasKey(race)) {
                    raceDic.add(race, 0);
                }
                let raceNum = raceDic.getValue(race) + 1;
                raceDic.set(race, raceNum);
                if (!careerDic.hasKey(career)) {
                    careerDic.add(career, 0);
                }
                let careeNum = careerDic.getValue(career) + 1;
                careerDic.set(career, careeNum);
            }
        }
        // 判断羁绊
        if (raceDic.count > 0) {
            // 种族
            let races = raceDic.getKeys();
            let racelist = AssociationRaceInfo.getList();
            let temraceList: Dictionary<number, AssociationRaceInfo> = new Dictionary<number, AssociationRaceInfo>();
            for (let i = 0, len = racelist.length; i < len; i++) {
                let temRace = racelist[i].race;
                if (races.indexOf(String(temRace)) != -1) {
                    if (racelist[i].num <= raceDic.getValue(temRace)) {
                        if (temraceList.hasKey(temRace)) {
                            let val = temraceList.getValue(temRace);
                            if (racelist[i].num > val.num) {
                                temraceList.add(racelist[i].race, racelist[i]);
                            }
                        }
                        else {
                            temraceList.add(racelist[i].race, racelist[i]);
                        }
                    }
                }
            }
            if (temraceList.count > 0) {
                let valList = temraceList.getValues();
                for (let i = 0, len = valList.length; i < len; i++) {
                    let _ass = new Association();
                    _ass.num = valList[i].num;
                    _ass.attribute_id = valList[i].attribute;
                    _ass.values = valList[i].value;
                    _ass.race = valList[i].race;
                    _ass.names = FiveElementsInfo.getInfoWithType(_ass.race).name;
                    association.push(_ass);
                }
            }
        }
        if (careerDic.count > 0) {
            // 职业
            let races = careerDic.getKeys();
            let racelist = AssociationCareerInfo.getList();
            let temraceList: Dictionary<number, AssociationCareerInfo> = new Dictionary<number, AssociationCareerInfo>();
            for (let i = 0, len = racelist.length; i < len; i++) {
                let temRace = racelist[i].career;
                if (races.indexOf(String(temRace)) != -1) {
                    if (racelist[i].num <= careerDic.getValue(temRace)) {
                        if (temraceList.hasKey(temRace)) {
                            let val = temraceList.getValue(temRace);
                            if (racelist[i].num > val.num) {
                                temraceList.add(racelist[i].career, racelist[i]);
                            }
                        }
                        else {
                            temraceList.add(racelist[i].career, racelist[i]);
                        }
                    }
                }
            }
            if (temraceList.count > 0) {
                let valList = temraceList.getValues();
                for (let i = 0, len = valList.length; i < len; i++) {
                    let _ass = new Association();
                    _ass.num = valList[i].num;
                    _ass.attribute_id = valList[i].attribute;
                    _ass.values = valList[i].value;
                    _ass.career = valList[i].career;
                    _ass.names = FiveElementsInfo.getInfoWithType(_ass.career).name;
                    association.push(_ass);
                }
            }
        }
        return association;
    }

    /*******************敌人相关**************************/

    /*******************玩家操作相关**************************/
    // 玩家技能
    public map_skills: number[] = [1, 2, 3];
    // 关卡id
    public wave_id: number = 1;
    // 战斗类型 0：闯关，1：试炼，2：探索
    public fight_type: number = 0;
    // 地图
    public play_map: number = 1;
    // 关卡
    public play_level: number = 1;

}