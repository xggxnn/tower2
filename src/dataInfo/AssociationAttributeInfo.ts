import Dictionary from "../Tool/Dictionary"; 

export default class AssociationAttributeInfo {

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
    constructor(id: string) {
        this.curInf = AssociationAttributeInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): AssociationAttributeInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new AssociationAttributeInfo(ids);
        }
        return null;
    }
    private static infList: AssociationAttributeInfo[] = null;
    public static getList(): Array<AssociationAttributeInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new AssociationAttributeInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("name", "atk");
        dic1.add("des", "普通攻击力增加{0}%");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("name", "atk_cirt");
        dic2.add("des", "普通攻击暴击率增加{0}%");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("name", "atk_speed");
        dic3.add("des", "攻速增加{0}%");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("name", "reduce_defense");
        dic4.add("des", "减防{0}%");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("name", "slow_atk");
        dic5.add("des", "减速攻击{0}%");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("name", "reduce_skill_cd");
        dic6.add("des", "技能冷却时间减少{0}%");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("name", "burning");
        dic7.add("des", "灼烧攻击加{0}");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("name", "atk_burst");
        dic8.add("des", "普通攻击爆伤增加{0}%");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("name", "poisoning");
        dic9.add("des", "中毒攻击增加{0}");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("name", "burning_field");
        dic10.add("des", "灼烧场{0}%");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("name", "ak_range");
        dic11.add("des", "攻击范围增加{0}%");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("name", "skill_atk");
        dic12.add("des", "技能攻击力增加{0}%");
        this.infDic.add("12", dic12);
    }
    
}
