export default class BattleBuff extends Laya.Sprite {
    protected constructor() {
        super();
    }
    protected curr_time: number = 0;
    protected max_time: number = 0;
    public update(dt: number): boolean {
        this.curr_time += dt;
        return this.curr_time >= this.max_time;
    }
}