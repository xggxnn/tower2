import Dictionary from "../Tool/Dictionary";

export default class FiveElementsInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get type(): number {
        return Number(this.curInf.getValue("type"));
    }
    public get name(): string {
        return String(this.curInf.getValue("name"));
    }
    constructor(id: string) {
        this.curInf = FiveElementsInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): FiveElementsInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new FiveElementsInfo(ids);
        }
        return null;
    }
    public static getInfoWithType(type: number): FiveElementsInfo {
        let list = FiveElementsInfo.getList();
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].type == type) {
                return list[i];
            }
        }
        return null;
    }
    private static infList: FiveElementsInfo[] = null;
    public static getList(): Array<FiveElementsInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) {
                this.infList.push(new FiveElementsInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("type", "1");
        dic1.add("name", "火");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("type", "2");
        dic2.add("name", "金");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("type", "3");
        dic3.add("name", "木");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("type", "4");
        dic4.add("name", "水");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("type", "5");
        dic5.add("name", "土");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("type", "101");
        dic6.add("name", "兜率宫");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("type", "102");
        dic7.add("name", "凌霄殿");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("type", "103");
        dic8.add("name", "碧波潭");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("type", "104");
        dic9.add("name", "盘丝洞");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("type", "105");
        dic10.add("name", "魔王寨");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("type", "106");
        dic11.add("name", "紫竹林");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("type", "107");
        dic12.add("name", "狮驼铃");
        this.infDic.add("12", dic12);
    }

}
