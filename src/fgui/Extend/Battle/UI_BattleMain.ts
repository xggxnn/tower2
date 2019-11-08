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
import LevelmapInfo from "../../../csvInfo/LevelmapInfo";
import AdsManager from "../../../tool/AdsManager";
import BigPicKey from "../../BigPicKey";
import ProtoEvent from "../../../protobuf/ProtoEvent";

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
		Game.EffectsParent = this.m_effects.displayObject;
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
		this.m_bgList.push(this.m_bg3);
		this.m_bgList.push(this.m_bg2);
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
		let mapLevel = Fun.idToMapLevel(Game.battleData.level_id);
		let levelmap = LevelmapInfo.getInfo(mapLevel.map);
		let bg = 1;
		if (levelmap && levelmap.levelbg) {
			bg = levelmap.levelbg;
		}
		this.m_bg.icon = BigPicKey.getUrl("bg_" + bg + ".png");
		this.m_bg00.icon = BigPicKey.getUrl("bg02_" + bg + ".png");
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	private curGameSpeed: number = -1;
	// 显示，相当于enable
	onWindowShow(): void {
		if (this.curGameSpeed < 0) {
			this.curGameSpeed = Game.playData.gameSpeed;
		} else {
			Game.playData.gameSpeed = this.curGameSpeed;
		}
		Game.sound.stopAndClear();
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
		EventManager.on(ProtoEvent.ENDLESSCONFIG_CALL_BACK, this, this.reFightGame);
		EventManager.on(EventKey.GAMELOSE, this, this.gameLose);
		EventManager.on(EventKey.GAMEWIN, this, this.gameWin);
		EventManager.on(EventKey.GAMESTART, this, this.startGame);
		EventManager.on(EventKey.SKIPGAME, this, this.skipGame);
		EventManager.on(EventKey.GUIDEMOVEHERO, this, this.guideMoveHero);
		EventManager.on(EventKey.GAMEEXIT, this, this.closeUI);
		this.moduleWindow.sUpdateHeroInf.add(this.clickHero, this);
		EventManager.once(EventKey.GUIDE_PLAY_SKILL, this, this.guidePlaySkill);
		Game.battleData.sUpdateResurrection.add(this.createresurrectionEffect, this);

		this.moduleWindow.createLeftTop();
		this.moduleWindow.createLeftBottom();
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
		if (this.skipEffect) {
			this.skipEffect.sk.destroySk();
			this.skipEffect = null;
		}
		if (this.skipEffect2) {
			this.skipEffect2.sk.destroySk();
			this.skipEffect2 = null;
		}
		for (let i = this.resurrectionEffectList.length - 1; i >= 0; i--) {
			if (this.resurrectionEffectList[i]) {
				this.resurrectionEffectList[i].sk.destroySk();
				this.resurrectionEffectList[i] = null;
			}
		}
		this.resurrectionEffectList = [];
		Game.battleMap.sUpdateExitBattleMain.dispatch();
		EventManager.offAllCaller(this);
		this.moduleWindow.sUpdateHeroInf.remove(this.clickHero, this);
		Game.battleData.sUpdateResurrection.removeAll();
		Game.sound.stopAndClear();
		this.curGameSpeed = Game.playData.gameSpeed;
		Game.playData.gameSpeed = 1;
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
			this.moduleWindow.BattleRightBottom.visible = true;
		}

	}
	private _bjTip: UI_BlackText = null;
	private showBgTip(): void {
		let datas = {
			type: "LoadType",
			state: 2,
		}
		Game.proto.logUpload(datas);
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
	private aniMoveSpeed: number = 1.5;
	// 唐僧移动
	private lookScenes(): void {

		this.basPos = new Laya.Point(this.m_bas.x, this.m_bas.y);
		this.m_bg.setXY(-1000, 0);
		this.m_bg00.setXY(1280 - 1000, 0);
		// this.m_door.setXY(2073 - 1000, 0);
		this.cloud = Pools.fetch(UI_CloudCom);
		this.m_cloud.displayObject.addChild(this.cloud.displayObject);
		this.cloud.setXY(0, 0);
		this.m_cloud.setXY(500, -143);

		this.m_bas.setXY(this.basPos.x - 1000, this.basPos.y);

		this.loadSKOver();
	}
	private easetype = fairygui.tween.EaseType.Linear;
	private loadSKOver(): void {
		// this._skEnemy = [];
		this._skts = BaseSK.create("npc_1");
		Game.parentObject.addChild(this._skts);
		this._skts.pos(654, 522);
		this._skts.play(HeroAniEnums.Move, true);

		if (this.tip == null) {
			this.tip = Pools.fetch(UI_DialogBox);
			Game.bloodParent.addChild(this.tip);
		}
		this.tip.setXY(this._skts.x, this._skts.y - 160);
		this.tip.m_titles.text = "大王派我来巡山，抓到一只唐三藏！！！";

		this.easetype = fairygui.tween.EaseType.Linear;
		fairygui.tween.GTween.to2(this.m_bas.x, this.m_bas.y, this.basPos.x, this.basPos.y, this.aniMoveSpeed * 1.5).setTarget(this.m_bas, this.m_bas.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg.x, this.m_bg.y, 0, 0, this.aniMoveSpeed * 1.5).setTarget(this.m_bg, this.m_bg.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg00.x, this.m_bg00.y, 1280, 0, this.aniMoveSpeed * 1.5).setTarget(this.m_bg00, this.m_bg00.setXY).setEase(this.easetype);
		// fairygui.tween.GTween.to2(this.m_door.x, this.m_door.y, 2073, 0, this.aniMoveSpeed * 1.5).setTarget(this.m_door, this.m_door.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_cloud.x, this.m_cloud.y, 1500, 0, this.aniMoveSpeed * 1.5).setTarget(this.m_cloud, this.m_cloud.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.tip.x, this.tip.y, 235, this.tip.y, this.aniMoveSpeed * 1.5).setTarget(this.tip, this.tip.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skts.x, this._skts.y, 94, this._skts.y, this.aniMoveSpeed * 1.5).setTarget(this._skts, this._skts.pos).setEase(this.easetype).onComplete(this.tsMoveOver, this);
	}
	// 唐僧移动结束
	private tsMoveOver(): void {
		this._skts.play(HeroAniEnums.Stand, true);
		this._skxzf = BaseSK.create("hero_25");
		Game.parentObject.addChild(this._skxzf);
		this._skxzf.pos(235, 550);
		this._skxzf.play(HeroAniEnums.Stand, true);
		setTimeout(() => {
			this.tip.visible = false;

			this._skswk = BaseSK.create("enemy_2");
			Game.parentObject.addChild(this._skswk);
			this._skswk.pos(1500, 522);
			this._skswk.scaleX = -1;
			this._skswk.play(HeroAniEnums.Stand, true);
			fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, 1000, this._skswk.y, this.aniMoveSpeed).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype);

			fairygui.tween.GTween.to2(this.m_bas.x, this.m_bas.y, this.basPos.x - 500, this.basPos.y, this.aniMoveSpeed).setTarget(this.m_bas, this.m_bas.setXY).setEase(this.easetype);
			fairygui.tween.GTween.to2(this.m_bg.x, this.m_bg.y, -500, 0, this.aniMoveSpeed).setTarget(this.m_bg, this.m_bg.setXY).setEase(this.easetype);
			fairygui.tween.GTween.to2(this.m_bg00.x, this.m_bg00.y, 1280 - 500, 0, this.aniMoveSpeed).setTarget(this.m_bg00, this.m_bg00.setXY).setEase(this.easetype);
			// fairygui.tween.GTween.to2(this.m_door.x, this.m_door.y, 2073 - 500, 0, this.aniMoveSpeed).setTarget(this.m_door, this.m_door.setXY).setEase(this.easetype);
			fairygui.tween.GTween.to2(this._skts.x, this._skts.y, this._skts.x - 500, this._skts.y, this.aniMoveSpeed).setTarget(this._skts, this._skts.pos).setEase(this.easetype);
			fairygui.tween.GTween.to2(this._skxzf.x, this._skxzf.y, this._skxzf.x - 500, this._skxzf.y, this.aniMoveSpeed).setTarget(this._skxzf, this._skxzf.pos).setEase(this.easetype);
			fairygui.tween.GTween.to2(1500, 0, 1500 - 500, 0, this.aniMoveSpeed).setTarget(this.m_cloud, this.m_cloud.setXY).setEase(this.easetype).onComplete(this.showWuKong, this);
		}, 2000);
	}
	// 悟空出现
	private showWuKong(): void {
		this.tip.visible = true;
		this.tip.setXY(this._skswk.x, this._skswk.y - 160);
		Game.writeEff.startTypeWrite(150, Game.tipTxt.wukongTip1, this.tip.m_titles, Laya.Handler.create(this, this.wukongTip1, null, false));
	}
	// 悟空第一句话结束
	private wukongTip1(): void {
		setTimeout(() => {
			this.tip.visible = false;
			this._skswk.play(HeroAniEnums.Move, true);
			fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, this._skswk.x - 500, this._skswk.y, this.aniMoveSpeed).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.wukongMove1Over, this);
		}, 1000);
	}
	// 悟空第一次移动结束
	private wukongMove1Over(): void {
		this._skswk.play(HeroAniEnums.Attack, true);
		fairygui.tween.GTween.to2(this.m_bas.x, this.m_bas.y, this.basPos.x, this.basPos.y, this.aniMoveSpeed).setTarget(this.m_bas, this.m_bas.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg.x, this.m_bg.y, 0, 0, this.aniMoveSpeed).setTarget(this.m_bg, this.m_bg.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_bg00.x, this.m_bg00.y, 1280, 0, this.aniMoveSpeed).setTarget(this.m_bg00, this.m_bg00.setXY).setEase(this.easetype);
		// fairygui.tween.GTween.to2(this.m_door.x, this.m_door.y, 2073, 0, this.aniMoveSpeed).setTarget(this.m_door, this.m_door.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this.m_cloud.x, this.m_cloud.y, 1500, 0, this.aniMoveSpeed).setTarget(this.m_cloud, this.m_cloud.setXY).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skts.x, this._skts.y, 94, this._skts.y, this.aniMoveSpeed).setTarget(this._skts, this._skts.pos).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skxzf.x, this._skxzf.y, this._skxzf.x + 500, this._skxzf.y, this.aniMoveSpeed).setTarget(this._skxzf, this._skxzf.pos).setEase(this.easetype);
		fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, this._skswk.x + 500, this._skswk.y, this.aniMoveSpeed).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.wukongMove2Over, this);
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
		setTimeout(() => {
			this.tip.visible = false;
			this._skswk.scaleX = 1;
			this._skswk.play(HeroAniEnums.Move, true);
			fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, this._skswk.x + 500, this._skswk.y, this.aniMoveSpeed).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.moveToLeftOver, this);
		}, 1000);
	}

	private moveToLeftOver(): void {
		this.tip.visible = true;
		this.tip.setXY(235, 550 - 160);
		Game.writeEff.startTypeWrite(100, Game.tipTxt.battleXzf, this.tip.m_titles, Laya.Handler.create(this, this.storyOver, null, false));
	}
	private storyOver(): void {
		setTimeout(() => {
			this.tip.visible = false;
			this._skxzf.destroyThis();
			this._skxzf = null;
			this._skswk = null;
			for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
				Game.battleScene.battleSeat[i].showHidefacade(false);
			}
			Game.playData.guideIndex = GuideType.FightReady;
			Game.battleData.trial_level = 0;
			Game.battleData.curEnterFightType = 0;
			Game.menu.open(MenuId.Arrange);
		}, 1000);
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
		Game.menu.open(MenuId.Arrange);
	}
	// 无尽下一关开始
	// 重新开始
	public reFightGame(): void {
		this.hideShowMenu();
		this.showBgOver();
	}
	// 小钻风sk
	private _skxzf: BaseSK = null;
	private _skswk: BaseSK = null;
	private _skts: BaseSK = null;
	// private _skEnemy: BaseSK[] = [];
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
	// 每局可观看视频一次
	private adLookNum: number = 0;
	public startGame(): void {
		this.clearHaloEffect();
		let dat = {
			type: Game.battleData.curEnterFightType + 1,
		}
		Game.proto.recodeInfo(dat);
		EventManager.on(EventKey.REWARDED_VIDEO_AD_YES, this, this.skipOk);
		EventManager.on(EventKey.REWARDED_VIDEO_AD_CLOSE, this, this.loseAdExit);
		EventManager.on(EventKey.ENTER_FRAME, this, this.update);
		this.adLookNum = 0;
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].showHidefacade(true);
			Game.battleScene.battleSeat[i].onShow(this);
		}
		Game.battleScene.initHeroSeat();

		EventManager.event(EventKey.SHOW_UI_WAIT);
		EventManager.once(EventKey.LOADER_OVER, this, this.startGameloadSKOver);
		let _list: Array<string> = [];
		_list = _list.concat(LoadFilesList.res_npc_ResList);
		// _list = _list.concat(LoadFilesList.res_effect_effect_ResList);
		LoaderManager.addList(_list);
	}
	private startGameloadSKOver(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		EventManager.event(EventKey.RE_TRYPLAY);
		if (Game.playData.guideIndex == GuideType.SetSeat) {
			Game.playData.guideIndex = GuideType.StartFight
		}
		this.moduleWindow.menuCloseOther();
		Game.battleData.countdown.dispatch();
		if (Game.battleData.curEnterFightType != 2) {
			if (Game.battleData.fight_type == 1) {
				Game.task.sUpdateStatus.dispatch(4);
			}
			else {
				Game.task.sUpdateStatus.dispatch(1);
			}
		}
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
			if (this.passWaveTips.length == 0) {
				this.passWaveTips = Game.tipTxt.PassWaveTip as Array<string>;
			}
			Game.writeEff.startTypeWrite(100, this.passWaveTips[0], this.tip.m_titles, Laya.Handler.create(this, this.guide10BossTip, null, false));
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
			fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, 1015, this._skswk.y, this.aniMoveSpeed).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.guide10BossTip3, this);
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
		setTimeout(() => {
			this._skswk.scaleX = 1;
			if (this.tip) {
				Game.writeEff.stopTypeWrite();
				this.tip.visible = false;
			}
			this._skswk.play(HeroAniEnums.Move, true);
			fairygui.tween.GTween.to2(this._skswk.x, this._skswk.y, this._skswk.x + 500, this._skswk.y, this.aniMoveSpeed).setTarget(this._skswk, this._skswk.pos).setEase(this.easetype).onComplete(this.passWaveTipOver, this);
		}, 1000);
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
		if (Game.gameStatus != GameStatus.WaitForRest) {
			Game.gameStatus = GameStatus.WaitForRest;
			EventManager.event(EventKey.GAME_PAUSE);
			EventManager.off(EventKey.ENTER_FRAME, this, this.update);
			if (Game.battleData.curEnterFightType < 2 && Game.battleData.level_id < 21 && AdsManager.usable && this.adLookNum < 1) {
				Game.sound.stopAndClear();
				Game.tipWin.battleSkip(Laya.Handler.create(this, this.restGame),
					Laya.Handler.create(this, this.skipCancel), 10);
			}
			else {
				this.skipCancel();
			}
		}
	}
	// 看视频复活
	private restGame(): void {
		if (!Game.redData.adOneFree || Game.showLog) {
			Game.redData.adOneFree = true;
			this.skipOk();
		}
		else {
			AdsManager.show();
		}
	}
	private skipEffect: BattleEffectEnemy = null;
	private skipEffect2: BattleEffectEnemy = null;
	private skipOk(): void {
		this.adLookNum++;
		if (this.skipEffect2 == null) {
			this.skipEffect2 = BattleEffectEnemy.create(3001, false);
			this.m_bloods.displayObject.addChild(this.skipEffect2.sk);
			this.skipEffect2.scale(1, 1, true);
			this.skipEffect2.sk.pos(this.m_base4.x, this.m_base4.y);
		}
		else {
			this.skipEffect2.replay(false);
		}
		let speed = Game.playData.gameSpeed > 1.5 ? 600 : 1100;
		setTimeout(() => {
			this.skipEffect2.stopeAndHide();
			this.skipEffOk();
		}, speed);
	}
	private skipEffOk(): void {
		Game.sound.playSound(SoundKey.s80, true, 1);
		if (this.skipEffect == null) {
			this.skipEffect = BattleEffectEnemy.create(1029, false);
			this.m_bloods.displayObject.addChild(this.skipEffect.sk);
			this.skipEffect.scale(0.3, 0.3, true);
			this.skipEffect.sk.pos(this.m_base4.x, this.m_base4.y);
		}
		else {
			this.skipEffect.replay(false);
		}
		let speed = Game.playData.gameSpeed > 1.5 ? 800 : 1500;
		setTimeout(() => {
			this.skipEffect.stopeAndHide();
			for (let i = Game.battleScene.enemyList.length - 1; i >= 0; i--) {
				var enemy = Game.battleScene.enemyList[i];
				if (enemy) {
					if (!enemy.bossStand) {
						enemy.showEffectAndClear();
						Game.battleScene.enemyList.splice(i, 1);
					}
				}
				else {
					Game.battleScene.enemyList.splice(i, 1);
				}
			}
			setTimeout(() => {
				EventManager.on(EventKey.ENTER_FRAME, this, this.update);
				Game.gameStatus = GameStatus.Gaming;
			}, 1000);
		}, speed);
	}
	private skipCancel(): void {
		if (Game.gameStatus != GameStatus.Failed) {
			Game.gameStatus = GameStatus.Failed;
			if (this.tip) {
				Game.writeEff.stopTypeWrite();
				this.tip.visible = false;
			}
			this.moduleWindow.gameResult();
		}
	}
	private loseAdExit(): void {
		Game.tipWin.battleSkip(Laya.Handler.create(this, this.restGame),
			Laya.Handler.create(this, this.skipCancel), 10);
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
		this._guidTip.setXY(this.m_base3.x, this.m_base3.y - 50);
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
	private passWaveTips: Array<string> = [];
	// update
	private update(): void {
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].update();
		}
		if (Game.gameStatus != GameStatus.Gaming) return;
		var dt = Laya.timer.delta * Game.playData.gameSpeed;
		if (Game.playData.guideIndex > GuideType.sixWin) {
			if (Game.battleMap.curTime < Game.battleMap.waveTime - 1000) {
				this.toastTime++;
				if (this.toastTime > 500) {
					this.toastTime = 0;
					if (this.toastTxt.length == 0) {
						this.toastTxt = Game.tipTxt.txtArray("floatmsg") as Array<string>;
					}
					if (this.passWaveTips.length == 0) {
						this.passWaveTips = Game.tipTxt.PassWaveTip as Array<string>;
					}
					this.moduleWindow.BattleTopMiddle.showScrollTip(this.toastTxt[Fun.range(0, this.toastTxt.length)]);
					// Game.total.toastMsg(this.toastTxt[Fun.range(0, this.toastTxt.length)], true, true);
					if (this.tip == null) {
						this.tip = Pools.fetch(UI_DialogBox);
						Game.bloodParent.addChild(this.tip);
					}
					this.tip.visible = true;
					this.tip.setXY(this._skts.x + 50, this._skts.y - 150);
					Game.writeEff.startTypeWrite(50, this.passWaveTips[Fun.range(0, this.passWaveTips.length)], this.tip.m_titles, Laya.Handler.create(this, this.closeTip, null, false));

				}
			}
		}
		Game.battleData.update(dt);
		this.updateHero(dt);
		this.updateEnemy(dt);
		// if (Game.playData.gameSpeed == 2) {
		// 	Game.battleData.update(dt);
		// 	this.updateHero(dt);
		// 	this.updateEnemy(dt);
		// }
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

	private resurrectionEffectList: Array<BattleEffectEnemy> = [];
	// 创建复活特效
	public createresurrectionEffect(ids: Array<number>) {
		let _effect: BattleEffectEnemy = BattleEffectEnemy.create(ids[0], false);
		Game.EffectsParent.addChild(_effect.sk);
		this.resurrectionEffectList.push(_effect);
		_effect.scale(0.5, 0.5, true);
		_effect.sk.pos(ids[1], ids[2]);
		Laya.Tween.to(_effect.sk, { scaleX: 2.5, scaleY: 2.5 }, 500, null, Laya.Handler.create(this, this.resurrectionEffectRemove, [_effect]));
	}
	private resurrectionEffectRemove(_effect: BattleEffectEnemy): void {
		_effect.sk.destroySk();
		_effect.destroy();
		_effect = null;
	}
}
UI_BattleMain.bind();