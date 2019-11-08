import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class TaskInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, TaskInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new TaskInfo(dic));
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
    public static getInfo(id: any): TaskInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, TaskInfo> = new Dictionary<string, TaskInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, TaskInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new TaskInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._type = parseInt(obj.getValue("type"));
        this._content = obj.getValue("des").trim();
        this._max = parseInt(obj.getValue("max"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _type: number;
    public get types(): number {
        return this._type;
    }

    private _content: string;
    public get content(): string {
        return this._content;
    }

    private _max: number;
    public get maxNum(): number {
        return this._max;
    }

}

