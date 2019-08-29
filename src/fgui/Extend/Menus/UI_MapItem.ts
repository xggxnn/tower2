import fui_MapItem from "../../Generates/Menus/fui_MapItem";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import WaveInfo from "../../../csvInfo/WaveInfo";
import UI_Selection from "./UI_Selection";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_MapItem extends fui_MapItem {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_MapItem {
		return <UI_MapItem>(fui_MapItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_MapItem.URL, UI_MapItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.selectionList = [];
		this.selectionList.push(this.m_s1 as UI_Selection);
		this.selectionList.push(this.m_s2 as UI_Selection);
		this.selectionList.push(this.m_s3 as UI_Selection);
		this.selectionList.push(this.m_s4 as UI_Selection);
		this.selectionList.push(this.m_s5 as UI_Selection);
		this.selectionList.push(this.m_s6 as UI_Selection);
		this.selectionList.push(this.m_s7 as UI_Selection);
		this.selectionList.push(this.m_s8 as UI_Selection);
		this.selectionList.push(this.m_s9 as UI_Selection);
		this.selectionList.push(this.m_s10 as UI_Selection);
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
	// index 第几张地图，从0开始
	public setData(index: number, moduleWindow: MenusWin): void {
		this.moduleWindow = moduleWindow;
		this.waveInfList = [];
		for (let i = 1; i < 11; i++) {
			let wave = WaveInfo.getInfo(i + index * 10);
			this.waveInfList.push(wave);
		}
		let j = 0;
		for (let i = 0; i < 10; i++) {
			if ((i + 1) % 4 == 0) {
				j++;
			}
			this.selectionList[i].setXY(this.m_selection.x + 200 + (i - j * 3) * 200, this.m_selection.y + j * 200);
			this.selectionList[i].setData(this.waveInfList[i], moduleWindow);
		}
	}
	private waveInfList: Array<WaveInfo> = [];
	public selectionList: Array<UI_Selection> = [];

}
UI_MapItem.bind();
