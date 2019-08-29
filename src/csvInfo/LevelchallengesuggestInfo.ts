import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class LevelchallengesuggestInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, LevelchallengesuggestInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new LevelchallengesuggestInfo(dic));
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
    public static getInfo(id: any): LevelchallengesuggestInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, LevelchallengesuggestInfo> = new Dictionary<string, LevelchallengesuggestInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, LevelchallengesuggestInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new LevelchallengesuggestInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._type = parseInt(obj.getValue("type"));
        this._atklow = Number(obj.getValue("atklow"));
        this._atkhigh = Number(obj.getValue("atkhigh"));
        this._speedlow = Number(obj.getValue("speedlow"));
        this._speedhigh = Number(obj.getValue("speedhigh"));
        this._critlow = Number(obj.getValue("critlow"));
        this._crithigh = Number(obj.getValue("crithigh"));
        this._critslow = Number(obj.getValue("critslow"));
        this._critshigh = Number(obj.getValue("critshigh"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _atkhigh: number;
    public get atkhigh(): number {
        return this._atkhigh;
    }

    private _atklow: number;
    public get atklow(): number {
        return this._atklow;
    }

    private _speedlow: number;
    public get speedlow(): number {
        return this._speedlow;
    }

    private _speedhigh: number;
    public get speedhigh(): number {
        return this._speedhigh;
    }

    private _critlow: number;
    public get critlow(): number {
        return this._critlow;
    }

    private _crithigh: number;
    public get crithigh(): number {
        return this._crithigh;
    }

    private _critslow: number;
    public get critslow(): number {
        return this._critslow;
    }

    private _critshigh: number;
    public get critshigh(): number {
        return this._critshigh;
    }



}

