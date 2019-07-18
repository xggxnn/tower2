import Dictionary from "../Tool/Dictionary"; 

export default class ResourceInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get key(): string {
        return String(this.curInf.getValue("key"));
    }
    public get desc(): string {
        return String(this.curInf.getValue("desc"));
    }
    public get type(): number {
        return Number(this.curInf.getValue("type"));
    }
    public get aid(): number {
        return Number(this.curInf.getValue("aid"));
    }
    constructor(id: string) {
        this.curInf = ResourceInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): ResourceInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new ResourceInfo(ids);
        }
        return null;
    }
    private static infList: ResourceInfo[] = null;
    public static getList(): Array<ResourceInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new ResourceInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("key", "gold");
        dic1.add("desc", "金币");
        dic1.add("type", "1");
        dic1.add("aid", "1");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("key", "jadeite");
        dic2.add("desc", "翡翠");
        dic2.add("type", "2");
        dic2.add("aid", "2");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("key", "magic");
        dic3.add("desc", "魔尘");
        dic3.add("type", "3");
        dic3.add("aid", "3");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("key", "diamond");
        dic4.add("desc", "钻石");
        dic4.add("type", "4");
        dic4.add("aid", "4");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("key", "pearl");
        dic5.add("desc", "宝珠");
        dic5.add("type", "5");
        dic5.add("aid", "5");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("key", "small");
        dic6.add("desc", "小包");
        dic6.add("type", "6");
        dic6.add("aid", "1");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("key", "middle");
        dic7.add("desc", "中包");
        dic7.add("type", "6");
        dic7.add("aid", "2");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("key", "big");
        dic8.add("desc", "大包");
        dic8.add("type", "6");
        dic8.add("aid", "3");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("key", "large");
        dic9.add("desc", "超大包");
        dic9.add("type", "6");
        dic9.add("aid", "4");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("key", "haohua");
        dic10.add("desc", "豪华包");
        dic10.add("type", "6");
        dic10.add("aid", "5");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("key", "tuhao");
        dic11.add("desc", "土豪包");
        dic11.add("type", "6");
        dic11.add("aid", "6");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("key", "hero_1");
        dic12.add("desc", "虾兵碎片");
        dic12.add("type", "7");
        dic12.add("aid", "1");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("key", "hero_2");
        dic13.add("desc", "天牛精");
        dic13.add("type", "7");
        dic13.add("aid", "2");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("key", "hero_3");
        dic14.add("desc", "蝴蝶精");
        dic14.add("type", "7");
        dic14.add("aid", "3");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("key", "hero_4");
        dic15.add("desc", "蜈蚣精");
        dic15.add("type", "7");
        dic15.add("aid", "4");
        this.infDic.add("15", dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add("id", "16");
        dic16.add("key", "hero_5");
        dic16.add("desc", "蟹将");
        dic16.add("type", "7");
        dic16.add("aid", "5");
        this.infDic.add("16", dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add("id", "17");
        dic17.add("key", "hero_6");
        dic17.add("desc", "羊力大仙");
        dic17.add("type", "7");
        dic17.add("aid", "6");
        this.infDic.add("17", dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add("id", "18");
        dic18.add("key", "hero_7");
        dic18.add("desc", "青鱼精");
        dic18.add("type", "7");
        dic18.add("aid", "7");
        this.infDic.add("18", dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add("id", "19");
        dic19.add("key", "hero_8");
        dic19.add("desc", "鹿力大仙");
        dic19.add("type", "7");
        dic19.add("aid", "8");
        this.infDic.add("19", dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add("id", "20");
        dic20.add("key", "hero_9");
        dic20.add("desc", "小钻风");
        dic20.add("type", "7");
        dic20.add("aid", "9");
        this.infDic.add("20", dic20);
        let dic21 = new Dictionary<string, any>();
        dic21.add("id", "21");
        dic21.add("key", "hero_10");
        dic21.add("desc", "虎力大仙");
        dic21.add("type", "7");
        dic21.add("aid", "10");
        this.infDic.add("21", dic21);
        let dic22 = new Dictionary<string, any>();
        dic22.add("id", "22");
        dic22.add("key", "hero_11");
        dic22.add("desc", "蜘蛛精");
        dic22.add("type", "7");
        dic22.add("aid", "11");
        this.infDic.add("22", dic22);
        let dic23 = new Dictionary<string, any>();
        dic23.add("id", "23");
        dic23.add("key", "hero_12");
        dic23.add("desc", "孔雀公主");
        dic23.add("type", "7");
        dic23.add("aid", "12");
        this.infDic.add("23", dic23);
        let dic24 = new Dictionary<string, any>();
        dic24.add("id", "24");
        dic24.add("key", "hero_13");
        dic24.add("desc", "黑熊精");
        dic24.add("type", "7");
        dic24.add("aid", "13");
        this.infDic.add("24", dic24);
        let dic25 = new Dictionary<string, any>();
        dic25.add("id", "25");
        dic25.add("key", "hero_14");
        dic25.add("desc", "玉兔精");
        dic25.add("type", "7");
        dic25.add("aid", "14");
        this.infDic.add("25", dic25);
        let dic26 = new Dictionary<string, any>();
        dic26.add("id", "26");
        dic26.add("key", "hero_15");
        dic26.add("desc", "白骨精");
        dic26.add("type", "7");
        dic26.add("aid", "15");
        this.infDic.add("26", dic26);
        let dic27 = new Dictionary<string, any>();
        dic27.add("id", "27");
        dic27.add("key", "hero_16");
        dic27.add("desc", "万圣公主");
        dic27.add("type", "7");
        dic27.add("aid", "16");
        this.infDic.add("27", dic27);
        let dic28 = new Dictionary<string, any>();
        dic28.add("id", "28");
        dic28.add("key", "hero_17");
        dic28.add("desc", "白蛇精");
        dic28.add("type", "7");
        dic28.add("aid", "17");
        this.infDic.add("28", dic28);
        let dic29 = new Dictionary<string, any>();
        dic29.add("id", "29");
        dic29.add("key", "hero_18");
        dic29.add("desc", "白象王");
        dic29.add("type", "7");
        dic29.add("aid", "18");
        this.infDic.add("29", dic29);
        let dic30 = new Dictionary<string, any>();
        dic30.add("id", "30");
        dic30.add("key", "hero_19");
        dic30.add("desc", "九尾狐");
        dic30.add("type", "7");
        dic30.add("aid", "19");
        this.infDic.add("30", dic30);
        let dic31 = new Dictionary<string, any>();
        dic31.add("id", "31");
        dic31.add("key", "hero_20");
        dic31.add("desc", "鹤大仙");
        dic31.add("type", "7");
        dic31.add("aid", "20");
        this.infDic.add("31", dic31);
        let dic32 = new Dictionary<string, any>();
        dic32.add("id", "32");
        dic32.add("key", "hero_21");
        dic32.add("desc", "银角");
        dic32.add("type", "7");
        dic32.add("aid", "21");
        this.infDic.add("32", dic32);
        let dic33 = new Dictionary<string, any>();
        dic33.add("id", "33");
        dic33.add("key", "hero_22");
        dic33.add("desc", "蝎子精");
        dic33.add("type", "7");
        dic33.add("aid", "22");
        this.infDic.add("33", dic33);
        let dic34 = new Dictionary<string, any>();
        dic34.add("id", "34");
        dic34.add("key", "hero_23");
        dic34.add("desc", "老鼠精");
        dic34.add("type", "7");
        dic34.add("aid", "23");
        this.infDic.add("34", dic34);
        let dic35 = new Dictionary<string, any>();
        dic35.add("id", "35");
        dic35.add("key", "hero_24");
        dic35.add("desc", "啸天犬");
        dic35.add("type", "7");
        dic35.add("aid", "24");
        this.infDic.add("35", dic35);
        let dic36 = new Dictionary<string, any>();
        dic36.add("id", "36");
        dic36.add("key", "hero_25");
        dic36.add("desc", "狮驼王");
        dic36.add("type", "7");
        dic36.add("aid", "25");
        this.infDic.add("36", dic36);
        let dic37 = new Dictionary<string, any>();
        dic37.add("id", "37");
        dic37.add("key", "hero_26");
        dic37.add("desc", "红孩儿");
        dic37.add("type", "7");
        dic37.add("aid", "26");
        this.infDic.add("37", dic37);
        let dic38 = new Dictionary<string, any>();
        dic38.add("id", "38");
        dic38.add("key", "hero_27");
        dic38.add("desc", "九头虫");
        dic38.add("type", "7");
        dic38.add("aid", "27");
        this.infDic.add("38", dic38);
        let dic39 = new Dictionary<string, any>();
        dic39.add("id", "39");
        dic39.add("key", "hero_28");
        dic39.add("desc", "黄袍怪");
        dic39.add("type", "7");
        dic39.add("aid", "28");
        this.infDic.add("39", dic39);
        let dic40 = new Dictionary<string, any>();
        dic40.add("id", "40");
        dic40.add("key", "hero_29");
        dic40.add("desc", "金角");
        dic40.add("type", "7");
        dic40.add("aid", "29");
        this.infDic.add("40", dic40);
        let dic41 = new Dictionary<string, any>();
        dic41.add("id", "41");
        dic41.add("key", "hero_30");
        dic41.add("desc", "六耳猕猴");
        dic41.add("type", "7");
        dic41.add("aid", "30");
        this.infDic.add("41", dic41);
        let dic42 = new Dictionary<string, any>();
        dic42.add("id", "42");
        dic42.add("key", "hero_31");
        dic42.add("desc", "青牛精");
        dic42.add("type", "7");
        dic42.add("aid", "31");
        this.infDic.add("42", dic42);
        let dic43 = new Dictionary<string, any>();
        dic43.add("id", "43");
        dic43.add("key", "hero_32");
        dic43.add("desc", "牛魔王");
        dic43.add("type", "7");
        dic43.add("aid", "32");
        this.infDic.add("43", dic43);
        let dic44 = new Dictionary<string, any>();
        dic44.add("id", "44");
        dic44.add("key", "hero_33");
        dic44.add("desc", "大鹏");
        dic44.add("type", "7");
        dic44.add("aid", "33");
        this.infDic.add("44", dic44);
        let dic45 = new Dictionary<string, any>();
        dic45.add("id", "45");
        dic45.add("key", "hero_34");
        dic45.add("desc", "金毛吼");
        dic45.add("type", "7");
        dic45.add("aid", "34");
        this.infDic.add("45", dic45);
        let dic46 = new Dictionary<string, any>();
        dic46.add("id", "46");
        dic46.add("key", "hero_35");
        dic46.add("desc", "万圣龙王");
        dic46.add("type", "7");
        dic46.add("aid", "35");
        this.infDic.add("46", dic46);
    }
    
}
