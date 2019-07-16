import ItemInfo from "./ItemInfo";

export default class GiftData {
    public id: number;
    public type: number;
    public icon: string;
    public count: number;
    public price: number;
    public priceType: number;
    public get types(): string {
        switch (this.type) {
            case 0:
                return "小包";
            case 1:
                return "中包";
            case 2:
                return "大包";
            case 3:
                return "豪华包";
            case 4:
                return "土豪包";

        }
        return "空包";
    }
    public get priceTypes(): string {
        switch (this.priceType) {
            case 0:
                return "金币";
            case 1:
                return "宝石";
            case 2:
                return "翡翠";
        }
        return "RMB";
    }
    public reward: Array<ItemInfo> = [];
}