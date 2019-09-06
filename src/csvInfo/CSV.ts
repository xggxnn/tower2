import Fun from "../tool/Fun";
import CSVKV from "./CSVKV";

export default class CSV {
    private static get kv() {
        return CSVKV.kv;
    }
    public static getKV(): object {
        return this.kv;
    }
    private constructor(csv: string, tab: string = ",", primaryKey: string = "id") {
        csv = Fun.trimString(csv);
        csv = csv.replace(/\r/, "");
        var table = csv.split(/\n/);
        if (table.length > 0) {
            let keyString = Fun.trimString(table[0]);
            let keyList = keyString.split(tab);
            var keys: Array<string> = [];
            for (let i = 0; i < keyList.length; i++) {
                keys.push(Fun.trimString(keyList[i]));
            }
            if (table.length > 1) {
                for (let i = 1; i < table.length; i++) {
                    var _obj = {};
                    let dataString = Fun.trimString(table[i]);
                    let dataArray = dataString.split(tab);
                    for (let j = 0; j < dataArray.length; j++) {
                        var _str = Fun.trimString(dataArray[j]);
                        _obj[keys[j]] = _str;
                    }
                    if (_obj.hasOwnProperty(primaryKey)) {
                        var id = _obj[primaryKey];
                        this.tables[id] = _obj;
                    }
                }
            }
        }
    }
    private tables: Object = {};
    /**
     * 获取所有数据
     * @return 正常返回Object 异常时返回false
     */
    public getAllData(): Object {
        return this.tables;
    }
    public static install(url: string, v: string): void {
        let csv = new CSV(v);
        let url_arr = url.split("/");
        let fileName = url_arr.pop();
        if (this.kv.hasOwnProperty(fileName)) {
            let name_arr = fileName.split(".");
            let type_arr = name_arr[0].split("_");
            let type = type_arr.pop();
            if (parseInt(type) > 0) {
                this.kv[fileName].installCSV(type, csv);
            } else {
                this.kv[fileName].installCSV(csv);
            }
        }
    }
}