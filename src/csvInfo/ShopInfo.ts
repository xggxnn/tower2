import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class ShopInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, ShopInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new ShopInfo(dic));
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
    public static getInfo(id: any): ShopInfo {
        return this._hashDic.getValue(id);
    }

    public static getInfoListWithType(type: number): Array<ShopInfo> {
        let result: Array<ShopInfo> = [];
        for (let i = 1, len = this.getCount(); i <= len; i++) {
            let item = this.getInfo(i);
            if (item.type == type) {
                result.push(item);
            }
        }
        return result;
    }
    private static _hashDic: Dictionary<string, ShopInfo> = new Dictionary<string, ShopInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, ShopInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new ShopInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._name = obj.getValue("name");
        this._des = obj.getValue("des");
        this._icon = obj.getValue("icon");
        this._type = parseInt(obj.getValue("type"));
        this._price = Number(obj.getValue("price"));
        this._discount = Number(obj.getValue("discount"));
        this._price_type = parseInt(obj.getValue("price_type"));
        this._max_num = parseInt(obj.getValue("max_num"));
        this._resource_id = parseInt(obj.getValue("resource_id"));
        this._resource_num = parseInt(obj.getValue("resource_num"));
        this._give_id = parseInt(obj.getValue("give_id"));
        this._give_num = parseInt(obj.getValue("give_num"));
        this._free_id = parseInt(obj.getValue("free_id"));
        this._free_num = parseInt(obj.getValue("free_num"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }

    private _des: string;
    public get des(): string {
        return this._des;
    }

    private _icon: string;
    public get icon(): string {
        return this._icon;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _price: number;
    public get price(): number {
        return this._price;
    }

    private _discount: number;
    public get discount(): number {
        return this._discount;
    }

    private _price_type: number;
    public get price_type(): number {
        return this._price_type;
    }

    private _max_num: number;
    public get max_num(): number {
        return this._max_num;
    }

    private _resource_id: number;
    public get resource_id(): number {
        return this._resource_id;
    }

    private _resource_num: number;
    public get resource_num(): number {
        return this._resource_num;
    }

    private _give_id: number;
    public get give_id(): number {
        return this._give_id;
    }

    private _give_num: number;
    public get give_num(): number {
        return this._give_num;
    }

    private _free_id: number;
    public get free_id(): number {
        return this._free_id;
    }

    private _free_num: number;
    public get free_num(): number {
        return this._free_num;
    }



}

