import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class LevelmapInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, LevelmapInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new LevelmapInfo(dic));
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
    public static getInfo(id: any): LevelmapInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, LevelmapInfo> = new Dictionary<string, LevelmapInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, LevelmapInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new LevelmapInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._level = [];
        for (let i = 1; i < 11; i++) {
            let lev = obj.getValue("level" + i);
            let str = lev.split("#");
            let points = new Laya.Point(parseInt(str[0]), parseInt(str[1]));
            this._level.push(points);
        }
        this._chapter = parseInt(obj.getValue("chapter"));
        this._levelbg = parseInt(obj.getValue("levelbg"));
        this._levelIcon = parseInt(obj.getValue("levelicon"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _level: Array<Laya.Point>;
    public get level(): Array<Laya.Point> {
        return this._level;
    }

    private _chapter: number;
    public get chapter(): number {
        return this._chapter;
    }

    private _levelbg: number;
    public get levelbg(): number {
        return this._levelbg;
    }

    private _levelIcon: number;
    public get levelIcon(): number {
        return this._levelIcon;
    }

}

