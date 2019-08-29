import HeroInfo from "../../csvInfo/HeroInfo";
import SkillInfo from "../../csvInfo/SkillInfo";
import Dictionary from "../../Tool/Dictionary";

export default class HeroInfoData {

    constructor(id: any) {
        let inf = HeroInfo.getInfo(id);
        this._id = inf.id;
        this._name = inf.name
        this._story = inf.story;
        this._skin = inf.skin
        this._basicattckpoint = inf.basAttack;
        this._type = inf.type
        this._race = inf.race
        this._career = inf.career;
        this._point_fetters = inf.point_fetters
        this._skill_id_1 = inf.skill_id_1
        this._skill_id_2 = inf.skill_id_2
        this._source = inf.source;
        let skill = SkillInfo.getInfo(inf.skill_id_1);
        if (skill) {
            this._cds = skill.cds;
            this._crits = skill.crits;
            this._bursts = skill.bursts;
            this.atkscale = skill.atkscale;
        }
        this.quality = inf.quality;
    }
    private static _dic: Dictionary<string, HeroInfoData> = new Dictionary<string, HeroInfoData>();
    public static getInfo(id: any): HeroInfoData {
        if (this._dic.hasKey(id)) {
            return this._dic.getValue(id);
        }
        let inf = new HeroInfoData(id);
        this._dic.add(id, inf);
        return inf;
    }
    public static getCount(): number {
        return HeroInfo.getCount();
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }

    private _story: string;
    public get story(): string {
        return this._story;
    }

    private _skin: number;
    public get skin(): number {
        return this._skin;
    }

    protected _quality: number;
    public get quality(): number {
        return this._quality;
    }
    public set quality(v: number) {
        if (v < 1) v = 1;
        if (v > 5) v = 5;
        this._quality = v;
        this._basicattckpointCur = this._basicattckpoint[this._quality - 1];
        this.cd = this._cds[this._quality - 1];
        this.crit = this._crits[this._quality - 1];
        this.burst = this._bursts[this._quality - 1];
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _race: number;
    public get race(): number {
        return this._race;
    }

    private _career: number;
    public get career(): number {
        return this._career;
    }

    private _point_fetters: number;
    public get point_fetters(): number {
        return this._point_fetters;
    }

    private _skill_id_1: number;
    public get skill_id_1(): number {
        return this._skill_id_1;
    }

    private _skill_id_2: number;
    public get skill_id_2(): number {
        return this._skill_id_2;
    }

    private _source: number;
    public get source(): number {
        return this._source;
    }


    private _basicattckpoint: number[] = [];
    private _basicattckpointCur: number = 0;
    /**
     * 基础攻击
     */
    public get basicattckpointCur(): number {
        return this._basicattckpointCur;
    }
    public set basicattckpointCur(v: number) {
        this._basicattckpointCur = v;
    }

    private _cds: number[] = [];
    private _cd: number;
    /**
     * 攻速
     */
    public get cd(): number {
        return this._cd;
    }
    public set cd(v: number) {
        this._cd = v;
    }

    private _crits: number[] = [];
    private _crit: number;
    /**
     * 暴击
     */
    public get crit(): number {
        return this._crit;
    }
    public set crit(v: number) {
        this._crit = v;
    }

    private _bursts: number[] = [];
    private _burst: number;
    /**
     * 爆伤
     */
    public get burst(): number {
        return this._burst;
    }
    public set burst(v: number) {
        this._burst = v;
    }

    private _atkscale: number;
    public get atkscale(): number {
        return this._atkscale;
    }
    public set atkscale(v: number) {
        this._atkscale = v;
    }




}