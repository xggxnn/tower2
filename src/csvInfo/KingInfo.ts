import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class KingInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, KingInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new KingInfo(dic));
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
    public static getInfo(id: any): KingInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, KingInfo> = new Dictionary<string, KingInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, KingInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new KingInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._level = parseInt(obj.getValue("level"));
        this._rid1 = parseInt(obj.getValue("rid1"));
        this._count1 = parseInt(obj.getValue("count1"));
        this._rid2 = parseInt(obj.getValue("rid2"));
        this._count2 = parseInt(obj.getValue("count2"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _level: number;
    public get level(): number {
        return this._level;
    }

    private _rid1: number;
    public get rid1(): number {
        return this._rid1;
    }

    private _count1: number;
    public get count1(): number {
        return this._count1;
    }

    private _rid2: number;
    public get rid2(): number {
        return this._rid2;
    }

    private _count2: number;
    public get count2(): number {
        return this._count2;
    }

}

