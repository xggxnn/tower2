import Dictionary from "../Tool/Dictionary"; 

export default class AssociationSpecialInfo {

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
    public get hero1(): number {
        return Number(this.curInf.getValue("hero1"));
    }
    public get hero2(): number {
        return Number(this.curInf.getValue("hero2"));
    }
    public get hero3(): number {
        return Number(this.curInf.getValue("hero3"));
    }
    public get hero4(): number {
        return Number(this.curInf.getValue("hero4"));
    }
    public get hero5(): number {
        return Number(this.curInf.getValue("hero5"));
    }
    public get attribute(): number {
        return Number(this.curInf.getValue("attribute"));
    }
    public get value(): number {
        return Number(this.curInf.getValue("value"));
    }
    constructor(id: string) {
        this.curInf = AssociationSpecialInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): AssociationSpecialInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new AssociationSpecialInfo(ids);
        }
        return null;
    }
    private static infList: AssociationSpecialInfo[] = null;
    public static getList(): Array<AssociationSpecialInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new AssociationSpecialInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("name", "龙之怒吼");
        dic1.add("hero1", "1");
        dic1.add("hero2", "2");
        dic1.add("hero3", "0");
        dic1.add("hero4", "0");
        dic1.add("hero5", "0");
        dic1.add("attribute", "1");
        dic1.add("value", "1");
        this.infDic.add("1", dic1);
    }
    
}
