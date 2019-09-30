import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class WaveInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, WaveInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new WaveInfo(dic));
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
    public static getInfo(id: any): WaveInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, WaveInfo> = new Dictionary<string, WaveInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, WaveInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new WaveInfo(dic[id]));
        }
    }
    public static serverSimple(data: any): void {
        let dic = new Dictionary<string, string>();
        for (var id in data) {
            dic.add(id, data[id]);
        }
        this._hashDic.set(dic.getValue("id"), new WaveInfo(dic));
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._lv = parseInt(obj.getValue("lv"));
        this._type = parseInt(obj.getValue("type"));
        this._difficulty = parseInt(obj.getValue("difficulty"));
        this._waveform = parseInt(obj.getValue("waveform"));
        this._random = parseInt(obj.getValue("random"));
        this._time = parseInt(obj.getValue("time"));
        this._heronum = parseInt(obj.getValue("heronum"));
        this._difficultyscale = Number(obj.getValue("difficultyscale"));
        this._levelcounts = parseInt(obj.getValue("levelcounts"));
        this._unlock = parseInt(obj.getValue("unlock"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _lv: number;
    public get lv(): number {
        return this._lv;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _difficulty: number;
    public get difficulty(): number {
        return this._difficulty;
    }

    private _waveform: number;
    public get waveform(): number {
        return this._waveform;
    }

    private _random: number;
    public get random(): number {
        return this._random;
    }

    private _time: number;
    public get time(): number {
        return this._time;
    }

    private _heronum: number;
    public get heronum(): number {
        return this._heronum;
    }

    private _difficultyscale: number;
    public get difficultyscale(): number {
        return this._difficultyscale;
    }

    private _levelcounts: number;
    public get levelcounts(): number {
        return this._levelcounts;
    }

    private _unlock: number;
    public get unlock(): number {
        return this._unlock;
    }

}

