import CSV from "./CSV";
import Fun from "../tool/Fun";
import Dictionary from "../tool/Dictionary";

export default class PlayerSkillInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        PlayerSkillInfo._hashDic = new Dictionary<string, PlayerSkillInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            PlayerSkillInfo._hashDic.add(id, new PlayerSkillInfo(dic));
        }
    }
    /**
     * 获取数据数量
     */
    public static getCount(): number {
        return PlayerSkillInfo._hashDic.count;
    }
    /**
     * 通过id获取Info
     */
    public static getInfo(id: any): PlayerSkillInfo {
        return PlayerSkillInfo._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, PlayerSkillInfo> = new Dictionary<string, PlayerSkillInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        PlayerSkillInfo._hashDic = new Dictionary<string, PlayerSkillInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            PlayerSkillInfo._hashDic.add(_id, new PlayerSkillInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._name = obj.getValue("name");
        this._des = obj.getValue("des");
        this._val = parseInt(obj.getValue("val"));
        this._time = parseInt(obj.getValue("time"));
        this._unlock = parseInt(obj.getValue("unlock"));
        this._cd = parseInt(obj.getValue("cd"));
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
        return Fun.format(this._des, this.val, this.time);
    }

    private _val: number;
    public get val(): number {
        return this._val;
    }

    private _time: number;
    public get time(): number {
        return this._time;
    }

    private _unlock: number;
    public get unlock(): number {
        return this._unlock;
    }

    private _cd: number;
    public get cd(): number {
        return this._cd;
    }



}

