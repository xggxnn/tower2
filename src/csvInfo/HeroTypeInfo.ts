import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class HeroTypeInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, HeroTypeInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new HeroTypeInfo(dic));
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
    public static getInfo(id: any): HeroTypeInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, HeroTypeInfo> = new Dictionary<string, HeroTypeInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, HeroTypeInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new HeroTypeInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._name = obj.getValue("name");
        this._type = parseInt(obj.getValue("type"));
        this._bench_atk_speed = Number(obj.getValue("bench_atk_speed"));
        this._bench_atk_speed_max = Number(obj.getValue("bench_atk_speed_max"));
        this._benchmark_atk = Number(obj.getValue("benchmark_atk"));
        this._benchmark_atk_max = Number(obj.getValue("benchmark_atk_max"));
        this._benchmark_crit = Number(obj.getValue("benchmark_crit"));
        this._benchmark_crit_max = Number(obj.getValue("benchmark_crit_max"));
        this._benchmark_critatt = Number(obj.getValue("benchmark_critatt"));
        this._benchmark_critatt_max = Number(obj.getValue("benchmark_critatt_max"));
        this._benchmark_pure_atk = Number(obj.getValue("benchmark_pure_atk"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _bench_atk_speed_max: number;
    public get bench_atk_speed_max(): number {
        return this._bench_atk_speed_max;
    }

    private _bench_atk_speed: number;
    public get bench_atk_speed(): number {
        return this._bench_atk_speed;
    }

    private _benchmark_atk: number;
    public get benchmark_atk(): number {
        return this._benchmark_atk;
    }

    private _benchmark_atk_max: number;
    public get benchmark_atk_max(): number {
        return this._benchmark_atk_max;
    }

    private _benchmark_crit: number;
    public get benchmark_crit(): number {
        return this._benchmark_crit;
    }

    private _benchmark_crit_max: number;
    public get benchmark_crit_max(): number {
        return this._benchmark_crit_max;
    }

    private _benchmark_critatt: number;
    public get benchmark_critatt(): number {
        return this._benchmark_critatt;
    }

    private _benchmark_critatt_max: number;
    public get benchmark_critatt_max(): number {
        return this._benchmark_critatt_max;
    }

    private _benchmark_pure_atk: number;
    public get benchmark_pure_atk(): number {
        return this._benchmark_pure_atk;
    }



}

