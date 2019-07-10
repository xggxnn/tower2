import fui_BattleRightTop from "../../Generates/Battle/fui_BattleRightTop";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import Fun from "../../../Tool/Fun";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleRightTop extends fui_BattleRightTop {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleRightTop {
		return <UI_BattleRightTop>(fui_BattleRightTop.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleRightTop.URL, UI_BattleRightTop);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}
	countdown(): void {
		let cd = Math.floor(Game.battleMap.waveTime - Game.battleMap.curTime);
		this.m_time.text = Fun.format("刷怪剩余时间：{0}秒", Math.floor(cd));
		if (cd <= 0) {
			Game.battleData.countdown.remove(this.countdown, this);
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
		Game.battleData.countdown.add(this.countdown, this);
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Game.battleData.countdown.remove(this.countdown, this);
	}


}
UI_BattleRightTop.bind();