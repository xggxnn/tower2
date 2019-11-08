import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class FreeRewardInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, FreeRewardInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new FreeRewardInfo(dic));
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
    public static getInfo(id: any): FreeRewardInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, FreeRewardInfo> = new Dictionary<string, FreeRewardInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, FreeRewardInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new FreeRewardInfo(dic[id]));
        }
    }
    public static serverSimple(data: any): void {
        this._hashDic = new Dictionary<string, FreeRewardInfo>();
        for (var id in data) {
            let dic = new Dictionary<string, string>();
            for (var key in data[id]) {
                dic.add(key, data[id][key]);
            }
            this._hashDic.set(dic.getValue("id"), new FreeRewardInfo(dic));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._num = parseInt(obj.getValue("num"));
        this._resId = parseInt(obj.getValue("resId"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _num: number;
    public get num(): number {
        return this._num;
    }

    private _resId: number;
    public get resId(): number {
        return this._resId;
    }

}

