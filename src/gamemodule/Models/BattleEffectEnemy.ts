import BaseSK from "../../base/BaseSK";
import Pools from "../../Tool/Pools";

export default class BattleEffectEnemy extends Laya.Sprite {

    public static create(id: number, loop: boolean, parent: BaseSK): BattleEffectEnemy {
        return new BattleEffectEnemy(id, loop, parent);
    }

    private constructor(id: number, loop: boolean, parent: BaseSK) {
        super();
        this.id = id;
        this._sk = Pools.skFetch("effect_" + id);
        parent.addChild(this._sk);
        this.replay(loop);
    }
    public get sk() {
        return this._sk;
    }
    private _sk: BaseSK = null;
    private id: number = null;
    private loop: boolean = true;
    private _handler: Laya.Handler = Laya.Handler.create(this, this.over, null, false);
    private _num: number = 1;

    public replay(loop: boolean): void {
        this.loop = loop;
        this.sk.visible = true;
        this._sk.play("effect", this.loop);
        this.visible = true;
        this._sk.removeStopEvent(this._handler);
        if (this.loop) {
            this._num++;
        } else {
            this._sk.addStopEvent(this._handler);
        }
    }

    public removeNum(): void {
        this._num -= 2;
        if (this._num <= 1) {
            this._num = 1;
            this._sk.stop();
            this.over();
        }
    }

    private over(): void {
        this.visible = false;
        this._sk.visible = false;
    }
}