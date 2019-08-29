import FiveElementsInfo from "../../csvInfo/FiveElementsInfo";
import AssociationRaceInfo from "../../csvInfo/AssociationRaceInfo";
import AssociationCareerInfo from "../../csvInfo/AssociationCareerInfo";
import Dictionary from "../../Tool/Dictionary";
import HeroInfoData from "./HeroInfoData";

export default class Association {

    private _names: string;
    public get names(): string {
        return this._names;
    }


    private _num: number;
    public get num(): number {
        return this._num;
    }
    public set num(v: number) {
        this._num = v;
    }


    private _hero: Array<number> = [];
    public get hero(): Array<number> {
        return this._hero;
    }
    public set hero(v: Array<number>) {
        this._hero = v;
    }


    private _career: number = 0;
    public get career(): number {
        return this._career;
    }
    public set career(v: number) {
        this._career = v;
    }



    private _race: number = 0;
    public get race(): number {
        return this._race;
    }
    public set race(v: number) {
        this._race = v;
    }

    private _pointF: number = 0;
    public get pointF(): number {
        return this._pointF;
    }
    public set pointF(v: number) {
        this._pointF = v;
    }


    private _attribute_id: number;
    public get attribute_id(): number {
        return this._attribute_id;
    }
    public set attribute_id(v: number) {
        this._attribute_id = v;
        this._names = Association.attributeIdToName(this._attribute_id);
    }


    private _values: number;
    public get values(): number {
        return this._values;
    }
    public set values(v: number) {
        this._values = v;
    }
    /**
     * 依据属性id，获得属性名称
     * @param id 
     */
    public static attributeIdToName(id: number): string {
        let fiveElementsInfo = FiveElementsInfo.getInfoWithType(id);
        if (fiveElementsInfo) {
            return fiveElementsInfo.name;
        }
        return "";
    }
    /**
     * 五行名称
     * @param v 
     */
    public static raceName(v: number): string {
        let associationrace = AssociationRaceInfo.getInfoRace(v);
        if (associationrace) {
            return this.attributeIdToName(associationrace.attribute);
        }
        return "";
    }
    /**
     * 门派名称
     * @param v 
     */
    public static careerName(v: number): string {
        let associationCreeer = AssociationCareerInfo.getInfoCareer(v);
        if (associationCreeer) {
            return this.attributeIdToName(associationCreeer.attribute);
        }
        return "";
    }

    /**********************点羁绊相关*********************************** */
    private static _pointFetterDic: Dictionary<number, Array<HeroInfoData>> = new Dictionary<number, Array<HeroInfoData>>();
    /**
     * 获取点羁绊英雄列表
     * @param point_fetters 点羁绊id
     */
    public static pointFetter(point_fetters: number): Array<HeroInfoData> {
        if (this._pointFetterDic.hasKey(point_fetters)) {
            return this._pointFetterDic.getValue(point_fetters);
        }
        let heroList: Array<HeroInfoData> = [];
        for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
            let heros = HeroInfoData.getInfo(i);
            if (heros.point_fetters == point_fetters) {
                heroList.push(heros);
            }
        }
        this._pointFetterDic.add(point_fetters, heroList);
        return heroList;
    }
    /********************************************************* */

}