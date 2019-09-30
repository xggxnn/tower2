import fui_Synthetise from "../../Generates/Home/fui_Synthetise";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import FWindow from "../../../gamemodule/FWindow";
import BaseSK from "../../../base/BaseSK";
import { HeroAniEnums } from "../../../gamemodule/DataEnums/HeroAniEnums";
import { MenuId } from "../../../gamemodule/MenuId";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import BattleEffectEnemy from "../../../gamemodule/Models/BattleEffectEnemy";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import { FightType } from "../../../gamemodule/DataEnums/FightType";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Synthetise extends fui_Synthetise {

	moduleWindow: HomeWin;
	private fwindow: FWindow;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_Synthetise {
		return <UI_Synthetise>(fui_Synthetise.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Synthetise.URL, UI_Synthetise);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_ok.onClick(this, this.closeUI);
		this.m_setSeat.onClick(this, this.clickSeat);
	}

	// 关闭ui
	closeUI(): void {
		Game.playData.upQualityOldTip.clear();
		if (this._sk) {
			this._sk.destroyThis();
			this._sk = null;
		}
		if (this.fwindow) {
			this.fwindow.windowRemoveChild(this);
		}
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}
	private _sk: BaseSK = null;
	private setData(): void {
		if (this.eff) {
			this.eff.replay(false);
		}
		else {
			this.eff = this.addBattleEffect("ui04", false);
		}
		this.m_ok.visible = false;
		this.m_setSeat.visible = false;
		if (Game.playData.synthetise > 0) {

			switch (Game.playData.synUpReset) {
				case 1:
					break;
				case 2:
					{
						let str: string = Game.tipTxt.txts("getherotip");
						Game.total.toastMsg(str, true, true);
					}
					break;
				case 3:
					break;
			}
			Game.playData.synUpReset = 0;
			let hero = HeroInfoData.getInfo(Game.playData.synthetise);
			// 属性赋值

			if (Game.playData.upQualityOldTip.count > 0) {
				let curDic = Game.battleData.getHeroFightVal(hero.id);
				let tip2 = Game.playData.fightTip(curDic, 2);
				let tip = Game.playData.upQualityOldTip;

				this.m_atk2.setVar("count", tip2.getValue(FightType.Atk)).flushVars();
				this.m_atkspeed2.setVar("count", tip2.getValue(FightType.Speed)).flushVars();
				this.m_cirt2.setVar("count", tip2.getValue(FightType.Crit)).flushVars();
				this.m_burst2.setVar("count", tip2.getValue(FightType.Burst)).flushVars();

				this.m_atk.setVar("count", tip.getValue(FightType.Atk)).flushVars();
				this.m_atkspeed.setVar("count", tip.getValue(FightType.Speed)).flushVars();
				this.m_cirt.setVar("count", tip.getValue(FightType.Crit)).flushVars();
				this.m_burst.setVar("count", tip.getValue(FightType.Burst)).flushVars();
			}
			else {
				let curDic = Game.battleData.getHeroFightVal(hero.id);
				let tip = Game.playData.fightTip(curDic, 2);
				this.m_atk.setVar("count", tip.getValue(FightType.Atk)).flushVars();
				this.m_atkspeed.setVar("count", tip.getValue(FightType.Speed)).flushVars();
				this.m_cirt.setVar("count", tip.getValue(FightType.Crit)).flushVars();
				this.m_burst.setVar("count", tip.getValue(FightType.Burst)).flushVars();
			}
			this.m_quality.setSelectedIndex(0);
			if (this._sk) {
				this._sk.destroyThis();
				this._sk = null;
			}
			let _id = 18;
			if (Game.haveHeroTem.indexOf(hero.skin) != -1) {
				_id = hero.skin;
			}
			this._sk = BaseSK.create("hero_" + _id);
			this.m_skbg.displayObject.addChild(this._sk);
			this._sk.pos(this.width / 2, this.height / 2 + 100);
			this._sk.play(HeroAniEnums.Stand, true);
			this._sk.scale(0.001, 0.001);
			fairygui.tween.GTween.to2(0.1, 0.1, 2, 2, 1).setTarget(this._sk, this._sk.scale).setDelay(2.7).onComplete(this._tweenComplete, this);
		}
		else {
			this.closeUI();
		}
	}
	private eff: BattleEffectEnemy = null;
	private addBattleEffect(id: string, loop: boolean): BattleEffectEnemy {
		let key: string = String(id);
		let _effect: BattleEffectEnemy = BattleEffectEnemy.create(id, loop);
		this.m_skbg.displayObject.addChild(_effect.sk);
		_effect.scale(1, 1, true);
		_effect.sk.pos(this.width / 2, this.height / 2);
		return _effect;
	}
	private _tweenComplete(): void {
		if (Game.playData.upQualityOldTip.count > 0) {
			this.m_quality.setSelectedIndex(2);
		}
		else {
			this.m_quality.setSelectedIndex(1);
		}
		this.m_ok.visible = true;
		this.m_setSeat.visible = true;

		if (Game.playData.guideIndex == GuideType.SnythHero) {
			Game.playData.guideIndex = GuideType.SnythHeroOver;
			EventManager.event(EventKey.SHOW_WAIT);
			this.moduleWindow.createGuideUI(this.m_setSeat, new Laya.Point(this.m_setSeat.x, this.m_setSeat.y),
				Laya.Handler.create(this, this.clickSeat), Game.tipTxt.synthetise, LocationType.Upper);
		}
	}
	private clickSeat(): void {
		this.closeUI();
		Game.menu.open(MenuId.Arrange);
	}

}
UI_Synthetise.bind();
