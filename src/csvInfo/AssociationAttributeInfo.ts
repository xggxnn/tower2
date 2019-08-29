import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class AssociationAttributeInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, AssociationAttributeInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new AssociationAttributeInfo(dic));
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
    public static getInfo(id: any): AssociationAttributeInfo {
        return this._hashDic.getValue(id);
    }
    private static _hashDic: Dictionary<string, AssociationAttributeInfo> = new Dictionary<string, AssociationAttributeInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, AssociationAttributeInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new AssociationAttributeInfo(dic[id]));
        }
    }

    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._type = parseInt(obj.getValue("type"));
        this._des = obj.getValue("des");
        this._suggest = parseInt(obj.getValue("suggest"))
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _type: number;
    public get types(): number {
        return this._type;
    }

    private _des: string;
    public get des(): string {
        return this._des;
    }

    private _suggest: number;
    public get suggest(): number {
        return this._suggest;
    }
    public set suggest(v: number) {
        this._suggest = v;
    }



}

