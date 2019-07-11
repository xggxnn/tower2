import fui_conquestBtn from "../../Generates/Home/fui_conquestBtn";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_conquestBtn extends fui_conquestBtn {

	moduleWindow: HomeWin;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_conquestBtn {
		return <UI_conquestBtn>(fui_conquestBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_conquestBtn.URL, UI_conquestBtn);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}

	public setData(): void {
		let levelcount = 0;
		let list = Game.battleMap.waveStatusDict.getValues();
		for (let i = list.length - 1; i >= 0; i--) {
			if (list[i].level >= 10) {
				levelcount++;
			}
		}
		this.m_tip1.setVar("count", levelcount.toString()).flushVars();
		this.m_tip2.setVar("time", "半小时").setVar("count", "112").flushVars();
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

	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}


}
UI_conquestBtn.bind();
