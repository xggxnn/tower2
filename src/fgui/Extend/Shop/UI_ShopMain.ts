import fui_ShopMain from "../../Generates/Shop/fui_ShopMain";
import ShopWin from "../../../gamemodule/Windows/ShopWin";
import UI_ItemShop from "./UI_ItemShop";
import ShopInfo from "../../../dataInfo/ShopInfo";
import CardInfo from "../../../dataInfo/CardInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_ShopMain extends fui_ShopMain {

	moduleWindow: ShopWin;

	public static DependPackages: string[] = ["Shop"];

	public static createInstance(): UI_ShopMain {
		return <UI_ShopMain>(fui_ShopMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_ShopMain.URL, UI_ShopMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_list.setVirtual();
		// 设置列表渲染函数
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_closeBtn.onClick(this, this.closeUI);
		this.m_limtBtn.onClick(this, this.changeType, [0]);
		this.m_cardBtn.onClick(this, this.changeType, [1]);
		this.m_buyBtn.onClick(this, this.changeType, [2]);
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
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemShop;
		switch (this.curSelect) {
			case 0:
				{
				}
				break;
			case 1:
				{
					item.setCardData(this.cardData[index]);
				}
				break;
			case 2:
				{
					item.setShopData(this.shopData[index]);
				}
				break;
		}
	}

	private changeType(index: number): void {
		if (this.curSelect != index) {
			this.curSelect = index;
			this.m_tab.setSelectedIndex(index);
			switch (this.curSelect) {
				case 0:
					{
						this.m_list.numItems = 0;
					}
					break;
				case 1:
					{
						this.cardData = CardInfo.getList();
						this.m_list.numItems = this.cardData.length;
					}
					break;
				case 2:
					{
						this.shopData = ShopInfo.getList();
						this.m_list.numItems = this.shopData.length;
					}
					break;
			}
		}
	}

	private setData(): void {
		this.changeType(2);
	}
	private curSelect: number = -1;
	private shopData: Array<ShopInfo> = [];
	private cardData: Array<CardInfo> = [];

}
UI_ShopMain.bind();
