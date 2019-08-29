import BattleHero from "./BattleHero";
import BattleSoldier from "./BattleSoldier";
import BaseSK from "../../base/BaseSK";

export default class BattleEffectFly extends Laya.Sprite {
    public static create(battleHero: BattleHero, battleSoldier: BattleSoldier, userSkill: number, effId: number): BattleEffectFly {
        return new BattleEffectFly(battleHero, battleSoldier, userSkill, effId);
    }

    private constructor(battleHero: BattleHero, battleSoldier: BattleSoldier, userSkill: number, effId: number) {
        super();
        this._sk = BaseSK.create("effect_" + effId);
        this.addChild(this._sk);
        this._sk.y = -70;
        this._sk.play("effect", true);
        this.goalEnemy = battleSoldier;
        this.hero = battleHero;
        this.userSkill = userSkill;
        this.cdSpeed = 0.8;
    }

    private _sk: BaseSK = null;
    private hero: BattleHero = null;
    private goalEnemy: BattleSoldier = null;
    private userSkill: number = -1;
    private cdSpeed: number = 1;

    public update(dt): boolean {
        var disX = this.goalEnemy.x - this.x;
        var disY = this.goalEnemy.y - this.y;
        var dis = Math.pow(disX * disX + disY * disY, 0.5);
        var speed = dt * this.cdSpeed;

        if (dis > speed) {
            this.x += (disX * speed / dis);
            this.y += (disY * speed / dis);
            this._sk.rotation = 180 + Math.atan2(disY, disX) * 180 / Math.PI;
        } else {
            this.goalEnemy.skillHit(this.hero, this.userSkill);
            return true;
        }
        return false;
    }

}