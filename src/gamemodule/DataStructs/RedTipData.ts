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
    public init(): void {
        this._skillItemRed.clear();
        this.setSkillItemRed(1);
    }
    // 是否存在可合成或提示品质的英雄
    public get heroRed(): boolean {
        for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
            let hero: HeroInfoData = HeroInfoData.getInfo(i);
            if (Game.haveHeroTem.indexOf(hero.skin) != -1) {
                if (Game.playData.curClips.hasKey(hero.id)) {
                    let heroClips = Game.playData.curClips.getValue(hero.id);
                    if (heroClips == null) heroClips = 0;
                    if (Game.playData.curHeroInfoList.hasKey(hero.id)) {
                        if (this.requestClips(hero, false) <= heroClips) {
                            return true;
                        }
                    }
                    else {
                        if (this.requestClips(hero, true) <= heroClips) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    // 能否提升品质
    public checkHeroCanUpQuality(hero: HeroInfoData): boolean {
        if (Game.haveHeroTem.indexOf(hero.skin) != -1) {
            if (Game.playData.curClips.hasKey(hero.id)) {
                let heroClips = Game.playData.curClips.getValue(hero.id);
                if (Game.playData.curHeroInfoList.hasKey(hero.id)) {
                    return this.requestClips(hero, false) <= heroClips;
                }
            }
        }
        return false;
    }
    /**
     * 合成及提升品质所需碎片数量
     * @param hero 
     * @param synthesis 是否合成
     */
    public requestClips(hero: HeroInfoData, synthesis: boolean): number {
        if (synthesis) {
            let heroQuality = HeroqualityInfo.getInfoQuality(hero.quality);
            if (heroQuality) {
                return heroQuality.clip_hero;
            }
        }
        else {
            if (hero.quality < 5) {
                let heroQuality = HeroqualityInfo.getInfoQuality(hero.quality + 1);
                if (heroQuality) {
                    return heroQuality.clip_hero;
                }
            }
            else {
                let heroQuality = HeroqualityInfo.getInfoQuality(hero.quality);
                if (heroQuality) {
                    return heroQuality.clip_hero;
                }
            }
        }
        return 0;
    }
    public get activeRed(): boolean {
        return this.signRed || this.kingRed;
    }
    public get signRed(): boolean {
        return (!Game.playData.isSign && Game.battleMap.maxMapId > 1);
    }
    public get kingRedIndex(): number {
        let result = 0;
        for (let i = 1, len = KingInfo.getCount(); i <= len; i++) {
            let kInf = KingInfo.getInfo(i);
            if (kInf.rid1 > 0) {
                result = i - 10;
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

    private _skillItemRed: Dictionary<string, boolean> = new Dictionary<string, boolean>();
    public get skillItemRed(): Dictionary<string, boolean> {
        if (this._skillItemRed.count < 2) {
            let saveInit: string = Game.localStorage.getString("skillItemRed_Init", true);
            let keys = saveInit.split(",");
            this._skillItemRed.clear();
            for (let i = 0; i < keys.length; i++) {
                this._skillItemRed.add(keys[i], true);
            }
        }
        return this._skillItemRed;
    }
    public setSkillItemRed(id: number) {
        this._skillItemRed.add(id, true);
        let val = this._skillItemRed.getKeys().toString();
        Game.localStorage.setString("skillItemRed_Init", val, true);
    }



    private _dayFightTip: boolean;
    public get dayFightTip(): boolean {
        return this._dayFightTip;
    }
    public set dayFightTip(v: boolean) {
        this._dayFightTip = v;
    }


    private _shopRed: boolean = true;
    public get shopRed(): boolean {
        this._shopRed = true;
        if (Game.localStorage.hasItem("shopRed_Init", true)) {
            let saveInit: string = Game.localStorage.getString("shopRed_Init", true);
            if (saveInit.localeCompare(new Date().toLocaleDateString()) == 0) {
                this._shopRed = false;
            }
        }
        return this._shopRed;
    }
    public shopReds() {
        Game.localStorage.setString("shopRed_Init", new Date().toLocaleDateString(), true);
    }


    private _fightRed: boolean = true;
    public get fightRed(): boolean {
        this._fightRed = true;
        if (Game.localStorage.hasItem("fightRed_Init", true)) {
            let saveInit: string = Game.localStorage.getString("fightRed_Init", true);
            if (saveInit.localeCompare(new Date().toLocaleDateString()) == 0) {
                this._fightRed = false;
            }
        }
        return this._fightRed;
    }
    public fightReds() {
        Game.localStorage.setString("fightRed_Init", new Date().toLocaleDateString(), true);
    }


    private _adOneFree: boolean = false;
    // 首次免费不观看视频复活
    public get adOneFree(): boolean {
        if (!this._adOneFree) {
            if (Game.localStorage.hasItem("adOneFree_Init", true)) {
                this._adOneFree = Game.localStorage.getBoolean("adOneFree_Init", true);
            }
        }
        return this._adOneFree;
    }
    public set adOneFree(v: boolean) {
        this._adOneFree = v;
        Game.localStorage.setBoolean("adOneFree_Init", v, true);
    }


}