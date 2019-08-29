export default class MathRandom {
    constructor(seed: number) {
        this._speed = seed;
    }
    private _speed: number = 0;
    private MOD_NUM: number = 233280;
    private MOD_N1: number = 9301;
    private MOD_N2: number = 49297;

    private nextSpeed(): void {
        this._speed = (this._speed * this.MOD_N1 + this.MOD_N2) % this.MOD_NUM;
    }
    public random(num: number): number {
        this.nextSpeed();
        return this._speed * num / this.MOD_NUM;
    }
}