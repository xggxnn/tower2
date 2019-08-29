import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class AssociationRaceInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, AssociationRaceInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new AssociationRaceInfo(dic));
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
    public static getInfo(id: any): AssociationRaceInfo {
        return this._hashDic.getValue(id);
    }

    /**
     * 依据race获取配置信息
     * @param race
     */
    public static getInfoRace(race: number): AssociationRaceInfo {
        for (let i = 1, len = this.getCount(); i <= len; i++) {
            let item = this.getInfo(i);
            if (item.race == race) {
                return item;
            }
        }
        return null;
    }
    private static _hashDic: Dictionary<string, AssociationRaceInfo> = new Dictionary<string, AssociationRaceInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, AssociationRaceInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new AssociationRaceInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._race = parseInt(obj.getValue("race"));
        this._num = parseInt(obj.getValue("num"));
        this._attribute = parseInt(obj.getValue("attribute"));
        this._value = parseInt(obj.getValue("value"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _race: number;
    public get race(): number {
        return this._race;
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

