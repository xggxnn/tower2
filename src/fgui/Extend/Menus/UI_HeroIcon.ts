import fui_HeroIcon from "../../Generates/Menus/fui_HeroIcon";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import ItemInfo from "../../../gamemodule/DataStructs/ItemInfo";
import Fun from "../../../Tool/Fun";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroIcon extends fui_HeroIcon {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_HeroIcon {
		return <UI_HeroIcon>(fui_HeroIcon.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroIcon.URL, UI_HeroIcon);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}

	public setData(item: ItemInfo): void {
		this.m_number.text = Fun.format("X {0}", item.itemNum);
		if (item.itemId < 10000) {
			this.m_c1.setSelectedIndex(3);
		}
		else {
			this.m_c1.setSelectedIndex(2);
		}
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
UI_HeroIcon.bind();