import fui_selectionBtn from "../../Generates/Menus/fui_selectionBtn";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";

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
	 * @param map 第几个地图
	 * @param level 第几关
	 * @param isboss 是否boss关卡
	 */
	public setData(map: number, level: number, isboss?: boolean): void {
		this.m_pic.setSelectedIndex(isboss ? 1 : 0);
		this.m_map.text = map + "-" + level;
	}

}
UI_selectionBtn.bind();