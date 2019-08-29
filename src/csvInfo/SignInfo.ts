import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class SignInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, SignInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new SignInfo(dic));
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
    public static getInfo(id: any): SignInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, SignInfo> = new Dictionary<string, SignInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, SignInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new SignInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._num = parseInt(obj.getValue("num"));
        this._rid = parseInt(obj.getValue("rid"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _num: number;
    public get num(): number {
        return this._num;
    }

    private _rid: number;
    public get rid(): number {
        return this._rid;
    }

}

