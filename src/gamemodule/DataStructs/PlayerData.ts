import EventManager from "../../Tool/EventManager";
import EventKey from "../../Tool/EventKey";
import Dictionary from "../../Tool/Dictionary";
import GiftData from "./GiftData";
import Signal from "../../Tool/Signal";

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
        this._curGold = Math.floor(v);
        EventManager.event(EventKey.COIN_GOLD_UPDATE);
    }
    // 当前翡翠
    private _curJadeite: number = 0;
    public get curJadeite(): number {
        return this._curJadeite;
    }
    public set curJadeite(v: number) {
        this._curJadeite = Math.floor(v);
        EventManager.event(EventKey.COIN_JADEITE_UPDATE);
    }
    // 当前宝石
    private _curDiamond: number = 0;
    public get curDiamond(): number {
        return this._curDiamond;
    }
    public set curDiamond(v: number) {
        this._curDiamond = Math.floor(v);
        EventManager.event(EventKey.COIN_DIAMOND_UPDATE);
    }
    // 当前魔尘数量
    private _curMagic: number = 0;
    public get curMagic(): number {
        return this._curMagic;
    }
    public set curMagic(v: number) {
        this._curMagic = Math.floor(v);
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

    private _curFightVal: number = 0;
    // 当前总战力
    public get curFightVal(): number {
        return this._curFightVal;
    }
    public set curFightVal(v: number) {
        this._curFightVal = v;
    }

    private _curSpeedVal: number = 0;
    // 当前总攻速
    public get curSpeedVal(): number {
        return this._curSpeedVal;
    }
    public set curSpeedVal(v: number) {
        this._curSpeedVal = v;
    }

    private _curCritVal: number = 0;
    // 当前总暴击
    public get curCritVal(): number {
        return this._curCritVal;
    }
    public set curCritVal(v: number) {
        this._curCritVal = v;
    }

    private _curBurstVal: number = 0;
    // 当前总爆伤
    public get curBurstVal(): number {
        return this._curBurstVal;
    }
    public set curBurstVal(v: number) {
        this._curBurstVal = v;
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


    private _curGift: Array<GiftData> = [];
    // 当前拥有的礼包
    public get curGift(): Array<GiftData> {
        // 临时添加
        // if (this._curGift.length == 0) {
        //     for (let i = 0; i < 5; i++) {
        //         let item = new GiftData();
        //         item.id = i + 1;
        //         item.count = i;
        //         item.icon = "";
        //         item.price = (i + 1) * 100;
        //         item.priceType = i < 3 ? 0 : 1;
        //         item.type = i;
        //         this._curGift.push(item);
        //     }
        // }
        return this._curGift;
    }
    public set curGift(v: Array<GiftData>) {
        this._curGift = v;
    }


    /**************** 礼包相关 *************************/

    private _openGift: number = 0;
    public get openGift(): number {
        return this._openGift;
    }
    public set openGift(v: number) {
        this._openGift = v;
    }

    /******************  update       ************************/
    // 显示英雄羁绊
    public sShowFetters: Signal = new Signal();
    // 具体信息
    public fettersInf: any = {
        id: 0,
        type: 0,
    }
}