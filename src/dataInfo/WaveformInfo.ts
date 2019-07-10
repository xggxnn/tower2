import Dictionary from "../Tool/Dictionary";

export default class WaveformInfo {

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
    public get index(): number {
        return Number(this.curInf.getValue("index"));
    }
    public get waveform(): number {
        return Number(this.curInf.getValue("waveform"));
    }
    public get boss(): number {
        return Number(this.curInf.getValue("boss"));
    }
    constructor(id: string) {
        this.curInf = WaveformInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): WaveformInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new WaveformInfo(ids);
        }
        return null;
    }
    private static infList: WaveformInfo[] = null;
    public static getList(): Array<WaveformInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) {
                this.infList.push(new WaveformInfo(list[i]));
            }
        }
        return this.infList;
    }
    public static getInfoWithType(type: number): Array<WaveformInfo> {
        let list = WaveformInfo.getList();
        let result: Array<WaveformInfo> = [];
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].type == type) {
                result.push(list[i]);
            }
        }
        return result;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("type", "1");
        dic1.add("index", "0");
        dic1.add("waveform", "0");
        dic1.add("boss", "0");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("type", "1");
        dic2.add("index", "1");
        dic2.add("waveform", "25");
        dic2.add("boss", "0");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("type", "1");
        dic3.add("index", "2");
        dic3.add("waveform", "37.5");
        dic3.add("boss", "0");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("type", "1");
        dic4.add("index", "3");
        dic4.add("waveform", "50");
        dic4.add("boss", "0");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("type", "1");
        dic5.add("index", "4");
        dic5.add("waveform", "62.5");
        dic5.add("boss", "0");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("type", "1");
        dic6.add("index", "5");
        dic6.add("waveform", "75");
        dic6.add("boss", "0");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("type", "1");
        dic7.add("index", "6");
        dic7.add("waveform", "87.5");
        dic7.add("boss", "2");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("type", "1");
        dic8.add("index", "7");
        dic8.add("waveform", "62.5");
        dic8.add("boss", "0");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("type", "1");
        dic9.add("index", "8");
        dic9.add("waveform", "75");
        dic9.add("boss", "0");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("type", "1");
        dic10.add("index", "9");
        dic10.add("waveform", "87.5");
        dic10.add("boss", "0");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("type", "1");
        dic11.add("index", "10");
        dic11.add("waveform", "100");
        dic11.add("boss", "1");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("type", "2");
        dic12.add("index", "0");
        dic12.add("waveform", "0");
        dic12.add("boss", "0");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("type", "2");
        dic13.add("index", "1");
        dic13.add("waveform", "25");
        dic13.add("boss", "0");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("type", "2");
        dic14.add("index", "2");
        dic14.add("waveform", "37.5");
        dic14.add("boss", "0");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("type", "2");
        dic15.add("index", "3");
        dic15.add("waveform", "50");
        dic15.add("boss", "0");
        this.infDic.add("15", dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add("id", "16");
        dic16.add("type", "2");
        dic16.add("index", "4");
        dic16.add("waveform", "62.5");
        dic16.add("boss", "0");
        this.infDic.add("16", dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add("id", "17");
        dic17.add("type", "2");
        dic17.add("index", "5");
        dic17.add("waveform", "75");
        dic17.add("boss", "0");
        this.infDic.add("17", dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add("id", "18");
        dic18.add("type", "2");
        dic18.add("index", "6");
        dic18.add("waveform", "87.5");
        dic18.add("boss", "2");
        this.infDic.add("18", dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add("id", "19");
        dic19.add("type", "2");
        dic19.add("index", "7");
        dic19.add("waveform", "62.5");
        dic19.add("boss", "0");
        this.infDic.add("19", dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add("id", "20");
        dic20.add("type", "2");
        dic20.add("index", "8");
        dic20.add("waveform", "75");
        dic20.add("boss", "0");
        this.infDic.add("20", dic20);
        let dic21 = new Dictionary<string, any>();
        dic21.add("id", "21");
        dic21.add("type", "2");
        dic21.add("index", "9");
        dic21.add("waveform", "87.5");
        dic21.add("boss", "0");
        this.infDic.add("21", dic21);
        let dic22 = new Dictionary<string, any>();
        dic22.add("id", "22");
        dic22.add("type", "2");
        dic22.add("index", "10");
        dic22.add("waveform", "100");
        dic22.add("boss", "1");
        this.infDic.add("22", dic22);
    }

}
