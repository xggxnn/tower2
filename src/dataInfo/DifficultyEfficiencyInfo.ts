import Dictionary from "../Tool/Dictionary"; 

export default class DifficultyEfficiencyInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    /**
     * id
     */
    public get id(): any {
        return this.curInf.getValue("id");
    }
    /**
     * �Ѷ�
     */
    public get difficulty(): any {
        return this.curInf.getValue("difficulty");
    }
    /**
     * Ч��
     */
    public get efficiency(): any {
        return this.curInf.getValue("efficiency");
    }
    constructor(id: string) {
        this.curInf = DifficultyEfficiencyInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): DifficultyEfficiencyInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new DifficultyEfficiencyInfo(ids);
        }
        return null;
    }
    private static infList: DifficultyEfficiencyInfo[] = null;
    public static getList(): Array<DifficultyEfficiencyInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new DifficultyEfficiencyInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("difficulty", "1");
        dic1.add("efficiency", "0.2");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("difficulty", "2");
        dic2.add("efficiency", "0.22");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("difficulty", "3");
        dic3.add("efficiency", "0.24");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("difficulty", "4");
        dic4.add("efficiency", "0.26");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("difficulty", "5");
        dic5.add("efficiency", "0.28");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("difficulty", "6");
        dic6.add("efficiency", "0.3");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("difficulty", "7");
        dic7.add("efficiency", "0.32");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("difficulty", "8");
        dic8.add("efficiency", "0.34");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("difficulty", "9");
        dic9.add("efficiency", "0.36");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("difficulty", "10");
        dic10.add("efficiency", "0.38");
        this.infDic.add("10", dic10);
    }
    
}
