import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import Dictionary from "../../Tool/Dictionary";
import WaveformInfo from "../../dataInfo/WaveformInfo";
import HeroTypeInfo from "../../dataInfo/HeroTypeInfo";
import DifficultyEfficiencyInfo from "../../dataInfo/DifficultyEfficiencyInfo";
import MonsterInfo from "../../dataInfo/MonsterInfo";
import WaveInfo from "../../dataInfo/WaveInfo";
import MathRandom from "../../Tool/MathRandom";
import TimeHouseInfo from "../../dataInfo/TimeHouseInfo";
import WaveStatus from "./WaveStatus";
import Game from "../../Game";
import { GameStatus } from "../DataEnums/GameStatus";

export default class BattleMap {

    private static _Instance: BattleMap;
    static get Instance(): BattleMap {
        if (!BattleMap._Instance) {
            BattleMap._Instance = new BattleMap();
        }
        return BattleMap._Instance;
    }

    public init(json: Array<any>): void {
        let maxId = 0;
        let len = json.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let item = json[i];
                if (maxId < item.id) {
                    maxId = item.id;
                }
                let wavestatus = new WaveStatus();
                wavestatus.id = item.id;
                wavestatus.level = item.level;
                wavestatus.time = item.time;
                this.waveStatusDict.add(item.id, wavestatus);
            }
        }
        // 第一次进入关卡
        if (maxId == 0) {
            let curwaveinf = WaveInfo.getInfo(1);
            this.maxMapId = curwaveinf.id;
        }
        else {
            let curwaveinf = WaveInfo.getInfo(maxId);
            let waveinf = WaveInfo.getInfo(maxId + 1);
            if (waveinf) {
                this.maxMapId = waveinf.id;
            }
            else {
                // 已通关
                this.maxMapId = curwaveinf.id;
            }
        }
    }
    // 关卡状态字典
    public waveStatusDict: Dictionary<number, WaveStatus> = new Dictionary<number, WaveStatus>();

    // 当前地图    
    private _curMap: number = 1;
    public get curMap(): number {
        return this._curMap;
    }
    public set curMap(v: number) {
        this._curMap = v;
    }
    // 最大地图  id 
    private _maxMapId: number = 1;
    public get maxMapId(): number {
        return this._maxMapId;
    }
    public set maxMapId(v: number) {
        this._maxMapId = v;
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
        let curwaveinf = WaveInfo.getInfo(Game.battleData.level_id);
        if (curwaveinf) {
            this.curMap = curwaveinf.map;
            this.levelWave = 0;
            this.setwaveInf(Game.battleData.level_id);
            EventManager.event(EventKey.MAP_REFRUSH);
            Game.gameStatus = GameStatus.Gaming;
        }
        else {
            Game.tipWin.showTip("无法进入，未知的关卡信息");
        }
    }


    /*******************怪物生成规则***********************/

    public setwaveInf(v: number) {
        // 关卡
        this.waveInfo = WaveInfo.getInfo(v);
        // 类型
        this.waveType = this.waveInfo.type;
        // 难度
        let _difficulty: number = this.waveInfo.difficulty;
        // 曲线系数
        this.waveform = WaveformInfo.getInfoWithType(this.waveInfo.waveform);// this.waveInfo.waveform;
        // 随机种子
        let seed1: number = this.waveInfo.random;
        // 关卡时长
        this.waveTime = this.waveInfo.time;


        // 难度效率
        let _difEfficiency: number = 0;
        let _difList: Array<DifficultyEfficiencyInfo> = DifficultyEfficiencyInfo.getList();
        for (let i = _difList.length - 1; i >= 0; i--) {
            if (_difList[i].difficulty == _difficulty) {
                _difEfficiency = _difList[i].val;
            }
        }

        let _heroTypeInf: HeroTypeInfo = HeroTypeInfo.getInfo(this.waveType);
        // 基准攻速
        this.benchAtkSpeed = _heroTypeInf.bench_atk_speed * _difEfficiency;
        // 基准攻击力
        this.benchMarkAtk = _heroTypeInf.benchmark_atk * _difEfficiency;
        this.mathrandom1 = new MathRandom(seed1);
        // 时间与精神房子
        this.timeHouse = TimeHouseInfo.getInfoLv(this.waveInfo.lv);
        let tt = Math.floor(this.timeHouse.lv % 10);
        if (tt < 0) tt = 0;
        if (tt > 10) tt = 10;
        this.timeHouseVal = this.timeHouse.vals[tt];
        this.nextCD = 0;
        this.curTime = 0;
        this.bossDic.clear();
    }

    // 关卡信息
    private waveInfo: WaveInfo = null;
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
    // 基准攻速
    private benchAtkSpeed: number = 0;
    // 基准攻击力
    private benchMarkAtk: number = 0;
    // 曲线类型
    private waveform: Array<WaveformInfo> = [];
    // 随机种子
    private mathrandom1: MathRandom = null;
    // 下一个敌人
    private _nextMonster: MonsterInfo;
    public get nextMonster(): MonsterInfo {
        return this._nextMonster;
    }
    public set nextMonster(v: MonsterInfo) {
        this._nextMonster = v;
    }
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
    private _bossInfo: MonsterInfo;
    public get bossInfo(): MonsterInfo {
        return this._bossInfo;
    }
    public set bossInfo(v: MonsterInfo) {
        this._bossInfo = v;
    }
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



    // 获取下一个敌人的信息
    public enemyInf(): void {
        this.nextMonster = null;
        this.bossInfo = null;
        let infList = MonsterInfo.getList();
        let list: MonsterInfo[] = [];
        let listBoss: MonsterInfo[] = [];
        for (let i = infList.length - 1; i >= 0; i--) {
            if (infList[i].type == this.waveType) {
                // 适用关卡判断
                let bigWave = infList[i].big_wave.toString();
                let canAdd = false;
                for (let k = bigWave.length - 1; k >= 0; k--) {
                    if (this.curMap == Number(bigWave[k])) {
                        canAdd = true;
                        break;
                    }
                }
                if (canAdd) {
                    if (infList[i].boss == 1) {
                        listBoss.push(infList[i]);
                    }
                    else {
                        list.push(infList[i]);
                    }
                }
            }
        }
        if (list.length > 0) {
            this.nextMonster = list[Math.floor(this.mathrandom1.random(list.length))];// 
        }
        else {
            console.log("敌人刷新完毕");
            this.nextCD = this.curTime * 100;
            return;
        }
        if (this.nextMonster != null) {
            this.levelWave++;
            let curTimePeriod = Math.floor(this.waveTime / 10);
            for (let i = 9; i >= 0; i--) {
                if (this.curTime >= curTimePeriod * i) {
                    let _waveform1: WaveformInfo;
                    let _waveform2: WaveformInfo;
                    for (let ll = this.waveform.length - 1; ll >= 0; ll--) {
                        if (this.waveform[ll].index == i) {
                            _waveform1 = this.waveform[ll];
                        }
                        else if (this.waveform[ll].index == i + 1) {
                            _waveform2 = this.waveform[ll];
                        }
                    }
                    let _xiaolv = _waveform1.waveform + (_waveform2.waveform - _waveform1.waveform) * (this.curTime - curTimePeriod * i) / 10;
                    // 是否创建boss判断
                    let bossNum = _waveform1.boss;
                    if (bossNum > 0 && listBoss.length > 0) {
                        let dicNum = 0;
                        if (this.bossDic.hasKey(i)) {
                            dicNum = this.bossDic.getValue(i);
                        }
                        if (bossNum > dicNum) {
                            dicNum++;
                            this.bossDic.set(i, dicNum);
                            // 生成一个boss
                            this.bossInfo = listBoss[Math.floor(this.mathrandom1.random(listBoss.length))];
                        }
                    }
                    // 攻速判断
                    if (this.waveType == 1 || this.waveType == 2 || this.waveType == 3) {
                        // 最大攻速
                        let atkSpeed = this.benchAtkSpeed * _xiaolv;
                        let remain = this.nextMonster.base_num / atkSpeed;
                        remain = remain < 0.5 ? 0.5 : remain;
                        this.nextCD = this.curTime + remain;
                    }
                    // 攻击判断
                    else {
                        let atkMark = this.benchMarkAtk * _xiaolv;
                        let remain = Number(this.nextMonster.base_hp) / atkMark;
                        this.nextCD = this.curTime + remain;
                    }
                    break;
                }
            }
        }
    }


}