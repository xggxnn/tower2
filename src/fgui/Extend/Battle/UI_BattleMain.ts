import fui_BattleMain from "../../Generates/Battle/fui_BattleMain";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import SoundKey from "../../SoundKey";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import LoaderManager from "../../../Tool/LoaderManager";
import LoadFilesList from "../../../Tool/LoadFilesList";
import BattleSeat from "../../../gamemodule/Models/BattleSeat";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import Handler = Laya.Handler;
import BattleModel from "../../../gamemodule/Models/BattleModel";
import UI_Stone from "./UI_Stone";

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
		Game.sound.playMusic(SoundKey.bgm_1, 0);

		Game.parentObject = this.m_scenes.displayObject;
		Game.bloodParent = this.m_bloods.root;

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

		EventManager.once(EventKey.LOADER_OVER, this, this.open);
		LoaderManager.resetShowLoad();
		LoaderManager.addList(LoadFilesList.allResList);
	}

	private loadOver: boolean = false;
	private open(): void {
		console.log("加载完毕sk");
		this.loadOver = true;
		Game.gameStatus = GameStatus.Pause;
		Game.tipWin.showTip("点击确定开始游戏", Handler.create(this, this.reTryPlay));
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
		EventManager.on(EventKey.ENTER_FRAME, this, this.update);
		EventManager.on(EventKey.GAMELOSE, this, this.gameLose);
		EventManager.on(EventKey.GAMEWIN, this, this.gameWin);

		this.moduleWindow.createLeftTop();
		this.moduleWindow.createLeftBottom();
		this.moduleWindow.createRightTop();
		this.moduleWindow.createRightBottom();
		this.moduleWindow.createTopMiddle();
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].onShow();
		}
		if (this.loadOver) {
			Game.tipWin.showTip("点击确定开始游戏", Handler.create(this, this.reTryPlay));
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		for (let i = 0; i < Game.battleScene.battleSeat.length; i++) {
			Game.battleScene.battleSeat[i].onClose();
		}
		EventManager.off(EventKey.ENTER_FRAME, this, this.update);
	}
	// 游戏重新开始本关卡
	private reTryPlay(): void {
		Game.battleScene.initHeroSeat();
		EventManager.event(EventKey.RE_TRYPLAY);
	}
	private gameWin(): void {
		Game.gameStatus = GameStatus.Win;
		EventManager.event(EventKey.GAME_PAUSE);
		this.moduleWindow.gameResult();
		EventManager.off(EventKey.ENTER_FRAME, this, this.update);
	}
	private gameLose(): void {
		Game.gameStatus = GameStatus.Failed;
		EventManager.event(EventKey.GAME_PAUSE);
		this.moduleWindow.gameResult();
		EventManager.off(EventKey.ENTER_FRAME, this, this.update);
	}
	// update
	private update(): void {
		if (Game.gameStatus == GameStatus.Pause) return;
		var dt = Laya.timer.delta;
		this.updateHero(dt);
		this.updateEnemy(dt);
		this.refreshIndex();
	}
	// 更新英雄信息
	private updateHero(dt: number): void {
		for (let i = Game.battleScene.heroList.length - 1; i >= 0; i--) {
			var hero: BattleModel = Game.battleScene.heroList[i];
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
				var enemy: BattleModel = Game.battleScene.enemyList[i];
				if (enemy && !enemy.haveDeath) {
					enemy.update(dt);
					if (enemy.canHit) {
						let skx = enemy.sk.x;
						let sky = enemy.sk.y;
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
	private addInAtkRange(key: number, enemy: BattleModel): void {
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


}
UI_BattleMain.bind();