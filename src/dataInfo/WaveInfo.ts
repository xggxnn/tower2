import Dictionary from "../Tool/Dictionary"; 

export default class WaveInfo {

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
    public get type(): number {
        return Number(this.curInf.getValue("type"));
    }
    public get difficulty(): number {
        return Number(this.curInf.getValue("difficulty"));
    }
    public get waveform(): number {
        return Number(this.curInf.getValue("waveform"));
    }
    public get random(): number {
        return Number(this.curInf.getValue("random"));
    }
    public get time(): number {
        return Number(this.curInf.getValue("time"));
    }
    constructor(id: string) {
        this.curInf = WaveInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): WaveInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new WaveInfo(ids);
        }
        return null;
    }
    private static infList: WaveInfo[] = null;
    public static getList(): Array<WaveInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new WaveInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("lv", "1");
        dic1.add("type", "3");
        dic1.add("difficulty", "1");
        dic1.add("waveform", "1");
        dic1.add("random", "2382");
        dic1.add("time", "90");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("lv", "4");
        dic2.add("type", "4");
        dic2.add("difficulty", "2");
        dic2.add("waveform", "1");
        dic2.add("random", "7553");
        dic2.add("time", "90");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("lv", "7");
        dic3.add("type", "3");
        dic3.add("difficulty", "3");
        dic3.add("waveform", "1");
        dic3.add("random", "1235");
        dic3.add("time", "90");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("lv", "10");
        dic4.add("type", "4");
        dic4.add("difficulty", "4");
        dic4.add("waveform", "1");
        dic4.add("random", "3135");
        dic4.add("time", "90");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("lv", "11");
        dic5.add("type", "3");
        dic5.add("difficulty", "5");
        dic5.add("waveform", "1");
        dic5.add("random", "4632");
        dic5.add("time", "90");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("lv", "14");
        dic6.add("type", "4");
        dic6.add("difficulty", "6");
        dic6.add("waveform", "1");
        dic6.add("random", "3252");
        dic6.add("time", "90");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("lv", "17");
        dic7.add("type", "3");
        dic7.add("difficulty", "7");
        dic7.add("waveform", "1");
        dic7.add("random", "2454");
        dic7.add("time", "90");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("lv", "20");
        dic8.add("type", "4");
        dic8.add("difficulty", "8");
        dic8.add("waveform", "1");
        dic8.add("random", "5331");
        dic8.add("time", "90");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("lv", "21");
        dic9.add("type", "3");
        dic9.add("difficulty", "9");
        dic9.add("waveform", "1");
        dic9.add("random", "2316");
        dic9.add("time", "90");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("lv", "24");
        dic10.add("type", "4");
        dic10.add("difficulty", "10");
        dic10.add("waveform", "1");
        dic10.add("random", "6275");
        dic10.add("time", "90");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("lv", "27");
        dic11.add("type", "5");
        dic11.add("difficulty", "1");
        dic11.add("waveform", "1");
        dic11.add("random", "7538");
        dic11.add("time", "90");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("lv", "30");
        dic12.add("type", "6");
        dic12.add("difficulty", "2");
        dic12.add("waveform", "1");
        dic12.add("random", "5246");
        dic12.add("time", "90");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("lv", "31");
        dic13.add("type", "1");
        dic13.add("difficulty", "3");
        dic13.add("waveform", "1");
        dic13.add("random", "7525");
        dic13.add("time", "90");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("lv", "34");
        dic14.add("type", "2");
        dic14.add("difficulty", "4");
        dic14.add("waveform", "1");
        dic14.add("random", "2377");
        dic14.add("time", "90");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("lv", "37");
        dic15.add("type", "3");
        dic15.add("difficulty", "5");
        dic15.add("waveform", "1");
        dic15.add("random", "8462");
        dic15.add("time", "90");
        this.infDic.add("15", dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add("id", "16");
        dic16.add("lv", "40");
        dic16.add("type", "4");
        dic16.add("difficulty", "6");
        dic16.add("waveform", "1");
        dic16.add("random", "7462");
        dic16.add("time", "90");
        this.infDic.add("16", dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add("id", "17");
        dic17.add("lv", "41");
        dic17.add("type", "5");
        dic17.add("difficulty", "7");
        dic17.add("waveform", "1");
        dic17.add("random", "7684");
        dic17.add("time", "90");
        this.infDic.add("17", dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add("id", "18");
        dic18.add("lv", "44");
        dic18.add("type", "6");
        dic18.add("difficulty", "8");
        dic18.add("waveform", "1");
        dic18.add("random", "7356");
        dic18.add("time", "90");
        this.infDic.add("18", dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add("id", "19");
        dic19.add("lv", "47");
        dic19.add("type", "1");
        dic19.add("difficulty", "9");
        dic19.add("waveform", "1");
        dic19.add("random", "7643");
        dic19.add("time", "90");
        this.infDic.add("19", dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add("id", "20");
        dic20.add("lv", "50");
        dic20.add("type", "2");
        dic20.add("difficulty", "10");
        dic20.add("waveform", "1");
        dic20.add("random", "2324");
        dic20.add("time", "90");
        this.infDic.add("20", dic20);
        let dic21 = new Dictionary<string, any>();
        dic21.add("id", "21");
        dic21.add("lv", "51");
        dic21.add("type", "3");
        dic21.add("difficulty", "1");
        dic21.add("waveform", "1");
        dic21.add("random", "7633");
        dic21.add("time", "90");
        this.infDic.add("21", dic21);
        let dic22 = new Dictionary<string, any>();
        dic22.add("id", "22");
        dic22.add("lv", "54");
        dic22.add("type", "4");
        dic22.add("difficulty", "2");
        dic22.add("waveform", "1");
        dic22.add("random", "8643");
        dic22.add("time", "90");
        this.infDic.add("22", dic22);
        let dic23 = new Dictionary<string, any>();
        dic23.add("id", "23");
        dic23.add("lv", "57");
        dic23.add("type", "5");
        dic23.add("difficulty", "3");
        dic23.add("waveform", "1");
        dic23.add("random", "5482");
        dic23.add("time", "90");
        this.infDic.add("23", dic23);
        let dic24 = new Dictionary<string, any>();
        dic24.add("id", "24");
        dic24.add("lv", "60");
        dic24.add("type", "6");
        dic24.add("difficulty", "4");
        dic24.add("waveform", "1");
        dic24.add("random", "2857");
        dic24.add("time", "90");
        this.infDic.add("24", dic24);
        let dic25 = new Dictionary<string, any>();
        dic25.add("id", "25");
        dic25.add("lv", "61");
        dic25.add("type", "1");
        dic25.add("difficulty", "5");
        dic25.add("waveform", "1");
        dic25.add("random", "3927");
        dic25.add("time", "90");
        this.infDic.add("25", dic25);
        let dic26 = new Dictionary<string, any>();
        dic26.add("id", "26");
        dic26.add("lv", "64");
        dic26.add("type", "2");
        dic26.add("difficulty", "6");
        dic26.add("waveform", "1");
        dic26.add("random", "6738");
        dic26.add("time", "90");
        this.infDic.add("26", dic26);
        let dic27 = new Dictionary<string, any>();
        dic27.add("id", "27");
        dic27.add("lv", "67");
        dic27.add("type", "3");
        dic27.add("difficulty", "7");
        dic27.add("waveform", "1");
        dic27.add("random", "9307");
        dic27.add("time", "90");
        this.infDic.add("27", dic27);
        let dic28 = new Dictionary<string, any>();
        dic28.add("id", "28");
        dic28.add("lv", "70");
        dic28.add("type", "4");
        dic28.add("difficulty", "8");
        dic28.add("waveform", "1");
        dic28.add("random", "4914");
        dic28.add("time", "90");
        this.infDic.add("28", dic28);
        let dic29 = new Dictionary<string, any>();
        dic29.add("id", "29");
        dic29.add("lv", "71");
        dic29.add("type", "5");
        dic29.add("difficulty", "9");
        dic29.add("waveform", "1");
        dic29.add("random", "3729");
        dic29.add("time", "90");
        this.infDic.add("29", dic29);
        let dic30 = new Dictionary<string, any>();
        dic30.add("id", "30");
        dic30.add("lv", "74");
        dic30.add("type", "6");
        dic30.add("difficulty", "10");
        dic30.add("waveform", "1");
        dic30.add("random", "4548");
        dic30.add("time", "90");
        this.infDic.add("30", dic30);
        let dic31 = new Dictionary<string, any>();
        dic31.add("id", "31");
        dic31.add("lv", "77");
        dic31.add("type", "1");
        dic31.add("difficulty", "1");
        dic31.add("waveform", "1");
        dic31.add("random", "6395");
        dic31.add("time", "90");
        this.infDic.add("31", dic31);
        let dic32 = new Dictionary<string, any>();
        dic32.add("id", "32");
        dic32.add("lv", "80");
        dic32.add("type", "2");
        dic32.add("difficulty", "2");
        dic32.add("waveform", "1");
        dic32.add("random", "3826");
        dic32.add("time", "90");
        this.infDic.add("32", dic32);
        let dic33 = new Dictionary<string, any>();
        dic33.add("id", "33");
        dic33.add("lv", "81");
        dic33.add("type", "3");
        dic33.add("difficulty", "3");
        dic33.add("waveform", "1");
        dic33.add("random", "6437");
        dic33.add("time", "90");
        this.infDic.add("33", dic33);
        let dic34 = new Dictionary<string, any>();
        dic34.add("id", "34");
        dic34.add("lv", "84");
        dic34.add("type", "4");
        dic34.add("difficulty", "4");
        dic34.add("waveform", "1");
        dic34.add("random", "6862");
        dic34.add("time", "90");
        this.infDic.add("34", dic34);
        let dic35 = new Dictionary<string, any>();
        dic35.add("id", "35");
        dic35.add("lv", "87");
        dic35.add("type", "5");
        dic35.add("difficulty", "5");
        dic35.add("waveform", "1");
        dic35.add("random", "5629");
        dic35.add("time", "90");
        this.infDic.add("35", dic35);
        let dic36 = new Dictionary<string, any>();
        dic36.add("id", "36");
        dic36.add("lv", "90");
        dic36.add("type", "6");
        dic36.add("difficulty", "6");
        dic36.add("waveform", "1");
        dic36.add("random", "1247");
        dic36.add("time", "90");
        this.infDic.add("36", dic36);
        let dic37 = new Dictionary<string, any>();
        dic37.add("id", "37");
        dic37.add("lv", "91");
        dic37.add("type", "3");
        dic37.add("difficulty", "7");
        dic37.add("waveform", "1");
        dic37.add("random", "3651");
        dic37.add("time", "90");
        this.infDic.add("37", dic37);
        let dic38 = new Dictionary<string, any>();
        dic38.add("id", "38");
        dic38.add("lv", "94");
        dic38.add("type", "3");
        dic38.add("difficulty", "8");
        dic38.add("waveform", "1");
        dic38.add("random", "6213");
        dic38.add("time", "90");
        this.infDic.add("38", dic38);
        let dic39 = new Dictionary<string, any>();
        dic39.add("id", "39");
        dic39.add("lv", "97");
        dic39.add("type", "4");
        dic39.add("difficulty", "9");
        dic39.add("waveform", "1");
        dic39.add("random", "4622");
        dic39.add("time", "90");
        this.infDic.add("39", dic39);
        let dic40 = new Dictionary<string, any>();
        dic40.add("id", "40");
        dic40.add("lv", "100");
        dic40.add("type", "5");
        dic40.add("difficulty", "10");
        dic40.add("waveform", "1");
        dic40.add("random", "5768");
        dic40.add("time", "90");
        this.infDic.add("40", dic40);
    }
    
}
