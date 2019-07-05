import fui_Selection from "../../Generates/Menus/fui_Selection";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import { SelectionStatus } from "../../../gamemodule/DataEnums/SelectionStatus";
import UI_selectionBtn from "./UI_selectionBtn";
import Game from "../../../Game";
import WaveInfo from "../../../dataInfo/WaveInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Selection extends fui_Selection {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_Selection {
		return <UI_Selection>(fui_Selection.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Selection.URL, UI_Selection);
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

	// public map: number;
	// public level: number;
	private status: SelectionStatus = SelectionStatus.None;
	/**
	 * 当前关卡状态
	 * @param status 枚举SelectionStatus
	 * @param isboss 是否boss关卡
	 * @param map 第几个地图
	 * @param level 第几关
	 */
	public setData(status: SelectionStatus, isboss: boolean, map: number, level: number): void {
		// this.status = status;
		// this.map = map;
		// this.level = level;
		// this.m_status.setSelectedIndex(this.status);
		// switch (this.status) {
		// 	case SelectionStatus.Progress:
		// 		{
		// 			this.m_progress.text = "90%";
		// 			this.m_gain.text = "2500金币";
		// 		}
		// 		break;
		// 	case SelectionStatus.Complete:
		// 		{
		// 			this.m_progress.text = "100%";
		// 			this.m_time.text = "3小时34分";
		// 		}
		// 		break;
		// }
		// (this.m_selBtn as UI_selectionBtn).setData(isboss, map, level);
	}
	public setDate(index: number): void {
		let waveId = index + 1;
		this.waveInfo = WaveInfo.getInfo(waveId);
		(this.m_selBtn as UI_selectionBtn).setData(this.waveInfo.map, this.waveInfo.level);
		let waveStatus = Game.waveData.waveStatus(waveId);
		if (waveStatus) {
			this.m_status.setSelectedIndex(1);
		}
		else {
			this.m_status.setSelectedIndex(0);
			this.m_selBtn.enabled = false;
		}
	}
	public waveInfo: WaveInfo = null;

}
UI_Selection.bind();