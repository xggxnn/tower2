import Dictionary from "../Tool/Dictionary"; 

export default class AssociationInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): any {
        return this.curInf.getValue("id");
    }
    public get name(): any {
        return this.curInf.getValue("name");
    }
    public get race_career(): any {
        return this.curInf.getValue("race_career");
    }
    public get num(): any {
        return this.curInf.getValue("num");
    }
    public get atk(): any {
        return this.curInf.getValue("atk");
    }
    public get atk_cirt(): any {
        return this.curInf.getValue("atk_cirt");
    }
    public get atk_speed(): any {
        return this.curInf.getValue("atk_speed");
    }
    public get reduce_defense(): any {
        return this.curInf.getValue("reduce_defense");
    }
    public get slow_atk(): any {
        return this.curInf.getValue("slow_atk");
    }
    public get reduce_skill_cd(): any {
        return this.curInf.getValue("reduce_skill_cd");
    }
    public get burning(): any {
        return this.curInf.getValue("burning");
    }
    public get atk_burst(): any {
        return this.curInf.getValue("atk_burst");
    }
    public get poisoning(): any {
        return this.curInf.getValue("poisoning");
    }
    public get burning_field(): any {
        return this.curInf.getValue("burning_field");
    }
    public get ak_range(): any {
        return this.curInf.getValue("ak_range");
    }
    public get skill_atk(): any {
        return this.curInf.getValue("skill_atk");
    }
    constructor(id: string) {
        this.curInf = AssociationInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): AssociationInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new AssociationInfo(ids);
        }
        return null;
    }
    private static infList: AssociationInfo[] = null;
    public static getList(): Array<AssociationInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new AssociationInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("name", "սʿ");
        dic1.add("race_career", "1");
        dic1.add("num", "3");
        dic1.add("atk", "5");
        dic1.add("atk_cirt", "5");
        dic1.add("atk_speed", "10");
        dic1.add("reduce_defense", "5");
        dic1.add("slow_atk", "10");
        dic1.add("reduce_skill_cd", "5");
        dic1.add("burning", "6");
        dic1.add("atk_burst", "20");
        dic1.add("poisoning", "6");
        dic1.add("burning_field", "30");
        dic1.add("ak_range", "2");
        dic1.add("skill_atk", "5");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("name", "սʿ");
        dic2.add("race_career", "1");
        dic2.add("num", "4");
        dic2.add("atk", "10");
        dic2.add("atk_cirt", "5");
        dic2.add("atk_speed", "10");
        dic2.add("reduce_defense", "5");
        dic2.add("slow_atk", "10");
        dic2.add("reduce_skill_cd", "5");
        dic2.add("burning", "6");
        dic2.add("atk_burst", "20");
        dic2.add("poisoning", "6");
        dic2.add("burning_field", "30");
        dic2.add("ak_range", "2");
        dic2.add("skill_atk", "5");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("name", "սʿ");
        dic3.add("race_career", "1");
        dic3.add("num", "5");
        dic3.add("atk", "15");
        dic3.add("atk_cirt", "5");
        dic3.add("atk_speed", "10");
        dic3.add("reduce_defense", "5");
        dic3.add("slow_atk", "10");
        dic3.add("reduce_skill_cd", "5");
        dic3.add("burning", "6");
        dic3.add("atk_burst", "20");
        dic3.add("poisoning", "6");
        dic3.add("burning_field", "30");
        dic3.add("ak_range", "2");
        dic3.add("skill_atk", "5");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("name", "��ʦ");
        dic4.add("race_career", "2");
        dic4.add("num", "2");
        dic4.add("atk", "5");
        dic4.add("atk_cirt", "5");
        dic4.add("atk_speed", "10");
        dic4.add("reduce_defense", "5");
        dic4.add("slow_atk", "10");
        dic4.add("reduce_skill_cd", "5");
        dic4.add("burning", "6");
        dic4.add("atk_burst", "20");
        dic4.add("poisoning", "6");
        dic4.add("burning_field", "30");
        dic4.add("ak_range", "2");
        dic4.add("skill_atk", "5");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("name", "����");
        dic5.add("race_career", "3");
        dic5.add("num", "2");
        dic5.add("atk", "5");
        dic5.add("atk_cirt", "5");
        dic5.add("atk_speed", "10");
        dic5.add("reduce_defense", "5");
        dic5.add("slow_atk", "10");
        dic5.add("reduce_skill_cd", "5");
        dic5.add("burning", "6");
        dic5.add("atk_burst", "20");
        dic5.add("poisoning", "6");
        dic5.add("burning_field", "30");
        dic5.add("ak_range", "2");
        dic5.add("skill_atk", "5");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("name", "����");
        dic6.add("race_career", "4");
        dic6.add("num", "2");
        dic6.add("atk", "5");
        dic6.add("atk_cirt", "5");
        dic6.add("atk_speed", "10");
        dic6.add("reduce_defense", "5");
        dic6.add("slow_atk", "10");
        dic6.add("reduce_skill_cd", "5");
        dic6.add("burning", "6");
        dic6.add("atk_burst", "20");
        dic6.add("poisoning", "6");
        dic6.add("burning_field", "30");
        dic6.add("ak_range", "2");
        dic6.add("skill_atk", "5");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("name", "����");
        dic7.add("race_career", "5");
        dic7.add("num", "2");
        dic7.add("atk", "5");
        dic7.add("atk_cirt", "5");
        dic7.add("atk_speed", "10");
        dic7.add("reduce_defense", "5");
        dic7.add("slow_atk", "10");
        dic7.add("reduce_skill_cd", "5");
        dic7.add("burning", "6");
        dic7.add("atk_burst", "20");
        dic7.add("poisoning", "6");
        dic7.add("burning_field", "30");
        dic7.add("ak_range", "2");
        dic7.add("skill_atk", "5");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("name", "����");
        dic8.add("race_career", "101");
        dic8.add("num", "2");
        dic8.add("atk", "5");
        dic8.add("atk_cirt", "5");
        dic8.add("atk_speed", "10");
        dic8.add("reduce_defense", "5");
        dic8.add("slow_atk", "10");
        dic8.add("reduce_skill_cd", "5");
        dic8.add("burning", "6");
        dic8.add("atk_burst", "20");
        dic8.add("poisoning", "6");
        dic8.add("burning_field", "30");
        dic8.add("ak_range", "2");
        dic8.add("skill_atk", "5");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("name", "Ԫ��");
        dic9.add("race_career", "102");
        dic9.add("num", "2");
        dic9.add("atk", "5");
        dic9.add("atk_cirt", "5");
        dic9.add("atk_speed", "10");
        dic9.add("reduce_defense", "5");
        dic9.add("slow_atk", "10");
        dic9.add("reduce_skill_cd", "5");
        dic9.add("burning", "6");
        dic9.add("atk_burst", "20");
        dic9.add("poisoning", "6");
        dic9.add("burning_field", "30");
        dic9.add("ak_range", "2");
        dic9.add("skill_atk", "5");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("name", "����");
        dic10.add("race_career", "103");
        dic10.add("num", "2");
        dic10.add("atk", "5");
        dic10.add("atk_cirt", "5");
        dic10.add("atk_speed", "10");
        dic10.add("reduce_defense", "5");
        dic10.add("slow_atk", "10");
        dic10.add("reduce_skill_cd", "5");
        dic10.add("burning", "6");
        dic10.add("atk_burst", "20");
        dic10.add("poisoning", "6");
        dic10.add("burning_field", "30");
        dic10.add("ak_range", "2");
        dic10.add("skill_atk", "5");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("name", "Ұ��");
        dic11.add("race_career", "104");
        dic11.add("num", "2");
        dic11.add("atk", "5");
        dic11.add("atk_cirt", "5");
        dic11.add("atk_speed", "10");
        dic11.add("reduce_defense", "5");
        dic11.add("slow_atk", "10");
        dic11.add("reduce_skill_cd", "5");
        dic11.add("burning", "6");
        dic11.add("atk_burst", "20");
        dic11.add("poisoning", "6");
        dic11.add("burning_field", "30");
        dic11.add("ak_range", "2");
        dic11.add("skill_atk", "5");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("name", "��");
        dic12.add("race_career", "105");
        dic12.add("num", "2");
        dic12.add("atk", "5");
        dic12.add("atk_cirt", "5");
        dic12.add("atk_speed", "10");
        dic12.add("reduce_defense", "5");
        dic12.add("slow_atk", "10");
        dic12.add("reduce_skill_cd", "5");
        dic12.add("burning", "6");
        dic12.add("atk_burst", "20");
        dic12.add("poisoning", "6");
        dic12.add("burning_field", "30");
        dic12.add("ak_range", "2");
        dic12.add("skill_atk", "5");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("name", "��е");
        dic13.add("race_career", "106");
        dic13.add("num", "2");
        dic13.add("atk", "5");
        dic13.add("atk_cirt", "5");
        dic13.add("atk_speed", "10");
        dic13.add("reduce_defense", "5");
        dic13.add("slow_atk", "10");
        dic13.add("reduce_skill_cd", "5");
        dic13.add("burning", "6");
        dic13.add("atk_burst", "20");
        dic13.add("poisoning", "6");
        dic13.add("burning_field", "30");
        dic13.add("ak_range", "2");
        dic13.add("skill_atk", "5");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("name", "������");
        dic14.add("race_career", "107");
        dic14.add("num", "2");
        dic14.add("atk", "5");
        dic14.add("atk_cirt", "5");
        dic14.add("atk_speed", "10");
        dic14.add("reduce_defense", "5");
        dic14.add("slow_atk", "10");
        dic14.add("reduce_skill_cd", "5");
        dic14.add("burning", "6");
        dic14.add("atk_burst", "20");
        dic14.add("poisoning", "6");
        dic14.add("burning_field", "30");
        dic14.add("ak_range", "2");
        dic14.add("skill_atk", "5");
        this.infDic.add("14", dic14);
    }
    
}
