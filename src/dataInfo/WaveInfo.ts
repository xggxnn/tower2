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
    public get map(): number {
        return Number(this.curInf.getValue("map"));
    }
    public get level(): number {
        return Number(this.curInf.getValue("level"));
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
    public get total_fight(): number {
        return Number(this.curInf.getValue("total_fight"));
    }
    public get total_speed(): number {
        return Number(this.curInf.getValue("total_speed"));
    }
    public get gold(): number {
        return Number(this.curInf.getValue("gold"));
    }
    public get diamonds(): number {
        return Number(this.curInf.getValue("diamonds"));
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
        dic1.add("map", "1");
        dic1.add("level", "1");
        dic1.add("lv", "1");
        dic1.add("type", "1");
        dic1.add("difficulty", "1");
        dic1.add("waveform", "1");
        dic1.add("random", "2382");
        dic1.add("time", "90");
        dic1.add("total_fight", "1");
        dic1.add("total_speed", "2");
        dic1.add("gold", "3");
        dic1.add("diamonds", "4");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("map", "1");
        dic2.add("level", "2");
        dic2.add("lv", "4");
        dic2.add("type", "2");
        dic2.add("difficulty", "2");
        dic2.add("waveform", "2");
        dic2.add("random", "7553");
        dic2.add("time", "90");
        dic2.add("total_fight", "1");
        dic2.add("total_speed", "2");
        dic2.add("gold", "3");
        dic2.add("diamonds", "4");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("map", "1");
        dic3.add("level", "3");
        dic3.add("lv", "7");
        dic3.add("type", "3");
        dic3.add("difficulty", "3");
        dic3.add("waveform", "2");
        dic3.add("random", "1235");
        dic3.add("time", "90");
        dic3.add("total_fight", "1");
        dic3.add("total_speed", "2");
        dic3.add("gold", "3");
        dic3.add("diamonds", "4");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("map", "1");
        dic4.add("level", "4");
        dic4.add("lv", "10");
        dic4.add("type", "4");
        dic4.add("difficulty", "4");
        dic4.add("waveform", "1");
        dic4.add("random", "3135");
        dic4.add("time", "90");
        dic4.add("total_fight", "1");
        dic4.add("total_speed", "2");
        dic4.add("gold", "3");
        dic4.add("diamonds", "4");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("map", "2");
        dic5.add("level", "1");
        dic5.add("lv", "11");
        dic5.add("type", "5");
        dic5.add("difficulty", "5");
        dic5.add("waveform", "2");
        dic5.add("random", "4632");
        dic5.add("time", "90");
        dic5.add("total_fight", "1");
        dic5.add("total_speed", "2");
        dic5.add("gold", "3");
        dic5.add("diamonds", "4");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("map", "2");
        dic6.add("level", "2");
        dic6.add("lv", "14");
        dic6.add("type", "6");
        dic6.add("difficulty", "6");
        dic6.add("waveform", "3");
        dic6.add("random", "3252");
        dic6.add("time", "90");
        dic6.add("total_fight", "1");
        dic6.add("total_speed", "2");
        dic6.add("gold", "3");
        dic6.add("diamonds", "4");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("map", "2");
        dic7.add("level", "3");
        dic7.add("lv", "17");
        dic7.add("type", "1");
        dic7.add("difficulty", "7");
        dic7.add("waveform", "1");
        dic7.add("random", "2454");
        dic7.add("time", "90");
        dic7.add("total_fight", "1");
        dic7.add("total_speed", "2");
        dic7.add("gold", "3");
        dic7.add("diamonds", "4");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("map", "2");
        dic8.add("level", "4");
        dic8.add("lv", "20");
        dic8.add("type", "2");
        dic8.add("difficulty", "8");
        dic8.add("waveform", "2");
        dic8.add("random", "5331");
        dic8.add("time", "90");
        dic8.add("total_fight", "1");
        dic8.add("total_speed", "2");
        dic8.add("gold", "3");
        dic8.add("diamonds", "4");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("map", "3");
        dic9.add("level", "1");
        dic9.add("lv", "21");
        dic9.add("type", "3");
        dic9.add("difficulty", "9");
        dic9.add("waveform", "3");
        dic9.add("random", "2316");
        dic9.add("time", "90");
        dic9.add("total_fight", "1");
        dic9.add("total_speed", "2");
        dic9.add("gold", "3");
        dic9.add("diamonds", "4");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("map", "3");
        dic10.add("level", "2");
        dic10.add("lv", "24");
        dic10.add("type", "4");
        dic10.add("difficulty", "10");
        dic10.add("waveform", "1");
        dic10.add("random", "6275");
        dic10.add("time", "90");
        dic10.add("total_fight", "1");
        dic10.add("total_speed", "2");
        dic10.add("gold", "3");
        dic10.add("diamonds", "4");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("map", "3");
        dic11.add("level", "3");
        dic11.add("lv", "27");
        dic11.add("type", "5");
        dic11.add("difficulty", "1");
        dic11.add("waveform", "2");
        dic11.add("random", "7538");
        dic11.add("time", "90");
        dic11.add("total_fight", "1");
        dic11.add("total_speed", "2");
        dic11.add("gold", "3");
        dic11.add("diamonds", "4");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("map", "3");
        dic12.add("level", "4");
        dic12.add("lv", "30");
        dic12.add("type", "6");
        dic12.add("difficulty", "2");
        dic12.add("waveform", "3");
        dic12.add("random", "5246");
        dic12.add("time", "90");
        dic12.add("total_fight", "1");
        dic12.add("total_speed", "2");
        dic12.add("gold", "3");
        dic12.add("diamonds", "4");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("map", "4");
        dic13.add("level", "1");
        dic13.add("lv", "31");
        dic13.add("type", "1");
        dic13.add("difficulty", "3");
        dic13.add("waveform", "1");
        dic13.add("random", "7525");
        dic13.add("time", "90");
        dic13.add("total_fight", "1");
        dic13.add("total_speed", "2");
        dic13.add("gold", "3");
        dic13.add("diamonds", "4");
        this.infDic.add("13", dic13);
    }

}
