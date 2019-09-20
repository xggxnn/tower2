import Pools from "../../tool/Pools";
import BattleBaseSK from "../../base/BattleBaseSK";
import Game from "../../Game";

export default class BattleEffectEnemy extends Laya.Sprite {

    public static create(id: any, loop: boolean): BattleEffectEnemy {
        return new BattleEffectEnemy(String(id), loop);
    }

    private constructor(id: string, loop: boolean) {
        super();
        this._id = id;
        this._sk = BattleBaseSK.create("effect_" + id);
        this.replay(loop);
    }
    public get sk() {
        return this._sk;
    }
    public _id: string = "";
    private _sk: BattleBaseSK = null;
    private loop: boolean = true;
    private _handler: Laya.Handler = Laya.Handler.create(this, this.over, null, false);
    private _num: number = 1;
    private _status: boolean = true;

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
        this._status = true;
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
        this._status = false;
    }

    public stopeAndHide(): void {
        if (this._status) {
            this._num = 1;
            this._sk.stop();
            this.over();
        }
    }
}