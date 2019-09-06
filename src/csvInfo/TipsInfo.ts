import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class TipsInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        this._tipDic = new Dictionary<string, string>();
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, TipsInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new TipsInfo(dic));
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
    public static getInfo(id: any): TipsInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, TipsInfo> = new Dictionary<string, TipsInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, TipsInfo>();
        this._tipDic = new Dictionary<string, string>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new TipsInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._key = obj.getValue("key").trim();
        this._content = obj.getValue("content").trim();
        TipsInfo._tipDic.add(this._key, this._content);
    }
    private static _tipDic: Dictionary<string, string> = new Dictionary<string, string>();
    public static txt(key: string): string | Array<string> {
        if (this._tipDic.hasKey(key)) {
            let curStr = this._tipDic.getValue(key);
            let strsz = curStr.split("#");
            if (strsz.length > 1) {
                return strsz;
            }
            else {
                let str = curStr.split("\\");
                let strs = "";
                if (str.length > 1) {
                    for (let i = 0; i < str.length; i++) {
                        strs += str[i].replace("n", "") + "\n";
                    }
                }
                else {
                    strs = curStr;
                }
                return strs;
            }
        }
        return "";
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _key: string;
    public get key(): string {
        return this._key;
    }

    private _content: string;
    public get content(): string {
        return this._content;
    }

}

