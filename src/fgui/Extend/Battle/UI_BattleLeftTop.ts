import fui_BattleLeftTop from "../../Generates/Battle/fui_BattleLeftTop";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import Fun from "../../../tool/Fun";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleLeftTop extends fui_BattleLeftTop {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleLeftTop {
		return <UI_BattleLeftTop>(fui_BattleLeftTop.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleLeftTop.URL, UI_BattleLeftTop);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_waveBtn.onClick(this, this.clickWaveBtn);
	}
	clickWaveBtn(): void {
		Game.tipWin.showTip(Game.tipTxt.ExitWaveTip, true, Laya.Handler.create(this, this.exitGame));
	}
	private exitGame(): void {
		EventManager.event(EventKey.GAMEEXIT);
		Game.battleScene.clearBattleScene();
		if (Game.battleData.curEnterFightType == 3) {
			Game.menu.open(MenuId.Home);
		} else {
			Game.menu.open(MenuId.MenuSelect);
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
		if (Game.battleData.curEnterFightType == 2) {
			this.m_tip.setVar("level", Game.battleData.dayFightProgress.toString()).flushVars();
		}
		else if (Game.battleData.curEnterFightType == 3) {
			this.m_tip.setVar("level", (Game.battleData.endlessMy.progress + 1).toString()).flushVars();
		}
		else {
			let mapLevel = Fun.idToMapLevel(Game.battleData.level_id);
			this.m_tip.setVar("level", mapLevel.map.toString() + "-" + mapLevel.level).flushVars();
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}


}
UI_BattleLeftTop.bind();