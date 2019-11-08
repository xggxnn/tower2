import fui_MapItem from "../../Generates/Menus/fui_MapItem";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import WaveInfo from "../../../csvInfo/WaveInfo";
import UI_Selection from "./UI_Selection";
import LevelmapInfo from "../../../csvInfo/LevelmapInfo";
import BigPicKey from "../../BigPicKey";

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
		let levelmap = LevelmapInfo.getInfo(index + 1);
		let bg = 1;
		if (levelmap && levelmap.levelbg) {
			bg = levelmap.levelbg;
		}
		let statusIndex = bg - 1;
		this.m_bgStatus.setSelectedIndex(statusIndex);
		this.m_bg.icon = BigPicKey.getUrl("waveBg_" + bg + ".png");

		this.waveInfList = [];
		for (let i = 1; i < 11; i++) {
			let wave = WaveInfo.getInfo(i + index * 10);
			this.waveInfList.push(wave);
		}
		let preSelection: UI_Selection = null;
		for (let i = 0; i < 10; i++) {
			this.selectionList[i].setData(this.waveInfList[i], moduleWindow);
			this.selectionList[i].m_selBtn.m_bgStatus.setSelectedIndex(statusIndex);
			if (preSelection != null) {
				preSelection.m_forward.setSelectedIndex(this.getRotation(levelmap.level[i - 1], levelmap.level[i]));
			}
			this.selectionList[i].setXY(this.getX(levelmap.level[i].x), this.getY(levelmap.level[i].y));
			preSelection = this.selectionList[i];
			if (i == 9) {
				preSelection.m_forward.setSelectedIndex(0);
			}
		}
	}
	private waveInfList: Array<WaveInfo> = [];
	private selectionList: Array<UI_Selection> = [];

	private getX(x: number) {
		let t = Math.floor(x);
		return 140 + 200 * (t - 1);
	}
	private getY(y: number) {
		let t = Math.floor(y);
		return 752 - 98 * (t - 1);
	}
	private getRotation(b: Laya.Point, a: Laya.Point) {
		let result = 0;
		if (a.x < b.x && a.y > b.y) {
			result = 1;
		}
		else if (a.x > b.x && a.y > b.y) {
			result = 2;
		}
		else if (a.x > b.x && a.y < b.y) {
			result = 3;
		}
		else if (a.x < b.x && a.y < b.y) {
			result = 4;
		}
		return result;
	}

}
UI_MapItem.bind();
