import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class WaveRewardInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, WaveRewardInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new WaveRewardInfo(dic));
        }
    }
    /**
     * 获取数据数量
     */
    public static getCount(): number {
        return this._hashDic.count;
    }
    /**
     * 通过id获取Info
     */
    public static getInfo(id: any): WaveRewardInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, WaveRewardInfo> = new Dictionary<string, WaveRewardInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, WaveRewardInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new WaveRewardInfo(dic[id]));
        }
    }
    public static serverSimple(data: any): void {
        let dic = new Dictionary<string, string>();
        for (var id in data) {
            dic.add(id, data[id]);
        }
        this._hashDic.set(dic.getValue("id"), new WaveRewardInfo(dic));
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._chapter = parseInt(obj.getValue("chapter"));
        this._stage = parseInt(obj.getValue("stage"));
        this._lv = parseInt(obj.getValue("lv"));
        this._hitpoint = Number(obj.getValue("hitpoint"));
        this._types = [];
        this._type1 = Number(obj.getValue("type1"));
        this._types.push(this._type1);
        this._type2 = Number(obj.getValue("type2"));
        this._types.push(this._type2);
        this._type3 = Number(obj.getValue("type3"));
        this._types.push(this._type3);
        this._type4 = Number(obj.getValue("type4"));
        this._types.push(this._type4);
        this._type5 = Number(obj.getValue("type5"));
        this._types.push(this._type5);
        this._type6 = Number(obj.getValue("type6"));
        this._types.push(this._type6);
        this._type7 = Number(obj.getValue("type7"));
        this._types.push(this._type7);
        this._type8 = Number(obj.getValue("type8"));
        this._types.push(this._type8);
        this._type9 = Number(obj.getValue("type9"));
        this._types.push(this._type9);
        this._type10 = Number(obj.getValue("type10"));
        this._types.push(this._type10);
        this._coin_first = parseInt(obj.getValue("coin_first"));
        this._coin_daily = parseInt(obj.getValue("coin_daily"));
        this._coin_challenge = parseInt(obj.getValue("coin_challenge"));
        this._jade = parseInt(obj.getValue("jade"));
        this._dust_challengedone = parseInt(obj.getValue("dust_challengedone"));
        this._dusttime = parseInt(obj.getValue("dusttime"));
        this._dustmintime = parseInt(obj.getValue("dustmintime"));
        this._dustmaxtime = parseInt(obj.getValue("dustmaxtime"));
        this._card_count = parseInt(obj.getValue("card_count"));
        this._card_type = parseInt(obj.getValue("card_type"));
        this._hero_id = parseInt(obj.getValue("hero_id"));
        this._hero_clips = parseInt(obj.getValue("hero_clips"));
    }

    private _types: Array<number>;
    public get types(): Array<number> {
        return this._types;
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _chapter: number;
    public get chapter(): number {
        return this._chapter;
    }

    private _stage: number;
    public get stage(): number {
        return this._stage;
    }

    private _lv: number;
    public get lv(): number {
        return this._lv;
    }

    private _hitpoint: number;
    public get hitpoint(): number {
        return this._hitpoint;
    }

    private _type1: number;
    public get type1(): number {
        return this._type1;
    }

    private _type2: number;
    public get type2(): number {
        return this._type2;
    }

    private _type3: number;
    public get type3(): number {
        return this._type3;
    }

    private _type4: number;
    public get type4(): number {
        return this._type4;
    }

    private _type5: number;
    public get type5(): number {
        return this._type5;
    }

    private _type6: number;
    public get type6(): number {
        return this._type6;
    }

    private _type7: number;
    public get type7(): number {
        return this._type7;
    }

    private _type8: number;
    public get type8(): number {
        return this._type8;
    }

    private _type9: number;
    public get type9(): number {
        return this._type9;
    }

    private _type10: number;
    public get type10(): number {
        return this._type10;
    }

    private _coin_first: number;
    public get coin_first(): number {
        return this._coin_first;
    }

    private _coin_daily: number;
    public get coin_daily(): number {
        return this._coin_daily;
    }

    private _coin_challenge: number;
    public get coin_challenge(): number {
        return this._coin_challenge;
    }

    private _jade: number;
    public get jade(): number {
        return this._jade;
    }

    private _dust_challengedone: number;
    public get dust_challengedone(): number {
        return this._dust_challengedone;
    }

    private _dusttime: number;
    public get dusttime(): number {
        return this._dusttime;
    }

    private _dustmintime: number;
    public get dustmintime(): number {
        return this._dustmintime;
    }

    private _dustmaxtime: number;
    public get dustmaxtime(): number {
        return this._dustmaxtime;
    }

    private _card_count: number;
    public get card_count(): number {
        return this._card_count;
    }

    private _card_type: number;
    public get card_type(): number {
        return this._card_type;
    }

    private _hero_id: number;
    public get hero_id(): number {
        return this._hero_id;
    }

    private _hero_clips: number;
    public get hero_clips(): number {
        return this._hero_clips;
    }



}

