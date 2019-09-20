import EventManager from "../../tool/EventManager";
import EventKey from "../../tool/EventKey";
import Dictionary from "../../tool/Dictionary";
import Signal from "../../tool/Signal";
import Game from "../../Game";
import RewardItem from "./RewardItem";
import { FightType } from "../DataEnums/FightType";
import TimeHouseInfo from "../../csvInfo/TimeHouseInfo";
import { LocationType } from "../DataEnums/LocationType";
import TypedSignal from "../../tool/TypedSignal";
import Fun from "../../tool/Fun";
import SpriteKey from "../../fgui/SpriteKey";
import { GuideType } from "../DataEnums/GuideType";
import HeroInfoData from "./HeroInfoData";
import WaveInfo from "../../csvInfo/WaveInfo";
import LevelchallengesuggestInfo from "../../csvInfo/LevelchallengesuggestInfo";
import ResourceInfo from "../../csvInfo/ResourceInfo";
import Association from "./Association";

export default class PlayerData {
    private static _Instance: PlayerData;
    static get Instance(): PlayerData {
        if (!PlayerData._Instance) {
            PlayerData._Instance = new PlayerData();
        }
        return PlayerData._Instance;
    }

    public init(): void {

    }

    /**
     * 战斗主场景update更新
     */
    public sBattleMainUpdate: TypedSignal<number> = new TypedSignal<number>();

    // 添加资源
    public addResource(id: any, val: any): void {
        let ids = Number(id);
        let vals = Number(val);
        let resource = ResourceInfo.getInfo(ids);
        if (resource && resource.type == 6) {
            let item = new RewardItem();
            item.itemId = ids;
            item.itemNum = vals;
            this._curGift.push(item);
            Game.redData.bagRed = true;
            return;
        }
        if (ids > 1000) {
            this._curClips.add(ids - 1000, vals);
        }
        else {
            switch (ids) {
                case 1:
                    this.curGold = vals;
                    break;
                case 2:
                    this.curJadeite = vals;
                    break;
                case 3:
                    this.curMagic = vals;
                    break;
                case 4:
                    this.curDiamond = vals;
                    break;
                case 5:
                    this.curPearl = vals;
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    // 礼包

                    break;
            }
        }
    }

    private _synthetise: number = 0;
    /**
     * 合成英雄
     */
    public get synthetise(): number {
        return this._synthetise;
    }
    public set synthetise(v: number) {
        this._synthetise = v;
    }
    public synUpReset: number = 0;

    private _resetAttribute: Dictionary<string, number> = new Dictionary<string, number>();
    /**
     * 洗属性 -- 临时属性
     */
    public get resetAttribute(): Dictionary<string, number> {
        return this._resetAttribute;
    }
    public set resetAttribute(v: Dictionary<string, number>) {
        this._resetAttribute = v;
    }



    public getBattleReward(obj: any): void {
        Game.battleData.fight_result = [];
        for (var key in obj) {
            let cardCount = 0;
            let ids = Number(key);
            let vals = Number(obj[key]);
            let resource = ResourceInfo.getInfo(ids);
            if (resource && resource.type == 6) {
                let add = true;
                for (let i = 0, len = this._curGift.length; i < len; i++) {
                    if (this._curGift[i].itemId == ids) {
                        cardCount = vals - this._curGift[i].itemNum;
                        this._curGift[i].itemNum = vals;
                        add = false;
                        break;
                    }
                }
                if (add) {
                    let item = new RewardItem();
                    item.itemId = ids;
                    item.itemNum = vals;
                    this._curGift.push(item);
                    Game.redData.bagRed = true;
                }
            }
            if (ids > 1000) {
                let heroId = ids - 1000;
                let clipsDic = Game.playData.curClips;
                if (clipsDic.hasKey(heroId)) {
                    vals -= clipsDic.getValue(heroId);
                }
                clipsDic.add(heroId, vals);
                if (vals > 0) {
                    let item: RewardItem = new RewardItem();
                    item.itemId = heroId + 11;
                    item.itemNum = vals;
                    item.isClips = true;
                    Game.battleData.fight_result.push(item);
                }
            }
            else {
                let curVal = vals;
                switch (ids) {
                    case 1:
                        {
                            curVal = vals - this.curGold;
                            this.curGold = vals;
                        }
                        break;
                    case 2:
                        {
                            curVal = vals - this.curJadeite;
                            this.curJadeite = vals;
                        }
                        break;
                    case 3:
                        {
                            curVal = vals - this.curMagic;
                            this.curMagic = vals;
                        }
                        break;
                    case 4:
                        {
                            curVal = vals - this.curDiamond;
                            this.curDiamond = vals;
                        }
                        break;
                    case 5:
                        {
                            curVal = vals - this.curPearl;
                            this.curPearl = vals;
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        // 礼包
                        if (cardCount > 0) {
                            curVal = cardCount;
                        }
                        break;
                }
                let item: RewardItem = new RewardItem();
                item.itemId = ids;
                item.itemNum = curVal;
                Game.battleData.fight_result.push(item);
            }
        }
    }
    public getRewards(obj: any, cardCount: number = 0): void {
        let rewardList: Array<RewardItem> = [];
        for (var key in obj) {
            let ids = Number(key);
            let vals = Number(obj[key]);
            let resource = ResourceInfo.getInfo(ids);
            let curVal = vals;
            if (resource && resource.type == 6) {
                let add = true;
                for (let i = 0, len = this._curGift.length; i < len; i++) {
                    if (this._curGift[i].itemId == ids) {
                        curVal = vals - this._curGift[i].itemNum;
                        this._curGift[i].itemNum = vals;
                        add = false;
                        break;
                    }
                }
                if (add) {
                    let item = new RewardItem();
                    item.itemId = ids;
                    item.itemNum = vals;
                    this._curGift.push(item);
                    Game.redData.bagRed = true;
                }
            }
            if (ids > 1000) {
                let heroId = ids - 1000;
                let clipsDic = Game.playData.curClips;
                if (clipsDic.hasKey(heroId)) {
                    vals -= clipsDic.getValue(heroId);
                }
                clipsDic.add(heroId, curVal);
                if (vals > 0) {
                    let item: RewardItem = new RewardItem();
                    item.itemId = heroId + 11;
                    item.itemNum = vals;
                    item.isClips = true;
                    rewardList.push(item);
                }
            }
            else {
                switch (ids) {
                    case 1:
                        {
                            curVal = vals - this.curGold;
                            this.curGold = vals;
                        }
                        break;
                    case 2:
                        {
                            curVal = vals - this.curJadeite;
                            this.curJadeite = vals;
                        }
                        break;
                    case 3:
                        {
                            curVal = vals - this.curMagic;
                            this.curMagic = vals;
                        }
                        break;
                    case 4:
                        {
                            curVal = vals - this.curDiamond;
                            this.curDiamond = vals;
                        }
                        break;
                    case 5:
                        {
                            curVal = vals - this.curPearl;
                            this.curPearl = vals;
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        // 礼包
                        if (cardCount > 0) {
                            curVal = cardCount;
                        }
                        break;
                }
                if (curVal > 0) {
                    let item: RewardItem = new RewardItem();
                    item.itemId = ids;
                    item.itemNum = curVal;
                    rewardList.push(item);
                }
            }
        }
        Game.playData.rewardList = rewardList;
    }

    private _curGold: number = 0;
    /**
     * 当前金币
     */
    public get curGold(): number {
        return this._curGold;
    }
    public set curGold(v: number) {
        this._curGold = Math.floor(v);
        EventManager.event(EventKey.COIN_GOLD_UPDATE);
    }
    private _curJadeite: number = 0;
    /**
     * 当前翡翠
     */
    public get curJadeite(): number {
        return this._curJadeite;
    }
    public set curJadeite(v: number) {
        this._curJadeite = Math.floor(v);
        EventManager.event(EventKey.COIN_JADEITE_UPDATE);
    }
    private _curDiamond: number = 0;
    /**
     * 当前宝石
     */
    public get curDiamond(): number {
        return this._curDiamond;
    }
    public set curDiamond(v: number) {
        this._curDiamond = Math.floor(v);
        EventManager.event(EventKey.COIN_DIAMOND_UPDATE);
    }
    private _curMagic: number = 0;
    /**
     * 当前魔尘数量
     */
    public get curMagic(): number {
        return this._curMagic;
    }
    public set curMagic(v: number) {
        this._curMagic = Math.floor(v);
    }

    private _curPearl: number = 0;
    /**
     * 当前宝珠数量
     */
    public get curPearl(): number {
        return this._curPearl;
    }
    public set curPearl(v: number) {
        this._curPearl = v;
    }


    private _conqueTime: number = 0;
    // 征服开启时间
    public get conqueTime(): number {
        return this._conqueTime;
    }
    public set conqueTime(v: number) {
        this._conqueTime = v;
    }


    private _curStar: number = 0;
    // 当前星级
    public get curStar(): number {
        return this._curStar;
    }
    public set curStar(v: number) {
        this._curStar = v;
        EventManager.event(EventKey.HERO_STAR_UPDATE);
    }
    private _curLevel: number = 0;
    // 当前等级
    public get curLevel(): number {
        return this._curLevel;
    }
    public set curLevel(v: number) {
        this._curLevel = v;
        EventManager.event(EventKey.HERO_LEVEL_UPDATE);
    }

    public upLevelCost(): number {
        let timeHouse: TimeHouseInfo = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
        if (timeHouse) {
            return timeHouse.cost_gold;
        }
        return 0;
    }

    private _curPlaySkillIndex: number = 1;
    // 当前技能
    public get curPlaySkillIndex(): number {
        return this._curPlaySkillIndex;
    }
    public set curPlaySkillIndex(v: number) {
        this._curPlaySkillIndex = v;
    }

    private _preSkillUnLock: number = 0;
    // 上一次技能解锁等级
    public get preSkillUnLock(): number {
        return this._preSkillUnLock;
    }
    public set preSkillUnLock(v: number) {
        this._preSkillUnLock = v;
    }



    /**
     * 刷新已拥有且未上阵英雄列表
     */
    public get curHaveHeroList(): Array<HeroInfoData> {
        let heroList: Array<HeroInfoData> = [];
        let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
        let idKey = this.curHeroInfoList.getKeys();
        for (let i = 0, len = idKey.length; i < len; i++) {
            let id = Number(idKey[i]);
            if (seatList.indexOf(id) == -1) {
                let hero = HeroInfoData.getInfo(id);
                heroList.push(hero);
            }
        }
        return heroList;
    }

    private _curFightInf: Dictionary<string, number> = new Dictionary<string, number>();
    /**
     * 当前阵容战力情况
     */
    public get curFightInf(): Dictionary<string, number> {
        return this._curFightInf;
    }
    public set curFightInf(v: Dictionary<string, number>) {
        this._curFightInf = v;
    }
    public fightTip(curDic: Dictionary<string, number>): Dictionary<number, string> {
        let result: Dictionary<number, string> = new Dictionary<number, string>();
        let atkTip = "0";
        let speedTip = "0";
        let critTip = "0";
        let burstTip = "0";
        if (curDic.count > 0) {
            if (curDic.hasKey(FightType.AtkEx) && curDic.getValue(FightType.AtkEx) > 0) {
                atkTip = Fun.formatNumberUnit(curDic.getValue(FightType.Atk)) + " + " + Fun.formatNumberUnit(curDic.getValue(FightType.AtkEx));
            }
            else {
                atkTip = Fun.formatNumberUnit(curDic.getValue(FightType.Atk));
            }
            if (curDic.hasKey(FightType.SpeedEx) && curDic.getValue(FightType.SpeedEx) > 0) {
                speedTip = curDic.getValue(FightType.Speed).toFixed(1) + " + " + curDic.getValue(FightType.SpeedEx).toFixed(1);
            }
            else {
                speedTip = curDic.getValue(FightType.Speed).toFixed(1);
            }
            if (curDic.hasKey(FightType.CritEx) && curDic.getValue(FightType.CritEx) > 0) {
                critTip = curDic.getValue(FightType.Crit).toFixed(0) + " + " + curDic.getValue(FightType.CritEx).toFixed(0);
            }
            else {
                critTip = curDic.getValue(FightType.Crit).toFixed(0);
            }
            if (curDic.hasKey(FightType.BurstEx) && curDic.getValue(FightType.BurstEx) > 0) {
                burstTip = curDic.getValue(FightType.Burst).toFixed(0) + " + " + curDic.getValue(FightType.BurstEx).toFixed(0);
            }
            else {
                burstTip = curDic.getValue(FightType.Burst).toFixed(0);
            }
        }
        result.add(FightType.Atk, atkTip);
        result.add(FightType.Speed, speedTip);
        result.add(FightType.Crit, critTip);
        result.add(FightType.Burst, burstTip);
        return result;
    }
    public checkFightVal(curDic: Dictionary<string, number>, _Dic: Dictionary<string, number>, levelId: number): Dictionary<string, number[]> {
        let waveInf = WaveInfo.getInfo(levelId)
        let levelchall = LevelchallengesuggestInfo.getInfo(waveInf.type);
        let atk: number[] = [2, 0, 0, 0];
        let speed: number[] = [2, 0, 0, 0];
        let crit: number[] = [2, 0, 0, 0];
        let burst: number[] = [2, 0, 0, 0];
        if (curDic.count > 0) {
            let ex = 0;
            if (curDic.hasKey(FightType.AtkEx)) {
                ex = curDic.getValue(FightType.AtkEx);
            }
            atk[1] = curDic.getValue(FightType.Atk) + ex;
            atk[2] = _Dic.getValue(FightType.Atk) * levelchall.atklow / 100;
            atk[3] = _Dic.getValue(FightType.Atk) * levelchall.atkhigh / 100;
            let atkTip = atk[1] / _Dic.getValue(FightType.Atk);
            if (atkTip >= levelchall.atkhigh * 0.01) {
                atk[0] = 0;
            }
            else if (atkTip >= levelchall.atklow * 0.01) {
                atk[0] = 1;
            }
            ex = 0;
            if (curDic.hasKey(FightType.SpeedEx)) {
                ex = curDic.getValue(FightType.SpeedEx);
            }
            speed[1] = curDic.getValue(FightType.Speed) + ex;
            speed[2] = _Dic.getValue(FightType.Speed) * levelchall.speedlow / 100;
            speed[3] = _Dic.getValue(FightType.Speed) * levelchall.speedhigh / 100;
            let speedTip = speed[1] / _Dic.getValue(FightType.Speed);
            if (speedTip >= levelchall.speedhigh * 0.01) {
                speed[0] = 0;
            }
            else if (speedTip >= levelchall.speedlow * 0.01) {
                speed[0] = 1;
            }
            ex = 0;
            if (curDic.hasKey(FightType.CritEx)) {
                ex = curDic.getValue(FightType.CritEx);
            }
            crit[1] = curDic.getValue(FightType.Crit) + ex;
            crit[2] = _Dic.getValue(FightType.Crit) * levelchall.critlow / 100;
            crit[3] = _Dic.getValue(FightType.Crit) * levelchall.crithigh / 100;
            let critTip = crit[1] / _Dic.getValue(FightType.Crit);
            if (critTip >= levelchall.crithigh * 0.01) {
                crit[0] = 0;
            }
            else if (critTip >= levelchall.critlow * 0.01) {
                crit[0] = 1;
            }
            ex = 0;
            if (curDic.hasKey(FightType.BurstEx)) {
                ex = curDic.getValue(FightType.BurstEx);
            }
            burst[1] = curDic.getValue(FightType.Burst) + ex;
            burst[2] = _Dic.getValue(FightType.Burst) * levelchall.critslow / 100;
            burst[3] = _Dic.getValue(FightType.Burst) * levelchall.critshigh / 100;
            let burstTip = burst[1] / _Dic.getValue(FightType.Burst);
            if (burstTip >= levelchall.critshigh * 0.01) {
                burst[0] = 0;
            }
            else if (burstTip >= levelchall.critslow * 0.01) {
                burst[0] = 1;
            }
        }
        let result: Dictionary<string, number[]> = new Dictionary<string, number[]>();
        result.add(FightType.Atk, atk);
        result.add(FightType.Speed, speed);
        result.add(FightType.Crit, crit);
        result.add(FightType.Burst, burst);
        return result;
    }


    private _gameSpeed: number = 1;
    /**
     * 游戏速度
     */
    public get gameSpeed(): number {
        return this._gameSpeed;
    }
    public set gameSpeed(v: number) {
        this._gameSpeed = v;
    }




    // 当前英雄碎片数量
    private _curClips: Dictionary<string, number> = new Dictionary<string, number>();
    public get curClips(): Dictionary<string, number> {
        return this._curClips;
    }
    public set curClips(v: Dictionary<string, number>) {
        this._curClips = v;
    }
    // 当前拥有的英雄
    // private _curHero: Array<number> = [];
    // public get curHero(): Array<number> {
    //     return this._curHero;
    // }
    // public set curHero(v: Array<number>) {
    //     this._curHero = v;
    // }

    private _curHeroInfoList: Dictionary<string, HeroInfoData> = new Dictionary<string, HeroInfoData>();
    public get curHeroInfoList(): Dictionary<string, HeroInfoData> {
        return this._curHeroInfoList;
    }
    public set curHeroInfoList(v: Dictionary<string, HeroInfoData>) {
        this._curHeroInfoList = v;
    }





    /**************** 礼包相关 *************************/

    private _openGift: number = 0;
    public get openGift(): number {
        return this._openGift;
    }
    public set openGift(v: number) {
        this._openGift = v;
    }

    private _curGift: Array<RewardItem> = [];
    /**
     * 当前拥有的礼包
     */
    public get curGift(): Array<RewardItem> {
        return this._curGift;
    }
    public initGift(obj: any): void {
        this._curGift = [];
        for (var key in obj) {
            let item = new RewardItem();
            item.itemId = Number(key);
            item.itemNum = Number(obj[key]);
            this._curGift.push(item);
        }
    }


    private _showClip: string;
    public get showClip(): string {
        return this._showClip;
    }
    public set showClip(v: string) {
        this._showClip = v;
    }

    /******************  商城相关       ************************/
    public checkShopInf(json): void {
        this.limitShopData = [];
        for (var key in json) {
            let ids = Number(key) - 1000;
            let num = Number(json[key]);
            let hero = HeroInfoData.getInfo(ids);
            if (Game.haveHeroTem.indexOf(hero.skin) >= 0) {
                let item = new RewardItem();
                item.isClips = true;
                item.itemId = ids;
                item.itemNum = num;
                this.limitShopData.push(item);
            }
        }
    }

    private _limitShopData: RewardItem[] = [];
    public get limitShopData(): RewardItem[] {
        return this._limitShopData;
    }
    public set limitShopData(v: RewardItem[]) {
        this._limitShopData = v;
    }



    /******************  update       ************************/
    // 显示英雄羁绊
    public sShowFetters: Signal = new Signal();
    // 具体信息
    public fettersInfos: Association = null;
    // 已领奖羁绊列表
    public associationattribute: Array<number> = [];
    // 已解锁羁绊列表
    public unlockAssociationattribute: Array<number> = [];

    /******************  奖励相关       ************************/

    private _rewardList: Array<RewardItem> = [];
    /**
     * 准备显示的奖励
     */
    public get rewardList(): Array<RewardItem> {
        return this._rewardList;
    }
    public set rewardList(v: Array<RewardItem>) {
        this._rewardList = v;
        if (this._rewardList.length > 0) {
            Game.rewardWin.showReward(this._rewardList);
        }
    }


    /****************  新手引导     *************************************** */

    public guideTarget: fairygui.GComponent = null;
    public guidePos: Laya.Point = new Laya.Point();
    public guideHandler: Laya.Handler = null;
    public guideTip: string = "";
    public guideTipPos: LocationType = LocationType.Right;
    public guideShowTipLong: boolean = false;

    private _guideIndex: GuideType = GuideType.None;
    public get guideIndex(): GuideType {
        return this._guideIndex;
    }
    public set guideIndex(v: GuideType) {
        let data = {
            guideIndex: Number(v),
        }
        Game.proto.guide(data);
        this._guideIndex = v;
    }
    public guideDeathEnemy: number = -1;

    /****************  国王之路     *************************************** */
    public kingData: Array<RewardItem> = [];
    public kingSet(json: Array<any>): void {
        let len = json.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let item = json[i];
                let ri = new RewardItem();
                ri.itemId = item.id;
                ri.types = item.type;
                this.kingData.push(ri);
                this._kingStatus.add(ri.itemId * 1000 + ri.types, true);
            }
        }
    }
    private _kingStatus: Dictionary<string, boolean> = new Dictionary<string, boolean>();
    public getKingStatus(id: number, types: number): boolean {
        let keys = id * 1000 + types;
        if (this._kingStatus.hasKey(keys)) {
            return true;
        }
        return false;
    }
    /****************  签到     *************************************** */

    private _signInIndex: number = 0;
    public get signInIndex(): number {
        return this._signInIndex;
    }
    public set signInIndex(v: number) {
        this._signInIndex = v;
    }

    private _isSign: boolean = false;
    public get isSign(): boolean {
        return this._isSign;
    }
    public set isSign(v: boolean) {
        this._isSign = v;
    }


    /****************  获取icon     *************************************** */
    /**
     * 获取resource id对应的物品icon路径
     */
    public getIcon(resourceid: number): string {
        let res = SpriteKey.getUrl(SpriteKey.Gift);
        if (resourceid > 11) {
            let inf2 = HeroInfoData.getInfo(resourceid - 11);
            res = SpriteKey.getUrl("hero_" + inf2.skin + ".png");
        }
        else {
            switch (resourceid) {
                case 1:
                    res = SpriteKey.getUrl(SpriteKey.gold);
                    break;
                case 2:
                    res = SpriteKey.getUrl(SpriteKey.jadeite);
                    break;
                case 4:
                    res = SpriteKey.getUrl(SpriteKey.diamond);
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    res = SpriteKey.getUrl(SpriteKey.Gift);
                    break;
            }
        }
        return res;
    }

}