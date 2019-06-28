import fui_Bag from "../../Generates/Bag/fui_Bag";
import BagWin from "../../../gamemodule/Windows/BagWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Bag extends fui_Bag {

	moduleWindow: BagWin;

	public static DependPackages: string[] = ["Bag"];

	public static createInstance(): UI_Bag {
		return <UI_Bag>(fui_Bag.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Bag.URL, UI_Bag);
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
UI_Bag.bind();