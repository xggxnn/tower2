import ResourceInfo from "../dataInfo/ResourceInfo";
import Dictionary from "../Tool/Dictionary";

export default class RescourceKey {
    private static _dic: Dictionary<string, number> = new Dictionary<string, number>();
    public static get gold() {
        return 1;
    }
    public static get jadeite() {
        return 2;
    }
    public static get magic() {
        return 3;
    }
    public static get diamond() {
        return 4;
    }
    public static get pearl() {
        return 5;
    }
    public static itemId(key: string): number {
        if (this._dic.hasKey(key)) {
            return this._dic.getValue(key);
        }
        let list = ResourceInfo.getList();
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].key == key) {
                this._dic.add(key, list[i].id);
                return list[i].id;
            }
        }
        return 0;
    }
}