import BattleModel from "./BattleModel";
import BaseSK from "../../base/BaseSK";
import Pools from "../../Tool/Pools";
import BattleSkillHalo from "./BattleSkillHalo";

// 光环
export default class BattleBuffHalo extends Laya.Sprite {
    public static create(target: BattleModel, skill: BattleSkillHalo): BattleBuffHalo {
        return new BattleBuffHalo(target, skill);
    }
    private constructor(target: BattleModel, skill: BattleSkillHalo) {
        super();
        this._sk = Pools.skFetch("effect_1" + skill.effectID);
        target.sk.addChild(this._sk);
        this._target = target;
        this._skill = skill;
    }

    private _sk: BaseSK = null;
    private _target: BattleModel = null;
    private _skill: BattleSkillHalo = null;

    public get target(): BattleModel {
        return this._target;
    }
    public get addAP(): number {
        return this._skill.addAP;
    }
    public get addSP(): number {
        return this._skill.addSP;
    }
}