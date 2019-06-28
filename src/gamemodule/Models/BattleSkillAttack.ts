export default class BattleSkillAttack {

    public static create(id: string | number): BattleSkillAttack {
        return new BattleSkillAttack(id);
    }
    private constructor(id: string | number) {
        this.cd = 0;
    }
    private cd: number = 0;

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
        this.cd = 2000;
    }


}