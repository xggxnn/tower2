import MonsterInfo from "../../dataInfo/MonsterInfo";
import Point = Laya.Point;

export default class EnemyData {
    public constructor() {

    }


    private _monsterInf: MonsterInfo;
    public get monsterInf(): MonsterInfo {
        return this._monsterInf;
    }
    public set monsterInf(v: MonsterInfo) {
        this._monsterInf = v;
        this.splits = this._monsterInf.split;
        this.resurrection = this._monsterInf.resurrection;
        this.curHp = this._monsterInf.hp;
        this.maxHp = this.curHp;
    }
    // 敌人模型id
    private _skId: number = 1;
    public get skId(): number {
        return this._skId;
    }
    public set skId(v: number) {
        this._skId = v;
    }


    // 分裂次数
    private _splits: number = 0;
    public get splits(): number {
        return this._splits;
    }
    public set splits(v: number) {
        this._splits = v;
    }
    // 复活次数
    private _resurrection: number = 0;
    public get resurrection(): number {
        return this._resurrection;
    }
    public set resurrection(v: number) {
        this._resurrection = v;
    }

    // 当前开启下一列的点的位置
    private _curStarIndex: number = 0;
    public get curStarIndex(): number {
        return this._curStarIndex;
    }
    public set curStarIndex(v: number) {
        this._curStarIndex = v;
    }
    // 上一列开启下一列的点的位置
    private _preStarIndex: number = 0;
    public get preStarIndex(): number {
        return this._preStarIndex;
    }
    public set preStarIndex(v: number) {
        this._preStarIndex = v;
    }

    // 当前移动点
    private _curMoveIndex: number = 0;
    public get curMoveIndex(): number {
        return this._curMoveIndex;
    }
    public set curMoveIndex(v: number) {
        this._curMoveIndex = v;
    }

    // 当前处于那一列
    private _curMoveX: number = -1;
    public get curMoveX(): number {
        return this._curMoveX;
    }
    public set curMoveX(v: number) {
        this._curMoveX = v;
    }
    // 移动路径
    private _movePath: Array<Point>;
    public get movePath(): Array<Point> {
        return this._movePath;
    }
    public set movePath(v: Array<Point>) {
        this._movePath = v;
    }
    // 当前血量
    private _curHp: number = 0;
    public get curHp(): number {
        return this._curHp;
    }
    public set curHp(v: number) {
        if (v < 0) v = 0;
        this._curHp = v;
    }
    // 最大血量
    private _maxHp: number = 1;
    public get maxHp(): number {
        return this._maxHp;
    }
    public set maxHp(v: number) {
        this._maxHp = v;
        if (this._maxHp < 1) this._maxHp = 1;
    }
    // 模型大小
    private _sc: Point;
    public get scales(): Point {
        return this._sc;
    }
    public set scales(v: Point) {
        this._sc = v;
    }

    // 复活敌人
    public resurrectionEnemy(): void {
        this.resurrection--;
    }

    // 分裂发生变化的属性
    public splitEnemy(): void {
        this.splits--;
        this.maxHp *= 0.9;
        this.curHp = this.maxHp;
        this.scales = new Laya.Point(this.scales.x * 0.9, this.scales.y * 0.9);
    }
    // 分裂敌人
    public static createSplitNew(old: EnemyData): EnemyData {
        let dat = new EnemyData;
        old.splitEnemy();
        dat.monsterInf = old.monsterInf;
        dat.maxHp = old.maxHp;
        dat.curHp = old.curHp;
        dat.scales = old.scales;
        dat.splits = old.splits;
        dat.resurrection = old.resurrection;
        dat.curStarIndex = old.curStarIndex;
        dat.preStarIndex = old.preStarIndex;
        dat.curMoveIndex = old.curMoveIndex;
        dat.curMoveX = old.curMoveX;
        dat.movePath = old.movePath;
        dat.skId = old.skId;
        return dat;
    }


    public get interval(): number {
        return 3000;
    }
}