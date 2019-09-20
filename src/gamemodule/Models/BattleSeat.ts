import Game from "../../Game";
import BattleHero from "./BattleHero";
import EventKey from "../../tool/EventKey";
import UI_BattleMain from "../../fgui/Extend/Battle/UI_BattleMain";
import HeroInfoData from "../DataStructs/HeroInfoData";
import { GameStatus } from "../DataEnums/GameStatus";
import SpriteKey from "../../fgui/SpriteKey";
import { HeroAniEnums } from "../DataEnums/HeroAniEnums";
import BaseSK from "../../base/BaseSK";
import { GuideType } from "../DataEnums/GuideType";

export default class BattleSeat extends Laya.Sprite {
    static create(facade: fairygui.GButton, index: number): BattleSeat {
        return new BattleSeat(facade, index);
    }
    private constructor(facade: fairygui.GButton, index: number) {
        super();
        this.facade = facade;
        this._index = index;
        this.facade.onClick(this, this.onClick);
        this.facade.on(fairygui.Events.DROP, this, this.onDrop);
        this.facade.on(Laya.Event.MOUSE_OUT, this, this.ondragStarts);
    }
    private facade: fairygui.GButton = null;
    private _index: number;
    private _startGame: boolean = false;
    public onShow(battleMain: UI_BattleMain): void {
        this.battleMain = battleMain;
        this._startGame = true;
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
    }
    public onClose(): void {
        this._startGame = false;
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
    }
    public showHidefacade(v: boolean): void {
        this.facade.visible = v;
    }
    private _guideMove: number = 0;
    public readyMoveHeroGuide(ins: number): void {
        this._guideMove = ins;
    }
    battleMain: UI_BattleMain;
    public heroInf: HeroInfoData = null;
    onClick(): void {
        if (Game.playData.guideIndex < GuideType.sevenStartFive) {
            return;
        }
        setTimeout(() => {
            this.onScrollup();
        }, 5);
        if (this.heroInf) {
            this.battleMain.moduleWindow.sUpdateHeroInf.dispatch(this.heroInf);
        }
    }
    private mouseUp(): void {
        setTimeout(() => {
            this.onScrollup();
        }, 15);
    }
    // 拖拽松手在当前按钮上，替换内容
    private onDrop(data: any, evt: laya.events.Event): void {
        if (Game.gameStatus == GameStatus.Gaming) return;
        if (Game.battleData.battleSeatPos < 0 || Game.battleData.battleSeatPos == this._index || this._index == -1 || Game.battleData.battleheroInf == null) {
            return;
        }
        if (this._guideMove >= 10 && this._index != 8) {
            this.onScrollup();
            return;
        }
        if (Game.playData.guideIndex < GuideType.fiveMoveHeroSeat2) {
            this.onScrollup();
            return;
        }
        Game.halo.unInit();
        Game.halo.init();
        for (let i = 0; i < 9; i++) {
            Game.battleScene.battleSeat[i].heroInf = null;
            Game.battleScene.battleSeat[i].clearSk();
        }
        for (let i = Game.battleScene.heroList.length - 1; i >= 0; i--) {
            var hero: BattleHero = Game.battleScene.heroList[i];
            if (hero.index == Game.battleData.battleSeatPos) {
                hero.init(this._index);
            }
            else if (hero.index == this._index) {
                hero.init(Game.battleData.battleSeatPos);
            }
            else {
                hero.init(hero.index);
            }
            Game.battleScene.battleSeat[hero.index].heroInf = hero.dataInf.heroInf;
        }
        setTimeout(() => {
            this.battleMain.createHaloEffect();
        }, 100);
        if (this._guideMove >= 10) {
            for (let i = 0; i < 9; i++) {
                Game.battleScene.battleSeat[i].readyMoveHeroGuide(0);
            }
            this.battleMain.clearGuideMoveHero();
        }
        this._guideMove = 0;
        this.onScrollup();
    }
    // 上阵英雄拖拽开始
    private ondragStarts(evt: laya.events.Event): void {
        if (this._guideMove < 10 && Game.gameStatus != GameStatus.Gaming) return;
        if (Game.battleData.startDrag) return;
        if (this.heroInf == null) return;
        if (this._guideMove >= 10 && this._index != 1) {
            return;
        }

        if (Game.playData.guideIndex < GuideType.fiveMoveHeroSeat2) {
            return;
        }
        this.delayTime = 0;
        this.clearSk();
        for (let i = Game.battleScene.heroList.length - 1; i >= 0; i--) {
            var hero: BattleHero = Game.battleScene.heroList[i];
            if (hero.index == this._index) {
                hero.putDrag(true);
            }
        }
        var btn = <fairygui.GButton>fairygui.GObject.cast(evt.currentTarget);
        btn.stopDrag();//取消对原目标的拖动，换成一个替代品
        if (this.heroInf != null) {
            Game.battleData.battleSeatPos = this._index;
            Game.battleData.battleheroInf = this.heroInf;
            let icons = "";
            this._sk = BaseSK.create("hero_" + this.heroInf.skin);
            this._sk.scale(0.8, 0.8);
            Game.bloodParent.displayObject.addChild(this._sk);
            this._sk.pos(btn.x, btn.y);
            this._sk.play(HeroAniEnums.Sign, true);
            fairygui.DragDropManager.inst.startDrag(btn, icons, icons);
            Game.battleData.startDrag = true;
            Game.gameStatus = GameStatus.Pause;
        }
    }
    private _sk: BaseSK = null;
    private onScrollup(): void {
        this.clearSk();
        Game.battleData.startDrag = false;
        if (this._guideMove >= 10) {
            return;
        }
        setTimeout(() => {
            if (Game.gameStatus == GameStatus.Pause) {
                Game.gameStatus = GameStatus.Gaming;
            }
        }, 30);
    }
    public clearSk(): void {
        if (this._sk) {
            this._sk.destroyThis();
            this._sk = null;
            for (let i = Game.battleScene.heroList.length - 1; i >= 0; i--) {
                var hero: BattleHero = Game.battleScene.heroList[i];
                hero.putDrag(false);
            }
        }
    }
    private delayTime: number = 0;
    public update(): void {
        if (this._startGame) {
            if (Game.battleData.startDrag && Game.battleData.battleSeatPos == this._index) {
                if (fairygui.DragDropManager.inst.dragging) {
                    if (this._sk) {
                        this._sk.pos(fairygui.DragDropManager.inst.dragAgent.x, fairygui.DragDropManager.inst.dragAgent.y);
                    }
                }
                else {
                    this.delayTime++;
                    if (this.delayTime > 5) {
                        this.delayTime = 0;
                        this.onScrollup();
                    }
                }
            }
        }
    }

}