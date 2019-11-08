import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class AssociationCareerInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, AssociationCareerInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new AssociationCareerInfo(dic));
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
    public static getInfo(id: any): AssociationCareerInfo {
        return this._hashDic.getValue(id);
    }
    /**
     * 依据career获取配置信息
     * @param race
     */
    public static getInfoCareer(career: number): AssociationCareerInfo {
        for (let i = 1, len = this.getCount(); i <= len; i++) {
            let item = this.getInfo(i);
            if (item.career == career) {
                return item;
            }
        }
        return null;
    }

    private static _hashDic: Dictionary<string, AssociationCareerInfo> = new Dictionary<string, AssociationCareerInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, AssociationCareerInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new AssociationCareerInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._career = parseInt(obj.getValue("career"));
        this._num = parseInt(obj.getValue("num"));
        this._attribute = parseInt(obj.getValue("attribute"));
        this._value = Number(obj.getValue("value"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _career: number;
    public get career(): number {
        return this._career;
    }

    private _num: number;
    public get num(): number {
        return this._num;
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
