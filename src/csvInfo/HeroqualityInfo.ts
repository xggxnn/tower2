import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class HeroqualityInfo {


    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, HeroqualityInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new HeroqualityInfo(dic));
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
    public static getInfo(id: any): HeroqualityInfo {
        return this._hashDic.getValue(id);
    }

    /**
     * 依据quality获取配置信息
     * @param quality
     */
    public static getInfoQuality(quality: number): HeroqualityInfo {
        let list = this._hashDic.getValues();
        for (let i = this._hashDic.count - 1; i >= 0; i--) {
            if (list[i]._quality == quality) {
                return list[i];
            }
        }
        return null;
    }

    private static _hashDic: Dictionary<string, HeroqualityInfo> = new Dictionary<string, HeroqualityInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, HeroqualityInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new HeroqualityInfo(dic[id]));
        }
    }

    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._quality = parseInt(obj.getValue("quality"));
        this._total_num = parseInt(obj.getValue("total_num"));
        this._free_lottery_num = parseInt(obj.getValue("free_lottery_num"));
        this._clip_hero = parseInt(obj.getValue("clip_hero"));
        this._magic_clip = parseInt(obj.getValue("magic_clip"));
        this._lottery_clip = parseInt(obj.getValue("lottery_clip"));
        this._total_clip = parseInt(obj.getValue("total_clip"));
        this._total_magic = parseInt(obj.getValue("total_magic"));
        this._need_magic = parseInt(obj.getValue("need_magic"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _quality: number;
    public get quality(): number {
        return this._quality;
    }

    private _total_num: number;
    public get total_num(): number {
        return this._total_num;
    }

    private _free_lottery_num: number;
    public get free_lottery_num(): number {
        return this._free_lottery_num;
    }

    private _clip_hero: number;
    public get clip_hero(): number {
        return this._clip_hero;
    }

    private _magic_clip: number;
    public get magic_clip(): number {
        return this._magic_clip;
    }

    private _lottery_clip: number;
    public get lottery_clip(): number {
        return this._lottery_clip;
    }

    private _total_clip: number;
    public get total_clip(): number {
        return this._total_clip;
    }

    private _total_magic: number;
    public get total_magic(): number {
        return this._total_magic;
    }

    private _need_magic: number;
    public get need_magic(): number {
        return this._need_magic;
    }



}

