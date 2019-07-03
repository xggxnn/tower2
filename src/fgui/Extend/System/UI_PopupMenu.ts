import fui_PopupMenu from "../../Generates/System/fui_PopupMenu";
import SystemWin from "../../../gamemodule/Windows/SystemWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_PopupMenu extends fui_PopupMenu {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_PopupMenu {
		return <UI_PopupMenu>(fui_PopupMenu.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_PopupMenu.URL, UI_PopupMenu);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}
	showPopup(button: fairygui.GObject, showInBtnPos: boolean, ...arg: any[]): void {
		this.updateData();
		this.m_tip.text = arg.toString();
		if (showInBtnPos) {
			fairygui.GRoot.inst.showPopup(this, button);
		}
		else {
			fairygui.GRoot.inst.showPopup(this);
		}
	}

	updateData(): void {

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
UI_PopupMenu.bind();