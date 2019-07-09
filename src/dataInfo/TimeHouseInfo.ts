import Dictionary from "../Tool/Dictionary";

export default class TimeHouseInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get lv(): number {
        return Number(this.curInf.getValue("lv"));
    }
    public get star(): number {
        return Number(this.curInf.getValue("star"));
    }
    public get basic_injury(): number {
        return Number(this.curInf.getValue("basic_injury"));
    }
    public get injury_index(): number {
        return Number(this.curInf.getValue("injury_index"));
    }
    public get cost_gold(): number {
        return Number(this.curInf.getValue("cost_gold"));
    }
    public get cost_jadeite(): number {
        return Number(this.curInf.getValue("cost_jadeite"));
    }
    public get val0(): number {
        return Number(this.curInf.getValue("val0"));
    }
    public get val1(): number {
        return Number(this.curInf.getValue("val1"));
    }
    public get val2(): number {
        return Number(this.curInf.getValue("val2"));
    }
    public get val3(): number {
        return Number(this.curInf.getValue("val3"));
    }
    public get val4(): number {
        return Number(this.curInf.getValue("val4"));
    }
    public get val5(): number {
        return Number(this.curInf.getValue("val5"));
    }
    public get val6(): number {
        return Number(this.curInf.getValue("val6"));
    }
    public get val7(): number {
        return Number(this.curInf.getValue("val7"));
    }
    public get val8(): number {
        return Number(this.curInf.getValue("val8"));
    }
    public get val9(): number {
        return Number(this.curInf.getValue("val9"));
    }
    public get val10(): number {
        return Number(this.curInf.getValue("val10"));
    }
    public get vals(): Array<number> {
        let val: Array<number> = [];
        val.push(this.val0);
        val.push(this.val1);
        val.push(this.val2);
        val.push(this.val3);
        val.push(this.val4);
        val.push(this.val5);
        val.push(this.val6);
        val.push(this.val7);
        val.push(this.val8);
        val.push(this.val9);
        val.push(this.val10);
        return val;
    }
    constructor(id: string) {
        this.curInf = TimeHouseInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): TimeHouseInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new TimeHouseInfo(ids);
        }
        return null;
    }
    /**
     * 依据lv获取配置信息
     * @param lv 
     */
    public static getInfoLv(lv: number): TimeHouseInfo {
        let list = TimeHouseInfo.getList();
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].lv == lv) {
                return list[i];
            }
        }
        return null;
    }
    private static infList: TimeHouseInfo[] = null;
    public static getList(): Array<TimeHouseInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) {
                this.infList.push(new TimeHouseInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("lv", "1");
        dic1.add("star", "0");
        dic1.add("basic_injury", "7");
        dic1.add("injury_index", "21");
        dic1.add("cost_gold", "100");
        dic1.add("cost_jadeite", "0");
        dic1.add("val0", "1");
        dic1.add("val1", "2");
        dic1.add("val2", "3");
        dic1.add("val3", "4");
        dic1.add("val4", "5");
        dic1.add("val5", "6");
        dic1.add("val6", "7");
        dic1.add("val7", "8");
        dic1.add("val8", "9");
        dic1.add("val9", "10");
        dic1.add("val10", "11");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("lv", "2");
        dic2.add("star", "0");
        dic2.add("basic_injury", "9");
        dic2.add("injury_index", "33");
        dic2.add("cost_gold", "150");
        dic2.add("cost_jadeite", "0");
        dic2.add("val0", "2");
        dic2.add("val1", "3");
        dic2.add("val2", "4");
        dic2.add("val3", "5");
        dic2.add("val4", "6");
        dic2.add("val5", "7");
        dic2.add("val6", "8");
        dic2.add("val7", "9");
        dic2.add("val8", "10");
        dic2.add("val9", "11");
        dic2.add("val10", "12");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("lv", "3");
        dic3.add("star", "0");
        dic3.add("basic_injury", "12");
        dic3.add("injury_index", "46");
        dic3.add("cost_gold", "200");
        dic3.add("cost_jadeite", "0");
        dic3.add("val0", "3");
        dic3.add("val1", "4");
        dic3.add("val2", "5");
        dic3.add("val3", "6");
        dic3.add("val4", "7");
        dic3.add("val5", "8");
        dic3.add("val6", "9");
        dic3.add("val7", "10");
        dic3.add("val8", "11");
        dic3.add("val9", "12");
        dic3.add("val10", "13");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("lv", "4");
        dic4.add("star", "0");
        dic4.add("basic_injury", "14");
        dic4.add("injury_index", "59");
        dic4.add("cost_gold", "250");
        dic4.add("cost_jadeite", "0");
        dic4.add("val0", "4");
        dic4.add("val1", "5");
        dic4.add("val2", "6");
        dic4.add("val3", "7");
        dic4.add("val4", "8");
        dic4.add("val5", "9");
        dic4.add("val6", "10");
        dic4.add("val7", "11");
        dic4.add("val8", "12");
        dic4.add("val9", "13");
        dic4.add("val10", "14");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("lv", "5");
        dic5.add("star", "0");
        dic5.add("basic_injury", "16");
        dic5.add("injury_index", "72");
        dic5.add("cost_gold", "300");
        dic5.add("cost_jadeite", "0");
        dic5.add("val0", "5");
        dic5.add("val1", "6");
        dic5.add("val2", "7");
        dic5.add("val3", "8");
        dic5.add("val4", "9");
        dic5.add("val5", "10");
        dic5.add("val6", "11");
        dic5.add("val7", "12");
        dic5.add("val8", "13");
        dic5.add("val9", "14");
        dic5.add("val10", "15");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("lv", "6");
        dic6.add("star", "0");
        dic6.add("basic_injury", "19");
        dic6.add("injury_index", "86");
        dic6.add("cost_gold", "350");
        dic6.add("cost_jadeite", "0");
        dic6.add("val0", "6");
        dic6.add("val1", "7");
        dic6.add("val2", "8");
        dic6.add("val3", "9");
        dic6.add("val4", "10");
        dic6.add("val5", "11");
        dic6.add("val6", "12");
        dic6.add("val7", "13");
        dic6.add("val8", "14");
        dic6.add("val9", "15");
        dic6.add("val10", "16");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("lv", "7");
        dic7.add("star", "0");
        dic7.add("basic_injury", "21");
        dic7.add("injury_index", "100");
        dic7.add("cost_gold", "400");
        dic7.add("cost_jadeite", "0");
        dic7.add("val0", "7");
        dic7.add("val1", "8");
        dic7.add("val2", "9");
        dic7.add("val3", "10");
        dic7.add("val4", "11");
        dic7.add("val5", "12");
        dic7.add("val6", "13");
        dic7.add("val7", "14");
        dic7.add("val8", "15");
        dic7.add("val9", "16");
        dic7.add("val10", "17");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("lv", "8");
        dic8.add("star", "0");
        dic8.add("basic_injury", "24");
        dic8.add("injury_index", "114");
        dic8.add("cost_gold", "450");
        dic8.add("cost_jadeite", "0");
        dic8.add("val0", "8");
        dic8.add("val1", "9");
        dic8.add("val2", "10");
        dic8.add("val3", "11");
        dic8.add("val4", "12");
        dic8.add("val5", "13");
        dic8.add("val6", "14");
        dic8.add("val7", "15");
        dic8.add("val8", "16");
        dic8.add("val9", "17");
        dic8.add("val10", "18");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("lv", "9");
        dic9.add("star", "0");
        dic9.add("basic_injury", "27");
        dic9.add("injury_index", "129");
        dic9.add("cost_gold", "500");
        dic9.add("cost_jadeite", "0");
        dic9.add("val0", "9");
        dic9.add("val1", "10");
        dic9.add("val2", "11");
        dic9.add("val3", "12");
        dic9.add("val4", "13");
        dic9.add("val5", "14");
        dic9.add("val6", "15");
        dic9.add("val7", "16");
        dic9.add("val8", "17");
        dic9.add("val9", "18");
        dic9.add("val10", "19");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("lv", "10");
        dic10.add("star", "0");
        dic10.add("basic_injury", "30");
        dic10.add("injury_index", "145");
        dic10.add("cost_gold", "550");
        dic10.add("cost_jadeite", "12");
        dic10.add("val0", "10");
        dic10.add("val1", "11");
        dic10.add("val2", "12");
        dic10.add("val3", "13");
        dic10.add("val4", "14");
        dic10.add("val5", "15");
        dic10.add("val6", "16");
        dic10.add("val7", "17");
        dic10.add("val8", "18");
        dic10.add("val9", "19");
        dic10.add("val10", "20");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("lv", "11");
        dic11.add("star", "1");
        dic11.add("basic_injury", "36");
        dic11.add("injury_index", "247");
        dic11.add("cost_gold", "1100");
        dic11.add("cost_jadeite", "0");
        dic11.add("val0", "11");
        dic11.add("val1", "12");
        dic11.add("val2", "13");
        dic11.add("val3", "14");
        dic11.add("val4", "15");
        dic11.add("val5", "16");
        dic11.add("val6", "17");
        dic11.add("val7", "18");
        dic11.add("val8", "19");
        dic11.add("val9", "20");
        dic11.add("val10", "21");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("lv", "12");
        dic12.add("star", "1");
        dic12.add("basic_injury", "39");
        dic12.add("injury_index", "266");
        dic12.add("cost_gold", "1150");
        dic12.add("cost_jadeite", "0");
        dic12.add("val0", "12");
        dic12.add("val1", "13");
        dic12.add("val2", "14");
        dic12.add("val3", "15");
        dic12.add("val4", "16");
        dic12.add("val5", "17");
        dic12.add("val6", "18");
        dic12.add("val7", "19");
        dic12.add("val8", "20");
        dic12.add("val9", "21");
        dic12.add("val10", "22");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("lv", "13");
        dic13.add("star", "1");
        dic13.add("basic_injury", "42");
        dic13.add("injury_index", "286");
        dic13.add("cost_gold", "1200");
        dic13.add("cost_jadeite", "0");
        dic13.add("val0", "13");
        dic13.add("val1", "14");
        dic13.add("val2", "15");
        dic13.add("val3", "16");
        dic13.add("val4", "17");
        dic13.add("val5", "18");
        dic13.add("val6", "19");
        dic13.add("val7", "20");
        dic13.add("val8", "21");
        dic13.add("val9", "22");
        dic13.add("val10", "23");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("lv", "14");
        dic14.add("star", "1");
        dic14.add("basic_injury", "46");
        dic14.add("injury_index", "306");
        dic14.add("cost_gold", "1250");
        dic14.add("cost_jadeite", "0");
        dic14.add("val0", "14");
        dic14.add("val1", "15");
        dic14.add("val2", "16");
        dic14.add("val3", "17");
        dic14.add("val4", "18");
        dic14.add("val5", "19");
        dic14.add("val6", "20");
        dic14.add("val7", "21");
        dic14.add("val8", "22");
        dic14.add("val9", "23");
        dic14.add("val10", "24");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("lv", "15");
        dic15.add("star", "1");
        dic15.add("basic_injury", "50");
        dic15.add("injury_index", "327");
        dic15.add("cost_gold", "1300");
        dic15.add("cost_jadeite", "0");
        dic15.add("val0", "15");
        dic15.add("val1", "16");
        dic15.add("val2", "17");
        dic15.add("val3", "18");
        dic15.add("val4", "19");
        dic15.add("val5", "20");
        dic15.add("val6", "21");
        dic15.add("val7", "22");
        dic15.add("val8", "23");
        dic15.add("val9", "24");
        dic15.add("val10", "25");
        this.infDic.add("15", dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add("id", "16");
        dic16.add("lv", "16");
        dic16.add("star", "1");
        dic16.add("basic_injury", "54");
        dic16.add("injury_index", "348");
        dic16.add("cost_gold", "1350");
        dic16.add("cost_jadeite", "0");
        dic16.add("val0", "16");
        dic16.add("val1", "17");
        dic16.add("val2", "18");
        dic16.add("val3", "19");
        dic16.add("val4", "20");
        dic16.add("val5", "21");
        dic16.add("val6", "22");
        dic16.add("val7", "23");
        dic16.add("val8", "24");
        dic16.add("val9", "25");
        dic16.add("val10", "26");
        this.infDic.add("16", dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add("id", "17");
        dic17.add("lv", "17");
        dic17.add("star", "1");
        dic17.add("basic_injury", "58");
        dic17.add("injury_index", "371");
        dic17.add("cost_gold", "1400");
        dic17.add("cost_jadeite", "0");
        dic17.add("val0", "17");
        dic17.add("val1", "18");
        dic17.add("val2", "19");
        dic17.add("val3", "20");
        dic17.add("val4", "21");
        dic17.add("val5", "22");
        dic17.add("val6", "23");
        dic17.add("val7", "24");
        dic17.add("val8", "25");
        dic17.add("val9", "26");
        dic17.add("val10", "27");
        this.infDic.add("17", dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add("id", "18");
        dic18.add("lv", "18");
        dic18.add("star", "1");
        dic18.add("basic_injury", "62");
        dic18.add("injury_index", "394");
        dic18.add("cost_gold", "1450");
        dic18.add("cost_jadeite", "0");
        dic18.add("val0", "18");
        dic18.add("val1", "19");
        dic18.add("val2", "20");
        dic18.add("val3", "21");
        dic18.add("val4", "22");
        dic18.add("val5", "23");
        dic18.add("val6", "24");
        dic18.add("val7", "25");
        dic18.add("val8", "26");
        dic18.add("val9", "27");
        dic18.add("val10", "28");
        this.infDic.add("18", dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add("id", "19");
        dic19.add("lv", "19");
        dic19.add("star", "1");
        dic19.add("basic_injury", "67");
        dic19.add("injury_index", "418");
        dic19.add("cost_gold", "1500");
        dic19.add("cost_jadeite", "0");
        dic19.add("val0", "19");
        dic19.add("val1", "20");
        dic19.add("val2", "21");
        dic19.add("val3", "22");
        dic19.add("val4", "23");
        dic19.add("val5", "24");
        dic19.add("val6", "25");
        dic19.add("val7", "26");
        dic19.add("val8", "27");
        dic19.add("val9", "28");
        dic19.add("val10", "29");
        this.infDic.add("19", dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add("id", "20");
        dic20.add("lv", "20");
        dic20.add("star", "1");
        dic20.add("basic_injury", "72");
        dic20.add("injury_index", "443");
        dic20.add("cost_gold", "1550");
        dic20.add("cost_jadeite", "60");
        dic20.add("val0", "20");
        dic20.add("val1", "21");
        dic20.add("val2", "22");
        dic20.add("val3", "23");
        dic20.add("val4", "24");
        dic20.add("val5", "25");
        dic20.add("val6", "26");
        dic20.add("val7", "27");
        dic20.add("val8", "28");
        dic20.add("val9", "29");
        dic20.add("val10", "30");
        this.infDic.add("20", dic20);
    }

}
