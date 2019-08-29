import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class HeroInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, HeroInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new HeroInfo(dic));
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
    public static getInfo(id: any): HeroInfo {
        return this._hashDic.getValue(id);
    }

    //构造函数
    constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._name = obj.getValue("name");
        this._story = obj.getValue("story");
        this._skin = parseInt(obj.getValue("skin"));
        this._quality = parseInt(obj.getValue("quality"));
        this._type = parseInt(obj.getValue("type"));
        this._race = parseInt(obj.getValue("race"));
        this._career = parseInt(obj.getValue("career"));
        this._point_fetters = parseInt(obj.getValue("point_fetters"));
        this._skill_id_1 = parseInt(obj.getValue("skill_id_1"));
        this._skill_id_2 = parseInt(obj.getValue("skill_id_2"));
        this._source = parseInt(obj.getValue("source"));
        this._basicattckpoint = [];
        this._basicattckpoint.push(Number(obj.getValue("basicattckpoint1")));
        this._basicattckpoint.push(Number(obj.getValue("basicattckpoint2")));
        this._basicattckpoint.push(Number(obj.getValue("basicattckpoint3")));
        this._basicattckpoint.push(Number(obj.getValue("basicattckpoint4")));
        this._basicattckpoint.push(Number(obj.getValue("basicattckpoint5")));
    }
    private static _hashDic: Dictionary<string, HeroInfo> = new Dictionary<string, HeroInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, HeroInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new HeroInfo(dic[id]));
        }
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }

    private _story: string;
    public get story(): string {
        return this._story;
    }

    private _skin: number;
    public get skin(): number {
        return this._skin;
    }

    private _quality: number;
    public get quality(): number {
        return this._quality;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _race: number;
    public get race(): number {
        return this._race;
    }

    private _career: number;
    public get career(): number {
        return this._career;
    }

    private _point_fetters: number;
    public get point_fetters(): number {
        return this._point_fetters;
    }

    private _skill_id_1: number;
    public get skill_id_1(): number {
        return this._skill_id_1;
    }

    private _skill_id_2: number;
    public get skill_id_2(): number {
        return this._skill_id_2;
    }

    private _source: number;
    public get source(): number {
        return this._source;
    }

    private _basicattckpoint: number[];
    public basicattckpoint(quality: number): number {
        return this._basicattckpoint[quality];
    }
    public get basAttack(): number[] {
        return this._basicattckpoint;
    }

}

