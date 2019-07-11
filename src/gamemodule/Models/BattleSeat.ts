import EventManager from "../../Tool/EventManager";
import Game from "../../Game";
import SoundKey from "../../fgui/SoundKey";
import BattleHero from "./BattleHero";
import BattleBuffHalo from "./BattleBuffHalo";
import BattleSkillHalo from "./BattleSkillHalo";
import EventKey from "../../Tool/EventKey";

export default class BattleSeat extends Laya.Sprite {
    static create(facade: fairygui.GComponent, index: number): BattleSeat {
        return new BattleSeat(facade, index);
    }
    private constructor(facade: fairygui.GComponent, index: number) {
        super();
        this.facade = facade;
        this._index = index;
        // this.facade.onClick(this, this.onClick);
    }
    private facade: fairygui.GComponent = null;
    private _index: number;
    public onShow(): void {
        EventManager.on(EventKey.ENTER_FRAME, this, this.update);
        EventManager.on(EventKey.ADD_HERO, this, this.addHero);
        EventManager.on(EventKey.REMOVE_HERO, this, this.removeHero);
    }
    public onClose(): void {
        // this.facade.offClick(this, this.onClick);
        EventManager.offAllCaller(this);
    }
    // onClick(): void {
    //     Game.sound.playSound(SoundKey.click);
    // }
    private update(): void {
        this.frame++;
        if (this.frame % this.INTERVAL != 0) return;
        if (this.haloList.length) {
            var _index: number = Math.floor(this.frame / this.INTERVAL) % this.haloList.length;
            for (let i = 0; i < this.haloList.length; i++) {
                var _buff: BattleBuffHalo = this.haloList[i];
                _buff.visible = (_index == i);
            }
        }
    }
    private frame: number = 0;
    private get INTERVAL(): number {
        return 20;
    }
    private haloList: Array<BattleBuffHalo> = [];

    public addHero(seat: number, hero: BattleHero): void {
        for (let i = 0; i < 2; i++) {
            let info: BattleSkillHalo = hero.haloList[i];
            if (info) {
                if (Math.floor(seat / 3) == Math.floor(this._index / 3)) {
                    let buff: BattleBuffHalo = BattleBuffHalo.create(hero, info);
                    this.addChild(buff);
                    this.haloList.push(buff);
                }
            }
        }
    }
    public removeHero(seat: number, hero: BattleHero): void {
        for (let i = this.haloList.length - 1; i >= 0; i--) {
            let buff: BattleBuffHalo = this.haloList[i];
            if (buff.target == hero) {
                this.haloList.splice(i, 1);
                buff.destroy();
            }
        }
    }
    public get addAP(): number {
        var v = 0;
        for (let i = 0; i < this.haloList.length; i++) {
            var _buff: BattleBuffHalo = this.haloList[i];
            v += _buff.addAP;
        }
        return v;
    }
    public get addSP(): number {
        var v = 0;
        for (let i = 0; i < this.haloList.length; i++) {
            var _buff: BattleBuffHalo = this.haloList[i];
            if (_buff.addSP > v) {
                v = _buff.addSP;
            }
        }
        return v;
    }

}