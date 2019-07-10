import fui_Selection from "../../Generates/Menus/fui_Selection";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import UI_selectionBtn from "./UI_selectionBtn";
import Game from "../../../Game";
import WaveInfo from "../../../dataInfo/WaveInfo";
import Fun from "../../../Tool/Fun";

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

	public setDate(index: number): void {
		let levelId = index + 1;
		this.waveInfo = WaveInfo.getInfo(levelId);
		(this.m_selBtn as UI_selectionBtn).setData(this.waveInfo.map, this.waveInfo.level);
		if (Game.battleMap.waveStatusDict.hasKey(levelId)) {
			let item = Game.battleMap.waveStatusDict.getValue(levelId);
			this.m_status.setSelectedIndex(2);
			this.m_progress.text = Fun.format("{0} %", item.level / 10 * 100)
		}
		else if (Game.battleMap.maxMapId == levelId) {
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