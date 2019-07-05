import Dictionary from "../Tool/Dictionary"; 

export default class AssociationRaceInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get race(): number {
        return Number(this.curInf.getValue("race"));
    }
    public get num(): number {
        return Number(this.curInf.getValue("num"));
    }
    public get attribute(): number {
        return Number(this.curInf.getValue("attribute"));
    }
    public get value(): number {
        return Number(this.curInf.getValue("value"));
    }
    constructor(id: string) {
        this.curInf = AssociationRaceInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): AssociationRaceInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new AssociationRaceInfo(ids);
        }
        return null;
    }
    private static infList: AssociationRaceInfo[] = null;
    public static getList(): Array<AssociationRaceInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new AssociationRaceInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("race", "1");
        dic1.add("num", "3");
        dic1.add("attribute", "1");
        dic1.add("value", "5");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("race", "1");
        dic2.add("num", "4");
        dic2.add("attribute", "1");
        dic2.add("value", "10");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("race", "1");
        dic3.add("num", "5");
        dic3.add("attribute", "1");
        dic3.add("value", "15");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("race", "2");
        dic4.add("num", "3");
        dic4.add("attribute", "2");
        dic4.add("value", "5");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("race", "2");
        dic5.add("num", "4");
        dic5.add("attribute", "2");
        dic5.add("value", "10");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("race", "2");
        dic6.add("num", "6");
        dic6.add("attribute", "2");
        dic6.add("value", "15");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("race", "3");
        dic7.add("num", "4");
        dic7.add("attribute", "3");
        dic7.add("value", "10");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("race", "3");
        dic8.add("num", "5");
        dic8.add("attribute", "3");
        dic8.add("value", "15");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("race", "3");
        dic9.add("num", "6");
        dic9.add("attribute", "3");
        dic9.add("value", "20");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("race", "4");
        dic10.add("num", "3");
        dic10.add("attribute", "4");
        dic10.add("value", "5");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("race", "4");
        dic11.add("num", "4");
        dic11.add("attribute", "4");
        dic11.add("value", "10");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("race", "4");
        dic12.add("num", "6");
        dic12.add("attribute", "4");
        dic12.add("value", "15");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("race", "5");
        dic13.add("num", "3");
        dic13.add("attribute", "5");
        dic13.add("value", "10");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("race", "5");
        dic14.add("num", "4");
        dic14.add("attribute", "5");
        dic14.add("value", "15");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("race", "5");
        dic15.add("num", "5");
        dic15.add("attribute", "5");
        dic15.add("value", "20");
        this.infDic.add("15", dic15);
    }
    
}
