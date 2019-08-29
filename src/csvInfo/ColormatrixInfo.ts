import CSV from "./CSV";
import Dictionary from "../Tool/Dictionary";

export default class ColormatrixInfo {

    private static _hash: Object = {};

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        for (var id in data) {
            this._hash[id] = new ColormatrixInfo(data[id]);
        }
    }

    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        for (let i = 0; i < 20; i++) {
            var _name = "p" + i;
            if (obj.hasOwnProperty(_name)) {
                if (i % 5 == 4) {
                    this._matrix[i] = parseInt(obj[_name]);
                } else {
                    this._matrix[i] = parseInt(obj[_name]) / 100;
                }
            }
        }
    }

    private _matrix: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    public get matrix(): Array<number> {
        return this._matrix;
    }

    /**
     * 通过id获取Matrix
     */
    public static getMatrix(id: any): Array<number> {
        let _id = String(id);
        if (this._hash.hasOwnProperty(_id)) {
            return this._hash[_id].matrix;
        }
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }


}

