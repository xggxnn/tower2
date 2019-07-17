import fui_ItemShop from "../../Generates/Shop/fui_ItemShop";
import ShopWin from "../../../gamemodule/Windows/ShopWin";
import ShopInfo from "../../../dataInfo/ShopInfo";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";

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
		this.m_picBtn.onClick(this, this.showTip);
		this.m_checkBtn.onClick(this, this.buyClick);
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
		this.itemInf = inf;
		this.m_heroName.setVar("name", this.itemInf.name).flushVars();
		switch (this.itemInf.buy_type) {
			case 0:
			case 1:
				{
					this.m_buyPrice.setVar("count", this.itemInf.diamond_1.toString()).setVar("count2", this.itemInf.diamond_2.toString()).setVar("price", "宝石").flushVars();
				}
				break;
			case 2:
			case 3:
				{
					this.m_buyPrice.setVar("count", this.itemInf.rmb_1.toString()).setVar("count2", this.itemInf.rmb_2.toString()).setVar("price", "元").flushVars();
				}
				break;
		}
		this.m_pic.icon = SpriteKey.getUrl(this.itemInf.icon + ".png");
	}
	private itemInf: ShopInfo = null;
	private showTip(): void {
		Game.popup.showPopup(this.m_pic, true, [this.itemInf.des]);
	}
	private buyClick(): void {
		// let data = {
		// 	id: this.itemInf.id,
		// }
		// Game.proto.shopBuy(data);
	}

}
UI_ItemShop.bind();
