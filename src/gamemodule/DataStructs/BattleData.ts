import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import Game from "../../Game";
import BattleScene from "../Models/BattleScene";
import { GameStatus } from "../DataEnums/GameStatus";
import Association from "./Association";
import UI_PropBtn from "../../fgui/Extend/Arrangement/UI_PropBtn";
import Dictionary from "../../Tool/Dictionary";
import EnemyData from "./EnemyData";
import Signal from "../../Tool/Signal";
import RewardItem from "./RewardItem";
import AssociationCareerInfo from "../../csvInfo/AssociationCareerInfo";
import AssociationRaceInfo from "../../csvInfo/AssociationRaceInfo";
import AssociationSpecialInfo from "../../csvInfo/AssociationSpecialInfo";
import TimeHouseInfo from "../../csvInfo/TimeHouseInfo";
import WaveInfo from "../../csvInfo/WaveInfo";
import HeroTypeInfo from "../../csvInfo/HeroTypeInfo";
import { FightType } from "../DataEnums/FightType";
import DifficultyEfficiencyInfo from "../../csvInfo/DifficultyEfficiencyInfo";
import WaveStatus from "./WaveStatus";
import AssociationAttributeInfo from "../../csvInfo/AssociationAttributeInfo";
import WaveRewardInfo from "../../csvInfo/WaveRewardInfo";
import TypedSignal from "../../Tool/TypedSignal";
import HeroInfoData from "./HeroInfoData";

export default class BattleData {

    private static _Instance: BattleData;
    static get Instance(): BattleData {
        if (!BattleData._Instance) {
            BattleData._Instance = new BattleData();
        }
        return BattleData._Instance;
    }

    public countdown: Signal = new Signal();

    public init(): void {
        this.refrushSeatFightInf();
    }

    /*******************关卡相关**************************/

    public update(): void {
        if (Game.gameStatus != GameStatus.Gaming) return;
        Game.battleMap.curTime++;
        this.countdown.dispatch();
        if (Game.battleMap.curTime < Game.battleMap.waveTime) {
            if (Game.battleMap.curTime >= Game.battleMap.nextCD) {
                Game.battleMap.enemyInf();
                if (Game.battleMap.nextMonster != null) {
                    // 生成怪物
                    let dataInf = new EnemyData();
                    dataInf.monsterInf = Game.battleMap.nextMonster;
                    dataInf.initPos = Game.battleMap.levelWave % 2;
                    Game.battleScene.createEnemy(dataInf.initPos, false, dataInf);
                }
                if (Game.battleMap.bossInfo != null) {
                    // 生成boss
                    let dataInf2 = new EnemyData();
                    dataInf2.monsterInf = Game.battleMap.bossInfo
                    dataInf2.initPos = Game.battleMap.levelWave % 2;
                    Game.battleScene.createEnemy(dataInf2.initPos, true, dataInf2);
                }
            }
        }
        else {
            if (Game.battleScene.enemyList.length == 0) {
                if (Game.battleMap.curTime >= Game.battleMap.waveTime + 2) {
                    Game.battleMap.curTime = Game.battleMap.waveTime * Game.battleMap.waveTime;
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
    private _heroInf: HeroInfoData = null;
    public get heroInf(): HeroInfoData {
        return this._heroInf;
    }
    public set heroInf(v: HeroInfoData) {
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
    // 当前显示那个英雄详情 -- 打开英雄详情时调用
    public isShowGainBtn: boolean = false;
    private _clickHeroInf: HeroInfoData = null;
    public get clickHeroInf(): HeroInfoData {
        return this._clickHeroInf;
    }
    public set clickHeroInf(v: HeroInfoData) {
        this._clickHeroInf = v;
    }

    /**
     * 刷新当前阵容战力信息
     */
    public refrushSeatFightInf(): void {
        let ass = Game.battleData.refrushAssociation(true);
        let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
        let speed = 0;
        let atk = 0;
        let crit = 0;
        let burst = 0;
        let speedEx = 0;
        let atkEx = 0;
        let critEx = 0;
        let burstEx = 0;
        let timehouse = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
        let star = timehouse.vals[Game.playData.curStar];
        let assLen: number = ass.length;
        let heroNum: number = 0;
        for (let i = 0; i < 9; i++) {
            if (seatList[i] > 0) {
                heroNum++;
                // let hero = HeroInfo.getInfo(seatList[i]);
                let hero = HeroInfoData.getInfo(seatList[i]);
                speed += (1 / hero.cd);
                let atkHero = hero.basicattckpointCur * star * 0.01 * hero.atkscale * 0.01;
                let temAtk = atkHero * (1 / hero.cd);
                atk += temAtk;
                crit += hero.crit;
                burst += hero.burst;
                atk += (temAtk * hero.crit * 0.01 * (hero.burst - 100) * 0.01);
                if (assLen > 0) {
                    for (let j = 0; j < assLen; j++) {
                        let item = ass[j];
                        let add: boolean = false;
                        if (item.race > 0 && hero.race == item.race) {
                            add = true;
                        }
                        if (item.career > 0 && hero.career == item.career) {
                            add = true;
                        }
                        if (item.hero.length > 0 && hero.point_fetters == item.pointF) {
                            add = true;
                        }
                        if (add) {
                            let att = AssociationAttributeInfo.getInfo(item.attribute_id);
                            switch (att.types) {
                                case 1:// 普通攻击力增加{0}%
                                    atkEx += atkHero * item.values * 0.01;
                                    break;
                                case 2:// 普通攻击暴击率增加{0}%
                                    critEx += item.values;
                                    break;
                                case 3:// 攻速增加{0}%
                                    speedEx += item.values * 0.01 / hero.cd;
                                    break;
                                case 8://	普通攻击爆伤增加{ 0 }%
                                    burstEx += item.values;
                                    break;
                            }
                        }
                    }
                }
            }
        }
        let curDic = new Dictionary<string, number>();
        if (heroNum > 0) {
            curDic.add(FightType.Atk, atk);
            curDic.add(FightType.Speed, speed);
            curDic.add(FightType.Crit, crit / heroNum);
            curDic.add(FightType.Burst, burst / heroNum);
            curDic.add(FightType.AtkEx, atkEx);
            curDic.add(FightType.SpeedEx, speedEx);
            curDic.add(FightType.CritEx, critEx / heroNum);
            curDic.add(FightType.BurstEx, burstEx / heroNum);
        }
        Game.playData.curFightInf = curDic;
    }

    public getHeroFightVal(id: number): Dictionary<string, number> {
        let hero = HeroInfoData.getInfo(id);
        let timehouse = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
        let star = timehouse.vals[Game.playData.curStar];
        let atkHero = hero.basicattckpointCur * star * 0.01 * hero.atkscale * 0.01;
        let speed = (1 / hero.cd);
        let atk = atkHero;
        let crit = hero.crit;
        let burst = hero.burst;
        let speedEx = 0;
        let atkEx = 0;
        let critEx = 0;
        let burstEx = 0;
        let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
        if (seatList.indexOf(id) != -1) {
            let ass = Game.battleData.refrushAssociation(true);
            let assLen: number = ass.length;
            if (assLen > 0) {
                for (let j = 0; j < assLen; j++) {
                    let item = ass[j];
                    let add: boolean = false;
                    if (item.race > 0 && hero.race == item.race) {
                        add = true;
                    }
                    if (item.career > 0 && hero.career == item.career) {
                        add = true;
                    }
                    if (item.hero.length > 0 && hero.point_fetters == item.pointF) {
                        add = true;
                    }
                    if (add) {
                        let att = AssociationAttributeInfo.getInfo(item.attribute_id);
                        switch (att.types) {
                            case 1:// 普通攻击力增加{0}%
                                atkEx += atkHero * item.values * 0.01;
                                break;
                            case 2:// 普通攻击暴击率增加{0}%
                                critEx += item.values;
                                break;
                            case 3:// 攻速增加{0}%
                                speedEx += item.values * 0.01 / hero.cd;
                                break;
                            case 8://	普通攻击爆伤增加{ 0 }%
                                burstEx += item.values;
                                break;
                        }
                    }
                }
            }
        }
        let curDic = new Dictionary<string, number>();
        curDic.add(FightType.Atk, atk);
        curDic.add(FightType.Speed, speed);
        curDic.add(FightType.Crit, crit);
        curDic.add(FightType.Burst, burst);
        curDic.add(FightType.AtkEx, atkEx);
        curDic.add(FightType.SpeedEx, speedEx);
        curDic.add(FightType.CritEx, critEx);
        curDic.add(FightType.BurstEx, burstEx);
        return curDic;
    }


    /**
     * 获取指定关卡的战力情况
     * @param id 
     */
    public getWaveFightInf(id: number): Dictionary<string, number> {
        let wave = WaveInfo.getInfo(id);
        // 难度效率
        let _difEfficiency: number = 1;
        for (let i = 1, len = DifficultyEfficiencyInfo.getCount(); i <= len; i++) {
            let item = DifficultyEfficiencyInfo.getInfo(i);
            if (item.difficulty == wave.difficulty) {
                _difEfficiency = item.val;
                break;
            }
        }
        let atkDieff = 1;
        let speedDieff = 1;
        if (wave.type == 1 || wave.type == 2) {
            speedDieff = _difEfficiency;
        }
        else {
            atkDieff = _difEfficiency;
        }
        let heroType = HeroTypeInfo.getInfo(wave.type);
        let dic = new Dictionary<string, number>();
        let timehouse = TimeHouseInfo.getInfoLv(wave.lv);
        let star = timehouse.vals[timehouse.star];
        if (Game.battleMap.waveStatusDict.hasKey(id)) {
            let status: WaveStatus = Game.battleMap.waveStatusDict.getValue(id);
            let waveRewards = WaveRewardInfo.getInfo(id);
            star = waveRewards.types[status.level - 1];
        }
        dic.add(FightType.Atk, heroType.benchmark_pure_atk * star * 0.01 * atkDieff * wave.heronum);
        dic.add(FightType.Speed, heroType.bench_atk_speed * speedDieff * wave.heronum);
        dic.add(FightType.Crit, heroType.benchmark_crit);
        dic.add(FightType.Burst, heroType.benchmark_critatt);
        return dic;
    }


    // 当前展示那个羁绊信息 --- 点击推荐羁绊时使用
    private _association: Association = null;
    /**
     * 当前展示那个羁绊信息 --- 点击推荐羁绊时使用
     */
    public get association(): Association {
        return this._association;
    }
    public set association(v: Association) {
        this._association = v;
    }

    private _curAssociation: Array<Association> = null;
    // 刷新当前阵型上阵英雄的羁绊信息
    public refrushAssociation(init: boolean = false): Array<Association> {
        if (init) {
            this._curAssociation = null;
        }
        if (this._curAssociation == null) {
            this._curAssociation = [];
        }
        else {
            return this._curAssociation;
        }
        let association: Array<Association> = [];
        let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
        // 种族
        let raceDic: Dictionary<number, number> = new Dictionary<number, number>();
        // 职业
        let careerDic: Dictionary<number, number> = new Dictionary<number, number>();
        // 点|特殊
        let pointDic: Dictionary<number, Array<number>> = new Dictionary<number, Array<number>>();
        // 各位置英雄判断
        for (let i = 0; i < 9; i++) {
            if (seatList[i] > 0) {
                let hero = HeroInfoData.getInfo(seatList[i]);
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
                if (hero.point_fetters > 0) {
                    let arrList = [];
                    if (pointDic.hasKey(hero.point_fetters)) {
                        arrList = pointDic.getValue(hero.point_fetters);
                    }
                    arrList.push(hero.id);
                    pointDic.add(hero.point_fetters, arrList);
                }
            }
        }
        // 判断羁绊
        if (raceDic.count > 0) {
            // 种族
            let races = raceDic.getKeys();
            let temraceList: Dictionary<number, AssociationRaceInfo> = new Dictionary<number, AssociationRaceInfo>();
            for (let i = 1, len = AssociationRaceInfo.getCount(); i <= len; i++) {
                let item = AssociationRaceInfo.getInfo(i);
                let temRace = item.race;
                if (races.indexOf(String(temRace)) != -1) {
                    if (item.num <= raceDic.getValue(temRace)) {
                        if (temraceList.hasKey(temRace)) {
                            let val = temraceList.getValue(temRace);
                            if (item.num > val.num) {
                                temraceList.add(item.race, item);
                            }
                        }
                        else {
                            temraceList.add(item.race, item);
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
                    association.push(_ass);
                }
            }
        }
        if (careerDic.count > 0) {
            // 职业
            let races = careerDic.getKeys();
            let temraceList: Dictionary<number, AssociationCareerInfo> = new Dictionary<number, AssociationCareerInfo>();
            for (let i = 1, len = AssociationCareerInfo.getCount(); i <= len; i++) {
                let item = AssociationCareerInfo.getInfo(i);
                let temRace = item.career;
                if (races.indexOf(String(temRace)) != -1) {
                    if (item.num <= careerDic.getValue(temRace)) {
                        if (temraceList.hasKey(temRace)) {
                            let val = temraceList.getValue(temRace);
                            if (item.num > val.num) {
                                temraceList.add(item.career, item);
                            }
                        }
                        else {
                            temraceList.add(item.career, item);
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
                    association.push(_ass);
                }
            }
        }
        // 点羁绊判断
        if (pointDic.count > 0) {
            let keyList = pointDic.getKeys();
            for (let i = 0, len = keyList.length; i < len; i++) {
                let heroList = Association.pointFetter(Number(keyList[i]));
                if (heroList.length == pointDic.getValue(Number(keyList[i])).length) {
                    let assSpecail = AssociationSpecialInfo.getInfo(keyList[i]);
                    let _ass = new Association();
                    _ass.pointF = Number(keyList[i]);
                    _ass.attribute_id = assSpecail.attribute;
                    let temList = [];
                    for (let j = 0, lens = heroList.length; j < lens; j++) {
                        temList.push(heroList[j].id);
                    }
                    _ass.hero = temList;
                    _ass.values = assSpecail.value;
                    _ass.num = temList.length;
                    association.push(_ass);
                }
            }
        }


        this._curAssociation = association;
        return association;
    }

    /*******************敌人相关**************************/


    /*******************玩家操作相关**************************/
    // 玩家技能
    public map_skills: number[] = [1, 2, 3];
    // 关卡id
    public level_id: number = 1;
    // 战斗类型 0：闯关，1：试炼，2：探索
    public fight_type: number = 0;
    // 地图
    public play_map: number = 1;
    // 关卡
    public play_level: number = 1;
    // 试炼第几小关
    public trial_level: number = 0;

    /*******************战斗结果相关**************************/
    public fight_result: Array<RewardItem> = [];

}