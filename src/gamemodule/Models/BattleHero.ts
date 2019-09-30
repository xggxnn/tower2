import { HeroAniEnums } from "../DataEnums/HeroAniEnums";
import Game from "../../Game";
import EventManager from "../../tool/EventManager";
import EventKey from "../../tool/EventKey";
import BattleSoldier from "./BattleSoldier";
import Dictionary from "../../tool/Dictionary";
import Pools from "../../tool/Pools";
import { HeroEnemyDis } from "../DataEnums/HeroEnemyDis";
import Fun from "../../tool/Fun";
import HeroData from "../DataStructs/HeroData";
import TimeHouseInfo from "../../csvInfo/TimeHouseInfo";
import BattleBaseSK from "../../base/BattleBaseSK";
import BattleEffectFly from "./BattleEffectFly";
import BattleEffectEnemy from "./BattleEffectEnemy";
import Association from "../DataStructs/Association";
import EnemyBuff from "../DataStructs/EnemyBuff";
// import UI_winBtn from "../../fgui/Extend/System/UI_winBtn";
import SpriteKey from "../../fgui/SpriteKey";

export default class BattleHero extends Laya.Sprite {
    public static create(id: string | number, index: number | string): BattleHero {
        return new BattleHero(id, index);
    }
    private constructor(id: string | number, index: number | string) {
        super();
        this.dataInf = new HeroData();
        this.soldierBuff = [];
        this.dataInf.setHeroInf(id, this);
        if (this.dataInf.heroInf) {
            this._id = this.dataInf.heroInf.skin;//id;
            if (Game.haveHeroTem.indexOf(this._id) == -1) {
                this._id = 2;
            }
            this._index = Number(index);
            this.checkKeyList();
            // this._sk = Pools.skFetch("hero_" + this._id);
            this._sk = BattleBaseSK.create("hero_" + this._id);
            this._sk.scale(0.8, 0.8);
            this.sk.addStopEvent(Laya.Handler.create(this, this.overEvent));
            this._thisSkHandle = Laya.Handler.create(this, this.frameEvent);
            this.sk.addLableEvent(this._thisSkHandle);
            Game.parentObject.addChild(this.sk);

            let timehouse = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
            let star = timehouse.vals[Game.playData.curStar];
            this.dataInf.PlaySkillCheck(true);
            EventManager.on(EventKey.PLAY_SKILL, this.dataInf, this.dataInf.PlaySkillCheck);
            this.init(this._index);

            EventManager.on(EventKey.GAMEWIN, this, this.delEffect);
            EventManager.on(EventKey.GAMEEXIT, this, this.delEffect);
            EventManager.on(EventKey.GAMELOSE, this, this.delEffect);
        }
    }
    private _thisSkHandle: Laya.Handler = null;
    protected _sk: BattleBaseSK = null;
    public get sk(): BattleBaseSK {
        return this._sk;
    }
    protected currentState = HeroAniEnums.None;
    // update中的时间
    protected standTime: number = 0;

    protected playStand(): void {
        this.playAnimation(HeroAniEnums.Stand, true);
    }
    protected playMove(): void {
        this.playAnimation(HeroAniEnums.Move, true);
    }
    protected playAttack(speed: number = 1): void {
        this.playAnimation(HeroAniEnums.Attack, false, speed);
    }
    protected skillPrevState: HeroAniEnums = HeroAniEnums.None;
    protected playCast(): void {
        this.skillPrevState = this.currentState;
        this.playAnimation(HeroAniEnums.Skill, false);
    }
    protected playStun(): void {
        this.playAnimation(HeroAniEnums.Stun, true);
    }
    protected playDeath(): void {
        if (this.currentState == HeroAniEnums.Death) return;
        this.playAnimation(HeroAniEnums.Death, false);
    }
    protected playAnimation(state: HeroAniEnums, loop: boolean, speed: number = 1): void {
        this.currentState = state;
        this._sk.speed = speed;
        this._sk.play(state, loop);
    }

    public onDisable(): void {
        EventManager.offAllCaller(this);
    }

    private showSkillTip(): void {
        if (this.dataInf.playSkillShowStatus == 1) {
            if (this.skillEfect == null) {
                let num = 1019;
                if (this.dataInf.mapSkillInf.id == 1 || this.dataInf.mapSkillInf.id == 2) {
                    num = 1019;
                }
                else if (this.dataInf.mapSkillInf.id == 3 || this.dataInf.mapSkillInf.id == 4) {
                    num = 1021;
                }
                else if (this.dataInf.mapSkillInf.id == 5 || this.dataInf.mapSkillInf.id == 6) {
                    num = 1020;
                }
                else if (this.dataInf.mapSkillInf.id == 7 || this.dataInf.mapSkillInf.id == 8) {
                    num = 1022;
                }
                this.skillEfect = this.addBattleEffect(num, true);
                this.skillEfect.sk.pos(0, - 150);
                if (this.sk.scaleX > 0) {
                    this.skillEfect.sk.scaleX = 1;
                }
                else {
                    this.skillEfect.sk.scaleX = -1;
                }
            }
            else {
                this.skillEfect.replay(true);
            }
            this.dataInf.playSkillShowStatus = -1;
        }
        else if (this.dataInf.playSkillShowStatus == 0) {
            if (this.skillEfect) {
                this.skillEfect.stopeAndHide();
            }
            this.dataInf.playSkillShowStatus = -1;
        }

    }
    // 英雄数据
    public dataInf: HeroData = null;
    /**
     * 触发的buff
     */
    public soldierBuff: Array<EnemyBuff> = [];

    private _id: string | number;
    private _index: number;
    public get index(): number {
        return this._index;
    }
    private posX: number = 0;
    private posY: number = 0;
    // 当前查找到的可攻击的敌人
    private curEnemy: BattleSoldier = null;
    // 当前攻击范围内的敌人
    private curEnemyList: Array<BattleSoldier> = [];
    // 当前已经攻击的敌人
    private curHitEnemy: BattleSoldier = null;
    private curHitEnemyList: Array<BattleSoldier> = [];


    public putDrag(drag: boolean): void {
        if (drag) {
            if (this.sk.visible) {
                this.sk.visible = false;
            }
        }
        else {
            if (!this.sk.visible) {
                this.sk.visible = true;
            }
        }
    }

    public init(index: number) {
        if (this._index != index) {
            this.keyList = [];
            this.curEnemy = null;
            this.curEnemyList = [];
        }
        this._index = index;
        this.playStand();
        this.posX = 458 + Math.floor(this._index % 3) * 224;
        this.posY = 361 + Math.floor(this._index / 3) * 162;
        this.sk.pos(this.posX, this.posY);
        this.checkKeyList();
        this.dataInf.checkAssociation();
    }
    public update(dt): void {
        this.effectUpdate(dt);
        dt = dt * 0.001;
        for (let i = this.soldierBuff.length - 1; i >= 0; i--) {
            if (this.soldierBuff[i].update(dt)) {
                this.dataInf.unActionBuff(this.soldierBuff[i]);
                this.soldierBuff.splice(i, 1);
            }
        }
        this.findEnemy();

        let canUserList: Array<number> = this.dataInf.skillInfoGetReady(dt);
        this.showSkillTip();
        if (this.currentState == HeroAniEnums.Attack || this.currentState == HeroAniEnums.Skill) {
            this.standTime += dt;
            if (this.standTime > 2) {
                this.playStand();
            }
            return;
        }
        else {
            this.standTime = 0;
        }

        if (this.currentState != HeroAniEnums.Stand) return;

        if (this.curEnemy != null && canUserList.length) {
            this.dataInf.curUser = canUserList.pop(); //优先使用特殊技能
            this.sk.scaleX = this.curEnemy.x > this.sk.x ? 0.8 : -0.8;
            if (this.skillEfect) {
                if (this.curEnemy.x > this.sk.x) {
                    this.skillEfect.sk.scaleX = 1;
                }
                else {
                    this.skillEfect.sk.scaleX = -1;
                }
            }
            this.curHitEnemy = this.curEnemy;
            if (this.dataInf.curUser == 0) {
                if (this.dataInf.buffExtra > 0) {
                    for (let i = 0; i < this.dataInf.buffExtra; i++) {
                        if (this.curEnemyList.length > 0) {
                            this.curHitEnemyList.push(this.curEnemyList[0]);
                            this.curEnemyList.splice(0, 1);
                        }
                    }
                }
            }
            else {
                this.curHitEnemyList = [];
            }
            let curSkill = this.dataInf.attackSkillList[this.dataInf.curUser];
            switch (curSkill.hit_type) {
                case 2://多
                    if (curSkill.rangevalue > 1) {
                        for (let i = 1; i < curSkill.rangevalue; i++) {
                            if (this.curEnemyList.length > 0) {
                                this.curHitEnemyList.push(this.curEnemyList[0]);
                                this.curEnemyList.splice(0, 1);
                            }
                        }
                    }
                    break;
                case 3://溅射
                    this.curHitEnemyList = [];
                    if (Game.battleScene.enemyList.length > 0 && curSkill.rangevalue > 0) {
                        let xx = this.curHitEnemy.x;
                        let yy = this.curHitEnemy.y;
                        for (let i = Game.battleScene.enemyList.length - 1; i >= 0; i--) {
                            let enemy: BattleSoldier = Game.battleScene.enemyList[i] as BattleSoldier;
                            if (enemy && !enemy.canHit) {
                                if ((Math.abs(enemy.x - xx) < 220 * curSkill.rangevalue) && (Math.abs(enemy.y - yy) < 80 * curSkill.rangevalue)) {
                                    this.curHitEnemyList.push(enemy);
                                }
                            }
                        }
                        if (this.curHitEnemyList.length > 0) {
                            this.curHitEnemy = this.curHitEnemyList[0];
                            this.curHitEnemyList.splice(0, 1);
                        }
                    }
                    break;
                case 4://范围
                    this.curHitEnemyList = this.curEnemyList;
                    break;
                case 5://全屏
                    this.curHitEnemyList = [];
                    if (Game.battleScene.enemyList.length > 0) {
                        for (let i = Game.battleScene.enemyList.length - 1; i >= 0; i--) {
                            let enemy: BattleSoldier = Game.battleScene.enemyList[i] as BattleSoldier;
                            if (enemy && !enemy.canHit) {
                                this.curHitEnemyList.push(enemy);
                            }
                        }
                        if (this.curHitEnemyList.length > 0) {
                            this.curHitEnemy = this.curHitEnemyList[0];
                            this.curHitEnemyList.splice(0, 1);
                        }
                    }
                    break;
            }
            this.castSkill(this.dataInf.cast());
        }
    }
    private castSkill(skillcd: number): void {
        let speed = 1;
        if (skillcd < 1 && skillcd > 0) {
            speed = 1 / skillcd;
        }
        // let audioId = this.dataInf.attackSkillList[this.dataInf.curUser].attack_audio_id;
        // Game.sound.playSound("s" + audioId + ".mp3", true, 1);
        // this.playAttack(speed);
        if (this.dataInf.curUser == 0) {
            this.playAttack(speed);
        } else {
            this.playCast();
        }
    }

    // 查找可攻击敌人
    findEnemy() {
        // 判断是否存在集火的敌人
        if (Game.battleScene.activationEnemy != null && Game.battleScene.activationEnemy.canHit) {
            if (this.keyList.indexOf(Game.battleScene.activationEnemy.atkRangIndex) != -1) {
                this.curEnemy = Game.battleScene.activationEnemy;
                return;
            }
        }
        // 当前攻击敌人是否可继续攻击
        if (this.curEnemy != null && !this.curEnemy.canHit) {
            this.curEnemy = null;
        }
        // 此处需判断当前敌人是否在英雄的攻击范围内
        if (this.curEnemy != null) {
            if (this.keyList.indexOf(this.curEnemy.atkRangIndex) == -1) {
                this.curEnemy = null;
            }
            else {
                return;
            }
        }
        if (Game.battleScene.atkCellDIc.count == 0) return;
        this.curEnemyList = [];
        if (this.keyList.length == 0 || this.preAddAtkRange != this.dataInf.addAtkRange) {
            this.checkKeyList();
        }

        for (let i = 0, len = this.keyList.length; i < len; i++) {
            if (Game.battleScene.atkCellDIc.hasKey(this.keyList[i])) {
                let list = Game.battleScene.atkCellDIc.getValue(this.keyList[i]);
                if (list.length > 0) {
                    for (let j = 0, len2 = list.length; j < len2; j++) {
                        let item = list[0] as BattleSoldier;
                        this.curEnemyList.push(item);
                    }
                }
            }
        }
        if (this.curEnemyList.length > 0) {
            this.curEnemy = this.curEnemyList[0];
            this.curEnemyList.splice(0, 1);
        }
    }
    private preAddAtkRange: number = 0;
    public checkKeyList(): void {
        // 攻击范围
        let ranges = 1 + this.dataInf.addAtkRange;
        this.preAddAtkRange = this.dataInf.addAtkRange;
        // 一格攻击范围
        this.keyList = [];
        let ten0 = Math.floor(this._index % 3);
        let ten = 1;
        if (ten0 == 1) {
            ten = 3;
        }
        else if (ten0 == 2) {
            ten = 5;
        }
        if (this._index < 3) {
            let ten2 = ten - 1;
            if (ranges == 1) {
                let sim = 1;
                for (let i = 0; i < 9; i++) {
                    this.keyList.push(ten * 10 + sim);
                    sim += 2;
                    if (sim > 5) {
                        ten++;
                        sim = 1;
                    }
                }
            }
            else if (ranges > 1) {
                let sim2 = 0;
                for (let i = 0; i < 25; i++) {
                    if (ten2 == 0) {
                        if (sim2 == 0) {
                            this.keyList.push(ten2 * 10 + sim2);
                        }
                    }
                    else if (ten2 == 8) {
                        if (sim2 == 0) {
                            this.keyList.push(ten2 * 10 + sim2);
                        }
                    }
                    else if (sim2 < 7) {
                        this.keyList.push(ten2 * 10 + sim2);
                    }
                    if (sim2 == 0) {
                        sim2++;
                    }
                    else {
                        sim2 += 2;
                    }
                    if (sim2 > 7) {
                        ten2++;
                        sim2 = 0;
                    }
                }
            }
        }
        else if (this._index < 6) {
            let ten2 = ten - 1;
            if (ranges == 1) {
                let sim = 0;
                for (let i = 0; i < 9; i++) {
                    this.keyList.push(ten * 10 + sim);
                    sim++;
                    if (sim > 2) {
                        ten++;
                        sim = 0;
                    }
                }
            }
            else if (ranges > 1) {
                let sim = 0;
                for (let i = 0; i < 25; i++) {
                    if (ten2 == 0) {
                        if (sim == 0) {
                            this.keyList.push(ten2 * 10 + sim);
                        }
                    }
                    else if (ten2 == 8) {
                        if (sim == 0) {
                            this.keyList.push(ten2 * 10 + sim);
                        }
                    }
                    else {
                        this.keyList.push(ten2 * 10 + sim);
                    }
                    sim++;
                    if (sim > 4) {
                        ten2++;
                        sim = 0;
                    }
                }
            }
        }
        else {
            let ten2 = ten - 1;
            if (ranges == 1) {
                let sim = 2;
                for (let i = 0; i < 9; i++) {
                    this.keyList.push(ten * 10 + sim);
                    sim += 2;
                    if (sim > 6) {
                        ten++;
                        sim = 2;
                    }
                }
            }
            else if (ranges > 1) {
                let sim = 0;
                for (let i = 0; i < 25; i++) {
                    if (ten2 == 0) {
                        if (sim == 0) {
                            this.keyList.push(ten2 * 10 + sim);
                        }
                    }
                    else if (ten2 == 8) {
                        if (sim == 0) {
                            this.keyList.push(ten2 * 10 + sim);
                        }
                    }
                    else if (sim < 7) {
                        this.keyList.push(ten2 * 10 + sim);
                    }
                    sim += 2;
                    if (sim > 8) {
                        ten2++;
                        sim = 0;
                    }
                }
            }
        }
        this.dataInf.keyList = this.keyList;
    }
    // 可攻击到的格子范围
    private keyList: number[] = [];

    private overEvent(): void {
        if (this.currentState != HeroAniEnums.Attack && this.currentState != HeroAniEnums.Skill) return;
        this.playStand();
        this.dataInf.curUser = -1;
    }
    private frameEvent(event: Laya.EventData): void {
        let heroSkillinf = this.dataInf.attackSkillList[this.dataInf.curUser];
        let audioId = this.dataInf.attackSkillList[this.dataInf.curUser].attack_audio_id;
        Game.sound.playSound("s" + audioId + ".mp3", true, 1);
        switch (heroSkillinf.types) {
            case 3: //  3、提攻速同列1，同列英雄攻速提高50%，持续1秒
                {
                    let list = Game.battleScene.heroList;
                    for (let i = list.length - 1; i >= 0; i--) {
                        let item = list[i] as BattleHero;
                        if (Math.floor(item.index % 3) == this.index % 3) {
                            item.dataInf.changeBuffSpeed(heroSkillinf.specialvalue, heroSkillinf.specialtime, 0);
                        }
                    }
                }
                return;
            case 5: //  5、提攻速同族（施法，给同族英雄加buff）  同族英雄攻速提高50%，持续1秒
                {
                    let list = Game.battleScene.heroList;
                    for (let i = list.length - 1; i >= 0; i--) {
                        let item = list[i] as BattleHero;
                        if (item.dataInf.heroInf.race == this.dataInf.heroInf.race) {
                            item.dataInf.changeBuffSpeed(heroSkillinf.specialvalue, heroSkillinf.specialtime, 2);
                        }
                    }
                }
                return;
            case 10:    //  10、提攻速同行1（施法）  同行英雄攻速提高50%，持续1秒
                {
                    let list = Game.battleScene.heroList;
                    for (let i = list.length - 1; i >= 0; i--) {
                        let item = list[i] as BattleHero;
                        if (Math.floor(item.index / 3) == this.index / 3) {
                            item.dataInf.changeBuffSpeed(heroSkillinf.specialvalue, heroSkillinf.specialtime, 1);
                        }
                    }
                }
                return;
            case 11:    //  11、增加普攻对象数量x秒（对自身，相当于给自己加buff）    自身攻击数量增加{specialvalue}个，持续{specialtime}秒
                {
                    this.dataInf.buffExtra = heroSkillinf.specialvalue;
                    this.dataInf.buffExtraDuration = heroSkillinf.specialtime;
                }
                return;
            case 13:    //  13、提攻速同职（施法）   同职英雄攻速提高50%，持续1秒  
                {
                    let list = Game.battleScene.heroList;
                    for (let i = list.length - 1; i >= 0; i--) {
                        let item = list[i] as BattleHero;
                        if (item.dataInf.heroInf.race == this.dataInf.heroInf.race) {
                            item.dataInf.changeBuffSpeed(heroSkillinf.specialvalue, heroSkillinf.specialtime, 3);
                        }
                    }
                }
                return;
            case 14:    //  14、双倍伤害buff（对自身，相当于给自己加buff）           自身双倍伤害，持续{1}秒 
                {
                    this.dataInf.buffDouble = true;
                    this.dataInf.buffDoubleDuration = heroSkillinf.specialtime;
                }
                return;
        }
        if (this.curHitEnemy == null || this.curHitEnemy.haveDeath) return;
        if (event.name == "cast_time") {
            this.addFlyEffect(this.curHitEnemy, this.dataInf.curUser);
            if (this.curHitEnemyList.length > 0) {
                for (let i = 0, len = this.curHitEnemyList.length; i < len; i++) {
                    this.addFlyEffect(this.curHitEnemyList[i], this.dataInf.curUser);
                }
            }
        }
    }
    // 创建飞行攻击特效，飞行到敌人位置产生伤害
    private addFlyEffect(enemy: BattleSoldier, userSkill: number): void {
        let atkType = this.dataInf.attackSkillList[userSkill].attackeffect_type;
        let atkEffid = this.dataInf.attackSkillList[userSkill].attackeffect_id;
        if (atkType > 0) {
            switch (atkType) {
                case 1:
                    let effect = BattleEffectFly.create(this, enemy, userSkill, atkEffid);
                    effect.x = this.sk.x;
                    effect.y = this.sk.y + 40;
                    Game.EffectsParent.addChild(effect);
                    this.fly.push(effect);
                    break;
            }
        }
        else {
            enemy.skillHit(this, this.dataInf.curUser);
        }
    }
    private fly: Array<BattleEffectFly> = [];
    // 更新飞行特效位置
    private effectUpdate(dt) {
        if (this.fly.length > 0) {
            for (var i = this.fly.length - 1; i >= 0; i--) {
                var fly: BattleEffectFly = this.fly[i];
                if (fly) {
                    if (fly.update(dt)) {
                        this.fly.splice(i, 1);
                        fly.destoryThis();
                    }
                } else {
                    this.fly.splice(i, 1);
                }
            }
        }
    }
    private delEffect(): void {
        for (var i = this.fly.length - 1; i >= 0; i--) {
            var fly: BattleEffectFly = this.fly[i];
            if (fly) {
                this.fly.splice(i, 1);
                fly.destoryThis();
            } else {
                this.fly.splice(i, 1);
            }
        }
        let effList = this.battleEffectList.getValues();
        for (let i = effList.length - 1; i >= 0; i--) {
            if (effList[i]) {
                effList[i].sk.destroyThis();
                effList[i] = null;
            }
        }
        this.skillEfect = null;
        this.bufEffectList.clear();
        this.battleEffectList.clear();
    }
    private bufEffectList: Dictionary<number, BattleEffectEnemy> = new Dictionary<number, BattleEffectEnemy>();
    public showHideEffectBuf(effId: number, showHide: boolean): void {
        if (showHide) {
            if (this.bufEffectList.hasKey(effId)) {
                this.bufEffectList.getValue(effId).replay(true);
            }
            else {
                let eff = this.addBattleEffect(effId, true);
                this.bufEffectList.add(effId, eff);
            }
        }
        else {
            if (this.bufEffectList.hasKey(effId)) {
                this.bufEffectList.getValue(effId).stopeAndHide();
            }
        }
    }

    public removeThis(): void {
        EventManager.off(EventKey.PLAY_SKILL, this.dataInf, this.dataInf.PlaySkillCheck);
        EventManager.offAllCaller(this);
        this.curEnemy = null;
        this.delEffect();
        this.sk.removeLableEvent(this._thisSkHandle);
        this.sk.destroySk();
        this.destroy();
    }

    private skillEfect: BattleEffectEnemy = null;
    protected battleEffectList: Dictionary<string, BattleEffectEnemy> = new Dictionary<string, BattleEffectEnemy>();
    public addBattleEffect(id: number, loop: boolean): BattleEffectEnemy {
        let key: string = String(id);
        let _effect: BattleEffectEnemy = null;
        if (this.battleEffectList.hasKey(key)) {
            _effect = this.battleEffectList.getValue(key);
            let _style: Laya.SpriteStyle = _effect.getStyle();
            if (_style) {
                _effect.replay(loop);
            } else {
                _effect.sk.destroyThis();
                _effect = null;
            }
        }
        if (_effect == null) {
            _effect = BattleEffectEnemy.create(id, loop);
            this.sk.addChild(_effect.sk);
            this.battleEffectList.add(key, _effect);
        }
        let _size = 1;
        _effect.sk.scale(_size, _size, true);
        return _effect;
    }

}