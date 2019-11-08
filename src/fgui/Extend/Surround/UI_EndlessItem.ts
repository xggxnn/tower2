import fui_EndlessItem from "../../Generates/Surround/fui_EndlessItem";
import SurroundWin from "../../../gamemodule/Windows/SurroundWin";
import EndlessRankData from "../../../gamemodule/DataStructs/EndlessRankData";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_EndlessItem extends fui_EndlessItem {

	moduleWindow: SurroundWin;

	public static DependPackages: string[] = ["Surround"];

	public static createInstance(): UI_EndlessItem {
		return <UI_EndlessItem>(fui_EndlessItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_EndlessItem.URL, UI_EndlessItem);
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

	setData(dat: EndlessRankData): void {
		this.m_sort.text = dat.id.toString();
		this.m_icons.icon = dat.avatarUrl;
		this.m_nam.text = dat.name;
		let count = dat.progress.toString();
		this.m_waves.setVar("count", count).flushVars();
		if (dat.id < 4) {
			this.m_colorTab.setSelectedIndex(dat.id);
		} else {
			this.m_colorTab.setSelectedIndex(0);
		}
	}

}
UI_EndlessItem.bind();
