import Dictionary from "../Tool/Dictionary"; 

export default class AssociationCareerInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get career(): number {
        return Number(this.curInf.getValue("career"));
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
        this.curInf = AssociationCareerInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): AssociationCareerInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new AssociationCareerInfo(ids);
        }
        return null;
    }
    private static infList: AssociationCareerInfo[] = null;
    public static getList(): Array<AssociationCareerInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new AssociationCareerInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("career", "101");
        dic1.add("num", "3");
        dic1.add("attribute", "6");
        dic1.add("value", "5");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("career", "101");
        dic2.add("num", "4");
        dic2.add("attribute", "6");
        dic2.add("value", "10");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("career", "101");
        dic3.add("num", "5");
        dic3.add("attribute", "6");
        dic3.add("value", "15");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("career", "102");
        dic4.add("num", "2");
        dic4.add("attribute", "7");
        dic4.add("value", "6");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("career", "102");
        dic5.add("num", "3");
        dic5.add("attribute", "7");
        dic5.add("value", "7");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("career", "102");
        dic6.add("num", "4");
        dic6.add("attribute", "7");
        dic6.add("value", "8");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("career", "103");
        dic7.add("num", "2");
        dic7.add("attribute", "8");
        dic7.add("value", "20");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("career", "103");
        dic8.add("num", "3");
        dic8.add("attribute", "8");
        dic8.add("value", "40");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("career", "103");
        dic9.add("num", "4");
        dic9.add("attribute", "8");
        dic9.add("value", "60");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("career", "104");
        dic10.add("num", "2");
        dic10.add("attribute", "9");
        dic10.add("value", "6");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("career", "104");
        dic11.add("num", "3");
        dic11.add("attribute", "9");
        dic11.add("value", "7");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("career", "104");
        dic12.add("num", "4");
        dic12.add("attribute", "9");
        dic12.add("value", "8");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("career", "105");
        dic13.add("num", "2");
        dic13.add("attribute", "10");
        dic13.add("value", "30");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("career", "105");
        dic14.add("num", "3");
        dic14.add("attribute", "10");
        dic14.add("value", "40");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("career", "105");
        dic15.add("num", "4");
        dic15.add("attribute", "10");
        dic15.add("value", "50");
        this.infDic.add("15", dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add("id", "16");
        dic16.add("career", "106");
        dic16.add("num", "2");
        dic16.add("attribute", "11");
        dic16.add("value", "5");
        this.infDic.add("16", dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add("id", "17");
        dic17.add("career", "106");
        dic17.add("num", "3");
        dic17.add("attribute", "11");
        dic17.add("value", "10");
        this.infDic.add("17", dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add("id", "18");
        dic18.add("career", "106");
        dic18.add("num", "4");
        dic18.add("attribute", "11");
        dic18.add("value", "15");
        this.infDic.add("18", dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add("id", "19");
        dic19.add("career", "107");
        dic19.add("num", "2");
        dic19.add("attribute", "12");
        dic19.add("value", "5");
        this.infDic.add("19", dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add("id", "20");
        dic20.add("career", "107");
        dic20.add("num", "3");
        dic20.add("attribute", "12");
        dic20.add("value", "10");
        this.infDic.add("20", dic20);
        let dic21 = new Dictionary<string, any>();
        dic21.add("id", "21");
        dic21.add("career", "107");
        dic21.add("num", "4");
        dic21.add("attribute", "12");
        dic21.add("value", "15");
        this.infDic.add("21", dic21);
    }
    
}
