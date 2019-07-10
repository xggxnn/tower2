import SkillInfo from "../../dataInfo/SkillInfo";

export default class BattleSkillAttack {

    public static create(id: string | number, cd: number): BattleSkillAttack {
        return new BattleSkillAttack(id, cd);
    }
    private constructor(id: string | number, cd: number) {
        this.skillInfo = SkillInfo.getInfo(id);
        this.cd = 0;
        this.maxCd = cd * 1000;
    }
    private skillInfo: SkillInfo = null;
    private cd: number = 0;
    private maxCd: number = 0;

    public getReady(dt: number): boolean {
        this.cd -= dt;
        if (this.cd <= 0) {
            return true;
        }
        return false;
    }
    /**
     * 施放技能
     */
    public cast(): void {
        this.cd = this.maxCd;
    }


}