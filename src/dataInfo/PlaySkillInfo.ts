import Dictionary from "../Tool/Dictionary"; 

export default class PlaySkillInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): number {
        return Number(this.curInf.getValue("id"));
    }
    public get name(): string {
        return String(this.curInf.getValue("name"));
    }
    public get des(): string {
        return String(this.curInf.getValue("des"));
    }
    public get val(): number {
        return Number(this.curInf.getValue("val"));
    }
    public get time(): number {
        return Number(this.curInf.getValue("time"));
    }
    constructor(id: string) {
        this.curInf = PlaySkillInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): PlaySkillInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new PlaySkillInfo(ids);
        }
        return null;
    }
    private static infList: PlaySkillInfo[] = null;
    public static getList(): Array<PlaySkillInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new PlaySkillInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("name", "攻击力加强・爆");
        dic1.add("des", "提升攻击力{0}%，持续{1}秒");
        dic1.add("val", "30");
        dic1.add("time", "5");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("name", "攻击力加强・恒");
        dic2.add("des", "提升攻击力{0}%，持续{1}秒");
        dic2.add("val", "10");
        dic2.add("time", "0");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("name", "爆击率加强・爆");
        dic3.add("des", "提升爆击率{0}%，持续{1}秒");
        dic3.add("val", "20");
        dic3.add("time", "5");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("name", "爆击率加强・恒");
        dic4.add("des", "提升爆击率{0}%，持续{1}秒");
        dic4.add("val", "5");
        dic4.add("time", "0");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("name", "爆伤加强・爆");
        dic5.add("des", "提升爆伤{0}%，持续{1}秒");
        dic5.add("val", "100");
        dic5.add("time", "5");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("name", "爆伤加强・恒");
        dic6.add("des", "提升爆伤{0}%，持续{1}秒");
        dic6.add("val", "50");
        dic6.add("time", "0");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("name", "攻速加强・爆");
        dic7.add("des", "提升攻速{0}%，持续{1}秒");
        dic7.add("val", "100");
        dic7.add("time", "5");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("name", "攻速加强・恒");
        dic8.add("des", "提升攻速{0}%，持续{1}秒");
        dic8.add("val", "30");
        dic8.add("time", "0");
        this.infDic.add("8", dic8);
    }
    
}
