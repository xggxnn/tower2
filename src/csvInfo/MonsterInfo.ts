import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class MonsterInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, MonsterInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new MonsterInfo(dic));
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
    public static getInfo(id: any): MonsterInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, MonsterInfo> = new Dictionary<string, MonsterInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, MonsterInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new MonsterInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._type = parseInt(obj.getValue("type"));
        this._boss = parseInt(obj.getValue("boss"));
        this._sk = parseInt(obj.getValue("sk"));
        this._move_speed = parseInt(obj.getValue("move_speed"));
        this._atk = parseInt(obj.getValue("atk"));
        this._atk_speed = parseInt(obj.getValue("atk_speed"));
        this._skill_id = parseInt(obj.getValue("skill_id"));
        this._big_wave = parseInt(obj.getValue("big_wave"));
        this._hp = Number(obj.getValue("hp"));
        this._base_hp = Number(obj.getValue("base_hp"));
        this._base_num = parseInt(obj.getValue("base_num"));
        this._split = parseInt(obj.getValue("split"));
        this._split_id = parseInt(obj.getValue("split_id"));
        this._resurrection = parseInt(obj.getValue("resurrection"));
        this._defence = parseInt(obj.getValue("defence"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _boss: number;
    public get boss(): number {
        return this._boss;
    }

    private _sk: number;
    public get sk(): number {
        return this._sk;
    }

    private _move_speed: number;
    public get move_speed(): number {
        return this._move_speed;
    }

    private _atk: number;
    public get atk(): number {
        return this._atk;
    }

    private _atk_speed: number;
    public get atk_speed(): number {
        return this._atk_speed;
    }

    private _skill_id: number;
    public get skill_id(): number {
        return this._skill_id;
    }

    private _big_wave: number;
    public get big_wave(): number {
        return this._big_wave;
    }

    private _hp: number;
    public get hp(): number {
        return this._hp;
    }

    private _base_hp: number;
    public get base_hp(): number {
        return this._base_hp;
    }

    private _base_num: number;
    public get base_num(): number {
        return this._base_num;
    }

    private _split: number;
    public get split(): number {
        return this._split;
    }

    private _split_id: number;
    public get split_id(): number {
        return this._split_id;
    }

    private _resurrection: number;
    public get resurrection(): number {
        return this._resurrection;
    }

    private _defence: number;
    public get defence(): number {
        return this._defence;
    }



}

