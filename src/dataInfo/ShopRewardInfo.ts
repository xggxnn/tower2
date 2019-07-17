import Dictionary from "../Tool/Dictionary"; 

export default class ShopRewardInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get heroId(): number {
        return Number(this.curInf.getValue("heroId"));
    }
    public get clips(): number {
        return Number(this.curInf.getValue("clips"));
    }
    public get gold(): number {
        return Number(this.curInf.getValue("gold"));
    }
    public get jadeite(): number {
        return Number(this.curInf.getValue("jadeite"));
    }
    public get diamond(): number {
        return Number(this.curInf.getValue("diamond"));
    }
    constructor(id: string) {
        this.curInf = ShopRewardInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): ShopRewardInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new ShopRewardInfo(ids);
        }
        return null;
    }
    private static infList: ShopRewardInfo[] = null;
    public static getList(): Array<ShopRewardInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new ShopRewardInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("heroId", "1");
        dic1.add("clips", "1");
        dic1.add("gold", "1");
        dic1.add("jadeite", "1");
        dic1.add("diamond", "0");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("heroId", "2");
        dic2.add("clips", "2");
        dic2.add("gold", "2");
        dic2.add("jadeite", "2");
        dic2.add("diamond", "0");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("heroId", "3");
        dic3.add("clips", "3");
        dic3.add("gold", "3");
        dic3.add("jadeite", "3");
        dic3.add("diamond", "0");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("heroId", "4");
        dic4.add("clips", "4");
        dic4.add("gold", "4");
        dic4.add("jadeite", "4");
        dic4.add("diamond", "0");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("heroId", "5");
        dic5.add("clips", "5");
        dic5.add("gold", "5");
        dic5.add("jadeite", "5");
        dic5.add("diamond", "0");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("heroId", "0");
        dic6.add("clips", "0");
        dic6.add("gold", "100");
        dic6.add("jadeite", "0");
        dic6.add("diamond", "0");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("heroId", "0");
        dic7.add("clips", "0");
        dic7.add("gold", "500");
        dic7.add("jadeite", "0");
        dic7.add("diamond", "0");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("heroId", "0");
        dic8.add("clips", "0");
        dic8.add("gold", "1000");
        dic8.add("jadeite", "0");
        dic8.add("diamond", "0");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("heroId", "0");
        dic9.add("clips", "0");
        dic9.add("gold", "0");
        dic9.add("jadeite", "0");
        dic9.add("diamond", "10");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("heroId", "0");
        dic10.add("clips", "0");
        dic10.add("gold", "0");
        dic10.add("jadeite", "0");
        dic10.add("diamond", "100");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("heroId", "0");
        dic11.add("clips", "0");
        dic11.add("gold", "0");
        dic11.add("jadeite", "0");
        dic11.add("diamond", "500");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("heroId", "0");
        dic12.add("clips", "0");
        dic12.add("gold", "0");
        dic12.add("jadeite", "0");
        dic12.add("diamond", "1000");
        this.infDic.add("12", dic12);
    }
    
}
