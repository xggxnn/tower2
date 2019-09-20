import BaseSK from "./BaseSK";
import EventManager from "../tool/EventManager";
import EventKey from "../tool/EventKey";

export default class BattleBaseSK extends BaseSK {
    public static create(key: string): BattleBaseSK {
        return new BattleBaseSK(key);
    }
    constructor(key: string) {
        super(key);
        EventManager.on(EventKey.CHANGESPEED, this, this.changeSpeed);
    }
    private changeSpeed(): void {
        this.speed = this._speed;
    }
    public destroySk(): void {
        this.destroyThis();
    }
}