import fui_Blood from "../../Generates/Battle/fui_Blood";
import BattleWin from "../../../gamemodule/Windows/BattleWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Blood extends fui_Blood {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_Blood {
		return <UI_Blood>(fui_Blood.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Blood.URL, UI_Blood);
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
UI_Blood.bind();