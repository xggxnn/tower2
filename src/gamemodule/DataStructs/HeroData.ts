import HeroInfo from "../../dataInfo/HeroInfo";

export default class HeroData {
    public constructor() { }


    private _heroInf: HeroInfo;
    public get heroInf(): HeroInfo {
        return this._heroInf;
    }
    public setHeroInf(id: any) {
        this._heroInf = HeroInfo.getInfo(id);
    }

    private _skId: number = 1;
    public get skId(): number {
        return this._skId;
    }
    public set skId(v: number) {
        this._skId = v;
    }

    // 当前攻击力
    public get curAp(): number {
        // 等级加成
        // 星级加成
        // buff加成
        // 羁绊加成
        return 0;
    }


}