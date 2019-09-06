import Dictionary from "../tool/Dictionary";
import ResourceInfo from "../csvInfo/ResourceInfo";

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
        for (let i = 1, len = ResourceInfo.getCount(); i <= len; i++) {
            let item = ResourceInfo.getInfo(i);
            if (item.key == key) {
                this._dic.add(key, item.id);
                return item.id;
            }
        }
        return 0;
    }
}