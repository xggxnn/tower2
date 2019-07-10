import Dictionary from "../Tool/Dictionary"; 

export default class TrialInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get level(): number {
        return Number(this.curInf.getValue("level"));
    }
    public get cooldown(): number {
        return Number(this.curInf.getValue("cooldown"));
    }
    public get reward_id(): number {
        return Number(this.curInf.getValue("reward_id"));
    }
    public get reward_num(): number {
        return Number(this.curInf.getValue("reward_num"));
    }
    constructor(id: string) {
        this.curInf = TrialInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): TrialInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new TrialInfo(ids);
        }
        return null;
    }
    private static infList: TrialInfo[] = null;
    public static getList(): Array<TrialInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new TrialInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("level", "1");
        dic1.add("cooldown", "30");
        dic1.add("reward_id", "1");
        dic1.add("reward_num", "1");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("level", "2");
        dic2.add("cooldown", "60");
        dic2.add("reward_id", "2");
        dic2.add("reward_num", "2");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("level", "3");
        dic3.add("cooldown", "120");
        dic3.add("reward_id", "3");
        dic3.add("reward_num", "3");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("level", "4");
        dic4.add("cooldown", "240");
        dic4.add("reward_id", "4");
        dic4.add("reward_num", "4");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("level", "5");
        dic5.add("cooldown", "480");
        dic5.add("reward_id", "5");
        dic5.add("reward_num", "5");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("level", "6");
        dic6.add("cooldown", "960");
        dic6.add("reward_id", "6");
        dic6.add("reward_num", "6");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("level", "7");
        dic7.add("cooldown", "1920");
        dic7.add("reward_id", "7");
        dic7.add("reward_num", "7");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("level", "8");
        dic8.add("cooldown", "3840");
        dic8.add("reward_id", "8");
        dic8.add("reward_num", "8");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("level", "9");
        dic9.add("cooldown", "7680");
        dic9.add("reward_id", "9");
        dic9.add("reward_num", "9");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("level", "10");
        dic10.add("cooldown", "15360");
        dic10.add("reward_id", "10");
        dic10.add("reward_num", "10");
        this.infDic.add("10", dic10);
    }
    
}
