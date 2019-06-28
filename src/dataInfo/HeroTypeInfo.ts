import Dictionary from "../Tool/Dictionary"; 

export default class HeroTypeInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    public static serverInit(infDic: Dictionary<string, Dictionary<string, any>>): void {
        this.infDic.clear();
        this.infDic = infDic;
    }

    public get id(): any {
        return this.curInf.getValue("id");
    }
    public get type(): any {
        return this.curInf.getValue("type");
    }
    public get bench_atk_speed(): any {
        return this.curInf.getValue("bench_atk_speed");
    }
    public get benchmark_atk(): any {
        return this.curInf.getValue("benchmark_atk");
    }
    constructor(id: string) {
        this.curInf = HeroTypeInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): HeroTypeInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new HeroTypeInfo(ids);
        }
        return null;
    }
    private static infList: HeroTypeInfo[] = null;
    public static getList(): Array<HeroTypeInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new HeroTypeInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("type", "1");
        dic1.add("bench_atk_speed", "2.5");
        dic1.add("benchmark_atk", "35.9");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("type", "2");
        dic2.add("bench_atk_speed", "1.65");
        dic2.add("benchmark_atk", "62");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("type", "3");
        dic3.add("bench_atk_speed", "1.1");
        dic3.add("benchmark_atk", "102.7");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("type", "4");
        dic4.add("bench_atk_speed", "0.8");
        dic4.add("benchmark_atk", "199.6");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("type", "5");
        dic5.add("bench_atk_speed", "0.6");
        dic5.add("benchmark_atk", "395.7");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("type", "6");
        dic6.add("bench_atk_speed", "0.45");
        dic6.add("benchmark_atk", "697.5");
        this.infDic.add("6", dic6);
    }
    
}
