export default class MathRandom {
    constructor(seed: number) {
        this._speed = seed;
    }
    private _speed: number = 0;
    private MOD_NUM: number = 233280;

    private nextSpeed(): void {
        this._speed = (this._speed * 9301 + 49297) % this.MOD_NUM;
    }
    public random(num): number {
        this.nextSpeed();
        return this._speed * num / this.MOD_NUM;
    }
}