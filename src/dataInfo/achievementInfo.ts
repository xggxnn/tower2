import Dictionary from "../Tool/Dictionary"; 

export default class achievementInfo {

    private infDic: Dictionary<number, Dictionary<string, any>> = new Dictionary<number, Dictionary<string, any>>();

    public get id(): string {
        return "id";
    }
    public get type(): string {
        return "type";
    }
    public get name(): string {
        return "name";
    }
    public get conditions(): string {
        return "conditions";
    }
    public get num(): string {
        return "num";
    }
    public get points(): string {
        return "points";
    }
    public get award(): string {
        return "award";
    }
    public get anum(): string {
        return "anum";
    }

    /**
     * 依据id获得配置信息
     * @param id 配置id
     */
    public getInfo(id: number): Dictionary<string, any> {
        if (this.infDic.hasKey(id)) {
            return this.infDic.getValue(id);
        }
        return null;
    }

    private constructor() {
        this.infDic = new Dictionary<number, Dictionary<string, any>>();
        let dic1 = new Dictionary<string, any>();
        dic1.add(this.id, "1");
        dic1.add(this.type, "14");
        dic1.add(this.name, "邀请好友");
        dic1.add(this.conditions, "通过分享游戏，累计邀请{0}个新玩家");
        dic1.add(this.num, "1");
        dic1.add(this.points, "5");
        dic1.add(this.award, "4");
        dic1.add(this.anum, "1");
        this.infDic.add(1, dic1);
        let dic2 = new Dictionary<string, any>();
        dic2.add(this.id, "2");
        dic2.add(this.type, "14");
        dic2.add(this.name, "三五成群");
        dic2.add(this.conditions, "通过分享游戏，累计邀请{0}个新玩家");
        dic2.add(this.num, "3");
        dic2.add(this.points, "5");
        dic2.add(this.award, "4");
        dic2.add(this.anum, "3");
        this.infDic.add(2, dic2);
        let dic3 = new Dictionary<string, any>();
        dic3.add(this.id, "3");
        dic3.add(this.type, "14");
        dic3.add(this.name, "呼朋引伴");
        dic3.add(this.conditions, "通过分享游戏，累计邀请{0}个新玩家");
        dic3.add(this.num, "9");
        dic3.add(this.points, "5");
        dic3.add(this.award, "4");
        dic3.add(this.anum, "5");
        this.infDic.add(3, dic3);
        let dic4 = new Dictionary<string, any>();
        dic4.add(this.id, "4");
        dic4.add(this.type, "10");
        dic4.add(this.name, "初学者");
        dic4.add(this.conditions, "点亮{0}个英雄图鉴");
        dic4.add(this.num, "15");
        dic4.add(this.points, "10");
        dic4.add(this.award, "1");
        dic4.add(this.anum, "1000");
        this.infDic.add(4, dic4);
        let dic5 = new Dictionary<string, any>();
        dic5.add(this.id, "5");
        dic5.add(this.type, "10");
        dic5.add(this.name, "收集者");
        dic5.add(this.conditions, "点亮{0}个英雄图鉴");
        dic5.add(this.num, "30");
        dic5.add(this.points, "20");
        dic5.add(this.award, "3");
        dic5.add(this.anum, "1000");
        this.infDic.add(5, dic5);
        let dic6 = new Dictionary<string, any>();
        dic6.add(this.id, "6");
        dic6.add(this.type, "10");
        dic6.add(this.name, "收藏家");
        dic6.add(this.conditions, "点亮{0}个英雄图鉴");
        dic6.add(this.num, "34");
        dic6.add(this.points, "30");
        dic6.add(this.award, "2");
        dic6.add(this.anum, "1000");
        this.infDic.add(6, dic6);
        let dic7 = new Dictionary<string, any>();
        dic7.add(this.id, "7");
        dic7.add(this.type, "10");
        dic7.add(this.name, "收藏控");
        dic7.add(this.conditions, "点亮{0}个英雄图鉴");
        dic7.add(this.num, "36");
        dic7.add(this.points, "50");
        dic7.add(this.award, "2");
        dic7.add(this.anum, "10000");
        this.infDic.add(7, dic7);
        let dic8 = new Dictionary<string, any>();
        dic8.add(this.id, "8");
        dic8.add(this.type, "8");
        dic8.add(this.name, "小队长");
        dic8.add(this.conditions, "累积召唤{0}次英雄");
        dic8.add(this.num, "100");
        dic8.add(this.points, "10");
        dic8.add(this.award, "3");
        dic8.add(this.anum, "100");
        this.infDic.add(8, dic8);
        let dic9 = new Dictionary<string, any>();
        dic9.add(this.id, "9");
        dic9.add(this.type, "8");
        dic9.add(this.name, "小将军");
        dic9.add(this.conditions, "累积召唤{0}次英雄");
        dic9.add(this.num, "1000");
        dic9.add(this.points, "20");
        dic9.add(this.award, "3");
        dic9.add(this.anum, "1000");
        this.infDic.add(9, dic9);
        let dic10 = new Dictionary<string, any>();
        dic10.add(this.id, "10");
        dic10.add(this.type, "8");
        dic10.add(this.name, "小国王");
        dic10.add(this.conditions, "累积召唤{0}次英雄");
        dic10.add(this.num, "10000");
        dic10.add(this.points, "30");
        dic10.add(this.award, "3");
        dic10.add(this.anum, "10000");
        this.infDic.add(10, dic10);
        let dic11 = new Dictionary<string, any>();
        dic11.add(this.id, "11");
        dic11.add(this.type, "2");
        dic11.add(this.name, "小试牛刀");
        dic11.add(this.conditions, "累积击杀{0}个敌人");
        dic11.add(this.num, "1000");
        dic11.add(this.points, "10");
        dic11.add(this.award, "1");
        dic11.add(this.anum, "1000");
        this.infDic.add(11, dic11);
        let dic12 = new Dictionary<string, any>();
        dic12.add(this.id, "12");
        dic12.add(this.type, "2");
        dic12.add(this.name, "伸手一搏");
        dic12.add(this.conditions, "累积击杀{0}个敌人");
        dic12.add(this.num, "5000");
        dic12.add(this.points, "20");
        dic12.add(this.award, "1");
        dic12.add(this.anum, "10000");
        this.infDic.add(12, dic12);
        let dic13 = new Dictionary<string, any>();
        dic13.add(this.id, "13");
        dic13.add(this.type, "2");
        dic13.add(this.name, "功勋卓著");
        dic13.add(this.conditions, "累积击杀{0}个敌人");
        dic13.add(this.num, "10000");
        dic13.add(this.points, "30");
        dic13.add(this.award, "1");
        dic13.add(this.anum, "30000");
        this.infDic.add(13, dic13);
        let dic14 = new Dictionary<string, any>();
        dic14.add(this.id, "14");
        dic14.add(this.type, "2");
        dic14.add(this.name, "战功累累");
        dic14.add(this.conditions, "累积击杀十万个敌人");
        dic14.add(this.num, "100000");
        dic14.add(this.points, "40");
        dic14.add(this.award, "2");
        dic14.add(this.anum, "1000");
        this.infDic.add(14, dic14);
        let dic15 = new Dictionary<string, any>();
        dic15.add(this.id, "15");
        dic15.add(this.type, "4");
        dic15.add(this.name, "哥布林杀手");
        dic15.add(this.conditions, "累积杀死{0}个哥布林");
        dic15.add(this.num, "10");
        dic15.add(this.points, "10");
        dic15.add(this.award, "1");
        dic15.add(this.anum, "1000");
        this.infDic.add(15, dic15);
        let dic16 = new Dictionary<string, any>();
        dic16.add(this.id, "16");
        dic16.add(this.type, "4");
        dic16.add(this.name, "哥布林天敌");
        dic16.add(this.conditions, "累积杀死{0}个哥布林");
        dic16.add(this.num, "50");
        dic16.add(this.points, "10");
        dic16.add(this.award, "2");
        dic16.add(this.anum, "1000");
        this.infDic.add(16, dic16);
        let dic17 = new Dictionary<string, any>();
        dic17.add(this.id, "17");
        dic17.add(this.type, "4");
        dic17.add(this.name, "哥布林屠戮者");
        dic17.add(this.conditions, "累积杀死{0}个哥布林");
        dic17.add(this.num, "200");
        dic17.add(this.points, "10");
        dic17.add(this.award, "2");
        dic17.add(this.anum, "10000");
        this.infDic.add(17, dic17);
        let dic18 = new Dictionary<string, any>();
        dic18.add(this.id, "18");
        dic18.add(this.type, "9");
        dic18.add(this.name, "小康之家");
        dic18.add(this.conditions, "累积获得十万金币");
        dic18.add(this.num, "100000");
        dic18.add(this.points, "10");
        dic18.add(this.award, "2");
        dic18.add(this.anum, "300");
        this.infDic.add(18, dic18);
        let dic19 = new Dictionary<string, any>();
        dic19.add(this.id, "19");
        dic19.add(this.type, "9");
        dic19.add(this.name, "大富大贵");
        dic19.add(this.conditions, "累积获得一百万金币");
        dic19.add(this.num, "1000000");
        dic19.add(this.points, "20");
        dic19.add(this.award, "2");
        dic19.add(this.anum, "500");
        this.infDic.add(19, dic19);
        let dic20 = new Dictionary<string, any>();
        dic20.add(this.id, "20");
        dic20.add(this.type, "9");
        dic20.add(this.name, "富可敌国");
        dic20.add(this.conditions, "累积获得一千万金币");
        dic20.add(this.num, "10000000");
        dic20.add(this.points, "30");
        dic20.add(this.award, "2");
        dic20.add(this.anum, "800");
        this.infDic.add(20, dic20);
        let dic21 = new Dictionary<string, any>();
        dic21.add(this.id, "21");
        dic21.add(this.type, "5");
        dic21.add(this.name, "衰神附体");
        dic21.add(this.conditions, "完成一次十连抽全都是精英级英雄");
        dic21.add(this.num, "1");
        dic21.add(this.points, "5");
        dic21.add(this.award, "2");
        dic21.add(this.anum, "1000");
        this.infDic.add(21, dic21);
        let dic22 = new Dictionary<string, any>();
        dic22.add(this.id, "22");
        dic22.add(this.type, "6");
        dic22.add(this.name, "小红手");
        dic22.add(this.conditions, "完成一次十连抽全都是传说级英雄");
        dic22.add(this.num, "1");
        dic22.add(this.points, "5");
        dic22.add(this.award, "2");
        dic22.add(this.anum, "1000");
        this.infDic.add(22, dic22);
        let dic23 = new Dictionary<string, any>();
        dic23.add(this.id, "23");
        dic23.add(this.type, "7");
        dic23.add(this.name, "开门红");
        dic23.add(this.conditions, "完成一次十连抽抽到最少3个神话级英雄");
        dic23.add(this.num, "1");
        dic23.add(this.points, "5");
        dic23.add(this.award, "2");
        dic23.add(this.anum, "1000");
        this.infDic.add(23, dic23);
        let dic24 = new Dictionary<string, any>();
        dic24.add(this.id, "24");
        dic24.add(this.type, "11");
        dic24.add(this.name, "神话故事");
        dic24.add(this.conditions, "完成一次一百连抽抽到7个神话英雄");
        dic24.add(this.num, "1");
        dic24.add(this.points, "5");
        dic24.add(this.award, "3");
        dic24.add(this.anum, "10000");
        this.infDic.add(24, dic24);
        let dic25 = new Dictionary<string, any>();
        dic25.add(this.id, "25");
        dic25.add(this.type, "12");
        dic25.add(this.name, "连连看");
        dic25.add(this.conditions, "完成一次十连抽同排或者同列有三个相同的英雄");
        dic25.add(this.num, "1");
        dic25.add(this.points, "5");
        dic25.add(this.award, "3");
        dic25.add(this.anum, "10000");
        this.infDic.add(25, dic25);
        let dic26 = new Dictionary<string, any>();
        dic26.add(this.id, "26");
        dic26.add(this.type, "13");
        dic26.add(this.name, "超级连连看");
        dic26.add(this.conditions, "完成一次十连抽同列有四个相同的英雄");
        dic26.add(this.num, "1");
        dic26.add(this.points, "5");
        dic26.add(this.award, "2");
        dic26.add(this.anum, "10000");
        this.infDic.add(26, dic26);
    }
    
}
