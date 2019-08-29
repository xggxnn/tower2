import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class DifficultyEfficiencyInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, DifficultyEfficiencyInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new DifficultyEfficiencyInfo(dic));
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
    public static getInfo(id: any): DifficultyEfficiencyInfo {
        return this._hashDic.getValue(id);
    }
    private static _hashDic: Dictionary<string, DifficultyEfficiencyInfo> = new Dictionary<string, DifficultyEfficiencyInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, DifficultyEfficiencyInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new DifficultyEfficiencyInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._difficulty = parseInt(obj.getValue("difficulty"));
        this._val = Number(obj.getValue("val"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _difficulty: number;
    public get difficulty(): number {
        return this._difficulty;
    }

    private _val: number;
    public get val(): number {
        return this._val;
    }



}

