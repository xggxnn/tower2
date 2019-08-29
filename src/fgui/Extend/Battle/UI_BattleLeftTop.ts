import fui_BattleLeftTop from "../../Generates/Battle/fui_BattleLeftTop";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import Fun from "../../../Tool/Fun";

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
		Game.battleScene.stoneReset();
		Game.battleScene.clearEnemy();
		Game.battleScene.clearHero();
		Game.menu.open(MenuId.MenuSelect);
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
		this.m_waveBtn.title = Fun.format("第{0}关,退出", Game.battleData.level_id);
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}


}
UI_BattleLeftTop.bind();