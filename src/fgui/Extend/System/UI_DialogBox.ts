import SystemWin from "../../../gamemodule/Windows/SystemWin";
import fui_DialogBox from "../../Generates/System/fui_DialogBox";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_DialogBox extends fui_DialogBox {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_DialogBox {
		return <UI_DialogBox>(fui_DialogBox.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_DialogBox.URL, UI_DialogBox);
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
UI_DialogBox.bind();
