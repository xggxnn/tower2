import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class UnlockInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, UnlockInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new UnlockInfo(dic));
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
    public static getInfo(id: any): UnlockInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, UnlockInfo> = new Dictionary<string, UnlockInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, UnlockInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new UnlockInfo(dic[id]));
        }
    }

    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._mapId = parseInt(obj.getValue("mapId"));
        this._tip = obj.getValue("tip").split("#");;
        let ___unlock = obj.getValue("unlock").split('#');
        this._unLock = [];
        for (let i = 0; i < ___unlock.length; i++) {
            this._unLock.push(parseInt(___unlock[i]));
        }
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _mapId: number;
    public get mapId(): number {
        return this._mapId;
    }

    private _unLock: Array<number>;
    public get unLock(): Array<number> {
        return this._unLock;
    }

    private _tip: Array<string>;
    public get tip(): Array<string> {
        return this._tip;
    }





}

