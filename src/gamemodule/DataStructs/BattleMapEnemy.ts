import EnemyData from "./EnemyData";
import MonsterInfo from "../../csvInfo/MonsterInfo";

export default class BattleMapEnemy {
    public index: number = 0;
    public curTime: number = 0;
    public isboss: boolean = false;
    public enemy: EnemyData = null;
    public constructor(index: number, initPos: number, enemy: MonsterInfo, _curTime: number, boss: boolean) {
        this.index = index;
        this.curTime = _curTime;
        this.isboss = boss;
        this.enemy = new EnemyData();
        this.enemy.monsterInf = enemy;
        this.enemy.initPos = initPos;
    }
}