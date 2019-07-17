import Dictionary from "../Tool/Dictionary"; 

export default class CardInfo {

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
    public get type(): number {
        return Number(this.curInf.getValue("type"));
    }
    constructor(id: string) {
        this.curInf = CardInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): CardInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new CardInfo(ids);
        }
        return null;
    }
    private static infList: CardInfo[] = null;
    public static getList(): Array<CardInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new CardInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("name", "中包");
        dic1.add("des", "中包");
        dic1.add("icon", "Gift");
        dic1.add("price", "90");
        dic1.add("discount", "1");
        dic1.add("heroId", "1");
        dic1.add("clips", "1");
        dic1.add("gold", "1");
        dic1.add("jadeite", "1");
        dic1.add("type", "1");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("name", "大包");
        dic2.add("des", "大包");
        dic2.add("icon", "Gift");
        dic2.add("price", "180");
        dic2.add("discount", "1");
        dic2.add("heroId", "2");
        dic2.add("clips", "2");
        dic2.add("gold", "2");
        dic2.add("jadeite", "2");
        dic2.add("type", "1");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("name", "超大包");
        dic3.add("des", "超大包");
        dic3.add("icon", "Gift");
        dic3.add("price", "360");
        dic3.add("discount", "1");
        dic3.add("heroId", "3");
        dic3.add("clips", "3");
        dic3.add("gold", "3");
        dic3.add("jadeite", "3");
        dic3.add("type", "1");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("name", "豪华包");
        dic4.add("des", "豪华包");
        dic4.add("icon", "Gift");
        dic4.add("price", "540");
        dic4.add("discount", "1");
        dic4.add("heroId", "4");
        dic4.add("clips", "4");
        dic4.add("gold", "4");
        dic4.add("jadeite", "4");
        dic4.add("type", "1");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("name", "土豪包");
        dic5.add("des", "土豪包");
        dic5.add("icon", "Gift");
        dic5.add("price", "720");
        dic5.add("discount", "1");
        dic5.add("heroId", "5");
        dic5.add("clips", "5");
        dic5.add("gold", "5");
        dic5.add("jadeite", "5");
        dic5.add("type", "1");
        this.infDic.add("5", dic5);
    }
    
}
