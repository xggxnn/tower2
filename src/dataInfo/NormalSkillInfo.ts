import Dictionary from "../Tool/Dictionary"; 

export default class NormalSkillInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get explain(): string {
        return String(this.curInf.getValue("explain"));
    }
    public get des(): string {
        return String(this.curInf.getValue("des"));
    }
    public get hit_type(): number {
        return Number(this.curInf.getValue("hit_type"));
    }
    public get attack_audio_id(): number {
        return Number(this.curInf.getValue("attack_audio_id"));
    }
    constructor(id: string) {
        this.curInf = NormalSkillInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): NormalSkillInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new NormalSkillInfo(ids);
        }
        return null;
    }
    private static infList: NormalSkillInfo[] = null;
    public static getList(): Array<NormalSkillInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new NormalSkillInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("explain", "普攻");
        dic1.add("des", "普伤");
        dic1.add("hit_type", "1");
        dic1.add("attack_audio_id", "100");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("explain", "普攻");
        dic2.add("des", "普伤");
        dic2.add("hit_type", "1");
        dic2.add("attack_audio_id", "100");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("explain", "普攻");
        dic3.add("des", "普伤");
        dic3.add("hit_type", "1");
        dic3.add("attack_audio_id", "100");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("explain", "普攻");
        dic4.add("des", "普伤");
        dic4.add("hit_type", "1");
        dic4.add("attack_audio_id", "100");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("explain", "普攻");
        dic5.add("des", "普伤");
        dic5.add("hit_type", "1");
        dic5.add("attack_audio_id", "100");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("explain", "普攻");
        dic6.add("des", "普伤");
        dic6.add("hit_type", "1");
        dic6.add("attack_audio_id", "100");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("explain", "普攻");
        dic7.add("des", "普伤");
        dic7.add("hit_type", "1");
        dic7.add("attack_audio_id", "100");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("explain", "普攻");
        dic8.add("des", "普伤");
        dic8.add("hit_type", "1");
        dic8.add("attack_audio_id", "100");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("explain", "普攻");
        dic9.add("des", "普伤");
        dic9.add("hit_type", "1");
        dic9.add("attack_audio_id", "100");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("explain", "普攻");
        dic10.add("des", "普伤");
        dic10.add("hit_type", "1");
        dic10.add("attack_audio_id", "100");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("explain", "普攻");
        dic11.add("des", "普伤");
        dic11.add("hit_type", "1");
        dic11.add("attack_audio_id", "100");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("explain", "普攻");
        dic12.add("des", "普伤");
        dic12.add("hit_type", "1");
        dic12.add("attack_audio_id", "100");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("explain", "普攻");
        dic13.add("des", "普伤");
        dic13.add("hit_type", "1");
        dic13.add("attack_audio_id", "100");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("explain", "普攻");
        dic14.add("des", "普伤");
        dic14.add("hit_type", "1");
        dic14.add("attack_audio_id", "100");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("explain", "普攻");
        dic15.add("des", "普伤");
        dic15.add("hit_type", "1");
        dic15.add("attack_audio_id", "100");
        this.infDic.add("15", dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add("id", "16");
        dic16.add("explain", "普攻");
        dic16.add("des", "普伤");
        dic16.add("hit_type", "1");
        dic16.add("attack_audio_id", "100");
        this.infDic.add("16", dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add("id", "17");
        dic17.add("explain", "普攻");
        dic17.add("des", "普伤");
        dic17.add("hit_type", "1");
        dic17.add("attack_audio_id", "100");
        this.infDic.add("17", dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add("id", "18");
        dic18.add("explain", "普攻");
        dic18.add("des", "普伤");
        dic18.add("hit_type", "1");
        dic18.add("attack_audio_id", "100");
        this.infDic.add("18", dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add("id", "19");
        dic19.add("explain", "普攻");
        dic19.add("des", "普伤");
        dic19.add("hit_type", "1");
        dic19.add("attack_audio_id", "100");
        this.infDic.add("19", dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add("id", "20");
        dic20.add("explain", "普攻");
        dic20.add("des", "普伤");
        dic20.add("hit_type", "1");
        dic20.add("attack_audio_id", "100");
        this.infDic.add("20", dic20);
        let dic21 = new Dictionary<string, any>();
        dic21.add("id", "21");
        dic21.add("explain", "普攻");
        dic21.add("des", "普伤");
        dic21.add("hit_type", "1");
        dic21.add("attack_audio_id", "100");
        this.infDic.add("21", dic21);
        let dic22 = new Dictionary<string, any>();
        dic22.add("id", "22");
        dic22.add("explain", "普攻");
        dic22.add("des", "普伤");
        dic22.add("hit_type", "1");
        dic22.add("attack_audio_id", "100");
        this.infDic.add("22", dic22);
        let dic23 = new Dictionary<string, any>();
        dic23.add("id", "23");
        dic23.add("explain", "普攻");
        dic23.add("des", "普伤");
        dic23.add("hit_type", "1");
        dic23.add("attack_audio_id", "100");
        this.infDic.add("23", dic23);
        let dic24 = new Dictionary<string, any>();
        dic24.add("id", "24");
        dic24.add("explain", "普攻");
        dic24.add("des", "普伤");
        dic24.add("hit_type", "1");
        dic24.add("attack_audio_id", "100");
        this.infDic.add("24", dic24);
        let dic25 = new Dictionary<string, any>();
        dic25.add("id", "25");
        dic25.add("explain", "普攻");
        dic25.add("des", "普伤");
        dic25.add("hit_type", "1");
        dic25.add("attack_audio_id", "100");
        this.infDic.add("25", dic25);
        let dic26 = new Dictionary<string, any>();
        dic26.add("id", "26");
        dic26.add("explain", "普攻");
        dic26.add("des", "普伤");
        dic26.add("hit_type", "1");
        dic26.add("attack_audio_id", "100");
        this.infDic.add("26", dic26);
        let dic27 = new Dictionary<string, any>();
        dic27.add("id", "27");
        dic27.add("explain", "普攻");
        dic27.add("des", "普伤");
        dic27.add("hit_type", "1");
        dic27.add("attack_audio_id", "100");
        this.infDic.add("27", dic27);
        let dic28 = new Dictionary<string, any>();
        dic28.add("id", "28");
        dic28.add("explain", "普攻");
        dic28.add("des", "普伤");
        dic28.add("hit_type", "1");
        dic28.add("attack_audio_id", "100");
        this.infDic.add("28", dic28);
        let dic29 = new Dictionary<string, any>();
        dic29.add("id", "29");
        dic29.add("explain", "普攻");
        dic29.add("des", "普伤");
        dic29.add("hit_type", "1");
        dic29.add("attack_audio_id", "100");
        this.infDic.add("29", dic29);
        let dic30 = new Dictionary<string, any>();
        dic30.add("id", "30");
        dic30.add("explain", "普攻");
        dic30.add("des", "普伤");
        dic30.add("hit_type", "1");
        dic30.add("attack_audio_id", "100");
        this.infDic.add("30", dic30);
        let dic31 = new Dictionary<string, any>();
        dic31.add("id", "31");
        dic31.add("explain", "普攻");
        dic31.add("des", "普伤");
        dic31.add("hit_type", "1");
        dic31.add("attack_audio_id", "100");
        this.infDic.add("31", dic31);
        let dic32 = new Dictionary<string, any>();
        dic32.add("id", "32");
        dic32.add("explain", "普攻");
        dic32.add("des", "普伤");
        dic32.add("hit_type", "1");
        dic32.add("attack_audio_id", "100");
        this.infDic.add("32", dic32);
        let dic33 = new Dictionary<string, any>();
        dic33.add("id", "33");
        dic33.add("explain", "普攻");
        dic33.add("des", "普伤");
        dic33.add("hit_type", "1");
        dic33.add("attack_audio_id", "100");
        this.infDic.add("33", dic33);
        let dic34 = new Dictionary<string, any>();
        dic34.add("id", "34");
        dic34.add("explain", "普攻");
        dic34.add("des", "普伤");
        dic34.add("hit_type", "1");
        dic34.add("attack_audio_id", "100");
        this.infDic.add("34", dic34);
        let dic35 = new Dictionary<string, any>();
        dic35.add("id", "35");
        dic35.add("explain", "普攻");
        dic35.add("des", "普伤");
        dic35.add("hit_type", "1");
        dic35.add("attack_audio_id", "100");
        this.infDic.add("35", dic35);
    }
    
}
