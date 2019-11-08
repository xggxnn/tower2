import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class TimeHouseInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, TimeHouseInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new TimeHouseInfo(dic));
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
    public static getInfo(id: any): TimeHouseInfo {
        return this._hashDic.getValue(id);
    }
    /**
     * 依据lv获取配置信息
     * @param lv 
     */
    public static getInfoLv(lv: number): TimeHouseInfo {
        let list = this._hashDic.getValues();
        for (let i = this._hashDic.count - 1; i >= 0; i--) {
            if (list[i]._lv == lv) {
                return list[i];
            }
        }
        return null;
    }
    private static _hashDic: Dictionary<string, TimeHouseInfo> = new Dictionary<string, TimeHouseInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, TimeHouseInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new TimeHouseInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._lv = parseInt(obj.getValue("lv"));
        this._star = parseInt(obj.getValue("star"));
        this._cost_gold = parseInt(obj.getValue("cost_gold"));
        this._cost_jadeite = parseInt(obj.getValue("cost_jadeite"));
        this._vals = [];
        this._val0 = parseInt(obj.getValue("val0"));
        this._vals.push(this.val0);
        this._val1 = parseInt(obj.getValue("val1"));
        this._vals.push(this.val1);
        this._val2 = parseInt(obj.getValue("val2"));
        this._vals.push(this.val2);
        this._val3 = parseInt(obj.getValue("val3"));
        this._vals.push(this.val3);
        this._val4 = parseInt(obj.getValue("val4"));
        this._vals.push(this.val4);
        this._val5 = parseInt(obj.getValue("val5"));
        this._vals.push(this.val5);
        this._val6 = parseInt(obj.getValue("val6"));
        this._vals.push(this.val6);
        this._val7 = parseInt(obj.getValue("val7"));
        this._vals.push(this.val7);
        this._val8 = parseInt(obj.getValue("val8"));
        this._vals.push(this.val8);
        this._val9 = parseInt(obj.getValue("val9"));
        this._vals.push(this.val9);
        this._val10 = parseInt(obj.getValue("val10"));
        this._vals.push(this.val10);
    }

    private _vals: Array<number>;
    public get vals(): Array<number> {
        return this._vals;
    }


    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _lv: number;
    public get lv(): number {
        return this._lv;
    }

    private _star: number;
    public get star(): number {
        // 测试专用
        return 5;
        // return this._star;
    }

    private _cost_gold: number;
    public get cost_gold(): number {
        return this._cost_gold;
    }

    private _cost_jadeite: number;
    public get cost_jadeite(): number {
        return this._cost_jadeite;
    }

    private _val0: number;
    public get val0(): number {
        return this._val0;
    }

    private _val1: number;
    public get val1(): number {
        return this._val1;
    }

    private _val2: number;
    public get val2(): number {
        return this._val2;
    }

    private _val3: number;
    public get val3(): number {
        return this._val3;
    }

    private _val4: number;
    public get val4(): number {
        return this._val4;
    }

    private _val5: number;
    public get val5(): number {
        return this._val5;
    }

    private _val6: number;
    public get val6(): number {
        return this._val6;
    }

    private _val7: number;
    public get val7(): number {
        return this._val7;
    }

    private _val8: number;
    public get val8(): number {
        return this._val8;
    }

    private _val9: number;
    public get val9(): number {
        return this._val9;
    }

    private _val10: number;
    public get val10(): number {
        return this._val10;
    }



}

