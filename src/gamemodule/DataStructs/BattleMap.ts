import EventManager from "../../tool/EventManager";
import EventKey from "../../tool/EventKey";
import Dictionary from "../../tool/Dictionary";
import MathRandom from "../../tool/MathRandom";
import WaveStatus from "./WaveStatus";
import Game from "../../Game";
import { GameStatus } from "../DataEnums/GameStatus";
import DifficultyEfficiencyInfo from "../../csvInfo/DifficultyEfficiencyInfo";
import HeroTypeInfo from "../../csvInfo/HeroTypeInfo";
import MonsterInfo from "../../csvInfo/MonsterInfo";
import TimeHouseInfo from "../../csvInfo/TimeHouseInfo";
import WaveformInfo from "../../csvInfo/WaveformInfo";
import WaveInfo from "../../csvInfo/WaveInfo";
import Fun from "../../tool/Fun";
import WaveRewardInfo from "../../csvInfo/WaveRewardInfo";
import TypedSignal from "../../tool/TypedSignal";
import Signal from "../../tool/Signal";
import ConfigData from "../../csvInfo/ConfigData";
import BattleMapEnemy from "./BattleMapEnemy";

export default class BattleMap {

    private static _Instance: BattleMap;
    static get Instance(): BattleMap {
        if (!BattleMap._Instance) {
            BattleMap._Instance = new BattleMap();
        }
        return BattleMap._Instance;
    }

    public init(json: Array<any>): void {
        let len = json.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let item = json[i];
                let wavestatus = new WaveStatus();
                wavestatus.id = item.id;
                wavestatus.level = item.level;
                if (item.hasOwnProperty("exploreTime2")) {
                    wavestatus.exploreTime = item.exploreTime2;
                }
                if (item.hasOwnProperty("exploreTotalTime2")) {
                    wavestatus.exploreTotalTime = item.exploreTotalTime2;
                }
                if (item.hasOwnProperty("exploreHeroId")) {
                    wavestatus.exploreHeroId = item.exploreHeroId;
                }
                wavestatus.fightCd = item.cd;
                this.waveStatusDict.add(item.id, wavestatus);
            }
        }
        let maxId = 0;
        let idList = this.waveStatusDict.getKeys();
        for (let i = idList.length - 1; i >= 0; i--) {
            if (maxId < Number(idList[i])) {
                maxId = Number(idList[i]);
            }
        }
        // 第一次进入关卡
        if (maxId == 0) {
            let curwaveinf = WaveInfo.getInfo(1);
            this.maxMapId = curwaveinf.id;
        }
        else {
            let waveinf = WaveInfo.getInfo(maxId + 1);
            if (waveinf) {
                this.maxMapId = waveinf.id;
            }
            else {
                let curwaveinf = WaveInfo.getInfo(maxId);
                // 已通关
                this.maxMapId = curwaveinf.id;
            }
        }
        // 测试专用
        this.maxMapId = 40;
    }
    // 关卡状态字典
    public waveStatusDict: Dictionary<number, WaveStatus> = new Dictionary<number, WaveStatus>();
    public sUpdateExploreTime: TypedSignal<WaveStatus> = new TypedSignal<WaveStatus>();
    public sUpdateFightCd: TypedSignal<WaveStatus> = new TypedSignal<WaveStatus>();

    // 当前地图    
    private _curMap: number = 1;
    public get curMap(): number {
        return this._curMap;
    }
    public set curMap(v: number) {
        this._curMap = v;
    }

    private _maxMapId: number = 1;
    /**
     * 最大地图  id
     */
    public get maxMapId(): number {
        return this._maxMapId;
    }
    public set maxMapId(v: number) {
        this._maxMapId = v;
        if (v > 14) {
            if (Game.playData.unlockEndless == 0) {
                Game.playData.unlockEndless = 1;
            }
        } else {
            Game.playData.unlockEndless = 0;
        }
    }

    // 关卡波次（当前关卡第几个敌人）
    private _levelWave: number = 0;
    public get levelWave(): number {
        return this._levelWave;
    }
    public set levelWave(v: number) {
        this._levelWave = v;
    }
    // 关卡最大波次（最大几个敌人）
    private _maxWave: number;
    public get maxWave(): number {
        return this._maxWave;
    }
    public set maxWave(v: number) {
        this._maxWave = v;
    }

    public openMap(): void {
        this.curMap = Game.battleData.level_id;
        this.levelWave = 0;
        this.setwaveInf(Game.battleData.level_id);
        EventManager.event(EventKey.MAP_REFRUSH);
        Game.gameStatus = GameStatus.Gaming;
        // if (!Game.isMobile) {
        Game.gm.setGmInf("挑战胜利", Laya.Handler.create(this, this.levelWin, null, false));
        Game.gm.setGmInf("挑战失败", Laya.Handler.create(this, this.levelLose, null, false));
        // }
        Game.gm.setGmInf("开启跑马灯", Laya.Handler.create(this, this.showHideTotal, [false], false));
        Game.gm.setGmInf("关闭跑马灯", Laya.Handler.create(this, this.showHideTotal, [true], false));
        Game.gm.setGmInf("开启头顶提示", Laya.Handler.create(this, this.showHideHeroTip, [true], false));
        Game.gm.setGmInf("关闭头顶提示", Laya.Handler.create(this, this.showHideHeroTip, [false], false));
    }

    public levelWin(): void {
        EventManager.event(EventKey.GAMEWIN);
        setTimeout(() => {
            Game.gm.removeGmInf("挑战胜利");
            Game.gm.removeGmInf("挑战失败");
        }, 100);
    }
    private levelLose(): void {
        EventManager.event(EventKey.GAMELOSE);
        setTimeout(() => {
            Game.gm.removeGmInf("挑战胜利");
            Game.gm.removeGmInf("挑战失败");
        }, 100);
    }
    public showHideTotal(closeTotal: boolean): void {
        Game.total.closeTotal = closeTotal;
    }
    public showHideHeroTip(closeTip: boolean): void {
        Game.gm.closeHeroTip = closeTip;
        Game.gm.sUpdateCloseHeroTip.dispatch(closeTip);
    }

    // 退出战斗场景
    public sUpdateExitBattleMain: Signal = new Signal();

    /*******************怪物生成规则***********************/

    public setwaveInf(v: number) {
        Game.battleData.startClear();
        // 关卡
        if (Game.battleData.curEnterFightType == 2) {
            v = Game.battleData.dayFightWave + Game.battleData.dayFightProgress - 1;
            this.dayWaveInfo = ConfigData.getInfo(v);
            this.waveInfo = null;
        }
        else {
            this.waveInfo = WaveInfo.getInfo(v);
            this.dayWaveInfo = null;
        }
        // 类型
        if (Game.battleData.curEnterFightType == 2) {
            this.waveType = this.dayWaveInfo.type;
        }
        else {
            this.waveType = this.waveInfo.type;
        }
        // 难度
        let _difficulty: number = 0;
        if (Game.battleData.curEnterFightType == 2) {
            _difficulty = this.dayWaveInfo.difficulty;
        }
        else {
            if (Game.battleData.curEnterFightType == 3) {
                _difficulty = 10;
            } else {
                _difficulty = this.waveInfo.difficulty;
            }
        }
        // 曲线系数
        if (Game.battleData.curEnterFightType == 2) {
            this.waveform = WaveformInfo.getInfoWithType(this.dayWaveInfo.waveform);
        }
        else {
            this.waveform = WaveformInfo.getInfoWithType(this.waveInfo.waveform);
        }
        // 随机种子
        let seed1: number = 0;
        if (Game.battleData.curEnterFightType == 2) {
            seed1 = this.dayWaveInfo.random;
        }
        else {
            seed1 = this.waveInfo.random;
        }
        // 关卡时长
        if (Game.battleData.curEnterFightType == 2) {
            this.waveTime = this.dayWaveInfo.time * 1000;
        }
        else {
            this.waveTime = this.waveInfo.time * 1000;
        }


        // 难度效率
        let _difEfficiency: number = 0;
        for (let i = 1, len = DifficultyEfficiencyInfo.getCount(); i <= len; i++) {
            let item = DifficultyEfficiencyInfo.getInfo(i);
            if (item.difficulty == _difficulty) {
                _difEfficiency = item.val;
                break;
            }
        }

        this._heroTypeInf = HeroTypeInfo.getInfo(this.waveType);
        // 基准攻速
        this.waveDifEfficiency = _difEfficiency;
        this.mathrandom1 = new MathRandom(seed1);
        this.mathrandomBattle = new MathRandom(seed1);
        // 时间与精神房子
        if (Game.battleData.curEnterFightType == 2) {
            this.timeHouse = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
            this.timeHouseVal = this.timeHouse.vals[Game.playData.curStar];
        }
        else {
            if (Game.battleData.curEnterFightType == 3) {
                this.timeHouse = TimeHouseInfo.getInfoLv(Game.battleData.endlessMy.progress + 30);
            } else {
                this.timeHouse = TimeHouseInfo.getInfoLv(this.waveInfo.lv);
            }
            this.timeHouseVal = this.timeHouse.vals[this.timeHouse.star];
            // if (Game.battleData.curEnterFightType != 3 && this.waveStatusDict.hasKey(v)) {
            //     let status: WaveStatus = this.waveStatusDict.getValue(v);
            //     let waveRewards = WaveRewardInfo.getInfo(v);
            //     this.timeHouseVal = waveRewards.types[status.level - 1];
            // }
        }
        this.nextCD = 0;
        this.curTime = 0;
        this.bossDic.clear();
        this.createEnemy();
    }

    public _heroTypeInf: HeroTypeInfo = null;

    // 关卡信息
    public waveInfo: WaveInfo = null;
    public dayWaveInfo: ConfigData = null;
    // 关卡时长    
    private _waveTime: number;
    public get waveTime(): number {
        return this._waveTime;
    }
    public set waveTime(v: number) {
        this._waveTime = v;
    }

    // 关卡类型
    private waveType: number = 0;
    // 基准
    public waveDifEfficiency: number = 0;
    public waveScale: number = 0;
    // 曲线类型
    private waveform: Array<WaveformInfo> = [];
    // 随机种子
    public mathrandom1: MathRandom = null;
    // 战斗随机种子
    public mathrandomBattle: MathRandom = null;
    // 下一个敌人
    // private _nextMonster: MonsterInfo;
    // public get nextMonster(): MonsterInfo {
    //     return this._nextMonster;
    // }
    // public set nextMonster(v: MonsterInfo) {
    //     this._nextMonster = v;
    // }
    // 时间与精神的房子
    private _timeHouse: TimeHouseInfo;
    public get timeHouse(): TimeHouseInfo {
        return this._timeHouse;
    }
    public set timeHouse(v: TimeHouseInfo) {
        this._timeHouse = v;
    }
    // 时间与精神的房子具体值
    private _timeHouseVal: number;
    public get timeHouseVal(): number {
        return this._timeHouseVal;
    }
    public set timeHouseVal(v: number) {
        this._timeHouseVal = v;
    }



    // 是否生成boss
    // private _bossInfo: MonsterInfo;
    // public get bossInfo(): MonsterInfo {
    //     return this._bossInfo;
    // }
    // public set bossInfo(v: MonsterInfo) {
    //     this._bossInfo = v;
    // }
    private bossDic: Dictionary<number, number> = new Dictionary<number, number>();


    // 下一个敌人到来的cd
    private _nextCD: number = 0;
    public get nextCD(): number {
        return this._nextCD;
    }
    public set nextCD(v: number) {
        this._nextCD = v;
    }
    // 当前关卡过去了多长时间
    private _curTime: number = 0;
    public get curTime(): number {
        return this._curTime;
    }
    public set curTime(v: number) {
        this._curTime = v;
    }
    // 当前关卡怪物信息
    public curBattleEnemyDic: Dictionary<number, BattleMapEnemy> = new Dictionary<number, BattleMapEnemy>();
    // 当前boss上场时间
    public curBossShowTime: number = 0;
    // 当前关卡boss信息列表
    public curBattleBossList: Array<BattleMapEnemy> = [];
    // 怪物可用数量信息
    public curBattleEnemyListNumber: Array<number> = [];

    // 初始化本关敌人信息
    private createEnemy(): void {
        this.curBattleEnemyDic.clear();
        this.curBossShowTime = -1;
        this.curBattleBossList = [];
        this.curBattleEnemyListNumber = [];
        let _curTime = 0;
        // 本关可用敌人列表
        let list: MonsterInfo[] = [];
        // 本关可用boss列表
        let listBoss: MonsterInfo[] = [];
        for (let i = 1, len = MonsterInfo.getCount(); i <= len; i++) {
            let item = MonsterInfo.getInfo(i);
            if (item.type == this.waveType) {
                // 适用关卡判断
                let canAdd = false;
                if (Game.battleData.curEnterFightType == 2) {
                    // 每日试炼不做关卡适用判断
                    canAdd = true;
                }
                else {
                    let bigWave = item.big_wave.toString();
                    for (let k = bigWave.length - 1; k >= 0; k--) {
                        if (Math.floor((this.curMap - 1) / 10) + 1 == Number(bigWave[k])) {
                            canAdd = true;
                            break;
                        }
                    }
                }
                if (canAdd) {
                    if (item.boss == 1) {
                        listBoss.push(item);
                    }
                    else {
                        list.push(item);
                    }
                }
            }
        }
        // 依据时间线生成敌人
        if (list.length > 0) {
            let curTimePeriod = Math.floor(this.waveTime / 9);
            let nextCd = 0;
            while (_curTime < this.waveTime) {
                let nextMonster = list[Math.floor(this.mathrandom1.random(list.length))];
                let cont = this.curBattleEnemyDic.count + 1;
                this.curBattleEnemyListNumber.push(this.curBattleEnemyDic.count);
                this.curBattleEnemyDic.add(this.curBattleEnemyDic.count, new BattleMapEnemy(cont, cont % 2, nextMonster, _curTime, false));
                // 计算下一个敌人生成的时间
                for (let i = 9; i >= 0; i--) {
                    if (_curTime >= curTimePeriod * i) {
                        let _waveform1: WaveformInfo = null;
                        let _waveform2: WaveformInfo = null;
                        for (let ll = this.waveform.length - 1; ll >= 0; ll--) {
                            if (this.waveform[ll].index == i) {
                                _waveform1 = this.waveform[ll];
                            }
                            else if (this.waveform[ll].index == i + 1) {
                                _waveform2 = this.waveform[ll];
                            }
                            if (_waveform1 != null && _waveform2 != null) {
                                break;
                            }
                        }
                        if (_waveform2 == null) {
                            _waveform2 = _waveform1;
                        }
                        let _xiaolv = _waveform1.waveform + (_waveform2.waveform - _waveform1.waveform) * ((_curTime - curTimePeriod * i) / curTimePeriod);
                        // 是否创建boss判断
                        let bossNum = _waveform1.boss;
                        let bossInfo: MonsterInfo = null;
                        if (bossNum > 0 && listBoss.length > 0) {
                            let dicNum = 0;
                            if (this.bossDic.hasKey(i)) {
                                dicNum = this.bossDic.getValue(i);
                            }
                            if (bossNum > dicNum) {
                                dicNum++;
                                this.bossDic.set(i, dicNum);
                                // 生成一个boss
                                bossInfo = listBoss[Math.floor(this.mathrandom1.random(listBoss.length))];
                                let cont2 = this.curBattleEnemyDic.count + 1;
                                this.curBattleEnemyListNumber.push(this.curBattleEnemyDic.count);
                                let _bossinf = new BattleMapEnemy(cont2, cont2 % 2, bossInfo, _curTime, true);
                                if (this.curBossShowTime < 0) {
                                    this.curBossShowTime = _curTime * 0.5;
                                }
                                this.curBattleBossList.push(_bossinf);
                                this.curBattleEnemyDic.add(this.curBattleEnemyDic.count, _bossinf);
                            }
                        }
                        // 攻速判断
                        if (Game.battleData.curEnterFightType == 2) {
                            this.waveScale = this.dayWaveInfo.difficultyscale;
                            if (this.waveType == 1 || this.waveType == 2) {
                                let remain = nextMonster.base_num / (_xiaolv * this.dayWaveInfo.heronum);
                                nextCd += remain * 1000;
                                if (bossInfo) {
                                    let remain2 = bossInfo.base_num / (_xiaolv * this.dayWaveInfo.heronum);
                                    nextCd += remain2 * 1000;
                                }
                            }
                            else {
                                let remain = nextMonster.base_hp / (_xiaolv * this.dayWaveInfo.heronum);
                                nextCd += remain * 1000;
                                if (bossInfo) {
                                    let remain2 = bossInfo.base_hp / (_xiaolv * this.dayWaveInfo.heronum);
                                    nextCd += remain2 * 1000;
                                }
                            }
                        }
                        else {
                            let heronumsss = this.waveInfo.heronum;
                            this.waveScale = this.waveInfo.difficultyscale;
                            if (Game.battleData.curEnterFightType == 3) {
                                heronumsss = 9;
                                this.waveScale = 1.5;
                            }
                            if (this.waveType == 1 || this.waveType == 2) {
                                let remain = nextMonster.base_num / (_xiaolv * heronumsss);
                                nextCd += remain * 1000;
                                if (bossInfo) {
                                    let remain2 = bossInfo.base_num / (_xiaolv * heronumsss);
                                    nextCd += remain2 * 1000;
                                }
                            }
                            else {
                                let remain = nextMonster.base_hp / (_xiaolv * heronumsss);
                                nextCd += remain * 1000;
                                if (bossInfo) {
                                    let remain2 = bossInfo.base_hp / (_xiaolv * heronumsss);
                                    nextCd += remain2 * 1000;
                                }
                            }
                        }
                        _curTime = nextCd;
                        break;
                    }
                }
            }
        }
        else {
            console.log("敌人刷新完毕");
        }
    }



}