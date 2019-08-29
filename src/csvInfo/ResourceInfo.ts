import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class ResourceInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, ResourceInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new ResourceInfo(dic));
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
    public static getInfo(id: any): ResourceInfo {
        return this._hashDic.getValue(id);
    }
    /**
     * 通过aid获取Info
     */
    public static getInfoAid(aid: any): ResourceInfo {
        let list = this._hashDic.getValues();
        for (let i = this._hashDic.count - 1; i >= 0; i--) {
            if (list[i]._aid == aid) {
                return list[i];
            }
        }
        return null;
    }

    private static _hashDic: Dictionary<string, ResourceInfo> = new Dictionary<string, ResourceInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, ResourceInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new ResourceInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._key = obj.getValue("key");
        this._desc = obj.getValue("desc");
        this._type = parseInt(obj.getValue("type"));
        this._aid = parseInt(obj.getValue("aid"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _key: string;
    public get key(): string {
        return this._key;
    }

    private _desc: string;
    public get desc(): string {
        return this._desc;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _aid: number;
    public get aid(): number {
        return this._aid;
    }

    public static gold = 1;
    public static jadeite = 2;
    public static magic = 3;
    public static diamond = 4;
    public static pearl = 5;
    public static small = 6;
    public static middle = 7;
    public static big = 8;
    public static large = 9;
    public static haohua = 10;
    public static tuhao = 11;
    public static hero_1 = 12;
    public static hero_2 = 13;
    public static hero_3 = 14;
    public static hero_4 = 15;
    public static hero_5 = 16;
    public static hero_6 = 17;
    public static hero_7 = 18;
    public static hero_8 = 19;
    public static hero_9 = 20;
    public static hero_10 = 21;
    public static hero_11 = 22;
    public static hero_12 = 23;
    public static hero_13 = 24;
    public static hero_14 = 25;
    public static hero_15 = 26;
    public static hero_16 = 27;
    public static hero_17 = 28;
    public static hero_18 = 29;
    public static hero_19 = 30;
    public static hero_20 = 31;
    public static hero_21 = 32;
    public static hero_22 = 33;
    public static hero_23 = 34;
    public static hero_24 = 35;
    public static hero_25 = 36;
    public static hero_26 = 37;
    public static hero_27 = 38;
    public static hero_28 = 39;
    public static hero_29 = 40;
    public static hero_30 = 41;
    public static hero_31 = 42;
    public static hero_32 = 43;
    public static hero_33 = 44;
    public static hero_34 = 45;
    public static hero_35 = 46;

}

