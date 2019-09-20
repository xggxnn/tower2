import fui_FightTip from "../../Generates/Arrangement/fui_FightTip";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_FightTip extends fui_FightTip {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_FightTip {
		return <UI_FightTip>(fui_FightTip.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_FightTip.URL, UI_FightTip);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

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
UI_FightTip.bind();
