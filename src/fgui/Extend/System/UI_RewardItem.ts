import fui_RewardItem from "../../Generates/System/fui_RewardItem";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import Fun from "../../../Tool/Fun";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_RewardItem extends fui_RewardItem {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_RewardItem {
		return <UI_RewardItem>(fui_RewardItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_RewardItem.URL, UI_RewardItem);
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

	public setData(item: RewardItem): void {
		this.m_count.setVar("count", Fun.formatNumberUnit(item.itemNum)).flushVars();
		this.icon = Game.playData.getIcon(item.itemId);
	}

}
UI_RewardItem.bind();
