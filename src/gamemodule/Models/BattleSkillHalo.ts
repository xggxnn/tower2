export default class BattleSkillHalo {
    public static create(id: string): BattleSkillHalo {
        return new BattleSkillHalo(id);
    }
    private constructor(id: string) {
    }
    public get addAP(): number {
        return 0;
    }
    public get addSP(): number {
        return 0;
    }
    public get effectID(): number {
        return 1;
    }
}