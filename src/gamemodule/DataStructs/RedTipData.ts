import Game from "../../Game";
import HeroqualityInfo from "../../csvInfo/HeroqualityInfo";
import KingInfo from "../../csvInfo/KingInfo";
import HeroInfoData from "./HeroInfoData";

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
    // 背包是否需要红点
    public get bagRed(): boolean {
        return this.heroRed;
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
    public kingRedIndex: number = 0;
    public get kingRed(): boolean {
        for (let i = 1, len = KingInfo.getCount(); i <= len; i++) {
            let kInf = KingInfo.getInfo(i);
            if (kInf.level <= Game.playData.curLevel) {
                if ((kInf.rid1 > 0 && !Game.playData.getKingStatus(i, 1))/* || (kInf.rid2 > 0 && !Game.playData.getKingStatus(i, 2))*/) {
                    if (this.kingRedIndex >= 0) {
                        this.kingRedIndex = i - 1;
                    }
                    return true;
                }
            }
        }
        return false;
    }

}