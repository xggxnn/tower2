import fui_ScrollTxt from "../../Generates/System/fui_ScrollTxt";
import SystemWin from "../../../gamemodule/Windows/SystemWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_ScrollTxt extends fui_ScrollTxt {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_ScrollTxt {
		return <UI_ScrollTxt>(fui_ScrollTxt.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_ScrollTxt.URL, UI_ScrollTxt);
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
UI_ScrollTxt.bind();