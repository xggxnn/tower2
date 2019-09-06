import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class BossSkillInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, BossSkillInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new BossSkillInfo(dic));
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
    public static getInfo(id: any): BossSkillInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, BossSkillInfo> = new Dictionary<string, BossSkillInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, BossSkillInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new BossSkillInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._types = parseInt(obj.getValue("type"));
        this._cooldown = parseInt(obj.getValue("cooldown"));
        this._effecttime = parseInt(obj.getValue("effecttime"));
        this._effectvalue = parseInt(obj.getValue("effectvalue"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _types: number;
    /**
     * 1, 加血-配合高爆
     * 2, 加速-配合高频
     * 3, 加防-配合均衡、高爆
     * 4, 减攻速-配合高频
     * 5, 减攻击-配合高爆
     */
    public get types(): number {
        return this._types;
    }

    private _cooldown: number;
    public get cooldown(): number {
        return this._cooldown;
    }

    private _effecttime: number;
    /**
     * 秒
     */
    public get effecttime(): number {
        return this._effecttime;
    }

    private _effectvalue: number;
    /**
     * 百分比
     */
    public get effectvalue(): number {
        return this._effectvalue;
    }

}

