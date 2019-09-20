import fui_DayFight from "../../Generates/Menus/fui_DayFight";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import UI_SelectionDay from "./UI_SelectionDay";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_DayFight extends fui_DayFight {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_DayFight {
		return <UI_DayFight>(fui_DayFight.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_DayFight.URL, UI_DayFight);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.selectionList = [];
		this.selectionList.push(this.m_s1 as UI_SelectionDay);
		this.selectionList.push(this.m_s2 as UI_SelectionDay);
		this.selectionList.push(this.m_s3 as UI_SelectionDay);
		this.selectionList.push(this.m_s4 as UI_SelectionDay);
		this.selectionList.push(this.m_s5 as UI_SelectionDay);
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

	private selectionList: Array<UI_SelectionDay> = [];

	public setData(): void {
		for (let i = 1; i < 6; i++) {
			this.selectionList[i - 1].dayData(i);
		}
	}

}
UI_DayFight.bind();
