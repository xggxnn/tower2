import Dictionary from "../Tool/Dictionary"; 

export default class MonsterInfo {

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
     * �ٶ�
     */
    public get speed(): any {
        return this.curInf.getValue("speed");
    }
    /**
     * ��������0Ϊ��������
     */
    public get atk(): any {
        return this.curInf.getValue("atk");
    }
    /**
     * ����Ƶ��(0Ϊ������)
     */
    public get frequency(): any {
        return this.curInf.getValue("frequency");
    }
    /**
     * ��������
     */
    public get special_power(): any {
        return this.curInf.getValue("special_power");
    }
    /**
     * ���id
     */
    public get sk(): any {
        return this.curInf.getValue("sk");
    }
    /**
     * ���ùؿ�����
     */
    public get big_wave(): any {
        return this.curInf.getValue("big_wave");
    }
    /**
     * Ѫ������
     */
    public get hp(): any {
        return this.curInf.getValue("hp");
    }
    /**
     * �������1
     */
    public get special1(): any {
        return this.curInf.getValue("special1");
    }
    /**
     * �������2
     */
    public get specail2(): any {
        return this.curInf.getValue("specail2");
    }
    /**
     * Ѫ����׼����
     */
    public get base_hp(): any {
        return this.curInf.getValue("base_hp");
    }
    /**
     * ������׼����
     */
    public get base_num(): any {
        return this.curInf.getValue("base_num");
    }
    constructor(id: string) {
        this.curInf = MonsterInfo.infDic.getValue(id);
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public static getInfo(id: any): MonsterInfo {
        let ids: string = String(id);
        if (this.infDic.hasKey(ids)) {
            return new MonsterInfo(ids);
        }
        return null;
    }
    private static infList: MonsterInfo[] = null;
    public static getList(): Array<MonsterInfo> {
        if (this.infList == null) {
            let list: string[] = this.infDic.getKeys();
            this.infList = [];
            for (let i = 0, len = list.length; i < len; i++) { 
                this.infList.push(new MonsterInfo(list[i]));
            }
        }
        return this.infList;
    }
    static init() {
        this.infDic = new Dictionary<string, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add("id", "1");
        dic1.add("type", "5");
        dic1.add("speed", "6");
        dic1.add("atk", "0");
        dic1.add("frequency", "0");
        dic1.add("special_power", "��Ѫ-��ϸ߱�");
        dic1.add("sk", "1");
        dic1.add("big_wave", "12");
        dic1.add("hp", "20");
        dic1.add("special1", "0");
        dic1.add("specail2", "0");
        dic1.add("base_hp", "20");
        dic1.add("base_num", "1");
        this.infDic.add("1", dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add("id", "2");
        dic2.add("type", "6");
        dic2.add("speed", "12");
        dic2.add("atk", "0");
        dic2.add("frequency", "0");
        dic2.add("special_power", "����-��ϸ�Ƶ");
        dic2.add("sk", "2");
        dic2.add("big_wave", "23");
        dic2.add("hp", "40");
        dic2.add("special1", "0");
        dic2.add("specail2", "0");
        dic2.add("base_hp", "40");
        dic2.add("base_num", "1");
        this.infDic.add("2", dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add("id", "3");
        dic3.add("type", "7");
        dic3.add("speed", "6");
        dic3.add("atk", "2");
        dic3.add("frequency", "1");
        dic3.add("special_power", "0");
        dic3.add("sk", "3");
        dic3.add("big_wave", "34");
        dic3.add("hp", "20");
        dic3.add("special1", "0");
        dic3.add("specail2", "0");
        dic3.add("base_hp", "20");
        dic3.add("base_num", "1");
        this.infDic.add("3", dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add("id", "4");
        dic4.add("type", "5");
        dic4.add("speed", "6");
        dic4.add("atk", "0");
        dic4.add("frequency", "0");
        dic4.add("special_power", "�ӷ�-��Ͼ��⡢�߱�");
        dic4.add("sk", "4");
        dic4.add("big_wave", "12");
        dic4.add("hp", "30");
        dic4.add("special1", "0");
        dic4.add("specail2", "0");
        dic4.add("base_hp", "30");
        dic4.add("base_num", "1");
        this.infDic.add("4", dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add("id", "5");
        dic5.add("type", "6");
        dic5.add("speed", "12");
        dic5.add("atk", "0");
        dic5.add("frequency", "0");
        dic5.add("special_power", "������-��ϸ�Ƶ");
        dic5.add("sk", "5");
        dic5.add("big_wave", "23");
        dic5.add("hp", "50");
        dic5.add("special1", "0");
        dic5.add("specail2", "0");
        dic5.add("base_hp", "50");
        dic5.add("base_num", "1");
        this.infDic.add("5", dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add("id", "6");
        dic6.add("type", "5");
        dic6.add("speed", "6");
        dic6.add("atk", "0");
        dic6.add("frequency", "0");
        dic6.add("special_power", "������-��ϸ߱�");
        dic6.add("sk", "6");
        dic6.add("big_wave", "34");
        dic6.add("hp", "50");
        dic6.add("special1", "0");
        dic6.add("specail2", "0");
        dic6.add("base_hp", "50");
        dic6.add("base_num", "1");
        this.infDic.add("6", dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add("id", "7");
        dic7.add("type", "7");
        dic7.add("speed", "6");
        dic7.add("atk", "2");
        dic7.add("frequency", "1");
        dic7.add("special_power", "0");
        dic7.add("sk", "7");
        dic7.add("big_wave", "34");
        dic7.add("hp", "18");
        dic7.add("special1", "0");
        dic7.add("specail2", "0");
        dic7.add("base_hp", "18");
        dic7.add("base_num", "1");
        this.infDic.add("7", dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add("id", "8");
        dic8.add("type", "7");
        dic8.add("speed", "6");
        dic8.add("atk", "2");
        dic8.add("frequency", "1");
        dic8.add("special_power", "0");
        dic8.add("sk", "8");
        dic8.add("big_wave", "34");
        dic8.add("hp", "15");
        dic8.add("special1", "0");
        dic8.add("specail2", "0");
        dic8.add("base_hp", "15");
        dic8.add("base_num", "1");
        this.infDic.add("8", dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add("id", "9");
        dic9.add("type", "1");
        dic9.add("speed", "8");
        dic9.add("atk", "0");
        dic9.add("frequency", "0");
        dic9.add("special_power", "0");
        dic9.add("sk", "9");
        dic9.add("big_wave", "12");
        dic9.add("hp", "10");
        dic9.add("special1", "0");
        dic9.add("specail2", "0");
        dic9.add("base_hp", "10");
        dic9.add("base_num", "1");
        this.infDic.add("9", dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add("id", "10");
        dic10.add("type", "1");
        dic10.add("speed", "8");
        dic10.add("atk", "0");
        dic10.add("frequency", "0");
        dic10.add("special_power", "0");
        dic10.add("sk", "10");
        dic10.add("big_wave", "23");
        dic10.add("hp", "9");
        dic10.add("special1", "0");
        dic10.add("specail2", "0");
        dic10.add("base_hp", "9");
        dic10.add("base_num", "1");
        this.infDic.add("10", dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add("id", "11");
        dic11.add("type", "1");
        dic11.add("speed", "9");
        dic11.add("atk", "0");
        dic11.add("frequency", "0");
        dic11.add("special_power", "0");
        dic11.add("sk", "11");
        dic11.add("big_wave", "34");
        dic11.add("hp", "8");
        dic11.add("special1", "0");
        dic11.add("specail2", "0");
        dic11.add("base_hp", "8");
        dic11.add("base_num", "1");
        this.infDic.add("11", dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add("id", "12");
        dic12.add("type", "1");
        dic12.add("speed", "9");
        dic12.add("atk", "0");
        dic12.add("frequency", "0");
        dic12.add("special_power", "0");
        dic12.add("sk", "12");
        dic12.add("big_wave", "12");
        dic12.add("hp", "7");
        dic12.add("special1", "0");
        dic12.add("specail2", "0");
        dic12.add("base_hp", "7");
        dic12.add("base_num", "1");
        this.infDic.add("12", dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add("id", "13");
        dic13.add("type", "1");
        dic13.add("speed", "10");
        dic13.add("atk", "0");
        dic13.add("frequency", "0");
        dic13.add("special_power", "0");
        dic13.add("sk", "13");
        dic13.add("big_wave", "23");
        dic13.add("hp", "6");
        dic13.add("special1", "0");
        dic13.add("specail2", "0");
        dic13.add("base_hp", "6");
        dic13.add("base_num", "1");
        this.infDic.add("13", dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add("id", "14");
        dic14.add("type", "1");
        dic14.add("speed", "10");
        dic14.add("atk", "0");
        dic14.add("frequency", "0");
        dic14.add("special_power", "0");
        dic14.add("sk", "14");
        dic14.add("big_wave", "34");
        dic14.add("hp", "5");
        dic14.add("special1", "0");
        dic14.add("specail2", "0");
        dic14.add("base_hp", "5");
        dic14.add("base_num", "1");
        this.infDic.add("14", dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add("id", "15");
        dic15.add("type", "1");
        dic15.add("speed", "11");
        dic15.add("atk", "0");
        dic15.add("frequency", "0");
        dic15.add("special_power", "0");
        dic15.add("sk", "15");
        dic15.add("big_wave", "34");
        dic15.add("hp", "4");
        dic15.add("special1", "0");
        dic15.add("specail2", "0");
        dic15.add("base_hp", "4");
        dic15.add("base_num", "1");
        this.infDic.add("15", dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add("id", "16");
        dic16.add("type", "1");
        dic16.add("speed", "11");
        dic16.add("atk", "0");
        dic16.add("frequency", "0");
        dic16.add("special_power", "0");
        dic16.add("sk", "16");
        dic16.add("big_wave", "34");
        dic16.add("hp", "3");
        dic16.add("special1", "0");
        dic16.add("specail2", "0");
        dic16.add("base_hp", "3");
        dic16.add("base_num", "1");
        this.infDic.add("16", dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add("id", "17");
        dic17.add("type", "3");
        dic17.add("speed", "11");
        dic17.add("atk", "0");
        dic17.add("frequency", "0");
        dic17.add("special_power", "0");
        dic17.add("sk", "17");
        dic17.add("big_wave", "12");
        dic17.add("hp", "3");
        dic17.add("special1", "0");
        dic17.add("specail2", "0");
        dic17.add("base_hp", "3");
        dic17.add("base_num", "1");
        this.infDic.add("17", dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add("id", "18");
        dic18.add("type", "4");
        dic18.add("speed", "11");
        dic18.add("atk", "1");
        dic18.add("frequency", "1");
        dic18.add("special_power", "0");
        dic18.add("sk", "18");
        dic18.add("big_wave", "23");
        dic18.add("hp", "3");
        dic18.add("special1", "0");
        dic18.add("specail2", "0");
        dic18.add("base_hp", "3");
        dic18.add("base_num", "1");
        this.infDic.add("18", dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add("id", "19");
        dic19.add("type", "3");
        dic19.add("speed", "12");
        dic19.add("atk", "0");
        dic19.add("frequency", "0");
        dic19.add("special_power", "0");
        dic19.add("sk", "19");
        dic19.add("big_wave", "34");
        dic19.add("hp", "3");
        dic19.add("special1", "0");
        dic19.add("specail2", "0");
        dic19.add("base_hp", "3");
        dic19.add("base_num", "1");
        this.infDic.add("19", dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add("id", "20");
        dic20.add("type", "4");
        dic20.add("speed", "12");
        dic20.add("atk", "1");
        dic20.add("frequency", "1");
        dic20.add("special_power", "0");
        dic20.add("sk", "20");
        dic20.add("big_wave", "12");
        dic20.add("hp", "3");
        dic20.add("special1", "0");
        dic20.add("specail2", "0");
        dic20.add("base_hp", "3");
        dic20.add("base_num", "1");
        this.infDic.add("20", dic20);
        let dic21 = new Dictionary<string, any>();
        dic21.add("id", "21");
        dic21.add("type", "3");
        dic21.add("speed", "13");
        dic21.add("atk", "0");
        dic21.add("frequency", "0");
        dic21.add("special_power", "0");
        dic21.add("sk", "21");
        dic21.add("big_wave", "23");
        dic21.add("hp", "3");
        dic21.add("special1", "0");
        dic21.add("specail2", "0");
        dic21.add("base_hp", "3");
        dic21.add("base_num", "1");
        this.infDic.add("21", dic21);
        let dic22 = new Dictionary<string, any>();
        dic22.add("id", "22");
        dic22.add("type", "3");
        dic22.add("speed", "13");
        dic22.add("atk", "0");
        dic22.add("frequency", "0");
        dic22.add("special_power", "0");
        dic22.add("sk", "22");
        dic22.add("big_wave", "34");
        dic22.add("hp", "3");
        dic22.add("special1", "0");
        dic22.add("specail2", "0");
        dic22.add("base_hp", "3");
        dic22.add("base_num", "1");
        this.infDic.add("22", dic22);
        let dic23 = new Dictionary<string, any>();
        dic23.add("id", "23");
        dic23.add("type", "4");
        dic23.add("speed", "14");
        dic23.add("atk", "1");
        dic23.add("frequency", "1");
        dic23.add("special_power", "0");
        dic23.add("sk", "23");
        dic23.add("big_wave", "34");
        dic23.add("hp", "3");
        dic23.add("special1", "0");
        dic23.add("specail2", "0");
        dic23.add("base_hp", "3");
        dic23.add("base_num", "1");
        this.infDic.add("23", dic23);
        let dic24 = new Dictionary<string, any>();
        dic24.add("id", "24");
        dic24.add("type", "3");
        dic24.add("speed", "14");
        dic24.add("atk", "0");
        dic24.add("frequency", "0");
        dic24.add("special_power", "0");
        dic24.add("sk", "24");
        dic24.add("big_wave", "34");
        dic24.add("hp", "3");
        dic24.add("special1", "0");
        dic24.add("specail2", "0");
        dic24.add("base_hp", "3");
        dic24.add("base_num", "1");
        this.infDic.add("24", dic24);
        let dic25 = new Dictionary<string, any>();
        dic25.add("id", "25");
        dic25.add("type", "4");
        dic25.add("speed", "15");
        dic25.add("atk", "1");
        dic25.add("frequency", "1");
        dic25.add("special_power", "0");
        dic25.add("sk", "25");
        dic25.add("big_wave", "12");
        dic25.add("hp", "3");
        dic25.add("special1", "0");
        dic25.add("specail2", "0");
        dic25.add("base_hp", "3");
        dic25.add("base_num", "1");
        this.infDic.add("25", dic25);
        let dic26 = new Dictionary<string, any>();
        dic26.add("id", "26");
        dic26.add("type", "3");
        dic26.add("speed", "15");
        dic26.add("atk", "0");
        dic26.add("frequency", "0");
        dic26.add("special_power", "0");
        dic26.add("sk", "26");
        dic26.add("big_wave", "23");
        dic26.add("hp", "3");
        dic26.add("special1", "0");
        dic26.add("specail2", "0");
        dic26.add("base_hp", "3");
        dic26.add("base_num", "1");
        this.infDic.add("26", dic26);
        let dic27 = new Dictionary<string, any>();
        dic27.add("id", "27");
        dic27.add("type", "3");
        dic27.add("speed", "16");
        dic27.add("atk", "0");
        dic27.add("frequency", "0");
        dic27.add("special_power", "0");
        dic27.add("sk", "27");
        dic27.add("big_wave", "34");
        dic27.add("hp", "3");
        dic27.add("special1", "0");
        dic27.add("specail2", "0");
        dic27.add("base_hp", "3");
        dic27.add("base_num", "1");
        this.infDic.add("27", dic27);
        let dic28 = new Dictionary<string, any>();
        dic28.add("id", "28");
        dic28.add("type", "3");
        dic28.add("speed", "16");
        dic28.add("atk", "0");
        dic28.add("frequency", "0");
        dic28.add("special_power", "0");
        dic28.add("sk", "28");
        dic28.add("big_wave", "12");
        dic28.add("hp", "3");
        dic28.add("special1", "0");
        dic28.add("specail2", "0");
        dic28.add("base_hp", "3");
        dic28.add("base_num", "1");
        this.infDic.add("28", dic28);
        let dic29 = new Dictionary<string, any>();
        dic29.add("id", "29");
        dic29.add("type", "4");
        dic29.add("speed", "17");
        dic29.add("atk", "1");
        dic29.add("frequency", "1");
        dic29.add("special_power", "0");
        dic29.add("sk", "29");
        dic29.add("big_wave", "23");
        dic29.add("hp", "3");
        dic29.add("special1", "0");
        dic29.add("specail2", "0");
        dic29.add("base_hp", "3");
        dic29.add("base_num", "1");
        this.infDic.add("29", dic29);
        let dic30 = new Dictionary<string, any>();
        dic30.add("id", "30");
        dic30.add("type", "3");
        dic30.add("speed", "17");
        dic30.add("atk", "0");
        dic30.add("frequency", "0");
        dic30.add("special_power", "0");
        dic30.add("sk", "30");
        dic30.add("big_wave", "34");
        dic30.add("hp", "3");
        dic30.add("special1", "0");
        dic30.add("specail2", "0");
        dic30.add("base_hp", "3");
        dic30.add("base_num", "1");
        this.infDic.add("30", dic30);
        let dic31 = new Dictionary<string, any>();
        dic31.add("id", "31");
        dic31.add("type", "3");
        dic31.add("speed", "18");
        dic31.add("atk", "0");
        dic31.add("frequency", "0");
        dic31.add("special_power", "0");
        dic31.add("sk", "31");
        dic31.add("big_wave", "34");
        dic31.add("hp", "3");
        dic31.add("special1", "0");
        dic31.add("specail2", "0");
        dic31.add("base_hp", "3");
        dic31.add("base_num", "1");
        this.infDic.add("31", dic31);
        let dic32 = new Dictionary<string, any>();
        dic32.add("id", "32");
        dic32.add("type", "3");
        dic32.add("speed", "18");
        dic32.add("atk", "0");
        dic32.add("frequency", "0");
        dic32.add("special_power", "0");
        dic32.add("sk", "32");
        dic32.add("big_wave", "34");
        dic32.add("hp", "3");
        dic32.add("special1", "0");
        dic32.add("specail2", "0");
        dic32.add("base_hp", "3");
        dic32.add("base_num", "1");
        this.infDic.add("32", dic32);
        let dic33 = new Dictionary<string, any>();
        dic33.add("id", "33");
        dic33.add("type", "3");
        dic33.add("speed", "19");
        dic33.add("atk", "0");
        dic33.add("frequency", "0");
        dic33.add("special_power", "0");
        dic33.add("sk", "33");
        dic33.add("big_wave", "34");
        dic33.add("hp", "3");
        dic33.add("special1", "0");
        dic33.add("specail2", "0");
        dic33.add("base_hp", "3");
        dic33.add("base_num", "1");
        this.infDic.add("33", dic33);
        let dic34 = new Dictionary<string, any>();
        dic34.add("id", "34");
        dic34.add("type", "2");
        dic34.add("speed", "19");
        dic34.add("atk", "0");
        dic34.add("frequency", "0");
        dic34.add("special_power", "����");
        dic34.add("sk", "34");
        dic34.add("big_wave", "12");
        dic34.add("hp", "0.5");
        dic34.add("special1", "3");
        dic34.add("specail2", "2");
        dic34.add("base_hp", "0.5");
        dic34.add("base_num", "7");
        this.infDic.add("34", dic34);
        let dic35 = new Dictionary<string, any>();
        dic35.add("id", "35");
        dic35.add("type", "2");
        dic35.add("speed", "15");
        dic35.add("atk", "0");
        dic35.add("frequency", "0");
        dic35.add("special_power", "����");
        dic35.add("sk", "35");
        dic35.add("big_wave", "23");
        dic35.add("hp", "2");
        dic35.add("special1", "3");
        dic35.add("specail2", "2");
        dic35.add("base_hp", "2");
        dic35.add("base_num", "7");
        this.infDic.add("35", dic35);
        let dic36 = new Dictionary<string, any>();
        dic36.add("id", "36");
        dic36.add("type", "2");
        dic36.add("speed", "19");
        dic36.add("atk", "0");
        dic36.add("frequency", "0");
        dic36.add("special_power", "����");
        dic36.add("sk", "36");
        dic36.add("big_wave", "34");
        dic36.add("hp", "0.5");
        dic36.add("special1", "5");
        dic36.add("specail2", "1");
        dic36.add("base_hp", "0.5");
        dic36.add("base_num", "6");
        this.infDic.add("36", dic36);
        let dic37 = new Dictionary<string, any>();
        dic37.add("id", "37");
        dic37.add("type", "2");
        dic37.add("speed", "15");
        dic37.add("atk", "0");
        dic37.add("frequency", "0");
        dic37.add("special_power", "����");
        dic37.add("sk", "37");
        dic37.add("big_wave", "12");
        dic37.add("hp", "3");
        dic37.add("special1", "5");
        dic37.add("specail2", "1");
        dic37.add("base_hp", "3");
        dic37.add("base_num", "6");
        this.infDic.add("37", dic37);
        let dic38 = new Dictionary<string, any>();
        dic38.add("id", "38");
        dic38.add("type", "2");
        dic38.add("speed", "19");
        dic38.add("atk", "0");
        dic38.add("frequency", "0");
        dic38.add("special_power", "����");
        dic38.add("sk", "38");
        dic38.add("big_wave", "23");
        dic38.add("hp", "1");
        dic38.add("special1", "3");
        dic38.add("specail2", "2");
        dic38.add("base_hp", "1");
        dic38.add("base_num", "7");
        this.infDic.add("38", dic38);
        let dic39 = new Dictionary<string, any>();
        dic39.add("id", "39");
        dic39.add("type", "2");
        dic39.add("speed", "15");
        dic39.add("atk", "0");
        dic39.add("frequency", "0");
        dic39.add("special_power", "����");
        dic39.add("sk", "39");
        dic39.add("big_wave", "34");
        dic39.add("hp", "4");
        dic39.add("special1", "3");
        dic39.add("specail2", "2");
        dic39.add("base_hp", "4");
        dic39.add("base_num", "7");
        this.infDic.add("39", dic39);
        let dic40 = new Dictionary<string, any>();
        dic40.add("id", "40");
        dic40.add("type", "2");
        dic40.add("speed", "19");
        dic40.add("atk", "0");
        dic40.add("frequency", "0");
        dic40.add("special_power", "����");
        dic40.add("sk", "40");
        dic40.add("big_wave", "34");
        dic40.add("hp", "1");
        dic40.add("special1", "5");
        dic40.add("specail2", "1");
        dic40.add("base_hp", "1");
        dic40.add("base_num", "6");
        this.infDic.add("40", dic40);
        let dic41 = new Dictionary<string, any>();
        dic41.add("id", "41");
        dic41.add("type", "2");
        dic41.add("speed", "19");
        dic41.add("atk", "0");
        dic41.add("frequency", "0");
        dic41.add("special_power", "����");
        dic41.add("sk", "41");
        dic41.add("big_wave", "34");
        dic41.add("hp", "1");
        dic41.add("special1", "5");
        dic41.add("specail2", "1");
        dic41.add("base_hp", "1");
        dic41.add("base_num", "6");
        this.infDic.add("41", dic41);
    }
    
}
