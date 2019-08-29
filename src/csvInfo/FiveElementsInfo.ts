import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class FiveElementsInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, FiveElementsInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new FiveElementsInfo(dic));
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
    public static getInfo(id: any): FiveElementsInfo {
        return this._hashDic.getValue(id);
    }
    /**
     * 通过type获取Info
     */
    public static getInfoWithType(type: number): FiveElementsInfo {
        for (let i = 1, len = this.getCount(); i <= len; i++) {
            let item = this.getInfo(i);
            if (item.type == type) {
                return item;
            }
        }
        return null;
    }

    private static _hashDic: Dictionary<string, FiveElementsInfo> = new Dictionary<string, FiveElementsInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, FiveElementsInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new FiveElementsInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._type = parseInt(obj.getValue("type"));
        this._name = obj.getValue("name");
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }



}

