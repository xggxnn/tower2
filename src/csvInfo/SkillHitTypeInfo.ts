import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class SkillHitTypeInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, SkillHitTypeInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new SkillHitTypeInfo(dic));
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
    public static getInfo(id: any): SkillHitTypeInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, SkillHitTypeInfo> = new Dictionary<string, SkillHitTypeInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, SkillHitTypeInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new SkillHitTypeInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._hit_type = obj.getValue("hit_type");
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _hit_type: string;
    public get hit_type(): string {
        return this._hit_type;
    }



}

