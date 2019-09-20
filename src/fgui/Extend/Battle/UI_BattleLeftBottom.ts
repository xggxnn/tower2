import fui_BattleLeftBottom from "../../Generates/Battle/fui_BattleLeftBottom";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import TimeHouseInfo from "../../../csvInfo/TimeHouseInfo";
import SkillInfo from "../../../csvInfo/SkillInfo";
import Association from "../../../gamemodule/DataStructs/Association";
import SpriteKey from "../../SpriteKey";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import PlayerSkillInfo from "../../../csvInfo/PlayerSkillInfo";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleLeftBottom extends fui_BattleLeftBottom {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleLeftBottom {
		return <UI_BattleLeftBottom>(fui_BattleLeftBottom.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleLeftBottom.URL, UI_BattleLeftBottom);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_playSkillBtn.onClick(this, this.skillClick);
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
		Game.playData.sBattleMainUpdate.add(this.update, this);
		this.m_showHide.setSelectedIndex(0);
		this.moduleWindow.sUpdateHeroInf.add(this.setData, this);
		EventManager.on(EventKey.GAMESTART, this, this.skillInit);
		this.skillInit();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Game.playData.sBattleMainUpdate.remove(this.update, this);
		this.moduleWindow.sUpdateHeroInf.remove(this.setData, this);
		EventManager.off(EventKey.GAMESTART, this, this.skillInit);
	}
	private haveShowRangeNum: number = -1;
	private setData(hero: HeroInfoData): void {
		if (hero) {
			let timehouse = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
			let star = timehouse.vals[Game.playData.curStar];
			let skill = SkillInfo.getInfo(hero.skill_id_2);
			this.m_name.text = hero.name;
			let curDic = Game.battleData.getHeroFightVal(hero.id);
			let tip = Game.playData.fightTip(curDic);
			this.m_atktip.setVar("count", tip.getValue(FightType.Atk)).setVar("speed", tip.getValue(FightType.Speed)).flushVars();
			this.m_skill.setVar("des", skill.explain).flushVars();
			this.m_menpai.setVar("name", Association.careerName(hero.career)).flushVars();
			this.m_wuxing.setVar("count", Association.raceName(hero.race)).flushVars();
			this.m_quality.icon = SpriteKey.getUrl("quality" + hero.quality + ".png");
			this.m_pic.icon = SpriteKey.getUrl("hero_" + hero.skin + ".png");
			this.m_attribute.icon = SpriteKey.getUrl("race" + hero.race + ".png");
			this.m_atkAttribute.icon = SpriteKey.getUrl("career" + hero.career + ".png");
			this.m_showHide.setSelectedIndex(1);
			this.haveShowRangeNum = 10000;
		}
	}

	private update(dt): void {
		if (this.haveShowRangeNum > 0) {
			this.haveShowRangeNum -= dt;
			if (this.haveShowRangeNum <= 0) {
				this.haveShowRangeNum = 0;
				this.m_showHide.setSelectedIndex(0);
			}
		}
		if (this.mapSkillCDMax > 0) {
			if (this.mapSkillCD > 0) {
				this.mapSkillCD -= dt;
				if (this.mapSkillCD <= 0) {
					this.m_playSkillBtn.m_mask.visible = false;
					this._cding = false;
				}
				else {
					if (!this.m_playSkillBtn.m_mask.visible) {
						this.m_playSkillBtn.m_mask.visible = true;
					}
				}
				this.m_playSkillBtn.m_mask.fillAmount = this.mapSkillCD / this.mapSkillCDMax;
			}
		}
	}
	private mapSkillInf: PlayerSkillInfo = null;
	private mapSkillCD: number = 0;
	private mapSkillCDMax: number = 0;
	private _cding: boolean = false;

	private skillInit(): void {
		this.mapSkillInf = PlayerSkillInfo.getInfo(Game.playData.curPlaySkillIndex);
		this.mapSkillCD = 0;
		this.mapSkillCDMax = this.mapSkillInf.cd * 1000;
		this.m_playSkillBtn.m_mask.fillAmount = 0;
		this.m_playSkillBtn.m_mask.visible = false;
		this.m_playSkillBtn.m_icons.icon = SpriteKey.getUrl("icon_skill0" + this.mapSkillInf.id + ".png");
		this._cding = false;
		this.m_playSkillDes.text = this.mapSkillInf.name;
	}
	private skillClick(): void {
		if (this._cding) {
			Game.popup.showPopup(this.m_playSkillBtn, false, false, Game.tipTxt.SkillCD);
			return;
		}
		if (this.mapSkillCDMax > 0) {
			if (Game.playData.guideIndex == GuideType.CastSkill) {
				Game.playData.guideIndex = GuideType.CastSkillOver;
				Game.gameStatus = GameStatus.Gaming;
			}
			this.mapSkillCD = this.mapSkillCDMax;
			this.m_playSkillBtn.m_mask.fillAmount = 1;
			this.m_playSkillBtn.m_mask.visible = true;
			this._cding = true;
			this.m_playSkillBtn.m_tip.text = this.mapSkillInf.des;
			this.m_playSkillBtn.m_t0.play();
			EventManager.event(EventKey.PLAY_SKILL, [false]);
		}
		else {
			this.m_playSkillBtn.m_tip.text = "被动技能：" + this.mapSkillInf.des;
			this.m_playSkillBtn.m_t0.play();
		}
	}
	public showGuide(): void {
		this.visible = true;
		EventManager.event(EventKey.SHOW_WAIT);
		this.moduleWindow.createGuideUI(this.m_playSkillBtn, new Laya.Point(this.x + this.m_playSkillBtn.x, this.y + this.m_playSkillBtn.y), Laya.Handler.create(this, this.skillClick), Game.tipTxt.battleSkill);
	}

}
UI_BattleLeftBottom.bind();