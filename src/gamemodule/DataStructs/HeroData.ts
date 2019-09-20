import Game from "../../Game";
import TimeHouseInfo from "../../csvInfo/TimeHouseInfo";
import Association from "./Association";
import AssociationAttributeInfo from "../../csvInfo/AssociationAttributeInfo";
import SkillInfo from "../../csvInfo/SkillInfo";
import PlayerSkillInfo from "../../csvInfo/PlayerSkillInfo";
import EnemyBuff from "./EnemyBuff";
import HeroInfoData from "./HeroInfoData";
import BattleHero from "../Models/BattleHero";

export default class HeroData {
    public constructor() { }

    public _battleHero: BattleHero;

    private _heroInf: HeroInfoData;
    public get heroInf(): HeroInfoData {
        return this._heroInf;
    }
    public setHeroInf(id: any, _battleHero: BattleHero) {
        this._battleHero = _battleHero;
        if (Game.battleData.MenuEnterDay) {
            this._heroInf = Game.battleData.curHeroInfoList.getValue(id);
        }
        else {
            this._heroInf = HeroInfoData.getInfo(id);
        }
        if (this._heroInf) {
            if (this.heroInf.skill_id_1 > 0) {
                this.attackSkillList[0] = SkillInfo.getInfo(this.heroInf.skill_id_1);
            }
            if (this.heroInf.skill_id_2 > 0) {
                this.attackSkillList[1] = SkillInfo.getInfo(this.heroInf.skill_id_2);
            }
            this.skillCd = [0, 0];
        }
    }

    public actionBuff(buff: EnemyBuff): void {
        switch (buff.types) {
            case 4:
                {
                    // * 4, 减攻速 - 配合高频
                    this.buffReduceSpeed += buff.effectvalue;
                    this.changeSkSpeed(buff.effectvalue * -1);
                    this._battleHero.showHideEffectBuf(1027, true);
                    if (this.skillCd[0] > 0) {
                        this.skillCd[0] += (this.skillCd[0] * (100 + buff.effectvalue) * 0.01);
                    }
                    if (this.skillCd[1] > 0) {
                        this.skillCd[1] -= (this.skillCd[1] * (100 + buff.effectvalue) * 0.01);
                    }
                }
                break;
            case 5:
                {
                    // * 5, 减攻击 - 配合高爆
                    this.buffReduceAtk += buff.effectvalue;
                    this._battleHero.showHideEffectBuf(1028, true);
                }
                break;
        }
    }
    public unActionBuff(buff: EnemyBuff): void {
        switch (buff.types) {
            case 4:
                {
                    // * 4, 减攻速 - 配合高频
                    this.buffReduceSpeed -= buff.effectvalue;
                    this._battleHero.showHideEffectBuf(1027, false);
                    this.changeSkSpeed(buff.effectvalue);
                    if (this.buffReduceSpeed < 0) {
                        this.buffReduceSpeed = 0;
                    }

                    if (this.skillCd[0] > 0) {
                        this.skillCd[0] += (this.skillCd[0] * (100 - buff.effectvalue) * 0.01);
                    }
                    if (this.skillCd[1] > 0) {
                        this.skillCd[1] -= (this.skillCd[1] * (100 - buff.effectvalue) * 0.01);
                    }
                }
                break;
            case 5:
                {
                    // * 5, 减攻击 - 配合高爆
                    this.buffReduceAtk -= buff.effectvalue;
                    this._battleHero.showHideEffectBuf(1028, false);
                    if (this.buffReduceAtk < 0) this.buffReduceAtk = 0;
                }
                break;
        }
    }
    /**
     * buff减少的攻击速度
     */
    public buffReduceSpeed: number = 0;
    /**
     * buff减少的攻击
     */
    private buffReduceAtk: number = 0;

    public attackSkillList: Array<SkillInfo> = [null, null];
    // 正在使用哪个技能
    public curUser: number = -1;
    private skillCd: Array<number> = [0, 0];
    public skillInfoGetReady(dt: number): Array<number> {
        if (this._playSkillCd > 0) {
            if (this._playSkillCd < 9999) {
                this._playSkillCd -= dt;
                if (this._playSkillCd <= 0) {
                    this._playSkillAtk = 0;
                    this._playSkillCrit = 0;
                    this._playSkillBurst = 0;
                    this.changeSkSpeed(this._playSkillSpeed * -1);
                    this._playSkillSpeed = 0;
                    this.playSkillShowStatus = 0;
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            if (this.buffSpeedDuration[i] > 0) {
                this.buffSpeedDuration[i] -= dt;
                if (this.buffSpeedDuration[i] <= 0) {
                    this.changeBuffSpeed(-this.buffSpeed[i], 0, i);
                    this.buffSpeed[i] = 0;
                }
            }
        }
        if (this.buffExtraDuration > 0) {
            this.buffExtraDuration -= dt;
            if (this.buffExtraDuration <= 0) {
                this.buffExtra = 0;
            }
        }
        if (this.buffDoubleDuration > 0) {
            this.buffDoubleDuration -= dt;
            if (this.buffDoubleDuration <= 0) {
                this.buffDouble = false;
            }
        }


        this.skillCd[0] -= dt;
        this.skillCd[1] -= dt;
        let cdOK = [];
        if (this.skillCd[0] <= 0) {
            cdOK.push(0);
        }
        if (this.skillCd[1] <= 0) {
            cdOK.push(1);
        }
        return cdOK;
    }
    public cast(): number {
        if (this.curUser >= 0) {
            this.skillCd[this.curUser] = this.curAtkCD();
            return this.skillCd[this.curUser];
        }
        return 0;
    }
    public keyList: Array<number> = [];


    // 当前攻击力
    public curAp(index: number): number {
        if (index < 0) return 0;
        let skillInfo: SkillInfo = this.attackSkillList[index];
        let _ap = this.heroInf.basicattckpointCur;
        // 等级加成 星级加成
        _ap *= this.levelStar;
        // buff加成

        // 羁绊加成
        let atkscale = 1;
        if (index == 0) {
            // 普攻
            atkscale = skillInfo.atkscale * 0.01 * (100 + this._normalAtk) * 0.01;
        }
        else if (index == 1) {
            // 技能
            atkscale = skillInfo.atkscale * 0.01 * (100 + this._skillAtk) * 0.01;
        }
        _ap *= atkscale;
        // 双倍伤害，此处*2
        if (this.buffDouble) {
            _ap *= 2;
        }
        // 玩家技能增加的攻击力
        _ap *= (100 + this._playSkillAtk) * 0.01;
        // boss技能减少的攻击力
        _ap *= (100 - this.buffReduceAtk) * 0.01;
        return _ap;
    }
    // 当前是否暴击
    public curCrit(byCrit: number, index: number): boolean {
        if (index < 0) return false;
        let skillInfo: SkillInfo = this.attackSkillList[index];
        let crit = 0;
        if (index == 0) {
            // 普攻
            crit = this.heroInf.crit + this._normalCrit;
        }
        else if (index == 1) {
            // 技能
            crit = skillInfo.crits[this.heroInf.quality - 1] + this._skillCrit;
        }
        crit += byCrit;
        crit *= ((100 + this._playSkillCrit) * 0.01);
        return Game.battleMap.mathrandomBattle.random(100) < crit;
    }
    // 爆伤
    public curBurst(byBurst: number, index: number): number {
        if (index < 0) return 1;
        let skillInfo: SkillInfo = this.attackSkillList[index];
        let burst = 1;
        if (index == 0) {
            // 普攻
            burst = (this.heroInf.burst + this._normalBurst + byBurst) * 0.01;
        }
        else if (index == 1) {
            // 技能
            burst = (skillInfo.bursts[this.heroInf.quality - 1] + this._skillBurst + byBurst) * 0.01;
        }
        burst *= ((100 + this._playSkillBurst) * 0.01);
        return burst;
    }
    // 当前攻速
    public curAtkCD(): number {
        let skillInfo: SkillInfo = this.attackSkillList[this.curUser];
        let cd = 0;
        if (this.curUser == 0) {
            // 普攻
            cd = this.heroInf.cd * (100 - this._normalSpeed) * 0.01;
        }
        else if (this.curUser == 1) {
            // 技能
            cd = skillInfo.cds[this.heroInf.quality - 1] * (100 - this._skillCDReduce) * 0.01;
        }
        for (let i = 0; i < 4; i++) {
            cd *= ((100 - this.buffSpeed[i]) * 0.01);
        }
        // 玩家技能
        cd *= ((100 - this._playSkillSpeed) * 0.01);
        // boss技能
        cd *= ((100 + this.buffReduceSpeed) * 0.01);
        return cd;
    }
    public changeBuffSpeed(speed: number, time: number, index: number): void {
        this.buffSpeed[index] = speed;
        this.buffSpeedDuration[index] = time;
        this.changeSkSpeed(speed);
    }
    public changeSkSpeed(speed: number): void {
        this._battleHero.sk.changeSpeeds(speed);
    }
    // buff提高攻速
    public buffSpeed: Array<number> = [0, 0, 0, 0];
    // buff提高攻速持续时间
    public buffSpeedDuration: Array<number> = [0, 0, 0, 0];
    // buff增加普攻对象数量
    public buffExtra: number = 0;
    // buff增加普攻对象数量速持续时间
    public buffExtraDuration: number = 0;
    // buff双倍攻击
    public buffDouble: boolean = false;
    // buff双倍攻击持续时间
    public buffDoubleDuration: number = 0;
    // 当前减防
    public get curReduceDefense(): number {
        return this._normalReduceDefense;
    }
    // 攻击使敌人减速50%，持续{ 0 } 秒
    public reduceEnemyMoveSpeedTime(index: number): number {
        if (index == 0) {
            return this._normalReduceEnemySpeed;
        }
        return 0;
    }
    // 灼烧伤害10 %，持续{ 0 } 秒
    public burnHurt(index: number): number {
        if (index == 0) {
            return this._normalBurnHurt;
        }
        return 0;
    }
    // 中毒攻击持续{ 0 } 秒10 % 伤害
    public poisoningTime(index: number): number {
        if (index == 0) {
            return this._normalPoisoning;
        }
        return 0;
    }
    // 灼烧场{ 0 }%
    // 光环 进入英雄攻击范围内，敌人每秒受到普攻伤害 （0）%
    public get burningGround(): number {
        return this._normlBurningGround;
    }
    // 技能眩晕持续{ 0 } 秒
    // 眩晕攻击持续{ 0 } 秒
    public dizzinessTime(index: number): number {
        if (index == 0) {
            return this._normalDizziness;
        }
        else if (index == 1) {
            return this._skillDizziness;
        }
        return 0;
    }
    // 石头血量增加{ 0 }% 默认100
    public get stoneHpAdd(): number {
        return this._stoneHpAdd;
    }
    // 减速场减速{ 0 }%
    // 光环 
    public get reduceSpeedHalo(): number {
        return this._normalReduceSpeedHalo;
    }
    // 静默场范围内boss无法释放技能
    // 光环
    public get noSkillHalo(): boolean {
        return this._enemyNoSkillHalo;
    }
    // 攻击范围增加{ 0 }
    public get addAtkRange(): number {
        return this._normalAtkRange;
    }


    // 普通攻击力增加{0}%
    private _normalAtk: number = 0;
    // 普通攻击暴击率增加{0}%
    private _normalCrit: number = 0;
    // 攻速增加{0}%
    private _normalSpeed: number = 0;
    // 减防{0}%
    private _normalReduceDefense: number = 0;
    // 攻击使敌人减速50%，持续{ 0 } 秒
    private _normalReduceEnemySpeed: number = 0;
    // 技能冷却时间减少{ 0 }%
    private _skillCDReduce: number = 0;
    // 灼烧伤害10 %，持续{ 0 } 秒
    private _normalBurnHurt: number = 0;
    // 普通攻击爆伤增加{ 0 }%
    private _normalBurst: number = 0;
    // 中毒攻击持续{ 0 } 秒10 % 伤害
    private _normalPoisoning: number = 0;
    // 灼烧场{ 0 }%
    private _normlBurningGround: number = 0;
    // 技能眩晕持续{ 0 } 秒
    private _skillDizziness: number = 0;
    // 技能攻击力增加{ 0 }%
    private _skillAtk: number = 0;
    // 石头血量增加{ 0 }%
    private _stoneHpAdd: number = 0;
    // 眩晕攻击持续{ 0 } 秒
    private _normalDizziness: number = 0;
    // 技能爆伤提高{ 0 }%
    private _skillBurst: number = 0;
    // 减速场减速{ 0 }%
    private _normalReduceSpeedHalo: number = 0;
    // 静默场范围内boss无法释放技能
    private _enemyNoSkillHalo: boolean = false;
    // 攻击范围增加{ 0 }
    private _normalAtkRange: number = 0;
    // 技能爆击率提高{ 0 }%
    private _skillCrit: number = 0;


    private _level = 0;
    private _star = 0;
    private _levelStar = 1;
    // 等级加成 星级加成
    private get levelStar() {
        if (this._level != Game.playData.curLevel || this._star != Game.playData.curStar) {
            this._level = Game.playData.curLevel;
            this._star = Game.playData.curStar;
            let timehouses = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
            this._levelStar = timehouses.vals[Game.playData.curStar] * 0.01;
        }
        return this._levelStar;
    }

    public _playSkillAtk: number = 0;
    public _playSkillCd: number = 10000;
    public _playSkillCrit: number = 0;
    public _playSkillBurst: number = 0;
    public _playSkillSpeed: number = 0;
    public playSkillShowStatus: number = 0;
    public mapSkillInf: PlayerSkillInfo = null;
    public PlaySkillCheck(init: boolean): void {
        this._playSkillAtk = 0;
        this._playSkillCd = 10000;
        this._playSkillCrit = 0;
        this._playSkillBurst = 0;
        this._playSkillSpeed = 0;
        this.mapSkillInf = PlayerSkillInfo.getInfo(Game.playData.curPlaySkillIndex);
        if (this.mapSkillInf) {
            if (init && this.mapSkillInf.time > 0) {
                return;
            }
            if (this.mapSkillInf.time > 0) {
                this._playSkillCd = this.mapSkillInf.time;
            }
            switch (this.mapSkillInf.id) {
                case 1:
                case 2:
                    {
                        this._playSkillAtk = this.mapSkillInf.val;
                    }
                    break;
                case 3:
                case 4:
                    {
                        this._playSkillCrit = this.mapSkillInf.val;
                    }
                    break;
                case 5:
                case 6:
                    {
                        this._playSkillBurst = this.mapSkillInf.val;
                    }
                    break;
                case 7:
                case 8:
                    {
                        this._playSkillSpeed = this.mapSkillInf.val;
                        this.changeSkSpeed(this.mapSkillInf.val);
                        if (this.skillCd[0] > 0) {
                            this.skillCd[0] -= (this.skillCd[0] * (100 - this._playSkillSpeed) * 0.01);
                        }
                        if (this.skillCd[1] > 0) {
                            this.skillCd[1] -= (this.skillCd[1] * (100 - this._playSkillSpeed) * 0.01);
                        }
                    }
                    break;
            }
            this.playSkillShowStatus = 1;
        }
    }


    // 计算羁绊加成
    public checkAssociation(): void {
        this.buffSpeed = [0, 0, 0, 0];
        this.buffSpeedDuration = [0, 0, 0, 0];
        this.buffExtra = 0;
        this.buffExtraDuration = 0;
        this._normalAtk = 0;
        this._normalCrit = 0;
        this.changeSkSpeed(this._normalSpeed * -1);
        this._normalSpeed = 0;
        this._normalReduceDefense = 0;
        this._normalReduceEnemySpeed = 0;
        this._skillCDReduce = 0;
        this._normalBurnHurt = 0;
        this._normalBurst = 0;
        this._normalPoisoning = 0;
        this._normlBurningGround = 0;
        this._skillDizziness = 0;
        this._skillAtk = 0;
        this._stoneHpAdd = 0;
        this._normalDizziness = 0;
        this._skillBurst = 0;
        this._normalReduceSpeedHalo = 0;
        this._enemyNoSkillHalo = false;
        this._normalAtkRange = 0;
        this._skillCrit = 0;
        let ass: Array<Association> = Game.battleData.refrushAssociation();
        for (let i = 0, len = ass.length; i < len; i++) {
            let item = ass[i];
            if (item.race > 0 && this.heroInf.race == item.race) {
                // 触发羁绊
                let att = AssociationAttributeInfo.getInfo(item.attribute_id);
                this.assAdd(att.types, item.values);
            }
            if (item.career > 0 && this.heroInf.career == item.career) {
                // 触发羁绊
                let att = AssociationAttributeInfo.getInfo(item.attribute_id);
                this.assAdd(att.types, item.values);
            }
            if (item.hero.length > 0 && this.heroInf.point_fetters == item.pointF) {
                // 触发羁绊
                let att = AssociationAttributeInfo.getInfo(item.attribute_id);
                this.assAdd(att.types, item.values);
            }
        }
        Game.halo.sUpdateSign.dispatch(this);
        if (this._stoneHpAdd > 0) {
            Game.halo.sUpdateStoneHp.dispatch(this._stoneHpAdd);
        }
    }

    private assAdd(types: number, val: number): void {
        switch (types) {
            case 1:// 普通攻击力增加{0}%
                {
                    this._normalAtk += val;
                }
                break;
            case 2:// 普通攻击暴击率增加{0}%
                {
                    this._normalCrit += val;
                }
                break;
            case 3:// 攻速增加{0}%
                {
                    this._normalSpeed += val;
                    this.changeSkSpeed(val);
                }
                break;
            case 4://	减防{ 0 }%
                {
                    this._normalReduceDefense += val;
                }
                break;
            case 5://	攻击使敌人减速50 %，持续{ 0 } 秒
                {
                    this._normalReduceEnemySpeed += val;
                }
                break;
            case 6://	技能冷却时间减少{ 0 }%
                {
                    this._skillCDReduce += val;
                }
                break;
            case 7://	灼烧伤害10 %，持续{ 0 } 秒
                {
                    this._normalBurnHurt += val;
                }
                break;
            case 8://	普通攻击爆伤增加{ 0 }%
                {
                    this._normalBurst += val;
                }
                break;
            case 9://	中毒攻击持续{ 0 } 秒10 % 伤害
                {
                    this._normalPoisoning += val;
                }
                break;
            case 10://	灼烧场{ 0 }%
                {
                    this._normlBurningGround += val;
                }
                break;
            case 11://	技能眩晕持续{ 0 } 秒
                {
                    this._skillDizziness += val;
                }
                break;
            case 12://	技能攻击力增加{ 0 }%
                {
                    this._skillAtk += val;
                }
                break;
            case 13://	石头血量增加{ 0 }%
                {
                    this._stoneHpAdd += val;
                }
                break;
            case 14://	眩晕攻击持续{ 0 } 秒
                {
                    this._normalDizziness += val;
                }
                break;
            case 15://	技能爆伤提高{ 0 }%
                {
                    this._skillBurst += val;
                }
                break;
            case 16://	减速场减速{ 0 }%
                {
                    this._normalReduceSpeedHalo += val;
                }
                break;
            case 17://	静默场范围内boss无法释放技能
                {
                    this._enemyNoSkillHalo = true;
                }
                break;
            case 18://	攻击范围增加{ 0 }
                {
                    this._normalAtkRange += val;
                }
                break;
            case 19://	技能爆击率提高{ 0 }%
                {
                    this._skillCrit += val;
                }
                break;
        }
    }

}