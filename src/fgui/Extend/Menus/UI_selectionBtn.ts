import fui_selectionBtn from "../../Generates/Menus/fui_selectionBtn";
import MenusWin from "../../../gamemodule/Windows/MenusWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_selectionBtn extends fui_selectionBtn {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_selectionBtn {
		return <UI_selectionBtn>(fui_selectionBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_selectionBtn.URL, UI_selectionBtn);
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

	/**
	 * 
	 * @param isboss 是否boss关卡
	 * @param map 第几个地图
	 * @param level 第几关
	 */
	public setData(map: number, level: number, isboss?: boolean): void {
		if (map < 0) map = 0;
		if (map > 4) map = 4;
		if (level < 0) level = 0;
		if (level > 4) level = 4;
		this.m_pic.setSelectedIndex(isboss ? 1 : 0);
		this.m_top.setSelectedIndex(map - 1);
		this.m_end.setSelectedIndex(level - 1);
	}

}
UI_selectionBtn.bind();