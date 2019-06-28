import Dictionary from "../Tool/Dictionary"; 

export default class WaveformInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): any {
        return this.curInf.getValue("id");
    }
    public get waveform(): any {
        return this.curInf.getValue("waveform");
    }
    public get boss(): any {
        return this.curInf.getValue("boss");
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
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic0 = new Dictionary<string, any>();
        dic0.add("id", "0");
        dic0.add("waveform", "0");
        dic0.add("boss", "0");
        this.infDic.add("0", dic0);
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("waveform", "25");
        dic1.add("boss", "0");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("waveform", "37.5");
        dic2.add("boss", "0");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("waveform", "50");
        dic3.add("boss", "0");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("waveform", "62.5");
        dic4.add("boss", "0");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("waveform", "75");
        dic5.add("boss", "0");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("waveform", "87.5");
        dic6.add("boss", "2");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("waveform", "62.5");
        dic7.add("boss", "0");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("waveform", "75");
        dic8.add("boss", "0");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("waveform", "87.5");
        dic9.add("boss", "0");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("waveform", "100");
        dic10.add("boss", "1");
        this.infDic.add("10", dic10);
    }
    
}
