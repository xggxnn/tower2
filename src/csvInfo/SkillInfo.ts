import CSV from "./CSV";
import Dictionary from "../tool/Dictionary";

export default class SkillInfo {

    /**
     * 安装csv文件
     */
    public static installCSV(csv: CSV): void {
        var data = csv.getAllData();
        this._hashDic = new Dictionary<string, SkillInfo>();
        for (var id in data) {
            let item = data[id];
            let dic = new Dictionary<string, string>();
            for (var key in item) {
                dic.add(key, item[key]);
            }
            this._hashDic.add(id, new SkillInfo(dic));
        }
    }
    /**
     * 获取数据数量
     */
    public static getCount(): number {
        return this._hashDic.count;
    }
    /**
     * 通过id获取Info
     */
    public static getInfo(id: any): SkillInfo {
        return this._hashDic.getValue(id);
    }

    private static _hashDic: Dictionary<string, SkillInfo> = new Dictionary<string, SkillInfo>();
    public static server(dic: Dictionary<string, string>[]) {
        this._hashDic = new Dictionary<string, SkillInfo>();
        for (var id in dic) {
            let _id = dic[id].getValue("id");
            this._hashDic.add(_id, new SkillInfo(dic[id]));
        }
    }
    //构造函数
    private constructor(obj: Dictionary<string, string>) {
        //录入数据
        this._id = parseInt(obj.getValue("id"));
        this._types = parseInt(obj.getValue("type"));
        this._explain = obj.getValue("explain");
        this._des = obj.getValue("des");
        this._hit_type = parseInt(obj.getValue("hit_type"));
        this._rangevalue = parseInt(obj.getValue("rangevalue"));
        this._specialvalue = parseInt(obj.getValue("specialvalue"));
        this._specialtime = parseInt(obj.getValue("specialtime"));
        this._range = parseInt(obj.getValue("range"));
        this._cds = [];
        this._cds.push(Number(obj.getValue("cd1")));
        this._cds.push(Number(obj.getValue("cd2")));
        this._cds.push(Number(obj.getValue("cd3")));
        this._cds.push(Number(obj.getValue("cd4")));
        this._cds.push(Number(obj.getValue("cd5")));
        this._atkscale = Number(obj.getValue("atkscale"));
        this._crits = [];
        this._crits.push(Number(obj.getValue("crit1")));
        this._crits.push(Number(obj.getValue("crit2")));
        this._crits.push(Number(obj.getValue("crit3")));
        this._crits.push(Number(obj.getValue("crit4")));
        this._crits.push(Number(obj.getValue("crit5")));
        this._bursts = [];
        this._bursts.push(Number(obj.getValue("burst1")));
        this._bursts.push(Number(obj.getValue("burst2")));
        this._bursts.push(Number(obj.getValue("burst3")));
        this._bursts.push(Number(obj.getValue("burst4")));
        this._bursts.push(Number(obj.getValue("burst5")));
        this._attack_audio_id = parseInt(obj.getValue("attack_audio_id"));
        this._attackeffect_type = parseInt(obj.getValue("attackeffect_type"));
        this._attackeffect_id = parseInt(obj.getValue("attackeffect_id"));
        this._hiteffect_id = parseInt(obj.getValue("hiteffect_id"));
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _types: number;
    /**
     * 技能类型
     * 1 正常伤害
     * 2 高暴率buff，敌人身上buff，被暴击率 + {specialvalue}%，不可叠加，永不消失                                      +++++++
     * 3、提攻速同列1，同列英雄攻速提高50%，持续1秒                                                         +++++++
     * 4、时间机器，正常伤害
     * 5、提攻速同族（施法，给同族英雄加buff）  同族英雄攻速提高50%，持续1秒                                  +++++++
     * 6、减速加伤   正常敌人，正常伤害，  被减速的敌人，造成正常伤害，再额外加伤害{0}                           +++++++
     * 7、灼烧加伤   同上                                                                                   +++++++
     * 8、残血斩杀      敌人血量低于{0}%，秒杀，否则正常伤害                                                    +++++
     * 9、高爆伤buff1（施加在敌人身上，使其收到额外伤害）   敌人身上buff，被暴击伤害 + {0}%，不可叠加，永不消失     +++++++
     * 10、提攻速同行1（施法）  同行英雄攻速提高50%，持续1秒                                                         +++++++
     * 11、增加普攻对象数量x秒（对自身，相当于给自己加buff）    自身攻击数量增加{specialvalue}个，持续{specialtime}秒                      ++++
     * 12、芭蕉扇（击退/击飞敌人）      击退2格
     * 13、提攻速同职（施法）   同职英雄攻速提高50%，持续1秒                                                         +++++++
     * 14、双倍伤害buff（对自身，相当于给自己加buff）           自身双倍伤害，持续{1}秒                      ++++

     */
    public get types(): number {
        return this._types;
    }

    private _explain: string;
    public get explain(): string {
        let str = this._explain.replace("{atkscale}", this.atkscale.toString());
        str = str.replace("{specialvalue}", this.specialvalue.toString());
        str = str.replace("{specialtime}", this.specialtime.toString());
        str = str.replace("x", this.specialtime.toString());
        return str;
    }

    private _des: string;
    public get des(): string {
        return this._des;
    }

    private _hit_type: number;
    /**
     * 攻击类型
     1	单
     2	多      rangevalue = 对象数量
     3	溅射    rangevalue = 格子范围
     4	范围    
     5	全屏
     6	buff
     */
    public get hit_type(): number {
        return this._hit_type;
    }

    private _rangevalue: number;
    public get rangevalue(): number {
        return this._rangevalue;
    }

    private _specialvalue: number;
    public get specialvalue(): number {
        return this._specialvalue;
    }

    private _specialtime: number;
    public get specialtime(): number {
        return this._specialtime;
    }

    private _range: number;
    public get range(): number {
        return this._range;
    }

    private _cds: number[] = [];
    public get cds(): number[] {
        return this._cds;
    }

    private _atkscale: number;
    public get atkscale(): number {
        return this._atkscale;
    }

    private _crits: number[] = [];
    public get crits(): number[] {
        return this._crits;
    }

    private _bursts: number[] = [];
    public get bursts(): number[] {
        return this._bursts;
    }

    private _attack_audio_id: number;
    public get attack_audio_id(): number {
        return this._attack_audio_id;
    }

    private _attackeffect_type: number;
    public get attackeffect_type(): number {
        return this._attackeffect_type;
    }

    private _attackeffect_id: number;
    public get attackeffect_id(): number {
        return this._attackeffect_id;
    }

    private _hiteffect_id: number;
    public get hiteffect_id(): number {
        return this._hiteffect_id;
    }



}

