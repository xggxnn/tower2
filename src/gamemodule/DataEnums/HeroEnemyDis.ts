/**
 * 敌人相对于英雄关系（离终点最近、距离英雄远近、血量多少、防御大小、是否boss）
 */
export enum HeroEnemyDis {
    None = "none",
    Danger = "Danger",
    MinDis = "Min",
    MaxDis = "MaxDis",
    MinHp = "MinHp",
    MaxHp = "MaxHp",
    MinDef = "MinDef",
    MaxDef = "MaxDef",
    Boss = "Boss",
}