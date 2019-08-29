import fui_BattleMain from "../../Generates/Battle/fui_BattleMain";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import SoundKey from "../../SoundKey";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import BattleSeat from "../../../gamemodule/Models/BattleSeat";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import UI_Stone from "./UI_Stone";
import { MenuId } from "../../../gamemodule/MenuId";
import BattleSoldier from "../../../gamemodule/Models/BattleSoldier";
import BattleHero from "../../../gamemodule/Models/BattleHero";
import BaseSK from "../../../base/BaseSK";
import { HeroAniEnums } from "../../../gamemodule/DataEnums/HeroAniEnums";
import UI_DialogBox from "../System/UI_DialogBox";
import Pools from "../../../Tool/Pools";
import { Tick } from "../../../Tool/TickManager";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import UI_CloudCom from "./UI_CloudCom";
import Fun from "../../../Tool/Fun";
import LoaderManager from "../../../Tool/LoaderManager";
import LoadFilesList from "../../../Tool/LoadFilesList";
import { Halo } from "../../../gamemodule/DataStructs/BattleHalo";
import { HaloType } from "../../../gamemodule/DataEnums/HaloType";
import BattleEffectEnemy from "../../../gamemodule/Models/BattleEffectEnemy";

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
	}
	private m_bgList: Array<fairygui.GGroup> = [];

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
		this.clearHaloEffect();
		Game.sound.playMusic(SoundKey.bgm_1, 0);
		this.moduleWindow.closeOtherWindow();
		this.m_bagua1.m_t1.play();
		this.m_bagua2.m_t1.play();
		this.m_bagua3.m_t2.play();
		this.m_bagua4.m_t2.play();
		this.m_showRange.setSelectedIndex(0);

		// Game.playData.gameSpeed = 1;
		EventManager.event(EventKey.CHANGESPEED);
		EventManager.on(EventKey.ENTER_FRAME, this, this.update);
		EventManager.on(EventKey.GAMELOSE, this, this.gameLose);
		EventManager.on(EventKey.GAMEWIN, this, this.gameWin);
		EventManager.on(EventKey.GAMESTART, this, this.startGame);
		EventManager.on(EventKey.SKIPGAME, this, this.skipGame);
		Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.museDown);
		EventManager.on(EventKey.GAMEEXIT, this, this.closeUI);
		this.moduleWindow.sUpdateHeroInf.add(this.clickHero, this);
		EventManager.once(EventKey.GUIDE_PLAY_SKILL, this, this.guidePlaySkill);

		this.moduleWindow.createLeftTop();
		this.moduleWindow.createLeftBottom();
		this.moduleWindow.createRightTop();
		this.moduleWindow.createRightBottom();
		this.moduleWindow.createTopMiddle();
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].onShow(this);
		}
		Game.gameStatus = GameStatus.Pause;
		this.toastTime = 0;
		if (Game.playData.guideIndex == GuideType.FightReady) {
			for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
				Game.battleScene.battleSeat[i].showHidefacade(true);
			}
			this.lookScenes();
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
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].onClose();
		}
		this.clearHaloEffect();
		EventManager.offAllCaller(this);
		Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.museDown);
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
	// 唐僧移动
	private lookScenes(): void {
		// 隐藏八卦
		this.hideShowMenu();

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
		// EventManager.event(EventKey.CLOSE_UI_WAIT);
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
		this.stonebgTick = Game.tick.addTick(3, Laya.Handler.create(this, this.refrushStone, null, false), Laya.Handler.create(this, this.showBgTickOver, null, false), 20);
		this.stonebgTick.Start();
	}
	// 刷新石头
	private refrushStone(): void {
		this.showStonebgNum++;
		if (this.showStonebgNum >= 0 && this.showStonebgNum < 6) {
			Game.battleScene.stoneList[this.showStonebgNum].visible = true;
			this.showStonebgNum++;
			Game.battleScene.stoneList[this.showStonebgNum].visible = true;
		}
		if (this.showStonebgNum == 3) {
			this.m_bgList[0].visible = true;
			this.m_bgList[1].visible = true;
		}
		else if (this.showStonebgNum == 5) {
			this.m_bgList[2].visible = true;
			this.m_bgList[3].visible = true;
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
		this._skxzf.destroy();
		this._skxzf = null;
		for (let i = this._skEnemy.length - 1; i >= 0; i--) {
			this._skEnemy[i].destroy();
		}
		this._skEnemy = [];
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].showHidefacade(false);
		}
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
			this.moduleWindow.BattleRightBottom.showGuide();
		}
	}
	/*********************	巡视场景结束	******************************************************************************/

	private _haveActivation: boolean = false;
	// 点击，集火判断
	private museDown(): void {
		if (Game.battleScene.enemyList.length > 0) {
			this._haveActivation = false;
			let mousxy = Game.parentObject.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));
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
		}
		Game.battleScene.initHeroSeat();
		// let _list: Array<string> = [];
		// for (let i = LoadFilesList.res_sk_enemy_ResList.length - 1; i >= 0; i--) {
		// 	if (!LoaderManager.haveLoadList.hasKey(LoadFilesList.res_sk_enemy_ResList[i])) {
		// 		_list.push(LoadFilesList.res_sk_enemy_ResList[i]);
		// 	}
		// }
		// for (let i = LoadFilesList.res_effect_effect_ResList.length - 1; i >= 0; i--) {
		// 	if (!LoaderManager.haveLoadList.hasKey(LoadFilesList.res_effect_effect_ResList[i])) {
		// 		_list.push(LoadFilesList.res_effect_effect_ResList[i]);
		// 	}
		// }
		// if (_list.length > 0) {
		// 	// EventManager.event(EventKey.SHOW_UI_WAIT);
		// 	EventManager.once(EventKey.LOADER_OVER, this, this.startGameloadSKOver);
		// 	LoaderManager.addList(_list);
		// }
		// else {
		this.startGameloadSKOver();
		// }
	}
	private startGameloadSKOver(): void {
		// EventManager.event(EventKey.CLOSE_UI_WAIT);
		EventManager.event(EventKey.RE_TRYPLAY);
		if (Game.playData.guideIndex == GuideType.SetSeat) {
			Game.playData.guideIndex = GuideType.StartFight
		}
		setTimeout(() => {
			this.createHaloEffect();
		}, 100);
	}
	private skipGame(): void {
		setTimeout(() => {
			this.gameWin();
		}, 100);
	}
	private gameWin(): void {
		if (Game.gameStatus != GameStatus.Win) {
			Game.gameStatus = GameStatus.Win;
		}
		EventManager.off(EventKey.ENTER_FRAME, this, this.update);
		if (this.tip == null) {
			this.tip = Pools.fetch(UI_DialogBox);
			Game.bloodParent.addChild(this.tip);
		}
		this.tip.visible = true;
		this.tip.setXY(this._skts.x + 50, this._skts.y - 150);
		Game.writeEff.startTypeWrite(150, Game.tipTxt.PassWaveTip, this.tip.m_titles, Laya.Handler.create(this, this.passWaveTipOver, null, false));
	}
	private passWaveTipOver(): void {
		this.tip.visible = false;
		EventManager.event(EventKey.GAME_PAUSE);
		this.moduleWindow.gameResult();
	}
	private gameLose(): void {
		if (Game.gameStatus != GameStatus.Failed) {
			Game.gameStatus = GameStatus.Failed;
			EventManager.event(EventKey.GAME_PAUSE);
			this.moduleWindow.gameResult();
		}
		EventManager.off(EventKey.ENTER_FRAME, this, this.update);
	}
	// 提示集火计数器
	private toastTime: number = 0;
	// update
	private update(): void {
		if (Game.gameStatus != GameStatus.Gaming) return;
		var dt = Laya.timer.delta * Game.playData.gameSpeed;
		if (Game.playData.guideIndex >= GuideType.fiveFight) {
			if (Game.battleMap.curTime < Game.battleMap.waveTime - 1000) {
				this.toastTime++;
				if (this.toastTime > 500) {
					this.toastTime = 0;
					Game.total.toastMsg("点击敌人，可集火攻击", true, true);
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
				this.battleEffectList[i].sk.destroy();
				this.battleEffectList[i].destroy();
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
				if (this.battleEffectList[i]) {
					this.battleEffectList[i].stopeAndHide();
				}
			}
			for (let i = 0; i < showNum; i++) {
				if (this.battleEffectList[i]) {
					this.battleEffectList[i].replay(false);
				}
			}
		}
		for (let i = this.battleEffectList.length - 1; i >= 0; i--) {
			if (this.battleEffectList[i]) {

			}
		}
	}
	// 计时器
	public curTime: number = 0;
	// 上一秒时间
	public preTime: number = 0;
	// 生成光环特效
	private createHaloEffect(): void {
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
		let eff = this.addBattleEffect(id, true);
		eff.sk.pos(posx, posy);
	}
	private battleEffectList: Array<BattleEffectEnemy> = [];
	private addBattleEffect(id: number, loop: boolean): BattleEffectEnemy {
		let key: string = String(id);
		let _effect: BattleEffectEnemy = BattleEffectEnemy.create(id, loop);
		Game.haloParent.addChild(_effect.sk);
		this.battleEffectList.push(_effect);
		_effect.scale(1, 1, true);
		return _effect;
	}
}
UI_BattleMain.bind();