import Dictionary from "../Tool/Dictionary"; 

export default class HeroInfo {

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
    public get name(): any {
        return this.curInf.getValue("name");
    }
    /**
     * Ʒ��
     */
    public get quality(): any {
        return this.curInf.getValue("quality");
    }
    /**
     * ����
     */
    public get story(): any {
        return this.curInf.getValue("story");
    }
    /**
     * �ٶ�
     */
    public get speed(): any {
        return this.curInf.getValue("speed");
    }
    /**
     * ����
     */
    public get attack_param_a(): any {
        return this.curInf.getValue("attack_param_a");
    }
    /**
     * ����
     */
    public get attack_param_b(): any {
        return this.curInf.getValue("attack_param_b");
    }
    /**
     * ����
     */
    public get common_skill_id(): any {
        return this.curInf.getValue("common_skill_id");
    }
    /**
     * ����
     */
    public get special_skill_id(): any {
        return this.curInf.getValue("special_skill_id");
    }
    /**
     * ����
     */
    public get level_max(): any {
        return this.curInf.getValue("level_max");
    }
    /**
     * ����
     */
    public get level_cost(): any {
        return this.curInf.getValue("level_cost");
    }
    /**
     * ����
     */
    public get lottery_param_a(): any {
        return this.curInf.getValue("lottery_param_a");
    }
    /**
     * ����
     */
    public get lottery_param_b(): any {
        return this.curInf.getValue("lottery_param_b");
    }
    /**
     * ����
     */
    public get star_type(): any {
        return this.curInf.getValue("star_type");
    }
    /**
     * ����
     */
    public get res_num(): any {
        return this.curInf.getValue("res_num");
    }
    /**
     * ����
     */
    public get source(): any {
        return this.curInf.getValue("source");
    }
    constructor(id: string) {
        this.curInf = HeroInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): HeroInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new HeroInfo(ids);
        }
        return null;
    }
    private static infList: HeroInfo[] = null;
    public static getList(): Array<HeroInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new HeroInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("name", "����С��");
        dic1.add("quality", "0");
        dic1.add("story", "���޵���ɫ���˿���һ�۾��޷����ǣ���Ů�����ʮ��ھ���");
        dic1.add("speed", "4");
        dic1.add("attack_param_a", "139.2");
        dic1.add("attack_param_b", "0.0232");
        dic1.add("common_skill_id", "1");
        dic1.add("special_skill_id", "1001");
        dic1.add("level_max", "500");
        dic1.add("level_cost", "5");
        dic1.add("lottery_param_a", "0");
        dic1.add("lottery_param_b", "200");
        dic1.add("star_type", "0");
        dic1.add("res_num", "2");
        dic1.add("source", "2");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("name", "�����");
        dic2.add("quality", "0");
        dic2.add("story", "�����е�Ǳ���ߣ�������һ������������");
        dic2.add("speed", "4");
        dic2.add("attack_param_a", "139.8");
        dic2.add("attack_param_b", "0.0231");
        dic2.add("common_skill_id", "2");
        dic2.add("special_skill_id", "1002");
        dic2.add("level_max", "500");
        dic2.add("level_cost", "5");
        dic2.add("lottery_param_a", "0");
        dic2.add("lottery_param_b", "200");
        dic2.add("star_type", "0");
        dic2.add("res_num", "2");
        dic2.add("source", "2");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("name", "��Ƥ���");
        dic3.add("quality", "0");
        dic3.add("story", "���أ������ڵġ�");
        dic3.add("speed", "4");
        dic3.add("attack_param_a", "139.6");
        dic3.add("attack_param_b", "0.0233");
        dic3.add("common_skill_id", "3");
        dic3.add("special_skill_id", "1003");
        dic3.add("level_max", "500");
        dic3.add("level_cost", "5");
        dic3.add("lottery_param_a", "0");
        dic3.add("lottery_param_b", "200");
        dic3.add("star_type", "0");
        dic3.add("res_num", "2");
        dic3.add("source", "2");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("name", "�ٱ�Сӣ");
        dic4.add("quality", "0");
        dic4.add("story", "ҹ֮���飬��ҹ������˵���Բ����¶���");
        dic4.add("speed", "4");
        dic4.add("attack_param_a", "140");
        dic4.add("attack_param_b", "0.0235");
        dic4.add("common_skill_id", "4");
        dic4.add("special_skill_id", "1004");
        dic4.add("level_max", "500");
        dic4.add("level_cost", "5");
        dic4.add("lottery_param_a", "0");
        dic4.add("lottery_param_b", "200");
        dic4.add("star_type", "0");
        dic4.add("res_num", "2");
        dic4.add("source", "2");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("name", "ȭ��̩ɭ");
        dic5.add("quality", "0");
        dic5.add("story", "Ϊ�������⣬�����ݽ�������Ͻ�С�");
        dic5.add("speed", "2");
        dic5.add("attack_param_a", "140.4");
        dic5.add("attack_param_b", "0.0229");
        dic5.add("common_skill_id", "5");
        dic5.add("special_skill_id", "1005");
        dic5.add("level_max", "500");
        dic5.add("level_cost", "5");
        dic5.add("lottery_param_a", "0");
        dic5.add("lottery_param_b", "200");
        dic5.add("star_type", "0");
        dic5.add("res_num", "2");
        dic5.add("source", "2");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("name", "ʯ����");
        dic6.add("quality", "1");
        dic6.add("story", "�Ҳ�˧���Һ�������");
        dic6.add("speed", "2");
        dic6.add("attack_param_a", "141.2");
        dic6.add("attack_param_b", "0.0242");
        dic6.add("common_skill_id", "6");
        dic6.add("special_skill_id", "1006");
        dic6.add("level_max", "500");
        dic6.add("level_cost", "5");
        dic6.add("lottery_param_a", "0");
        dic6.add("lottery_param_b", "150");
        dic6.add("star_type", "0");
        dic6.add("res_num", "2");
        dic6.add("source", "2");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("name", "Ͷʯ��ʿ");
        dic7.add("quality", "1");
        dic7.add("story", "˭˵���鶼�Ǻ�˧�ģ�վ���������ҿ佱һ���㡣");
        dic7.add("speed", "2");
        dic7.add("attack_param_a", "141.8");
        dic7.add("attack_param_b", "0.0239");
        dic7.add("common_skill_id", "7");
        dic7.add("special_skill_id", "1007");
        dic7.add("level_max", "500");
        dic7.add("level_cost", "5");
        dic7.add("lottery_param_a", "0");
        dic7.add("lottery_param_b", "150");
        dic7.add("star_type", "0");
        dic7.add("res_num", "2");
        dic7.add("source", "2");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("name", "��ʯ��");
        dic8.add("quality", "1");
        dic8.add("story", "����Ƣ��������һ�Բ��ϾͿ���");
        dic8.add("speed", "1");
        dic8.add("attack_param_a", "141.6");
        dic8.add("attack_param_b", "0.0239");
        dic8.add("common_skill_id", "8");
        dic8.add("special_skill_id", "1008");
        dic8.add("level_max", "500");
        dic8.add("level_cost", "5");
        dic8.add("lottery_param_a", "0");
        dic8.add("lottery_param_b", "150");
        dic8.add("star_type", "0");
        dic8.add("res_num", "2");
        dic8.add("source", "2");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("name", "����С��");
        dic9.add("quality", "1");
        dic9.add("story", "���������ǳ�Ϊһ�����ǣ�����ֻ���ӻ���");
        dic9.add("speed", "4");
        dic9.add("attack_param_a", "141.4");
        dic9.add("attack_param_b", "0.0242");
        dic9.add("common_skill_id", "9");
        dic9.add("special_skill_id", "1009");
        dic9.add("level_max", "500");
        dic9.add("level_cost", "5");
        dic9.add("lottery_param_a", "0");
        dic9.add("lottery_param_b", "200");
        dic9.add("star_type", "0");
        dic9.add("res_num", "2");
        dic9.add("source", "2");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("name", "����֮��");
        dic10.add("quality", "3");
        dic10.add("story", "������������ǻ����С�ı����Ļ�����û��");
        dic10.add("speed", "4");
        dic10.add("attack_param_a", "145.8");
        dic10.add("attack_param_b", "0.0261");
        dic10.add("common_skill_id", "10");
        dic10.add("special_skill_id", "1010");
        dic10.add("level_max", "500");
        dic10.add("level_cost", "5");
        dic10.add("lottery_param_a", "0");
        dic10.add("lottery_param_b", "50");
        dic10.add("star_type", "0");
        dic10.add("res_num", "2");
        dic10.add("source", "27");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("name", "��˪��ħ");
        dic11.add("quality", "1");
        dic11.add("story", "���ó�������Ա�����������ȼ�ױ���Ʒ��");
        dic11.add("speed", "3");
        dic11.add("attack_param_a", "142.8");
        dic11.add("attack_param_b", "0.0243");
        dic11.add("common_skill_id", "11");
        dic11.add("special_skill_id", "1011");
        dic11.add("level_max", "500");
        dic11.add("level_cost", "5");
        dic11.add("lottery_param_a", "0");
        dic11.add("lottery_param_b", "150");
        dic11.add("star_type", "0");
        dic11.add("res_num", "2");
        dic11.add("source", "2");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("name", "������");
        dic12.add("quality", "1");
        dic12.add("story", "������Ϊ�޳���Ӱ�죬����������ͨ�죬�����ܵ����˵��ż��Ӵ˿�ʼ�������");
        dic12.add("speed", "2");
        dic12.add("attack_param_a", "142");
        dic12.add("attack_param_b", "0.0245");
        dic12.add("common_skill_id", "12");
        dic12.add("special_skill_id", "1012");
        dic12.add("level_max", "500");
        dic12.add("level_cost", "5");
        dic12.add("lottery_param_a", "0");
        dic12.add("lottery_param_b", "150");
        dic12.add("star_type", "0");
        dic12.add("res_num", "2");
        dic12.add("source", "2");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("name", "ħ��");
        dic13.add("quality", "1");
        dic13.add("story", "��Ŭ����ѧϰ��ѧϰ��ѧϰ�����Ҳ���������");
        dic13.add("speed", "3");
        dic13.add("attack_param_a", "142.6");
        dic13.add("attack_param_b", "0.0241");
        dic13.add("common_skill_id", "13");
        dic13.add("special_skill_id", "1013");
        dic13.add("level_max", "500");
        dic13.add("level_cost", "5");
        dic13.add("lottery_param_a", "0");
        dic13.add("lottery_param_b", "150");
        dic13.add("star_type", "0");
        dic13.add("res_num", "2");
        dic13.add("source", "2");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("name", "��Ƥ����");
        dic14.add("quality", "2");
        dic14.add("story", "��ҪС���ܺ��ӵ��ƻ�������ӵ���ƻ�һ�еļ��ܡ�");
        dic14.add("speed", "3");
        dic14.add("attack_param_a", "143.2");
        dic14.add("attack_param_b", "0.0252");
        dic14.add("common_skill_id", "14");
        dic14.add("special_skill_id", "1014");
        dic14.add("level_max", "500");
        dic14.add("level_cost", "5");
        dic14.add("lottery_param_a", "0");
        dic14.add("lottery_param_b", "100");
        dic14.add("star_type", "0");
        dic14.add("res_num", "2");
        dic14.add("source", "27");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("name", "����Ժ��");
        dic15.add("quality", "2");
        dic15.add("story", "ħ��ѧԺ��Ժ������˵������һ��ʥ�ȣ��ܹ������޳�������Ӱ��");
        dic15.add("speed", "3");
        dic15.add("attack_param_a", "144");
        dic15.add("attack_param_b", "0.0251");
        dic15.add("common_skill_id", "15");
        dic15.add("special_skill_id", "1015");
        dic15.add("level_max", "500");
        dic15.add("level_cost", "5");
        dic15.add("lottery_param_a", "0");
        dic15.add("lottery_param_b", "100");
        dic15.add("star_type", "0");
        dic15.add("res_num", "2");
        dic15.add("source", "27");
        this.infDic.add("15", dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add("id", "16");
        dic16.add("name", "����С��");
        dic16.add("quality", "2");
        dic16.add("story", "���Ŷ�����Ѫͳ���Ǹ���Ĭ���ԡ�����ϡ�ٵ���Ů������һ�аٵ�ս����");
        dic16.add("speed", "3");
        dic16.add("attack_param_a", "144.6");
        dic16.add("attack_param_b", "0.0249");
        dic16.add("common_skill_id", "16");
        dic16.add("special_skill_id", "1016");
        dic16.add("level_max", "500");
        dic16.add("level_cost", "5");
        dic16.add("lottery_param_a", "0");
        dic16.add("lottery_param_b", "100");
        dic16.add("star_type", "0");
        dic16.add("res_num", "2");
        dic16.add("source", "27");
        this.infDic.add("16", dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add("id", "17");
        dic17.add("name", "��ìս��");
        dic17.add("quality", "3");
        dic17.add("story", "ʹ�ó�ì��Ϊ�����ĸ񶷼ң��ܹ����������������");
        dic17.add("speed", "3");
        dic17.add("attack_param_a", "145.2");
        dic17.add("attack_param_b", "0.0262");
        dic17.add("common_skill_id", "17");
        dic17.add("special_skill_id", "1017");
        dic17.add("level_max", "500");
        dic17.add("level_cost", "5");
        dic17.add("lottery_param_a", "0");
        dic17.add("lottery_param_b", "50");
        dic17.add("star_type", "0");
        dic17.add("res_num", "2");
        dic17.add("source", "27");
        this.infDic.add("17", dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add("id", "18");
        dic18.add("name", "��賤ǹ");
        dic18.add("quality", "3");
        dic18.add("story", "�Ϲ����ؿƼ��Ĳ��ӵ��һ�ѳ�ìȴ�����ë��");
        dic18.add("speed", "2");
        dic18.add("attack_param_a", "145.8");
        dic18.add("attack_param_b", "0.0261");
        dic18.add("common_skill_id", "18");
        dic18.add("special_skill_id", "1018");
        dic18.add("level_max", "500");
        dic18.add("level_cost", "5");
        dic18.add("lottery_param_a", "0");
        dic18.add("lottery_param_b", "50");
        dic18.add("star_type", "0");
        dic18.add("res_num", "2");
        dic18.add("source", "27");
        this.infDic.add("18", dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add("id", "19");
        dic19.add("name", "��֮��");
        dic19.add("quality", "4");
        dic19.add("story", "�ر���ǿ�����ˣ�");
        dic19.add("speed", "4");
        dic19.add("attack_param_a", "147.6");
        dic19.add("attack_param_b", "0.0269");
        dic19.add("common_skill_id", "19");
        dic19.add("special_skill_id", "1019");
        dic19.add("level_max", "500");
        dic19.add("level_cost", "10");
        dic19.add("lottery_param_a", "0");
        dic19.add("lottery_param_b", "5");
        dic19.add("star_type", "0");
        dic19.add("res_num", "2");
        dic19.add("source", "427");
        this.infDic.add("19", dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add("id", "20");
        dic20.add("name", "����֮ȭ");
        dic20.add("quality", "4");
        dic20.add("story", "����Я���¹ⱦ�У��õ��˻ص�4��֮ǰ��λ�ã�����ʱ���������޾��ֻء�");
        dic20.add("speed", "3");
        dic20.add("attack_param_a", "148");
        dic20.add("attack_param_b", "0.0272");
        dic20.add("common_skill_id", "20");
        dic20.add("special_skill_id", "1020");
        dic20.add("level_max", "500");
        dic20.add("level_cost", "10");
        dic20.add("lottery_param_a", "0");
        dic20.add("lottery_param_b", "0");
        dic20.add("star_type", "0");
        dic20.add("res_num", "2");
        dic20.add("source", "4");
        this.infDic.add("20", dic20);
        let dic21 = new Dictionary<string, any>();
        dic21.add("id", "21");
        dic21.add("name", "������");
        dic21.add("quality", "3");
        dic21.add("story", "ʹ���������Ϊ�����ĸ񶷼ҡ�");
        dic21.add("speed", "1");
        dic21.add("attack_param_a", "145.8");
        dic21.add("attack_param_b", "0.0261");
        dic21.add("common_skill_id", "21");
        dic21.add("special_skill_id", "1021");
        dic21.add("level_max", "500");
        dic21.add("level_cost", "5");
        dic21.add("lottery_param_a", "0");
        dic21.add("lottery_param_b", "50");
        dic21.add("star_type", "0");
        dic21.add("res_num", "2");
        dic21.add("source", "27");
        this.infDic.add("21", dic21);
        let dic22 = new Dictionary<string, any>();
        dic22.add("id", "22");
        dic22.add("name", "��ţ����");
        dic22.add("quality", "3");
        dic22.add("story", "ӵ�а�ɽ�ѵص��������������");
        dic22.add("speed", "2");
        dic22.add("attack_param_a", "145.6");
        dic22.add("attack_param_b", "0.0263");
        dic22.add("common_skill_id", "22");
        dic22.add("special_skill_id", "1022");
        dic22.add("level_max", "500");
        dic22.add("level_cost", "5");
        dic22.add("lottery_param_a", "60");
        dic22.add("lottery_param_b", "0");
        dic22.add("star_type", "0");
        dic22.add("res_num", "2");
        dic22.add("source", "127");
        this.infDic.add("22", dic22);
        let dic23 = new Dictionary<string, any>();
        dic23.add("id", "23");
        dic23.add("name", "ħ����ţ");
        dic23.add("quality", "3");
        dic23.add("story", "��Ϊ�캢����ҳ��߶�ħ�����������õ����ǡ����");
        dic23.add("speed", "1");
        dic23.add("attack_param_a", "146.8");
        dic23.add("attack_param_b", "0.0267");
        dic23.add("common_skill_id", "23");
        dic23.add("special_skill_id", "1023");
        dic23.add("level_max", "500");
        dic23.add("level_cost", "5");
        dic23.add("lottery_param_a", "0");
        dic23.add("lottery_param_b", "50");
        dic23.add("star_type", "0");
        dic23.add("res_num", "2");
        dic23.add("source", "27");
        this.infDic.add("23", dic23);
        let dic24 = new Dictionary<string, any>();
        dic24.add("id", "24");
        dic24.add("name", "����ˤ��");
        dic24.add("quality", "1");
        dic24.add("story", "����ͨͨ��ˤ���֣�ϲ����Ǯ�ͺȾơ�");
        dic24.add("speed", "3");
        dic24.add("attack_param_a", "141.6");
        dic24.add("attack_param_b", "0.0242");
        dic24.add("common_skill_id", "24");
        dic24.add("special_skill_id", "1024");
        dic24.add("level_max", "500");
        dic24.add("level_cost", "5");
        dic24.add("lottery_param_a", "0");
        dic24.add("lottery_param_b", "150");
        dic24.add("star_type", "0");
        dic24.add("res_num", "2");
        dic24.add("source", "2");
        this.infDic.add("24", dic24);
        let dic25 = new Dictionary<string, any>();
        dic25.add("id", "25");
        dic25.add("name", "����");
        dic25.add("quality", "2");
        dic25.add("story", "�����ޱȵĽǶ�ʿ��һ���ܳԵ�һͷţ��");
        dic25.add("speed", "2");
        dic25.add("attack_param_a", "143.8");
        dic25.add("attack_param_b", "0.0251");
        dic25.add("common_skill_id", "25");
        dic25.add("special_skill_id", "1025");
        dic25.add("level_max", "500");
        dic25.add("level_cost", "5");
        dic25.add("lottery_param_a", "0");
        dic25.add("lottery_param_b", "100");
        dic25.add("star_type", "0");
        dic25.add("res_num", "2");
        dic25.add("source", "27");
        this.infDic.add("25", dic25);
        let dic26 = new Dictionary<string, any>();
        dic26.add("id", "26");
        dic26.add("name", "ά������");
        dic26.add("quality", "1");
        dic26.add("story", "����������ͨ�����Ļ�����������Щ���׼���֮ͽ������ͨ���Ĵ����ʽ�ǣ���װû������");
        dic26.add("speed", "3");
        dic26.add("attack_param_a", "142.4");
        dic26.add("attack_param_b", "0.0243");
        dic26.add("common_skill_id", "26");
        dic26.add("special_skill_id", "1026");
        dic26.add("level_max", "500");
        dic26.add("level_cost", "5");
        dic26.add("lottery_param_a", "0");
        dic26.add("lottery_param_b", "150");
        dic26.add("star_type", "0");
        dic26.add("res_num", "2");
        dic26.add("source", "2");
        this.infDic.add("26", dic26);
        let dic27 = new Dictionary<string, any>();
        dic27.add("id", "27");
        dic27.add("name", "ά������");
        dic27.add("quality", "2");
        dic27.add("story", "ȼ�յĽ���ȼ�յ��ġ�");
        dic27.add("speed", "3");
        dic27.add("attack_param_a", "144.2");
        dic27.add("attack_param_b", "0.025");
        dic27.add("common_skill_id", "27");
        dic27.add("special_skill_id", "1027");
        dic27.add("level_max", "500");
        dic27.add("level_cost", "5");
        dic27.add("lottery_param_a", "0");
        dic27.add("lottery_param_b", "100");
        dic27.add("star_type", "0");
        dic27.add("res_num", "2");
        dic27.add("source", "27");
        this.infDic.add("27", dic27);
        let dic28 = new Dictionary<string, any>();
        dic28.add("id", "28");
        dic28.add("name", "�й�֮��");
        dic28.add("quality", "4");
        dic28.add("story", "��Ѫ��ɱ��Ѫ������15%�ĵ��ˣ�һ��������");
        dic28.add("speed", "4");
        dic28.add("attack_param_a", "147.2");
        dic28.add("attack_param_b", "0.0272");
        dic28.add("common_skill_id", "28");
        dic28.add("special_skill_id", "1028");
        dic28.add("level_max", "500");
        dic28.add("level_cost", "10");
        dic28.add("lottery_param_a", "0");
        dic28.add("lottery_param_b", "5");
        dic28.add("star_type", "0");
        dic28.add("res_num", "2");
        dic28.add("source", "427");
        this.infDic.add("28", dic28);
        let dic29 = new Dictionary<string, any>();
        dic29.add("id", "29");
        dic29.add("name", "�ǻ�����");
        dic29.add("quality", "4");
        dic29.add("story", "�����ǻ۵��������Ͼ�˭Ҳû�����ʱ�䳤������Ϥһ�е��˵����㣡");
        dic29.add("speed", "3");
        dic29.add("attack_param_a", "147.8");
        dic29.add("attack_param_b", "0.0271");
        dic29.add("common_skill_id", "29");
        dic29.add("special_skill_id", "1029");
        dic29.add("level_max", "500");
        dic29.add("level_cost", "10");
        dic29.add("lottery_param_a", "0");
        dic29.add("lottery_param_b", "0");
        dic29.add("star_type", "0");
        dic29.add("res_num", "2");
        dic29.add("source", "4");
        this.infDic.add("29", dic29);
        let dic30 = new Dictionary<string, any>();
        dic30.add("id", "30");
        dic30.add("name", "��֮����");
        dic30.add("quality", "2");
        dic30.add("story", "�����ػ��ߵĵ���");
        dic30.add("speed", "0");
        dic30.add("attack_param_a", "0");
        dic30.add("attack_param_b", "0");
        dic30.add("common_skill_id", "30");
        dic30.add("special_skill_id", "1030");
        dic30.add("level_max", "500");
        dic30.add("level_cost", "5");
        dic30.add("lottery_param_a", "0");
        dic30.add("lottery_param_b", "150");
        dic30.add("star_type", "2");
        dic30.add("res_num", "1");
        dic30.add("source", "27");
        this.infDic.add("30", dic30);
        let dic31 = new Dictionary<string, any>();
        dic31.add("id", "31");
        dic31.add("name", "��֮����");
        dic31.add("quality", "2");
        dic31.add("story", "�߹�·��ȫ������");
        dic31.add("speed", "0");
        dic31.add("attack_param_a", "0");
        dic31.add("attack_param_b", "0");
        dic31.add("common_skill_id", "31");
        dic31.add("special_skill_id", "1031");
        dic31.add("level_max", "10");
        dic31.add("level_cost", "100");
        dic31.add("lottery_param_a", "0");
        dic31.add("lottery_param_b", "150");
        dic31.add("star_type", "3");
        dic31.add("res_num", "1");
        dic31.add("source", "27");
        this.infDic.add("31", dic31);
        let dic32 = new Dictionary<string, any>();
        dic32.add("id", "32");
        dic32.add("name", "��֮����");
        dic32.add("quality", "2");
        dic32.add("story", "�����ػ��ߵĵ���");
        dic32.add("speed", "0");
        dic32.add("attack_param_a", "0");
        dic32.add("attack_param_b", "0");
        dic32.add("common_skill_id", "32");
        dic32.add("special_skill_id", "1032");
        dic32.add("level_max", "10");
        dic32.add("level_cost", "100");
        dic32.add("lottery_param_a", "0");
        dic32.add("lottery_param_b", "150");
        dic32.add("star_type", "1");
        dic32.add("res_num", "1");
        dic32.add("source", "27");
        this.infDic.add("32", dic32);
        let dic33 = new Dictionary<string, any>();
        dic33.add("id", "33");
        dic33.add("name", "��ħ��Ů��");
        dic33.add("quality", "3");
        dic33.add("story", "�͵��Ļ������ز�ס���ƻ�����");
        dic33.add("speed", "3");
        dic33.add("attack_param_a", "146.6");
        dic33.add("attack_param_b", "0.0261");
        dic33.add("common_skill_id", "33");
        dic33.add("special_skill_id", "1033");
        dic33.add("level_max", "500");
        dic33.add("level_cost", "5");
        dic33.add("lottery_param_a", "50");
        dic33.add("lottery_param_b", "0");
        dic33.add("star_type", "0");
        dic33.add("res_num", "2");
        dic33.add("source", "127");
        this.infDic.add("33", dic33);
        let dic34 = new Dictionary<string, any>();
        dic34.add("id", "34");
        dic34.add("name", "С����");
        dic34.add("quality", "4");
        dic34.add("story", "���ṥ�������ǻ�����˼��٣������Ѽ��٣�ȫ����Ѳ�������");
        dic34.add("speed", "1");
        dic34.add("attack_param_a", "0");
        dic34.add("attack_param_b", "0");
        dic34.add("common_skill_id", "34");
        dic34.add("special_skill_id", "1034");
        dic34.add("level_max", "1");
        dic34.add("level_cost", "0");
        dic34.add("lottery_param_a", "0");
        dic34.add("lottery_param_b", "0");
        dic34.add("star_type", "1");
        dic34.add("res_num", "1");
        dic34.add("source", "1");
        this.infDic.add("34", dic34);
        let dic35 = new Dictionary<string, any>();
        dic35.add("id", "35");
        dic35.add("name", "������Ů");
        dic35.add("quality", "4");
        dic35.add("story", "˭�ߵ����ʹ���˭��");
        dic35.add("speed", "3");
        dic35.add("attack_param_a", "147.6");
        dic35.add("attack_param_b", "0.0273");
        dic35.add("common_skill_id", "35");
        dic35.add("special_skill_id", "1035");
        dic35.add("level_max", "500");
        dic35.add("level_cost", "10");
        dic35.add("lottery_param_a", "0");
        dic35.add("lottery_param_b", "15");
        dic35.add("star_type", "0");
        dic35.add("res_num", "2");
        dic35.add("source", "3627");
        this.infDic.add("35", dic35);
        let dic36 = new Dictionary<string, any>();
        dic36.add("id", "36");
        dic36.add("name", "��ʨ֮��");
        dic36.add("quality", "4");
        dic36.add("story", "ʨ����ķ����ɯ�������ػ��ˣ��ĸﴺ��...");
        dic36.add("speed", "3");
        dic36.add("attack_param_a", "147.8");
        dic36.add("attack_param_b", "0.0271");
        dic36.add("common_skill_id", "36");
        dic36.add("special_skill_id", "1036");
        dic36.add("level_max", "500");
        dic36.add("level_cost", "10");
        dic36.add("lottery_param_a", "0");
        dic36.add("lottery_param_b", "5");
        dic36.add("star_type", "0");
        dic36.add("res_num", "2");
        dic36.add("source", "527");
        this.infDic.add("36", dic36);
    }
    
}
