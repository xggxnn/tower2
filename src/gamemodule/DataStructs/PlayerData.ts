import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import Dictionary from "../../Tool/Dictionary";

export default class PlayerData {
    private static _Instance: PlayerData;
    static get Instance(): PlayerData {
        if (!PlayerData._Instance) {
            PlayerData._Instance = new PlayerData();
        }
        return PlayerData._Instance;
    }

    private _newbied: boolean = true;
    public get newbie(): boolean {
        return this._newbied;
    }
    public set newbie(v: boolean) {
        this._newbied = v;
    }
    public newbied(): void {
        console.log("新手结束");
        this._newbied = false;
        return;
    }

    // 当前金币
    private _curGold: number = 0;
    public get curGold(): number {
        return this._curGold;
    }
    public set curGold(v: number) {
        this._curGold = v;
        EventManager.event(EventKey.COIN_GOLD_UPDATE);
    }
    // 当前翡翠
    private _curJadeite: number = 0;
    public get curJadeite(): number {
        return this._curJadeite;
    }
    public set curJadeite(v: number) {
        this._curJadeite = v;
        EventManager.event(EventKey.COIN_JADEITE_UPDATE);
    }
    // 当前宝石
    private _curDiamond: number = 0;
    public get curDiamond(): number {
        return this._curDiamond;
    }
    public set curDiamond(v: number) {
        this._curDiamond = v;
        EventManager.event(EventKey.COIN_DIAMOND_UPDATE);
    }
    // 当前魔尘数量
    private _curMagic: number = 0;
    public get curMagic(): number {
        return this._curMagic;
    }
    public set curMagic(v: number) {
        this._curMagic = v;
    }

    // 当前等级
    private _curStar: number = 0;
    public get curStar(): number {
        return this._curStar;
    }
    public set curStar(v: number) {
        this._curStar = v;
        EventManager.event(EventKey.HERO_STAR_UPDATE);
    }
    // 当前星级
    private _curLevel: number = 0;
    public get curLevel(): number {
        return this._curLevel;
    }
    public set curLevel(v: number) {
        this._curLevel = v;
        EventManager.event(EventKey.HERO_LEVEL_UPDATE);
    }
    // 当前英雄碎片数量
    private _curClips: Dictionary<number, number> = new Dictionary<number, number>();
    public get curClips(): Dictionary<number, number> {
        return this._curClips;
    }
    public set curClips(v: Dictionary<number, number>) {
        this._curClips = v;
    }
    // 当前拥有的英雄
    private _curHero: Array<number> = [];
    public get curHero(): Array<number> {
        return this._curHero;
    }
    public set curHero(v: Array<number>) {
        this._curHero = v;
    }



}