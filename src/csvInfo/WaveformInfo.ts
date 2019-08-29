import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class WaveformInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, WaveformInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new WaveformInfo(dic));
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
    public static getInfo(id: any): WaveformInfo {
        return this._hashDic.getValue(id);
    }

    /**
     * 通过type获取Info
     */
    public static getInfoWithType(type: number): Array<WaveformInfo> {
        let result: Array<WaveformInfo> = [];
        for (let i = 1, len = this.getCount(); i <= len; i++) {
            let item = this.getInfo(i);
            if (item.type == type) {
                result.push(item);
            }
        }
        return result;
    }
    private static _hashDic: Dictionary<string, WaveformInfo> = new Dictionary<string, WaveformInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, WaveformInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new WaveformInfo(dic[id]));
        }
    }
    public static serverSimple(data: any): void {
        let dic = new Dictionary<string, string>();
        for (var id in data) {
            dic.add(id, data[id]);
        }
        this._hashDic.set(dic.getValue("id"), new WaveformInfo(dic));
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._type = parseInt(obj.getValue("type"));
        this._index = parseInt(obj.getValue("index"));
        this._waveform = Number(obj.getValue("waveform"));
        this._boss = parseInt(obj.getValue("boss"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _index: number;
    public get index(): number {
        return this._index;
    }

    private _waveform: number;
    public get waveform(): number {
        return this._waveform * 0.01;
    }

    private _boss: number;
    public get boss(): number {
        return this._boss;
    }



}

