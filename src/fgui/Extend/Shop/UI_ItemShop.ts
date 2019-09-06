import fui_ItemShop from "../../Generates/Shop/fui_ItemShop";
import ShopWin from "../../../gamemodule/Windows/ShopWin";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import ShopInfo from "../../../csvInfo/ShopInfo";
import Fun from "../../../tool/Fun";
import ResourceInfo from "../../../csvInfo/ResourceInfo";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import HeroqualityInfo from "../../../csvInfo/HeroqualityInfo";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";

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
	public setLimitData(inf: RewardItem): void {
		this.limitShopInf = inf;
		this.types = 0;
		let hero = HeroInfoData.getInfo(this.limitShopInf.itemId);
		this.m_quality.icon = SpriteKey.getUrl("quality" + hero.quality + ".png");
		this.m_heroName.setVar("name", hero.name).flushVars();
		let heroclip = HeroqualityInfo.getInfoQuality(hero.quality);
		this.m_price.setVar("count", heroclip.magic_clip.toString()).setVar("price", "钻石").flushVars();
		this.m_buyPrice.setVar("count", this.limitShopInf.itemNum.toString()).flushVars();
		this.m_pic.icon = SpriteKey.getUrl("hero_" + hero.skin + ".png");
		this.m_type.setSelectedIndex(1);
		this.m_limNum.setSelectedIndex(0);
	}

	public setShopData(inf: ShopInfo): void {
		this.m_quality.icon = SpriteKey.getUrl("quality" + 3 + ".png");
		this.itemShopInf = inf;
		this.types = 2;
		this.m_heroName.setVar("name", this.itemShopInf.name).flushVars();
		let types = "元";
		if (this.itemShopInf.price_type > 0) {
			let resource = ResourceInfo.getInfo(this.itemShopInf.price_type);
			if (resource) {
				types = resource.desc;
			}
		}
		switch (this.itemShopInf.price_type) {
			case 1:
				types = "宝石";
				break;
			case 2:
				types = "元";
				break;
		}
		let discount = this.itemShopInf.discount;
		if (discount == 1) {
			this.m_checkBtn.title = "购买";
		}
		else {
			this.m_checkBtn.title = Fun.format("购买（{0}折）", discount * 10);
		}
		let priceCount = Math.max(this.itemShopInf.price * discount, 1);
		this.m_price.setVar("count", priceCount.toString()).setVar("price", types).flushVars();
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
	public setCardData(inf: ShopInfo): void {
		this.m_quality.icon = SpriteKey.getUrl("quality" + 3 + ".png");
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
	private itemCardInf: ShopInfo = null;
	private limitShopInf: RewardItem = null;
	private types: number = 0;
	private showTip(): void {
		switch (this.types) {
			case 0:
				break;
			case 1:
				Game.popup.showPopup(this.m_pic, true, false, this.itemCardInf.des);
				break;
			case 2:
				Game.popup.showPopup(this.m_pic, true, false, this.itemShopInf.des);
				break;
		}
	}
	private buyClick(): void {
		let id = 0;
		let num = 1;
		switch (this.types) {
			case 0:
				{
					if (this.limitShopInf.itemNum > 0) {
						let heroId = 1;
						let data = {
							heroId: this.limitShopInf.itemId,
							num: num,
						}
						Game.proto.shopBuy(data);
					}
					else {
						Game.tipWin.showTip(Game.tipTxt.BuyHaveMax);
					}
				}
				break;
			case 1:
			case 2:
				{
					id = this.itemShopInf.id;
					let data = {
						shopId: id,
						num: num,
					}
					Game.proto.shopBuy(data);
				}
				break;
		}
	}

}
UI_ItemShop.bind();
