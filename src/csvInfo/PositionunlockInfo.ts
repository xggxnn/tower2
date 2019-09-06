import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class PositionunlockInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, PositionunlockInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new PositionunlockInfo(dic));
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
    public static getInfo(id: any): PositionunlockInfo {
        return this._hashDic.getValue(id);
    }
    public static getSeatInfo(id: any): number {
        let seat = Number(id);
        switch (seat) {
            case 0:
                seat = 7;
                break;
            case 1:
                seat = 4;
                break;
            case 2:
                seat = 1;
                break;
            case 3:
                seat = 8;
                break;
            case 4:
                seat = 5;
                break;
            case 5:
                seat = 2;
                break;
            case 6:
                seat = 9;
                break;
            case 7:
                seat = 6;
                break;
            case 8:
                seat = 3;
                break;
        }
        return this._hashDic.getValue(seat).unlocklevel;
    }

    private static _hashDic: Dictionary<string, PositionunlockInfo> = new Dictionary<string, PositionunlockInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, PositionunlockInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new PositionunlockInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._unlocklevel = parseInt(obj.getValue("unlocklevel"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _unlocklevel: number;
    public get unlocklevel(): number {
        return this._unlocklevel;
    }

}

