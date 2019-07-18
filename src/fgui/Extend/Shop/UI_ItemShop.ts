import fui_ItemShop from "../../Generates/Shop/fui_ItemShop";
import ShopWin from "../../../gamemodule/Windows/ShopWin";
import ShopInfo from "../../../dataInfo/ShopInfo";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import CardInfo from "../../../dataInfo/CardInfo";

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

	public setShopData(inf: ShopInfo): void {
		this.itemShopInf = inf;
		this.types = 2;
		this.m_heroName.setVar("name", this.itemShopInf.name).flushVars();
		let types = "";
		switch (this.itemShopInf.price_type) {
			case 1:
				types = "宝石";
				break;
			case 2:
				types = "元";
				break;
		}
		this.m_price.setVar("count", this.itemShopInf.price.toString()).setVar("price", types).flushVars();
		if (this.itemShopInf.max_num > 0) {
			this.m_buyPrice.setVar("count", this.itemShopInf.max_num.toString()).flushVars();
			this.m_limNum.setSelectedIndex(0);
		}
		else {
			this.m_limNum.setSelectedIndex(1);
		}
		this.m_pic.icon = SpriteKey.getUrl(this.itemShopInf.icon + ".png");
		this.m_type.setSelectedIndex(1);
	}
	public setCardData(inf: CardInfo): void {
		this.itemCardInf = inf;
		this.types = 1;
		this.m_heroName.setVar("name", this.itemCardInf.name).flushVars();
		this.m_price.setVar("count", this.itemCardInf.price.toString()).setVar("price", "宝石").flushVars();
		this.m_pic.icon = SpriteKey.getUrl(this.itemCardInf.icon + ".png");
		this.m_tip.text = this.itemCardInf.name;
		if (this.itemCardInf.max_num > 0) {
			this.m_buyPrice.setVar("count", this.itemCardInf.max_num.toString()).flushVars();
			this.m_limNum.setSelectedIndex(0);
		}
		else {
			this.m_limNum.setSelectedIndex(1);
		}
		this.m_type.setSelectedIndex(0);
	}
	private itemShopInf: ShopInfo = null;
	private itemCardInf: CardInfo = null;
	private types: number = 0;
	private showTip(): void {
		switch (this.types) {
			case 0:
				break;
			case 1:
				Game.popup.showPopup(this.m_pic, true, [this.itemCardInf.des]);
				break;
			case 2:
				Game.popup.showPopup(this.m_pic, true, [this.itemShopInf.des]);
				break;
		}
	}
	private buyClick(): void {
		let types = 0;
		let id = 0;
		let num = 1;
		switch (this.types) {
			case 0:
				break;
			case 1:
				id = this.itemCardInf.id;
				types = this.itemCardInf.type;
				break;
			case 2:
				id = this.itemShopInf.id;
				types = this.itemShopInf.type;
				break;
		}
		let data = {
			type: types,
			id: id,
			num: num,
		}
		Game.proto.shopBuy(data);
	}

}
UI_ItemShop.bind();
