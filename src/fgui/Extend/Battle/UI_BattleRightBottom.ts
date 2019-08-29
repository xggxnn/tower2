import fui_BattleRightBottom from "../../Generates/Battle/fui_BattleRightBottom";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import UI_SkillBtn from "./UI_SkillBtn";
import UI_AddSpeedBtn from "./UI_AddSpeedBtn";
import PlayerSkillInfo from "../../../csvInfo/PlayerSkillInfo";
import SpriteKey from "../../SpriteKey";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleRightBottom extends fui_BattleRightBottom {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleRightBottom {
		return <UI_BattleRightBottom>(fui_BattleRightBottom.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleRightBottom.URL, UI_BattleRightBottom);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_skill2Btn.visible = false;
		this.m_skill3Btn.onClick(this, this.skillClick);

		this.addSpeedBtn = this.m_addSpeed as UI_AddSpeedBtn;
		this.addSpeedBtn.onClick(this, this.doubleSpeed);
		this.addSpeedBtn.m_changeStatus.setSelectedIndex(0);
	}
	private addSpeedBtn: UI_AddSpeedBtn;
	public skillClick(): void {
		if (this.mapSkillCDMax > 0) {
			if (Game.playData.guideIndex == GuideType.CastSkill) {
				Game.playData.guideIndex = GuideType.CastSkillOver;
				Game.gameStatus = GameStatus.Gaming;
			}
			this.mapSkillCD = this.mapSkillCDMax;
			this.m_skill3Btn.m_mask.fillAmount = 1;
			this.m_skill3Btn.enabled = false;
			Game.total.toastMsg(this.mapSkillInf.des, false, true);
			EventManager.event(EventKey.PLAY_SKILL, [false]);
		}
		else {
			Game.total.toastMsg("被动技能：" + this.mapSkillInf.des, false, true);
		}
	}
	private doubleSpeed(): void {
		if (Game.battleMap.maxMapId < 3) {
			Game.tipWin.showTip(Game.tipTxt.AddSpeedTip);
		}
		else {
			if (Game.playData.gameSpeed < 1.5) {
				Game.playData.gameSpeed = 2;
				this.addSpeedBtn.m_changeStatus.setSelectedIndex(1);
			}
			else if (Game.playData.gameSpeed > 1.5) {
				Game.playData.gameSpeed = 1;
				this.addSpeedBtn.m_changeStatus.setSelectedIndex(0);
			}
			EventManager.event(EventKey.CHANGESPEED);
		}
	}
	// 需从ui_main 调用
	public update(dt): void {
		if (this.mapSkillCDMax > 0) {
			if (this.mapSkillCD > 0) {
				this.mapSkillCD -= dt;
				if (this.mapSkillCD <= 0) {
					this.m_skill3Btn.enabled = true;
				}
				this.m_skill3Btn.m_mask.fillAmount = this.mapSkillCD / this.mapSkillCDMax;
			}
		}
	}

	private mapSkillInf: PlayerSkillInfo = null;
	private mapSkillCD: number = 0;
	private mapSkillCDMax: number = 0;
	private setData(): void {
		if (Game.playData.gameSpeed < 1.5) {
			this.addSpeedBtn.m_changeStatus.setSelectedIndex(0);
		}
		else if (Game.playData.gameSpeed > 1.5) {
			this.addSpeedBtn.m_changeStatus.setSelectedIndex(1);
		}
		this.mapSkillInf = PlayerSkillInfo.getInfo(Game.playData.curPlaySkillIndex);
		this.mapSkillCD = 0;
		this.mapSkillCDMax = this.mapSkillInf.cd * 1000;
		this.m_skill3Btn.m_mask.fillAmount = 0;
		this.m_skill3Btn.icon = SpriteKey.getUrl("icon_skill0" + this.mapSkillInf.id + ".png");
		this.m_skill3Btn.enabled = true;
		this.m_skill3Btn.m_titles.text = this.mapSkillInf.name;
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
		EventManager.on(EventKey.GAMESTART, this, this.setData);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Game.playData.sBattleMainUpdate.remove(this.update, this);
		EventManager.off(EventKey.GAMESTART, this, this.setData);
	}
	public showGuide(): void {
		this.visible = true;
		this.moduleWindow.createGuideUI(this.m_skill3Btn, new Laya.Point(this.x + this.m_skill3Btn.x, this.y + this.m_skill3Btn.y), Laya.Handler.create(this, this.skillClick), Game.tipTxt.battleSkill, LocationType.Left);
	}

}
UI_BattleRightBottom.bind();