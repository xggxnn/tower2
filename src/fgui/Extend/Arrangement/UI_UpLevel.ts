import fui_UpLevel from "../../Generates/Arrangement/fui_UpLevel";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import Fun from "../../../tool/Fun";
import Game from "../../../Game";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import BattleEffectEnemy from "../../../gamemodule/Models/BattleEffectEnemy";
import UI_GeneralBtn from "../System/UI_GeneralBtn";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_UpLevel extends fui_UpLevel {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_UpLevel {
		return <UI_UpLevel>(fui_UpLevel.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_UpLevel.URL, UI_UpLevel);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_backBtn.setXY(Fun.leftTopPoint.x + 5, Fun.leftTopPoint.y + 5);
		this.m_middle.setXY(Fun.topMiddlePoint.x, Fun.topMiddlePoint.y + 5);
		this.m_help.setXY(Fun.bottomMiddlePoint.x - 30, Fun.bottomMiddlePoint.y - 80);
		this.m_help.onClick(this, this.helpClick);
		this.m_backBtn.onClick(this, this.backUI);
		// 升级
		this.m_upLevel.onClick(this, this.levelUpDown);
		// 升星
		this.m_upStar.onClick(this, this.starUpClick);
	}
	private helpClick(): void {
		Game.tipWin.showTip(Game.tipTxt.txts("LevelUpTip"), false, null, null, "确定", "", 0);
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.windowRemoveChild(this);
		setTimeout(() => {
			this.moduleWindow.content.showToFightGuide();
		}, 30);
	}
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinGold);
		EventManager.on(EventKey.COIN_JADEITE_UPDATE, this, this.refreshCoinJadeite);
		EventManager.on(EventKey.HERO_LEVEL_UPDATE, this, this.refreshHeroLevel, [true]);
		EventManager.on(EventKey.HERO_STAR_UPDATE, this, this.refreshHeroStar, [true]);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		if (this.eff) {
			this.eff.stopeAndHide();
		}
		EventManager.offAllCaller(this);
	}

	private totalTimeLevel: number = 0;
	private totalTimeStar: number = 0;
	private setData(): void {
		this.refreshCoinGold();
		this.refreshCoinJadeite();
		this.refreshHeroLevel(false);
	}

	private refreshCoinGold(): void {
		this.m_gold.text = Fun.formatNumberUnit(Game.playData.curGold);
	}
	private refreshCoinJadeite(): void {
		this.m_jadeite.text = Fun.formatNumberUnit(Game.playData.curJadeite);
	}
	// 刷新英雄等级
	private refreshHeroLevel(up: boolean): void {
		if (up) {
			if (this.totalTimeLevel < Game.time.localTime - 3000) {
				this.totalTimeLevel = Game.time.localTime;
				Game.total.toastMsg(Game.tipTxt.txts("levelupsuccess"), true, true);
			}
			if (this.eff) {
				this.eff.replay(false);
			}
			else {
				this.eff = this.addBattleEffect("ui01", false);
			}
		}
		this.m_counts1.text = Fun.formatNumberUnit(Game.playData.upLevelCost());
		this.m_level.setVar("count", (Game.playData.curLevel - 1).toString()).flushVars();
		if (Game.redData.levelRed) {
			(this.m_upLevel as UI_GeneralBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_upLevel as UI_GeneralBtn).m_redTip.setSelectedIndex(0);
		}
		if (Game.playData.curLevel >= 6 && Game.playData.guideIndex == GuideType.fiveUpLvelNext) {
			Game.playData.guideIndex = GuideType.fiveUpLevel;
		}
		if (Game.playData.guideIndex == GuideType.fiveUpLvelNext) {
			EventManager.event(EventKey.SHOW_WAIT);
			setTimeout(() => {
				this.moduleWindow.createGuideUI(this.m_upLevel, new Laya.Point(this.m_upLevel.x, this.m_upLevel.y), Laya.Handler.create(this, this.levelUpDown), Game.tipTxt.fiveUpLevel, LocationType.Upper);
			}, 200);
		}
		else if (Game.playData.guideIndex == GuideType.fiveUpLevel) {
			Game.playData.guideIndex = GuideType.fiveUpLevelOver;
			EventManager.event(EventKey.SHOW_WAIT);
			setTimeout(() => {
				this.moduleWindow.createGuideUI(this.m_backBtn, new Laya.Point(this.m_backBtn.x, this.m_backBtn.y),
					Laya.Handler.create(this, this.backUI), Game.tipTxt.fiveUpLevelOver, LocationType.RightLower);
			}, 100);
		}
		this.refreshHeroStar(false);
	}
	// 刷新英雄星级
	private refreshHeroStar(up: boolean): void {
		if (up) {
			if (this.totalTimeStar < Game.time.localTime - 3000) {
				this.totalTimeStar = Game.time.localTime;
				Game.total.toastMsg(Game.tipTxt.txts("levelbigupsuccess"), true, true);
			}
			if (this.eff) {
				this.eff.replay(false);
			}
			else {
				this.eff = this.addBattleEffect("ui01", false);
			}
		}
		if (Game.redData.starRed) {
			(this.m_upStar as UI_GeneralBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_upStar as UI_GeneralBtn).m_redTip.setSelectedIndex(0);
		}
		this.m_counts2.text = Fun.formatNumberUnit(Game.redData.curStarCost());
		this.m_star.setVar("count", Game.playData.curStar.toString()).flushVars();
	}
	// 点击升级按钮
	private levelUpDown(): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		if (Game.playData.upLevelCost() == 0) {
			Game.tipWin.showTip(Game.tipTxt.MaxLevel);
			return;
		}
		if (Game.playData.upLevelCost() <= Game.playData.curGold) {
			let data = {
				upLevel: 1,
			}
			Game.proto.upLevel(data);
		}
		else {
			Game.tipWin.showTip(Game.tipTxt.GoldNoEnough);
		}

	}

	// 点击升星按钮
	private starUpClick(): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		if (Game.redData.curStarCost() == 0) {
			Game.tipWin.showTip(Game.tipTxt.MaxStar);
			return;
		}
		if (Game.redData.curStarCost() <= Game.playData.curJadeite) {
			if (Game.playData.curStar < Math.floor((Game.playData.curLevel - 1) / 10)) {
				Game.proto.upStar({});
			}
			else {
				Game.tipWin.showTip(Game.tipTxt.LevelNoEnough);
			}
		}
		else {
			Game.tipWin.showTip(Game.tipTxt.JadeiteNoEnough);
		}
	}
	private eff: BattleEffectEnemy = null;
	private addBattleEffect(id: string, loop: boolean): BattleEffectEnemy {
		let key: string = String(id);
		let _effect: BattleEffectEnemy = BattleEffectEnemy.create(id, loop);
		this.displayObject.addChild(_effect.sk);
		_effect.scale(1, 1, true);
		_effect.sk.pos(this.width / 2, this.height / 2);
		return _effect;
	}
}
UI_UpLevel.bind();
