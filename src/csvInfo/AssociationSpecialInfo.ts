import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class AssociationSpecialInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, AssociationSpecialInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new AssociationSpecialInfo(dic));
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
    public static getInfo(id: any): AssociationSpecialInfo {
        return this._hashDic.getValue(id);
    }
    private static _hashDic: Dictionary<string, AssociationSpecialInfo> = new Dictionary<string, AssociationSpecialInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, AssociationSpecialInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new AssociationSpecialInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._name = obj.getValue("name");
        this._attribute = parseInt(obj.getValue("attribute"));
        this._value = Number(obj.getValue("value"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }

    private _attribute: number;
    public get attribute(): number {
        return this._attribute;
    }

    private _value: number;
    public get value(): number {
        return this._value;
    }



}

