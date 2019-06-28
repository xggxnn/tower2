import Dictionary from "../Tool/Dictionary"; 

export default class HeroTypeInfo {

    private static infDic: Dictionary<string, Dictionary<string, any>> = new Dictionary<string, Dictionary<string, any>>();
    private curInf: Dictionary<string, any> = new Dictionary<string, any>();

    /**
     * id
     */
    public get id(): any {
        return this.curInf.getValue("id");
    }
    /**
     * ����
     */
    public get type(): any {
        return this.curInf.getValue("type");
    }
    /**
     * dps
     */
    public get dps(): any {
        return this.curInf.getValue("dps");
    }
    /**
     * ����
     */
    public get speed1(): any {
        return this.curInf.getValue("speed1");
    }
    /**
     * ����
     */
    public get speed2(): any {
        return this.curInf.getValue("speed2");
    }
    /**
     * ������
     */
    public get atk1(): any {
        return this.curInf.getValue("atk1");
    }
    /**
     * ������
     */
    public get atk2(): any {
        return this.curInf.getValue("atk2");
    }
    /**
     * �����ʣ�%��
     */
    public get crit_rate1(): any {
        return this.curInf.getValue("crit_rate1");
    }
    /**
     * �����ʣ�%��
     */
    public get crit_rate2(): any {
        return this.curInf.getValue("crit_rate2");
    }
    /**
     * ����(%)
     */
    public get bruise1(): any {
        return this.curInf.getValue("bruise1");
    }
    /**
     * ����(%)
     */
    public get bruise2(): any {
        return this.curInf.getValue("bruise2");
    }
    /**
     * ��Ч���˺�dps
     */
    public get full_damage1(): any {
        return this.curInf.getValue("full_damage1");
    }
    /**
     * ��Ч���˺�dps
     */
    public get full_damage2(): any {
        return this.curInf.getValue("full_damage2");
    }
    /**
     * ÿ�ι����˺�dph
     */
    public get damage_per1(): any {
        return this.curInf.getValue("damage_per1");
    }
    /**
     * ÿ�ι����˺�dph
     */
    public get damage_per2(): any {
        return this.curInf.getValue("damage_per2");
    }
    /**
     * ����Ʒ�ʼӳɣ�%��
     */
    public get atk_speed_quality(): any {
        return this.curInf.getValue("atk_speed_quality");
    }
    /**
     * ������Ʒ�ʼӳɣ�%��
     */
    public get crit_quality(): any {
        return this.curInf.getValue("crit_quality");
    }
    /**
     * ����Ʒ�ʼӳɣ�%��
     */
    public get burst_quality(): any {
        return this.curInf.getValue("burst_quality");
    }
    /**
     * ��׼����
     */
    public get bench_atk_speed(): any {
        return this.curInf.getValue("bench_atk_speed");
    }
    /**
     * ��׼������
     */
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
        dic1.add("type", "�߹�Ƶ");
        dic1.add("dps", "75");
        dic1.add("speed1", "3");
        dic1.add("speed2", "2");
        dic1.add("atk1", "25");
        dic1.add("atk2", "37.5");
        dic1.add("crit_rate1", "10");
        dic1.add("crit_rate2", "10");
        dic1.add("bruise1", "150");
        dic1.add("bruise2", "150");
        dic1.add("full_damage1", "86.3");
        dic1.add("full_damage2", "86.3");
        dic1.add("damage_per1", "28.8");
        dic1.add("damage_per2", "43.1");
        dic1.add("atk_speed_quality", "10");
        dic1.add("crit_quality", "0");
        dic1.add("burst_quality", "0");
        dic1.add("bench_atk_speed", "2.5");
        dic1.add("benchmark_atk", "35.9");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("type", "�θ߹�Ƶƫ�߹�");
        dic2.add("dps", "85");
        dic2.add("speed1", "2");
        dic2.add("speed2", "1.3");
        dic2.add("atk1", "42.5");
        dic2.add("atk2", "65.4");
        dic2.add("crit_rate1", "10");
        dic2.add("crit_rate2", "10");
        dic2.add("bruise1", "150");
        dic2.add("bruise2", "150");
        dic2.add("full_damage1", "87.8");
        dic2.add("full_damage2", "87.8");
        dic2.add("damage_per1", "48.9");
        dic2.add("damage_per2", "75.2");
        dic2.add("atk_speed_quality", "10");
        dic2.add("crit_quality", "0");
        dic2.add("burst_quality", "0");
        dic2.add("bench_atk_speed", "1.65");
        dic2.add("benchmark_atk", "62");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("type", "�����Ƶ");
        dic3.add("dps", "95");
        dic3.add("speed1", "1.3");
        dic3.add("speed2", "0.9");
        dic3.add("atk1", "73.1");
        dic3.add("atk2", "105.6");
        dic3.add("crit_rate1", "10");
        dic3.add("crit_rate2", "10");
        dic3.add("bruise1", "150");
        dic3.add("bruise2", "150");
        dic3.add("full_damage1", "89.3");
        dic3.add("full_damage2", "89.3");
        dic3.add("damage_per1", "84");
        dic3.add("damage_per2", "121.4");
        dic3.add("atk_speed_quality", "10");
        dic3.add("crit_quality", "0");
        dic3.add("burst_quality", "0");
        dic3.add("bench_atk_speed", "1.1");
        dic3.add("benchmark_atk", "102.7");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("type", "����߹�");
        dic4.add("dps", "100");
        dic4.add("speed1", "0.9");
        dic4.add("speed2", "0.7");
        dic4.add("atk1", "111.1");
        dic4.add("atk2", "142.9");
        dic4.add("crit_rate1", "10");
        dic4.add("crit_rate2", "30");
        dic4.add("bruise1", "150");
        dic4.add("bruise2", "300");
        dic4.add("full_damage1", "90");
        dic4.add("full_damage2", "165");
        dic4.add("damage_per1", "127.8");
        dic4.add("damage_per2", "271.4");
        dic4.add("atk_speed_quality", "0");
        dic4.add("crit_quality", "10");
        dic4.add("burst_quality", "10");
        dic4.add("bench_atk_speed", "0.8");
        dic4.add("benchmark_atk", "199.6");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("type", "�θ߱���ƫ��Ƶ");
        dic5.add("dps", "100");
        dic5.add("speed1", "0.7");
        dic5.add("speed2", "0.5");
        dic5.add("atk1", "142.9");
        dic5.add("atk2", "200");
        dic5.add("crit_rate1", "30");
        dic5.add("crit_rate2", "40");
        dic5.add("bruise1", "300");
        dic5.add("bruise2", "400");
        dic5.add("full_damage1", "165");
        dic5.add("full_damage2", "235");
        dic5.add("damage_per1", "271.4");
        dic5.add("damage_per2", "520");
        dic5.add("atk_speed_quality", "0");
        dic5.add("crit_quality", "10");
        dic5.add("burst_quality", "10");
        dic5.add("bench_atk_speed", "0.6");
        dic5.add("benchmark_atk", "395.7");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("type", "�߱���");
        dic6.add("dps", "100");
        dic6.add("speed1", "0.5");
        dic6.add("speed2", "0.4");
        dic6.add("atk1", "200");
        dic6.add("atk2", "250");
        dic6.add("crit_rate1", "40");
        dic6.add("crit_rate2", "50");
        dic6.add("bruise1", "400");
        dic6.add("bruise2", "500");
        dic6.add("full_damage1", "235");
        dic6.add("full_damage2", "325");
        dic6.add("damage_per1", "520");
        dic6.add("damage_per2", "875");
        dic6.add("atk_speed_quality", "0");
        dic6.add("crit_quality", "10");
        dic6.add("burst_quality", "10");
        dic6.add("bench_atk_speed", "0.45");
        dic6.add("benchmark_atk", "697.5");
        this.infDic.add("6", dic6);
    }
    
}
