import Game from "../../Game";
import HeroqualityInfo from "../../csvInfo/HeroqualityInfo";
import KingInfo from "../../csvInfo/KingInfo";
import HeroInfoData from "./HeroInfoData";
import TimeHouseInfo from "../../csvInfo/TimeHouseInfo";
import Dictionary from "../../tool/Dictionary";

/**
 * 红点提示计算
 */
export default class RedTipData {

    private static _Instance: RedTipData;
    static get Instance(): RedTipData {
        if (!RedTipData._Instance) {
            RedTipData._Instance = new RedTipData();
        }
        return RedTipData._Instance;
    }
    // 是否存在可合成或提示品质的英雄
    public get heroRed(): boolean {
        for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
            let hero: HeroInfoData = HeroInfoData.getInfo(i);
            if (Game.haveHeroTem.indexOf(hero.skin) != -1) {
                if (Game.playData.curClips.hasKey(hero.id)) {
                    let heroClips = Game.playData.curClips.getValue(hero.id);
                    if (!heroClips) heroClips = 0;
                    let heroQuality = HeroqualityInfo.getInfoQuality(hero.quality);
                    let upClips = 1;
                    if (heroQuality) {
                        upClips = heroQuality.clip_hero;
                    }
                    if (!Game.playData.curHeroInfoList.hasKey(hero.id)) {
                        if (heroClips >= upClips) {
                            return true;
                        }
                    }
                    else {
                        if (hero.quality < 5) {
                            if (upClips <= heroClips) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    public get activeRed(): boolean {
        return this.signRed || this.kingRed;
    }
    public get signRed(): boolean {
        return !Game.playData.isSign && Game.battleMap.maxMapId > 1;
    }
    public get kingRedIndex(): number {
        let result = 0;
        for (let i = 1, len = KingInfo.getCount(); i <= len; i++) {
            let kInf = KingInfo.getInfo(i);
            if (kInf.rid1 > 0) {
                result = i - 1;
                if (!Game.playData.getKingStatus(i, 1)) {
                    break;
                }
            }
        }
        return result;
    }
    public get kingRed(): boolean {
        for (let i = 1, len = KingInfo.getCount(); i <= len; i++) {
            let kInf = KingInfo.getInfo(i);
            if (kInf.level <= Game.playData.curLevel) {
                if ((kInf.rid1 > 0 && !Game.playData.getKingStatus(i, 1))/* || (kInf.rid2 > 0 && !Game.playData.getKingStatus(i, 2))*/) {
                    // if (this.kingRedIndex >= 0) {
                    //     this.kingRedIndex = i - 1;
                    // }
                    return true;
                }
            }
        }
        return false;
    }

    public get seatRed(): boolean {
        return this.levelRed || this.starRed;
    }

    public get levelRed(): boolean {
        if (Game.playData.upLevelCost() > 0 && Game.playData.upLevelCost() <= Game.playData.curGold) {
            return true;
        }
        return false;
    }

    public get starRed(): boolean {
        if (this.curStarCost() <= Game.playData.curJadeite && Game.playData.curStar < Math.floor((Game.playData.curLevel - 1) / 10)) {
            return true;
        }
        return false;
    }
    private starCostDic: Dictionary<string, number> = new Dictionary<string, number>();
    public curStarCost(): number {
        if (this.starCostDic.hasKey(Game.playData.curStar)) {
            return this.starCostDic.getValue(Game.playData.curStar);
        }
        for (let i = 1, len = TimeHouseInfo.getCount(); i <= len; i++) {
            let item = TimeHouseInfo.getInfo(i);
            if (item && item.cost_jadeite > 0) {
                if (!this.starCostDic.hasKey(item.star)) {
                    this.starCostDic.add(item.star, item.cost_jadeite);
                }
            }
        }
        if (this.starCostDic.hasKey(Game.playData.curStar)) {
            return this.starCostDic.getValue(Game.playData.curStar);
        }
        return 0;
    }


    private _bagRed: boolean;
    /**
     * 背包是否需要红点
     */
    public get bagRed(): boolean {
        return this._bagRed;
    }
    public set bagRed(v: boolean) {
        this._bagRed = v;
    }


    private _skillRed: boolean = false;
    public get skillRed(): boolean {
        return this._skillRed;
    }
    public set skillRed(v: boolean) {
        this._skillRed = v;
    }


    private _dayFightTip: boolean;
    public get dayFightTip(): boolean {
        return this._dayFightTip;
    }
    public set dayFightTip(v: boolean) {
        this._dayFightTip = v;
    }


}