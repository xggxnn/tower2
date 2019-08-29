import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class CardsInfo {


    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, CardsInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new CardsInfo(dic));
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
    public static getInfo(id: any): CardsInfo {
        return this._hashDic.getValue(id);
    }
    private static _hashDic: Dictionary<string, CardsInfo> = new Dictionary<string, CardsInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, CardsInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new CardsInfo(dic[id]));
        }
    }

    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._gold_min = parseInt(obj.getValue("gold_min"));
        this._gold_max = parseInt(obj.getValue("gold_max"));
        this._gold_pow = parseInt(obj.getValue("gold_pow"));
        this._jadeite_min = parseInt(obj.getValue("jadeite_min"));
        this._jadeite_max = parseInt(obj.getValue("jadeite_max"));
        this._jadeite_pow = parseInt(obj.getValue("jadeite_pow"));
        this._white_min = parseInt(obj.getValue("white_min"));
        this._white_max = parseInt(obj.getValue("white_max"));
        this._white_pow = parseInt(obj.getValue("white_pow"));
        this._blue_min = parseInt(obj.getValue("blue_min"));
        this._blue_max = parseInt(obj.getValue("blue_max"));
        this._blue_pow = parseInt(obj.getValue("blue_pow"));
        this._purple_min = parseInt(obj.getValue("purple_min"));
        this._purple_max = parseInt(obj.getValue("purple_max"));
        this._purple_pow = parseInt(obj.getValue("purple_pow"));
        this._orange_min = parseInt(obj.getValue("orange_min"));
        this._orange_max = parseInt(obj.getValue("orange_max"));
        this._orange_pow = parseInt(obj.getValue("orange_pow"));
        this._red_min = parseInt(obj.getValue("red_min"));
        this._red_max = parseInt(obj.getValue("red_max"));
        this._red_pow = parseInt(obj.getValue("red_pow"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _gold_min: number;
    public get gold_min(): number {
        return this._gold_min;
    }

    private _gold_max: number;
    public get gold_max(): number {
        return this._gold_max;
    }

    private _gold_pow: number;
    public get gold_pow(): number {
        return this._gold_pow;
    }

    private _jadeite_min: number;
    public get jadeite_min(): number {
        return this._jadeite_min;
    }

    private _jadeite_max: number;
    public get jadeite_max(): number {
        return this._jadeite_max;
    }

    private _jadeite_pow: number;
    public get jadeite_pow(): number {
        return this._jadeite_pow;
    }

    private _white_min: number;
    public get white_min(): number {
        return this._white_min;
    }

    private _white_max: number;
    public get white_max(): number {
        return this._white_max;
    }

    private _white_pow: number;
    public get white_pow(): number {
        return this._white_pow;
    }

    private _blue_min: number;
    public get blue_min(): number {
        return this._blue_min;
    }

    private _blue_max: number;
    public get blue_max(): number {
        return this._blue_max;
    }

    private _blue_pow: number;
    public get blue_pow(): number {
        return this._blue_pow;
    }

    private _purple_min: number;
    public get purple_min(): number {
        return this._purple_min;
    }

    private _purple_max: number;
    public get purple_max(): number {
        return this._purple_max;
    }

    private _purple_pow: number;
    public get purple_pow(): number {
        return this._purple_pow;
    }

    private _orange_min: number;
    public get orange_min(): number {
        return this._orange_min;
    }

    private _orange_max: number;
    public get orange_max(): number {
        return this._orange_max;
    }

    private _orange_pow: number;
    public get orange_pow(): number {
        return this._orange_pow;
    }

    private _red_min: number;
    public get red_min(): number {
        return this._red_min;
    }

    private _red_max: number;
    public get red_max(): number {
        return this._red_max;
    }

    private _red_pow: number;
    public get red_pow(): number {
        return this._red_pow;
    }



}

