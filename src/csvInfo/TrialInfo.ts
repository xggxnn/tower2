import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class TrialInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, TrialInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new TrialInfo(dic));
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
    public static getInfo(id: any): TrialInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, TrialInfo> = new Dictionary<string, TrialInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, TrialInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new TrialInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._level = parseInt(obj.getValue("level"));
        this._cooldown = parseInt(obj.getValue("cooldown"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _level: number;
    public get level(): number {
        return this._level;
    }

    private _cooldown: number;
    public get cooldown(): number {
        return this._cooldown;
    }



}

