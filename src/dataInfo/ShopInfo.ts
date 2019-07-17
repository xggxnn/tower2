import Dictionary from "../Tool/Dictionary"; 

export default class ShopInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get name(): string {
        return String(this.curInf.getValue("name"));
    }
    public get des(): string {
        return String(this.curInf.getValue("des"));
    }
    public get icon(): string {
        return String(this.curInf.getValue("icon"));
    }
    public get price(): number {
        return Number(this.curInf.getValue("price"));
    }
    public get discount(): number {
        return Number(this.curInf.getValue("discount"));
    }
    public get price_type(): number {
        return Number(this.curInf.getValue("price_type"));
    }
    public get cost(): number {
        return Number(this.curInf.getValue("cost"));
    }
    public get gold(): number {
        return Number(this.curInf.getValue("gold"));
    }
    public get diamond(): number {
        return Number(this.curInf.getValue("diamond"));
    }
    public get type(): number {
        return Number(this.curInf.getValue("type"));
    }
    constructor(id: string) {
        this.curInf = ShopInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): ShopInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new ShopInfo(ids);
        }
        return null;
    }
    private static infList: ShopInfo[] = null;
    public static getList(): Array<ShopInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new ShopInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("name", "小包金币");
        dic1.add("des", "小包金币");
        dic1.add("icon", "gold");
        dic1.add("price", "100");
        dic1.add("discount", "1");
        dic1.add("price_type", "1");
        dic1.add("cost", "0");
        dic1.add("gold", "100");
        dic1.add("diamond", "0");
        dic1.add("type", "2");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("name", "中包金币");
        dic2.add("des", "中包金币");
        dic2.add("icon", "gold");
        dic2.add("price", "500");
        dic2.add("discount", "1");
        dic2.add("price_type", "1");
        dic2.add("cost", "0");
        dic2.add("gold", "500");
        dic2.add("diamond", "0");
        dic2.add("type", "2");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("name", "大包金币");
        dic3.add("des", "大包金币");
        dic3.add("icon", "gold");
        dic3.add("price", "1000");
        dic3.add("discount", "1");
        dic3.add("price_type", "1");
        dic3.add("cost", "0");
        dic3.add("gold", "1000");
        dic3.add("diamond", "0");
        dic3.add("type", "2");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("name", "一点宝石");
        dic4.add("des", "一点宝石");
        dic4.add("icon", "diamond");
        dic4.add("price", "1");
        dic4.add("discount", "0.8");
        dic4.add("price_type", "2");
        dic4.add("cost", "10");
        dic4.add("gold", "0");
        dic4.add("diamond", "10");
        dic4.add("type", "3");
        this.infDic.add("4", dic4);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("name", "一点宝石");
        dic4.add("des", "一点宝石");
        dic4.add("icon", "diamond");
        dic4.add("price", "6");
        dic4.add("discount", "0.8");
        dic4.add("price_type", "2");
        dic4.add("cost", "60");
        dic4.add("gold", "0");
        dic4.add("diamond", "10");
        dic4.add("type", "3");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("name", "一堆宝石");
        dic5.add("des", "一堆宝石");
        dic5.add("icon", "diamond");
        dic5.add("price", "30");
        dic5.add("discount", "0.8");
        dic5.add("price_type", "2");
        dic5.add("cost", "300");
        dic5.add("gold", "0");
        dic5.add("diamond", "100");
        dic5.add("type", "3");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("name", "一箱宝石");
        dic6.add("des", "一箱宝石");
        dic6.add("icon", "diamond");
        dic6.add("price", "128");
        dic6.add("discount", "0.8");
        dic6.add("price_type", "2");
        dic6.add("cost", "1280");
        dic6.add("gold", "0");
        dic6.add("diamond", "500");
        dic6.add("type", "3");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("name", "一大箱宝石");
        dic7.add("des", "一大箱宝石");
        dic7.add("icon", "diamond");
        dic7.add("price", "648");
        dic7.add("discount", "0.8");
        dic7.add("price_type", "2");
        dic7.add("cost", "6480");
        dic7.add("gold", "0");
        dic7.add("diamond", "1000");
        dic7.add("type", "3");
        this.infDic.add("7", dic7);
    }
    
}
