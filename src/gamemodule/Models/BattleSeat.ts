import EventManager from "../../Tool/EventManager";
import Game from "../../Game";
import BattleHero from "./BattleHero";
import EventKey from "../../Tool/EventKey";
import UI_BattleMain from "../../fgui/Extend/Battle/UI_BattleMain";
import HeroInfoData from "../DataStructs/HeroInfoData";

export default class BattleSeat extends Laya.Sprite {
    static create(facade: fairygui.GButton, index: number): BattleSeat {
        return new BattleSeat(facade, index);
    }
    private constructor(facade: fairygui.GButton, index: number) {
        super();
        this.facade = facade;
        this._index = index;
        this.facade.onClick(this, this.onClick);
        // this.facade.on(fairygui.Events.DROP, this, this.onDrop);
        // this.facade.on(Laya.Event.MOUSE_OUT, this, this.ondragStarts);
        // this.facade.on(Laya.Event.MOUSE_UP, this, this.onScrollup);
    }
    private facade: fairygui.GButton = null;
    private _index: number;
    public onShow(battleMain: UI_BattleMain): void {
        this.battleMain = battleMain;
        // this._startGame = false;
        // EventManager.on(EventKey.RE_TRYPLAY, this, this.startGame);
        // EventManager.on(EventKey.ENTER_FRAME, this, this.update);
        // EventManager.on(EventKey.ADD_HERO, this, this.addHero);
        // EventManager.on(EventKey.REMOVE_HERO, this, this.removeHero);
    }
    public onClose(): void {
        EventManager.offAllCaller(this);
    }
    public showHidefacade(v: boolean): void {
        this.facade.visible = v;
    }
    // private _startGame: boolean = false;
    // private startGame(): void {
    //     this._startGame = true;
    // }
    battleMain: UI_BattleMain;
    public heroInf: HeroInfoData = null;
    onClick(): void {
        let hero: HeroInfoData = null;
        let index = this._index * -1;
        if (index <= 0) {
            index *= -1;
            let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
            if (seatList[index] > 0) {
                hero = HeroInfoData.getInfo(seatList[index]);
            }
        }
        else if (index > 0) {
            hero = HeroInfoData.getInfo(index);
        }
        if (hero) {
            this.battleMain.moduleWindow.sUpdateHeroInf.dispatch(hero);
        }
    }
    // 拖拽松手在当前按钮上，替换内容
    // private onDrop(data: any, evt: laya.events.Event): void {
    //     if (this._startGame) return;
    //     if (this._index == -1 || Game.battleData.heroInf == null) return;
    //     if (Game.battleData.seatPos >= 0 && Game.battleData.seatPos == this._index) return;
    //     if (Game.battleData.seatPos < 0) {
    //         // 拖拽上阵
    //         this.addHero(Game.battleData.heroInf);
    //     }
    //     else {
    //         // 交换位置
    //         Game.battleScene.battleSeat[Game.battleData.seatPos].addHero(this.heroInf, false);
    //         this.addHero(Game.battleData.heroInf);
    //     }
    // }
    // 上阵英雄
    // public addHero(heroInf: HeroInfo, send: boolean = true): void {
    //     this.heroInf = heroInf;
    //     Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect][this._index] = this.heroInf != null ? this.heroInf.id : 0;
    //     Game.battleScene.refrushHeroInSeat(this._index, send);
    //     EventManager.event(EventKey.ADD_HERO);
    // }
    // 上阵英雄拖拽开始
    // private ondragStarts(evt: laya.events.Event): void {
    //     if (this._startGame) return;
    //     if (this._scrollUp) {
    //         this._scrollUp = false;
    //         return;
    //     }
    //     if (Game.battleData.startDrag) return;
    //     var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(evt.currentTarget);
    //     btn.stopDrag();//取消对原目标的拖动，换成一个替代品
    //     if (this.heroInf != null) {
    //         Game.battleData.seatPos = this._index;
    //         Game.battleData.heroInf = this.heroInf;
    //         let icons = SpriteKey.getUrl("hero_" + this.heroInf.skin + ".png");
    //         fairygui.DragDropManager.inst.startDrag(btn, icons, icons);
    //         Game.battleData.startDrag = true;
    //     }
    // }
    // private _scrollUp: boolean = false;
    // private onScrollup(): void {
    //     this._scrollUp = true;
    // }
    // private update(): void {
    //     this.frame++;
    //     if (this.frame % this.INTERVAL != 0) return;
    //     if (this.haloList.length) {
    //         var _index: number = Math.floor(this.frame / this.INTERVAL) % this.haloList.length;
    //         for (let i = 0; i < this.haloList.length; i++) {
    //             var _buff: BattleBuffHalo = this.haloList[i];
    //             _buff.visible = (_index == i);
    //         }
    //     }
    // }
    // private frame: number = 0;
    // private get INTERVAL(): number {
    //     return 20;
    // }
    // private haloList: Array<BattleBuffHalo> = [];

    // public addHero(seat: number, hero: BattleHero): void {
    //     for (let i = 0; i < 2; i++) {
    //         let info: BattleSkillHalo = hero.haloList[i];
    //         if (info) {
    //             if (Math.floor(seat / 3) == Math.floor(this._index / 3)) {
    //                 let buff: BattleBuffHalo = BattleBuffHalo.create(hero, info);
    //                 this.addChild(buff);
    //                 this.haloList.push(buff);
    //             }
    //         }
    //     }
    // }
    // public removeHero(seat: number, hero: BattleHero): void {
    //     for (let i = this.haloList.length - 1; i >= 0; i--) {
    //         let buff: BattleBuffHalo = this.haloList[i];
    //         if (buff.target == hero) {
    //             this.haloList.splice(i, 1);
    //             buff.destroy();
    //         }
    //     }
    // }
    // public get addAP(): number {
    //     var v = 0;
    //     for (let i = 0; i < this.haloList.length; i++) {
    //         var _buff: BattleBuffHalo = this.haloList[i];
    //         v += _buff.addAP;
    //     }
    //     return v;
    // }
    // public get addSP(): number {
    //     var v = 0;
    //     for (let i = 0; i < this.haloList.length; i++) {
    //         var _buff: BattleBuffHalo = this.haloList[i];
    //         if (_buff.addSP > v) {
    //             v = _buff.addSP;
    //         }
    //     }
    //     return v;
    // }

}