import fui_BattleMain from "../../Generates/Battle/fui_BattleMain";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import SoundKey from "../../SoundKey";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import BattleSeat from "../../../gamemodule/Models/BattleSeat";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import UI_Stone from "./UI_Stone";
import { MenuId } from "../../../gamemodule/MenuId";
import BattleSoldier from "../../../gamemodule/Models/BattleSoldier";
import BattleHero from "../../../gamemodule/Models/BattleHero";
import BaseSK from "../../../base/BaseSK";
import { HeroAniEnums } from "../../../gamemodule/DataEnums/HeroAniEnums";
import UI_DialogBox from "../System/UI_DialogBox";
import Pools from "../../../tool/Pools";
import { Tick } from "../../../tool/TickManager";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import UI_CloudCom from "./UI_CloudCom";
import Fun from "../../../tool/Fun";
import LoaderManager from "../../../tool/LoaderManager";
import LoadFilesList from "../../../tool/LoadFilesList";
import { Halo } from "../../../gamemodule/DataStructs/BattleHalo";
import { HaloType } from "../../../gamemodule/DataEnums/HaloType";
import BattleEffectEnemy from "../../../gamemodule/Models/BattleEffectEnemy";
import UI_Hand from "../System/UI_Hand";
import UI_BlackText from "../System/UI_BlackText";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleMain extends fui_BattleMain {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleMain {
		return <UI_BattleMain>(fui_BattleMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleMain.URL, UI_BattleMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		Game.haloParent = this.m_haloscenes.displayObject;
		Game.parentObject = this.m_scenes.displayObject;
		Game.bloodParent = this.m_bloods.root;
		Game.shadowParent = this.m_shadow.displayObject;

		Game.battleScene.stoneList.push(this.m_stone4 as UI_Stone);
		Game.battleScene.stoneList.push(this.m_stone5 as UI_Stone);
		Game.battleScene.stoneList.push(this.m_stone2 as UI_Stone);
		Game.battleScene.stoneList.push(this.m_stone3 as UI_Stone);
		Game.battleScene.stoneList.push(this.m_stone0 as UI_Stone);
		Game.battleScene.stoneList.push(this.m_stone1 as UI_Stone);
		for (let i = 0; i < 6; i++) {
			Game.battleScene.stoneList[i].reInit();
		}

		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base0, 0));
		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base3, 1));
		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base6, 2));
		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base1, 3));
		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base4, 4));
		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base7, 5));
		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base2, 6));
		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base5, 7));
		Game.battleScene.battleSeat.push(BattleSeat.create(this.m_base8, 8));

		this.m_bagua1.m_t1.play();
		this.m_bagua2.m_t1.play();
		this.m_bagua3.m_t2.play();
		this.m_bagua4.m_t2.play();

		this.m_bgList.push(this.m_bg1);
		this.m_bgList.push(this.m_bg2);
		this.m_bgList.push(this.m_bg3);
		this.m_bgList.push(this.m_bg4);
		this.m_haloscenes.on(Laya.Event.MOUSE_DOWN, this, this.museDown);


	}
	private m_bgList: Array<fairygui.GGroup> = [];

	private bjTipbjTip: UI_BlackText = null;
	private maskBj(): void {
		if (this.bjTipbjTip == null) {
			this.bjTipbjTip = Pools.fetch(UI_BlackText);
			this.bjTipbjTip.m_txt.text = "";
			this.bjTipbjTip.setXY(this.m_bg00.x, 0);
			this.moduleWindow.windowContainer.addChild(this.bjTipbjTip);
		}
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		this.maskBj();
		Game.gameStatus = GameStatus.Pause;
		this._skipGame = false;
		this.clearHaloEffect();
		Game.sound.playMusic(SoundKey.bgm_1, 0);
		this.moduleWindow.closeOtherWindow();
		this.m_bagua1.m_t1.play();
		this.m_bagua2.m_t1.play();
		this.m_bagua3.m_t2.play();
		this.m_bagua4.m_t2.play();
		this.m_showRange.setSelectedIndex(0);

		EventManager.event(EventKey.CHANGESPEED);
		EventManager.on(EventKey.ENTER_FRAME, this, this.update);
		EventManager.on(EventKey.GAMELOSE, this, this.gameLose);
		EventManager.on(EventKey.GAMEWIN, this, this.gameWin);
		EventManager.on(EventKey.GAMESTART, this, this.startGame);
		EventManager.on(EventKey.SKIPGAME, this, this.skipGame);
		EventManager.on(EventKey.GUIDEMOVEHERO, this, this.guideMoveHero);
		EventManager.on(EventKey.GAMEEXIT, this, this.closeUI);
		this.moduleWindow.sUpdateHeroInf.add(this.clickHero, this);
		EventManager.once(EventKey.GUIDE_PLAY_SKILL, this, this.guidePlaySkill);

		this.moduleWindow.createLeftTop();
		this.moduleWindow.createLeftBottom();
		this.moduleWindow.createRightTop();
		this.moduleWindow.createRightBottom();
		this.moduleWindow.createTopMiddle();
		this.toastTime = 0;
		if (Game.playData.guideIndex == GuideType.lookSceneOver) {
			for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
				Game.battleScene.battleSeat[i].showHidefacade(true);
			}
			this.showBgTip();
		}
		else {
			for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
				Game.battleScene.battleSeat[i].showHidefacade(false);
			}
			this.hideShowMenu();
			this.showBgOver();
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		if (this.bjTipbjTip) {
			this.bjTipbjTip.removeFromParent();
			Pools.recycle(this.bjTipbjTip);
			this.bjTipbjTip = null;
		}
		if (this.tip) {
			Game.writeEff.stopTypeWrite();
			this.tip.visible = false;
		}
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].onClose();
		}
		this.clearGuideMoveHero();
		this.clearHaloEffect();
		Game.battleMap.sUpdateExitBattleMain.dispatch();
		EventManager.offAllCaller(this);
		this.moduleWindow.sUpdateHeroInf.remove(this.clickHero, this);
	}

	/*********************	巡视场景	******************************************************************************/
	private hideShowMenu(): void {
		if (Game.playData.guideIndex < GuideType.StartFight) {
			// 隐藏八卦
			for (let i = 0; i < 4; i++) {
				this.m_bgList[i].visible = false;
			}
			// 隐藏石头
			for (let i = 0; i < 6; i++) {
				Game.battleScene.stoneList[i].visible = false;
			}
			// 隐藏菜单栏
			this.moduleWindow.BattleLeftTop.visible = false;
			this.moduleWindow.BattleLeftBottom.visible = false;
			this.moduleWindow.BattleTopMiddle.visible = false;
			this.moduleWindow.BattleRightTop.visible = false;
			this.moduleWindow.BattleRightBottom.visible = false;
		}
		else if (Game.playData.guideIndex < GuideType.CastSkillOver) {
			// 隐藏八卦
			for (let i = 0; i < 4; i++) {
				this.m_bgList[i].visible = true;
			}
			// 隐藏石头
			for (let i = 0; i < 6; i++) {
				Game.battleScene.stoneList[i].visible = true;
			}
			this.moduleWindow.BattleLeftTop.visible = false;
			this.moduleWindow.BattleLeftBottom.visible = false;
			this.moduleWindow.BattleTopMiddle.visible = false;
			this.moduleWindow.BattleRightTop.visible = false;
			this.moduleWindow.BattleRightBottom.visible = false;
		}
		else {
			// 隐藏八卦
			for (let i = 0; i < 4; i++) {
				this.m_bgList[i].visible = true;
			}
			// 隐藏石头
			for (let i = 0; i < 6; i++) {
				Game.battleScene.stoneList[i].visible = true;
			}
			// 隐藏菜单栏
			this.moduleWindow.BattleLeftTop.visible = Game.playData.guideIndex > GuideType.sevenEnterMenus;
			this.moduleWindow.BattleLeftBottom.visible = true;
			this.moduleWindow.BattleTopMiddle.visible = true;
			this.moduleWindow.BattleRightTop.visible = false;
			this.moduleWindow.BattleRightBottom.visible = true;
		}

	}
	private _bjTip: UI_BlackText = null;
	private showBgTip(): void {
		// 隐藏八卦
		this.hideShowMenu();
		if (this._bjTip == null) {
			this._bjTip = UI_BlackText.createInstance();
			this.addChild(this._bjTip);
		}
		let _bjtxt: Array<string> = Game.tipTxt.txtArray("Story") as Array<string>;
		let __bjtxt = "";
		for (let i = 0; i < _bjtxt.length; i++) {
			__bjtxt += "\n" + _bjtxt[i];
		}
		Game.writeEff.startTypeWrite(150, __bjtxt, this._bjTip.m_txt, Laya.Handler.create(this, this.showBgTipOver, null, false));
	}
	private showBgTipOver(): void {
		setTimeout(() => {
			if (this._bjTip) {
				this._bjTip.removeFromParent();
				this._bjTip.dispose();
				this._bjTip = null;
			}
			this.lookScenes();
		}, 3000);
	}
	// 唐僧移动
	private lookScenes(): void {

		this.basPos = new Laya.Point(this.m_bas.x, this.m_bas.y);
		this.m_bg.setXY(-1000, 0);
		this.m_bg00.setXY(1280 - 1000, 0);
		this.m_door.setXY(2073 - 1000, 0);
		this.cloud = Pools.fetch(UI_CloudCom);
		this.m_cloud.displayObject.addChild(this.cloud.displayObject);
		this.cloud.setXY(0, 0);
		this.m_cloud.setXY(500, -143);

		this.m_bas.setXY(this.basPos.x - 1000, this.basPos.y);

		this.loadSKOver();
	}
	private easetype = fairygui.tween.EaseType.Linear;
	private loadSKOver(): void {
		this._skEnemy = [];
		this._skts = BaseSK.create("npc_1");
		Game.parentObject.addChild(this._skts);
		this._skts.pos(654, 522);
		this._skts.play(HeroAniEnums.Move, true);
		this.easetype = fairygui.tween.EaseType.Linear;
		fairygui.tween.GTween.to2(this.m_bas.x, this.m_bas.y, this.basPos.x, this.basPos.y, 3).setTarget(this.m_bas, this.m_bas.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg.x, this.m_bg.y, 0, 0, 3).setTarget(this.m_bg, this.m_bg.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg00.x, this.m_bg00.y, 1280, 0, 3).setTarget(this.m_bg00, this.m_bg00.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_door.x, this.m_door.y, 2073, 0, 3).setTarget(this.m_door, this.m_door.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_cloud.x, this.m_cloud.y, 1500, 0, 3).setTarget(this.m_cloud, this.m_cloud.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skts.x, this._skts.y, 94, this._skts.y, 3).setTarget(this._skts, this._skts.pos).setEase(this.easetype).onComplete(this.tsMoveOver, this);
	}
	// 唐僧移动结束
	private tsMoveOver(): void {
		this._skts.play(HeroAniEnums.Stand, true);
		this._skxzf = BaseSK.create("hero_25");
		Game.parentObject.addChild(this._skxzf);
		this._skxzf.pos(235, 550);
		this._skxzf.play(HeroAniEnums.Stand, true);
		fairygui.tween.GTween.to2(this.m_bas.x, this.m_bas.y, this.basPos.x - 500, this.basPos.y, 3).setTarget(this.m_bas, this.m_bas.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg.x, this.m_bg.y, -500, 0, 3).setTarget(this.m_bg, this.m_bg.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg00.x, this.m_bg00.y, 1280 - 500, 0, 3).setTarget(this.m_bg00, this.m_bg00.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_door.x, this.m_door.y, 2073 - 500, 0, 3).setTarget(this.m_door, this.m_door.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skts.x, this._skts.y, this._skts.x - 500, this._skts.y, 3).setTarget(this._skts, this._skts.pos).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skxzf.x, this._skxzf.y, this._skxzf.x - 500, this._skxzf.y, 3).setTarget(this._skxzf, this._skxzf.pos).setEase(this.easetype);
		fairygui.tween.GTween.to2(1500, 0, 1500 - 500, 0, 3).setTarget(this.m_cloud, this.m_cloud.setXY).setEase(this.easetype).onComplete(this.showWuKong, this);
	}
	// 悟空出现
	private showWuKong(): void {
		this._skswk = BaseSK.create("enemy_2");
		Game.parentObject.addChild(this._skswk);
		this._skswk.pos(1000, 522);
		this._skswk.scaleX = -1;
		this._skswk.play(HeroAniEnums.Stand, true);
		if (this.tip == null) {
			this.tip = Pools.fetch(UI_DialogBox);
			Game.bloodParent.addChild(this.tip);
		}
		this.tip.setXY(this._skswk.x, this._skswk.y - 160);
		Game.writeEff.startTypeWrite(150, Game.tipTxt.wukongTip1, this.tip.m_titles, Laya.Handler.create(this, this.wukongTip1, null, false));
	}
	// 悟空第一句话结束
	private wukongTip1(): void {
		this.tip.visible = false;
		this._skswk.play(HeroAniEnums.Move, true);
		fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, this._skswk.x - 500, this._skswk.y, 2).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.wukongMove1Over, this);
	}
	// 悟空第一次移动结束
	private wukongMove1Over(): void {
		this._skswk.play(HeroAniEnums.Stand, true);
		fairygui.tween.GTween.to2(this.m_bas.x, this.m_bas.y, this.basPos.x, this.basPos.y, 3).setTarget(this.m_bas, this.m_bas.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg.x, this.m_bg.y, 0, 0, 3).setTarget(this.m_bg, this.m_bg.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg00.x, this.m_bg00.y, 1280, 0, 3).setTarget(this.m_bg00, this.m_bg00.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_door.x, this.m_door.y, 2073, 0, 3).setTarget(this.m_door, this.m_door.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_cloud.x, this.m_cloud.y, 1500, 0, 3).setTarget(this.m_cloud, this.m_cloud.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skts.x, this._skts.y, 94, this._skts.y, 3).setTarget(this._skts, this._skts.pos).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skxzf.x, this._skxzf.y, this._skxzf.x + 500, this._skxzf.y, 3).setTarget(this._skxzf, this._skxzf.pos).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, this._skswk.x + 500, this._skswk.y, 3).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.wukongMove2Over, this);
	}
	// 悟空第二次移动结束
	private wukongMove2Over(): void {
		this.showStonebgNum = -1;
		this._skswk.play(HeroAniEnums.Attack, true);
		this.stonebgTick = Game.tick.addTick(6, Laya.Handler.create(this, this.refrushStone, null, false), Laya.Handler.create(this, this.showBgTickOver, null, false), 20);
		this.stonebgTick.Start();
	}
	// 刷新石头
	private refrushStone(): void {
		this.showStonebgNum++;
		if (this.showStonebgNum == 0) {
			Game.battleScene.stoneList[0].visible = true;
			Game.battleScene.stoneList[2].visible = true;
			Game.battleScene.stoneList[4].visible = true;
		}
		else if (this.showStonebgNum == 1) {
			Game.battleScene.stoneList[1].visible = true;
			Game.battleScene.stoneList[3].visible = true;
			Game.battleScene.stoneList[5].visible = true;
		}
		else if (this.showStonebgNum < 6) {
			this.m_bgList[this.showStonebgNum - 2].visible = true;
		}
	}
	private showBgTickOver(): void {
		if (this.stonebgTick) {
			this.stonebgTick.Stop();
			Game.tick.clearTick(this.stonebgTick);
			this.stonebgTick = null;
		}
		this.tip.visible = true;
		this.tip.setXY(this._skswk.x, this._skswk.y - 160);
		Game.writeEff.startTypeWrite(100, Game.tipTxt.wukongTip2, this.tip.m_titles, Laya.Handler.create(this, this.moveWukongtoRight, null, false));
	}
	// 悟空跑出镜头
	private moveWukongtoRight(): void {
		this.tip.visible = false;
		this._skswk.scaleX = 1;
		this._skswk.play(HeroAniEnums.Move, true);
		fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, this._skswk.x + 500, this._skswk.y, 2).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.wukongMove3Over, this);
	}
	private wukongMove3Over(): void {
		fairygui.tween.GTween.to2(this.m_bas.x, this.m_bas.y, this.basPos.x - 1000, this.basPos.y, 3).setTarget(this.m_bas, this.m_bas.setXY).setEase(this.easetype);
		for (let i = 0; i < 4; i++) {
			fairygui.tween.GTween.to2(this.m_bgList[i].x, this.m_bgList[i].y, this.m_bgList[i].x - 1000, this.m_bgList[i].y, 3).setTarget(this.m_bgList[i], this.m_bgList[i].setXY).setEase(this.easetype);
		}
		fairygui.tween.GTween.to2(this.m_bg.x, this.m_bg.y, -1000, 0, 3).setTarget(this.m_bg, this.m_bg.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg00.x, this.m_bg00.y, 1280 - 1000, 0, 3).setTarget(this.m_bg00, this.m_bg00.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_door.x, this.m_door.y, 2073 - 1000, 0, 3).setTarget(this.m_door, this.m_door.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skts.x, this._skts.y, this._skts.x - 1000, this._skts.y, 3).setTarget(this._skts, this._skts.pos).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skxzf.x, this._skxzf.y, this._skxzf.x - 1000, this._skxzf.y, 3).setTarget(this._skxzf, this._skxzf.pos).setEase(this.easetype);
		this._skswk.scaleX = -1;
		this._skswk.play(HeroAniEnums.Stand, true);
		fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, 500, this._skswk.y, 3).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype);
		this._skEnemy.push(this._skswk);
		//  第二排
		// 八戒
		let bajie = BaseSK.create("enemy_1");
		bajie.scaleX = -1;
		bajie.play(HeroAniEnums.Stand, true);
		Game.parentObject.addChild(bajie);
		bajie.pos(this._skswk.x + 150, this._skswk.y);
		fairygui.tween.GTween.to2(bajie.x, bajie.y, 650, bajie.y, 3).setTarget(bajie, bajie.pos).setEase(this.easetype);
		this._skEnemy.push(bajie);
		// 沙和尚
		let shaheshang = BaseSK.create("enemy_4");
		shaheshang.scaleX = -1;
		shaheshang.play(HeroAniEnums.Stand, true);
		Game.parentObject.addChild(shaheshang);
		shaheshang.pos(this._skswk.x + 150, this._skswk.y + 150);
		fairygui.tween.GTween.to2(shaheshang.x, shaheshang.y, 650, shaheshang.y, 3).setTarget(shaheshang, shaheshang.pos).setEase(this.easetype);
		this._skEnemy.push(shaheshang);
		// 白龙马
		let xbl = BaseSK.create("enemy_3");
		xbl.scaleX = -1;
		xbl.play(HeroAniEnums.Stand, true);
		Game.parentObject.addChild(xbl);
		xbl.pos(this._skswk.x + 150, this._skswk.y - 150);
		fairygui.tween.GTween.to2(xbl.x, xbl.y, 650, xbl.y, 3).setTarget(xbl, xbl.pos).setEase(this.easetype);
		this._skEnemy.push(xbl);
		let temI = [0, 100, -100, 200, -200, 300, -300];
		// 第三排
		for (let i = 5; i < 10; i++) {
			let _sk = BaseSK.create("enemy_" + i);
			_sk.scaleX = -1;
			_sk.play(HeroAniEnums.Move, true);
			Game.parentObject.addChild(_sk);
			let yy = this._skswk.y + temI[i - 5];
			_sk.pos(this._skswk.x + 300, yy);
			fairygui.tween.GTween.to2(_sk.x, _sk.y, 800, _sk.y, 3).setTarget(_sk, _sk.pos).setEase(this.easetype);
			this._skEnemy.push(_sk);
		}
		// 第四排
		for (let i = 10; i < 17; i++) {
			let _sk = BaseSK.create("enemy_" + i);
			_sk.scaleX = -1;
			_sk.play(HeroAniEnums.Move, true);
			Game.parentObject.addChild(_sk);
			let yy = this._skswk.y + temI[i - 10];
			_sk.pos(this._skswk.x + 450, yy);
			fairygui.tween.GTween.to2(_sk.x, _sk.y, 950, _sk.y, 3).setTarget(_sk, _sk.pos).setEase(this.easetype);
			this._skEnemy.push(_sk);
		}
		this.refreshIndex();
		fairygui.tween.GTween.to2(this.m_cloud.x, 0, 1500 - 1000, 0, 3).setTarget(this.m_cloud, this.m_cloud.setXY).setEase(this.easetype).onComplete(this.moveToRightOver, this);
	}
	// 镜头右移结束，查看敌情
	private moveToRightOver(): void {
		this.tip.visible = true;
		this.tip.setXY(this._skswk.x, this._skswk.y - 160);
		Game.writeEff.startTypeWrite(100, Game.tipTxt.wukongTip3, this.tip.m_titles, Laya.Handler.create(this, this.moveToLeft, null, false));
	}
	private moveToLeft(): void {
		this.tip.visible = false;
		fairygui.tween.GTween.to2(this.m_bas.x, this.m_bas.y, this.basPos.x, this.basPos.y, 3).setTarget(this.m_bas, this.m_bas.setXY).setEase(this.easetype);
		for (let i = 0; i < 4; i++) {
			fairygui.tween.GTween.to2(this.m_bgList[i].x, this.m_bgList[i].y, this.m_bgList[i].x + 1000, this.m_bgList[i].y, 3).setTarget(this.m_bgList[i], this.m_bgList[i].setXY).setEase(this.easetype);
		}
		fairygui.tween.GTween.to2(this.m_bg.x, this.m_bg.y, 0, 0, 3).setTarget(this.m_bg, this.m_bg.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg00.x, this.m_bg00.y, 1280, 0, 3).setTarget(this.m_bg00, this.m_bg00.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_door.x, this.m_door.y, 2073, 0, 3).setTarget(this.m_door, this.m_door.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_cloud.x, this.m_cloud.y, 1500, 0, 3).setTarget(this.m_cloud, this.m_cloud.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skts.x, this._skts.y, 94, this._skts.y, 3).setTarget(this._skts, this._skts.pos).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skxzf.x, this._skxzf.y, this._skxzf.x + 1000, this._skxzf.y, 3).setTarget(this._skxzf, this._skxzf.pos).setEase(this.easetype).onComplete(this.moveToLeftOver, this);
		for (let i = this._skEnemy.length - 1; i >= 0; i--) {
			fairygui.tween.GTween.to2(this._skEnemy[i].x, this._skEnemy[i].y, this._skEnemy[i].x + 1000, this._skEnemy[i].y, 3).setTarget(this._skEnemy[i], this._skEnemy[i].pos).setEase(this.easetype);
		}

	}
	private moveToLeftOver(): void {
		this.tip.visible = true;
		this.tip.setXY(235, 550 - 160);
		Game.writeEff.startTypeWrite(100, Game.tipTxt.battleXzf, this.tip.m_titles, Laya.Handler.create(this, this.storyOver, null, false));
	}
	private storyOver(): void {
		this.tip.visible = false;
		this._skxzf.destroyThis();
		this._skxzf = null;
		for (let i = this._skEnemy.length - 1; i >= 0; i--) {
			this._skEnemy[i].destroyThis();
		}
		this._skswk = null;
		this._skEnemy = [];
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].showHidefacade(false);
		}
		Game.playData.guideIndex = GuideType.FightReady;
		Game.menu.open(MenuId.Arrange, Game.battleData.trial_level == 0 ? 0 : 1, -1);
	}

	private cloud: UI_CloudCom;
	private basPos: Laya.Point = new Laya.Point();
	// 八卦显示完毕，显示布阵
	private showBgOver(): void {
		if (this.stonebgTick) {
			this.stonebgTick.Stop();
			Game.tick.clearTick(this.stonebgTick);
			this.stonebgTick = null;
		}
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].showHidefacade(false);
		}
		if (this._skts == null) {
			this._skts = BaseSK.create("npc_1");
			Game.parentObject.addChild(this._skts);
			this._skts.pos(94, 522);
			this._skts.play(HeroAniEnums.Stand, true);
		}
		Game.menu.open(MenuId.Arrange, Game.battleData.trial_level == 0 ? 0 : 1, -1);
	}
	// 小钻风sk
	private _skxzf: BaseSK = null;
	private _skswk: BaseSK = null;
	private _skts: BaseSK = null;
	private _skEnemy: BaseSK[] = [];
	// 对话文本
	private tip: UI_DialogBox = null;
	private stonebgTick: Tick = null;
	private showStonebgNum: number = 0;
	// 引导释放技能
	private guidePlaySkill(): void {
		if (Game.playData.guideIndex == GuideType.StartFight) {
			Game.playData.guideIndex = GuideType.CastSkill;
			Game.gameStatus = GameStatus.Pause;
			this.moduleWindow.BattleLeftBottom.showGuide();
		}
	}
	/*********************	巡视场景结束	******************************************************************************/

	private _haveActivation: boolean = false;
	// 点击，集火判断
	private museDown(): void {
		let mousxy = Game.parentObject.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));
		if (Game.battleScene.enemyList.length > 0) {
			this._haveActivation = false;
			for (let i = Game.battleScene.enemyList.length - 1; i >= 0; i--) {
				var enemy = Game.battleScene.enemyList[i];
				if (enemy) {
					if (this._haveActivation) {
						enemy.activationBy(false);
					}
					else {
						if (enemy.canHit) {
							let skx = enemy.x;
							let sky = enemy.y - 50;
							if (Math.abs(mousxy.x - skx) < 50 && Math.abs(mousxy.y - sky) < 50) {
								enemy.activationBy(true);
								Game.battleScene.activationEnemy = enemy as BattleSoldier;
								this._haveActivation = true;
								continue;
							}
						}
						enemy.activationBy(false);
					}
				}
			}
			if (!this._haveActivation) {
				Game.battleScene.activationEnemy = null;
			}
		}
	}

	public startGame(): void {
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].showHidefacade(true);
			Game.battleScene.battleSeat[i].onShow(this);
		}
		Game.battleScene.initHeroSeat();

		EventManager.event(EventKey.SHOW_UI_WAIT);
		EventManager.once(EventKey.LOADER_OVER, this, this.startGameloadSKOver);
		let _list: Array<string> = [];
		_list = _list.concat(LoadFilesList.res_npc_ResList);
		_list = _list.concat(LoadFilesList.res_effect_effect_ResList);
		LoaderManager.addList(_list);
	}
	private startGameloadSKOver(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		EventManager.event(EventKey.RE_TRYPLAY);
		if (Game.playData.guideIndex == GuideType.SetSeat) {
			Game.playData.guideIndex = GuideType.StartFight
		}
		this.moduleWindow.menuCloseOther();
		setTimeout(() => {
			this.createHaloEffect();
		}, 100);
	}
	private _skipGame: boolean = false;
	private skipGame(): void {
		this._skipGame = true;
		setTimeout(() => {
			this.gameWin();
		}, 100);
	}
	private gameWin(): void {
		if (Game.gameStatus != GameStatus.Win) {
			Game.gameStatus = GameStatus.Win;
		}
		EventManager.off(EventKey.ENTER_FRAME, this, this.update);
		if (this._skipGame) {
			this.passWaveTipOver();
		}
		else {
			if (this.tip == null) {
				this.tip = Pools.fetch(UI_DialogBox);
				Game.bloodParent.addChild(this.tip);
			}
			this.tip.visible = true;
			this.tip.setXY(this._skts.x + 50, this._skts.y - 150);
			Game.writeEff.startTypeWrite(100, Game.tipTxt.PassWaveTip[0], this.tip.m_titles, Laya.Handler.create(this, this.guide10BossTip, null, false));
		}
	}
	private guide10BossTip(): void {
		if (Game.battleMap.maxMapId > 1) {
			this.passWaveTipOver();
		}
		else {
			this.tip.visible = false;
			this._skswk = BaseSK.create("enemy_2");
			Game.parentObject.addChild(this._skswk);
			this._skswk.pos(1515, 522);
			this._skswk.scaleX = -1;
			this._skswk.play(HeroAniEnums.Move, true);
			fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, 1015, this._skswk.y, 2).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.guide10BossTip3, this);
		}
	}
	private guide10BossTip3(): void {
		this._skswk.play(HeroAniEnums.Stand, true);
		this.tip.setXY(this._skswk.x - 50, this._skswk.y - 150);
		this.tip.visible = true;
		Game.writeEff.stopTypeWrite();
		Game.writeEff.startTypeWrite(100, Game.tipTxt.txts("Guide7"), this.tip.m_titles, Laya.Handler.create(this, this.guide10BossTip2, null, false));
	}
	private guide10BossTip2(): void {
		this._skswk.scaleX = 1;
		if (this.tip) {
			Game.writeEff.stopTypeWrite();
			this.tip.visible = false;
		}
		this._skswk.play(HeroAniEnums.Move, true);
		fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, this._skswk.x + 500, this._skswk.y, 2).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.passWaveTipOver, this);
	}
	private passWaveTipOver(): void {
		this._skipGame = false;
		if (this._skswk != null) {
			this._skswk.destroyThis();
			this._skswk = null;
		}
		if (this.tip) {
			Game.writeEff.stopTypeWrite();
			this.tip.visible = false;
		}
		EventManager.event(EventKey.GAME_PAUSE);
		this.moduleWindow.gameResult();
	}
	private closeTip(): void {
		setTimeout(() => {
			if (this.tip) {
				this.tip.visible = false;
			}
		}, 2000);
	}
	private gameLose(): void {
		if (Game.gameStatus != GameStatus.Failed) {
			Game.gameStatus = GameStatus.Failed;
			if (this.tip) {
				Game.writeEff.stopTypeWrite();
				this.tip.visible = false;
			}
			EventManager.event(EventKey.GAME_PAUSE);
			this.moduleWindow.gameResult();
		}
		EventManager.off(EventKey.ENTER_FRAME, this, this.update);
	}
	// 提示box
	private _guidTip: UI_DialogBox = null;
	private _guidHand: UI_Hand = null;
	private guideMoveHero(): void {
		if (this._guidTip == null) {
			this._guidTip = Pools.fetch(UI_DialogBox);
			this.moduleWindow.windowContainer.addChild(this._guidTip);
		}
		if (this._guidHand == null) {
			this._guidHand = Pools.fetch(UI_Hand);
			this.addChild(this._guidHand);
		}
		this._guidTip.setXY(this.m_base3.x, this.m_base3.y - 110);
		this._guidTip.m_titles.text = Game.tipTxt.txts("Guid5");
		fairygui.tween.GTween.to2(this.m_base3.x, this.m_base3.y, this.m_base8.x, this.m_base8.y, 2).setTarget(this._guidHand, this._guidHand.setXY).setRepeat(-1);
		for (let i = 0; i < 9; i++) {
			Game.battleScene.battleSeat[i].readyMoveHeroGuide(10);
		}
	}
	public clearGuideMoveHero(): void {
		if (this._guidTip) {
			this._guidTip.removeFromParent();
			Pools.recycle(this._guidTip);
			this._guidTip = null;
		}
		if (this._guidHand) {
			this._guidHand.removeFromParent();
			Pools.recycle(this._guidHand);
			this._guidHand = null;
		}
	}
	// 提示集火计数器
	private toastTime: number = 0;
	private toastTxt: Array<string> = [];
	// update
	private update(): void {
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].update();
		}
		if (Game.gameStatus != GameStatus.Gaming) return;
		var dt = Laya.timer.delta * Game.playData.gameSpeed;
		if (Game.playData.guideIndex >= GuideType.fiveFight) {
			if (Game.battleMap.curTime < Game.battleMap.waveTime - 1000) {
				this.toastTime++;
				if (this.toastTime > 500) {
					this.toastTime = 0;
					if (this.toastTxt.length == 0) {
						this.toastTxt = Game.tipTxt.txtArray("floatmsg") as Array<string>;
					}
					Game.total.toastMsg(this.toastTxt[Fun.range(0, this.toastTxt.length)], true, true);
					if (this.tip == null) {
						this.tip = Pools.fetch(UI_DialogBox);
						Game.bloodParent.addChild(this.tip);
					}
					this.tip.visible = true;
					this.tip.setXY(this._skts.x + 50, this._skts.y - 150);
					Game.writeEff.startTypeWrite(50, Game.tipTxt.PassWaveTip[Fun.range(0, Game.tipTxt.PassWaveTip.length)], this.tip.m_titles, Laya.Handler.create(this, this.closeTip, null, false));

				}
			}
		}
		Game.battleData.update();
		if (Game.playData.gameSpeed == 2) {
			Game.battleData.update();
		}
		this.updateHero(dt);
		this.updateEnemy(dt);
		this.refreshIndex();
		this.refrushHaloEffect(dt);
		Game.playData.sBattleMainUpdate.dispatch(dt);
	}
	// 更新英雄信息
	private updateHero(dt: number): void {
		for (let i = Game.battleScene.heroList.length - 1; i >= 0; i--) {
			var hero = Game.battleScene.heroList[i];
			if (hero) {
				hero.update(dt);
			} else {
				Game.battleScene.heroList.splice(i, 1);
			}
		}
	}
	// 更新敌人信息
	private updateEnemy(dt: number): void {
		Game.battleScene.atkCellDIc.clear();
		if (Game.battleScene.enemyList.length > 0) {
			for (let i = Game.battleScene.enemyList.length - 1; i >= 0; i--) {
				var enemy = Game.battleScene.enemyList[i];
				if (enemy && !enemy.haveDeath) {
					enemy.update(dt);
					enemy.atkRangIndex = -1;
					if (enemy.canHit) {
						let skx = enemy.x;
						let sky = enemy.y;
						if (skx < 276) {
							this.addInAtkRange(0, enemy);
						}
						else if (skx > 1088) {
							this.addInAtkRange(80, enemy);
						}
						else {
							if (skx >= 276 && skx < 416) {
								this.checkPos(skx, sky, enemy, 1);
							}
							if (skx >= 416 && skx < 500) {
								this.checkPos(skx, sky, enemy, 2);
							}
							if (skx >= 500 && skx < 640) {
								this.checkPos(skx, sky, enemy, 3);
							}
							if (skx > 640 && skx <= 724) {
								this.checkPos(skx, sky, enemy, 4);
							}
							if (skx > 724 && skx <= 864) {
								this.checkPos(skx, sky, enemy, 5);
							}
							if (skx > 864 && skx <= 948) {
								this.checkPos(skx, sky, enemy, 6);
							}
							if (skx > 948 && skx <= 1088) {
								this.checkPos(skx, sky, enemy, 7);
							}
						}
					}
				} else {
					if (enemy) {
						enemy.addClearEvent();
					}
					Game.battleScene.enemyList.splice(i, 1);
				}
			}
		}
	}
	// 计算敌人位置
	private checkPos(skx: number, sky: number, enemy, line: number): void {
		let keys: number = line * 10;
		if (sky < 324) {
			// 最上边
			this.addInAtkRange(keys + 5, enemy);
		}
		else if (sky >= 324 && sky < 397) {
			// 最上排英雄站立一排
			this.addInAtkRange(keys + 3, enemy);
		}
		else if (sky >= 397 && sky < 486) {
			// 过道 上排石头
			this.addInAtkRange(keys + 1, enemy);
		}
		else if (sky > 486 && sky < 560) {
			// 中间一格 英雄站立一排
			this.addInAtkRange(keys + 0, enemy);
		}
		else if (sky >= 560 && sky <= 648) {
			// 过道 下排石头
			this.addInAtkRange(keys + 2, enemy);
		}
		else if (sky > 648 && sky <= 720) {
			// 最下边英雄站立一排
			this.addInAtkRange(keys + 4, enemy);
		}
		else if (sky > 720) {
			// 最下边
			this.addInAtkRange(keys + 6, enemy);
		}
	}
	// 存储位置敌人
	private addInAtkRange(key: number, enemy: BattleSoldier): void {
		if (!Game.battleScene.atkCellDIc.hasKey(key)) {
			Game.battleScene.atkCellDIc.add(key, []);
		}
		let list = Game.battleScene.atkCellDIc.getValue(key);
		enemy.atkRangIndex = key;
		list.push(enemy);
	}
	// 刷新层级关系
	private refreshIndex() {
		let childNum = Game.parentObject.numChildren;
		for (let i = 0; i < childNum; i++) {
			let node = Game.parentObject.getChildAt(i);
			let index = Math.floor(node["y"]);
			if (index < 0) index = 0;
			node["_zOrder"] = index;
		}
		Game.parentObject.updateZOrder();
	}
	private haveShowRangeNum: number = -1;
	// 点击英雄，显示攻击范围
	private clickHero(hero: HeroInfoData): void {
		if (hero) {
			if (this.haveShowRangeNum >= 0) {
				clearTimeout(this.haveShowRangeNum);
			}
			let pos = 0;
			let keyList: number[] = [];
			let doubleAtk: boolean = false;
			for (let i = Game.battleScene.heroList.length - 1; i >= 0; i--) {
				var heros: BattleHero = Game.battleScene.heroList[i] as BattleHero;
				if (heros.dataInf.heroInf.id == hero.id) {
					pos = heros.index;
					keyList = heros.dataInf.keyList;
					doubleAtk = heros.dataInf.addAtkRange > 0;
					break;
				}
			}
			let posX = 458 + Math.floor(pos % 3) * 224;
			let posY = 361 + Math.floor(pos / 3) * 162;
			this.m_atkRange.setXY(posX, posY);
			if (doubleAtk) {
				this.m_atkRange.width = 532;// 84 + 140 * 2 + 84 * 2;
				this.m_atkRange.height = 395;// 73 + 88 * 2 + 73 * 2;
			}
			else {
				this.m_atkRange.width = 364;// 84 + 140 * 2;
				this.m_atkRange.height = 249;// 73 + 88 * 2;
			}
			this.m_showRange.setSelectedIndex(1);
			this.haveShowRangeNum = setTimeout(() => {
				this.m_showRange.setSelectedIndex(0);
			}, 5000);
		}
	}
	private clearHaloEffect(): void {
		for (let i = this.battleEffectList.length - 1; i >= 0; i--) {
			if (this.battleEffectList[i]) {
				this.battleEffectList[i].sk.destroySk();
				this.battleEffectList[i] = null;
			}
		}
		this.battleEffectList = [];
	}
	private refrushHaloEffect(dt): void {
		if (this.battleEffectList.length <= 0) return;
		dt = dt * 0.001;
		this.curTime += dt;
		if (this.preTime < Math.floor(this.curTime)) {
			this.preTime = Math.floor(this.curTime) + 2;
			let showNum = Math.floor(this.battleEffectList.length / 2);
			this.battleEffectList = Fun.randomSortArray(this.battleEffectList);
			for (let i = this.battleEffectList.length - 1; i >= 0; i--) {
				if (this.battleEffectList[i] && this.battleEffectList[i]._id != "1025") {
					this.battleEffectList[i].stopeAndHide();
				}
			}
			for (let i = 0; i < showNum; i++) {
				if (this.battleEffectList[i] && this.battleEffectList[i]._id != "1025") {
					this.battleEffectList[i].replay(false);
				}
			}
		}
	}
	// 计时器
	public curTime: number = 0;
	// 上一秒时间
	public preTime: number = 0;
	// 生成光环特效
	public createHaloEffect(): void {
		this.clearHaloEffect();
		this.curTime = 0;
		this.preTime = 2;
		if (Game.halo.haloList.length > 0) {
			for (let i = Game.halo.haloList.length - 1; i >= 0; i--) {
				let halo: Halo = Game.halo.haloList[i];
				let seatList = halo.seatList;
				let len = seatList.length;
				switch (halo.types) {
					case HaloType.BurningGround:
						{
							for (let i = 0; i < len; i++) {
								this.addEffectToScene(1016, seatList[i]);
							}
						}
						break;
					case HaloType.Poisoning:
						{
							for (let i = 0; i < len; i++) {
								this.addEffectToScene(1018, seatList[i]);
							}
						}
						break;
					case HaloType.ReduceSpeed:
						{
							let eff = this.addBattleEffect(1025, true);
							eff.sk.pos(halo._battleHero.sk.x, halo._battleHero.sk.y);
						}
						break;
				}
			}
		}
	}
	private addEffectToScene(id: number, pos: number): void {
		let line = Math.floor(pos / 10);
		let row = Math.floor(pos % 10);
		if (line == 2 || line == 4 || line == 6) {
			if (row == 0 || row == 3 || row == 4) {
				return;
			}
		}
		switch (row) {
			case 0:
				row = 3;
				break;
			case 1:
				row = 2;
				break;
			case 2:
				row = 4;
				break;
			case 3:
				row = 1;
				break;
			case 4:
				row = 5;
				break;
			case 5:
				row = 0;
				break;
		}
		let posx = 234 + line * 112;
		let posy = 280 + row * 81;
		let eff = this.addBattleEffect(id, false);
		eff.sk.pos(posx, posy);
	}
	private battleEffectList: Array<BattleEffectEnemy> = [];
	private addBattleEffect(id: number, loop: boolean): BattleEffectEnemy {
		let key: string = String(id);
		let _effect: BattleEffectEnemy = BattleEffectEnemy.create(id, loop);
		if (id == 1025) {
			this.m_bloods.displayObject.addChild(_effect.sk);
		}
		else {
			Game.haloParent.addChild(_effect.sk);
		}
		this.battleEffectList.push(_effect);
		_effect.scale(1, 1, true);
		return _effect;
	}
}
UI_BattleMain.bind();