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
    public get content(): string {
        return String(this.curInf.getValue("content"));
    }
    public get diamond_1(): number {
        return Number(this.curInf.getValue("diamond_1"));
    }
    public get diamond_2(): number {
        return Number(this.curInf.getValue("diamond_2"));
    }
    public get RMB_1(): number {
        return Number(this.curInf.getValue("RMB_1"));
    }
    public get RMB_2(): number {
        return Number(this.curInf.getValue("RMB_2"));
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
        dic1.add("name", "中包");
        dic1.add("content", "中包");
        dic1.add("diamond_1", "60");
        dic1.add("diamond_2", "90");
        dic1.add("RMB_1", "6");
        dic1.add("RMB_2", "9");
        dic1.add("type", "1");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("name", "大包");
        dic2.add("content", "大包");
        dic2.add("diamond_1", "120");
        dic2.add("diamond_2", "180");
        dic2.add("RMB_1", "12");
        dic2.add("RMB_2", "18");
        dic2.add("type", "1");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("name", "超大包");
        dic3.add("content", "超大包");
        dic3.add("diamond_1", "240");
        dic3.add("diamond_2", "360");
        dic3.add("RMB_1", "24");
        dic3.add("RMB_2", "36");
        dic3.add("type", "1");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("name", "豪华包");
        dic4.add("content", "豪华包");
        dic4.add("diamond_1", "360");
        dic4.add("diamond_2", "540");
        dic4.add("RMB_1", "36");
        dic4.add("RMB_2", "54");
        dic4.add("type", "1");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("name", "土豪包");
        dic5.add("content", "土豪包");
        dic5.add("diamond_1", "480");
        dic5.add("diamond_2", "720");
        dic5.add("RMB_1", "48");
        dic5.add("RMB_2", "72");
        dic5.add("type", "1");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("name", "小包金币");
        dic6.add("content", "100");
        dic6.add("diamond_1", "10");
        dic6.add("diamond_2", "15");
        dic6.add("RMB_1", "1");
        dic6.add("RMB_2", "1.5");
        dic6.add("type", "2");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("name", "中包金币");
        dic7.add("content", "500");
        dic7.add("diamond_1", "50");
        dic7.add("diamond_2", "75");
        dic7.add("RMB_1", "5");
        dic7.add("RMB_2", "7.5");
        dic7.add("type", "2");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("name", "大包金币");
        dic8.add("content", "1000");
        dic8.add("diamond_1", "100");
        dic8.add("diamond_2", "150");
        dic8.add("RMB_1", "10");
        dic8.add("RMB_2", "15");
        dic8.add("type", "2");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("name", "一点宝石");
        dic9.add("content", "10");
        dic9.add("diamond_1", "10");
        dic9.add("diamond_2", "15");
        dic9.add("RMB_1", "1");
        dic9.add("RMB_2", "1.5");
        dic9.add("type", "3");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("name", "一堆宝石");
        dic10.add("content", "100");
        dic10.add("diamond_1", "100");
        dic10.add("diamond_2", "150");
        dic10.add("RMB_1", "10");
        dic10.add("RMB_2", "15");
        dic10.add("type", "3");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("name", "一箱宝石");
        dic11.add("content", "500");
        dic11.add("diamond_1", "500");
        dic11.add("diamond_2", "750");
        dic11.add("RMB_1", "50");
        dic11.add("RMB_2", "75");
        dic11.add("type", "3");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("name", "一大箱宝石");
        dic12.add("content", "1000");
        dic12.add("diamond_1", "1000");
        dic12.add("diamond_2", "1500");
        dic12.add("RMB_1", "100");
        dic12.add("RMB_2", "150");
        dic12.add("type", "3");
        this.infDic.add("12", dic12);
    }
    
}
