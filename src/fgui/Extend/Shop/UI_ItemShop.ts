import fui_ItemShop from "../../Generates/Shop/fui_ItemShop";
import ShopWin from "../../../gamemodule/Windows/ShopWin";
import ShopInfo from "../../../dataInfo/ShopInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_ItemShop extends fui_ItemShop {

	moduleWindow: ShopWin;

	public static DependPackages: string[] = ["Shop"];

	public static createInstance(): UI_ItemShop {
		return <UI_ItemShop>(fui_ItemShop.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_ItemShop.URL, UI_ItemShop);
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

	public setData(inf: ShopInfo): void {
		this.m_heroName.setVar("name", inf.name);
		switch (inf.type) {
			case 1:
				{
					// this.m_buyPrice.setVar("count",)
				}
				break;
		}
	}

}
UI_ItemShop.bind();
