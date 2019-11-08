import fui_ShopMain from "../../Generates/Shop/fui_ShopMain";
import ShopWin from "../../../gamemodule/Windows/ShopWin";
import UI_ItemShop from "./UI_ItemShop";
import ShopInfo from "../../../csvInfo/ShopInfo";
import Game from "../../../Game";
import EventManager from "../../../tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import EventKey from "../../../tool/EventKey";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import Fun from "../../../tool/Fun";
import AdsManager from "../../../tool/AdsManager";

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
		this.m_shopBtn.onClick(this, this.refrushLimitShop, [true]);
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
		EventManager.on(ProtoEvent.SHOPGAIN_CALL_BACK, this, this.shopGainCall);
		EventManager.on(ProtoEvent.SHOPBUY_CALL_BACK, this, this.setData);
		EventManager.on(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinGold);
		EventManager.on(EventKey.COIN_DIAMOND_UPDATE, this, this.refreshCoinDiamond);
		EventManager.on(EventKey.COIN_JADEITE_UPDATE, this, this.refreshCoinJadeite);
		EventManager.on(EventKey.REWARDED_VIDEO_AD_YES, this, this.adOk);
		Game.playData.sShowFetters.add(this.moduleWindow.createHeroFetters, this.moduleWindow);
		this.curSelect = 0;
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Game.playData.sShowFetters.remove(this.moduleWindow.createHeroFetters, this.moduleWindow);
		EventManager.offAllCaller(this);
	}
	private refreshCoinGold(): void {
		this.m_gold.text = Fun.formatNumberUnit(Game.playData.curGold);
	}
	private refreshCoinDiamond(): void {
		this.m_diamond.text = Fun.formatNumberUnit(Game.playData.curDiamond);
	}
	private refreshCoinJadeite(): void {
		this.m_jadeite.text = Fun.formatNumberUnit(Game.playData.curJadeite);
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemShop;
		switch (this.curSelect) {
			case 0:
				{
					item.setLimitData(Game.playData.limitShopData[index], this.moduleWindow);
				}
				break;
			case 1:
				{
					item.setShopData(this.showType2[index]);
				}
				break;
			case 2:
				{
					item.setShopData(this.showType3[index]);
				}
				break;
		}
	}

	private changeType(index: number): void {
		this.curSelect = index;
		this.m_tab.setSelectedIndex(index);
		switch (this.curSelect) {
			case 0:
				{
					this.m_list.numItems = Game.playData.limitShopData.length;
					if (Game.playData.shopDiamondRefresh < 20 && AdsManager.usable) {
						this.m_shopBtn.m_adOrPrice.setSelectedIndex(0);
					}
					else {
						this.m_shopBtn.m_adOrPrice.setSelectedIndex(1);
						this.m_shopBtn.m_price.text = Game.playData.shopDiamondRefresh.toString();
					}
				}
				break;
			case 1:
				{
					this.showType2 = ShopInfo.getInfoListWithType(2);
					this.m_list.numItems = this.showType2.length;
				}
				break;
			case 2:
				{
					this.showType3 = ShopInfo.getInfoListWithType(3);
					this.m_list.numItems = this.showType3.length;
				}
				break;
		}
	}

	private setData(): void {
		this.moduleWindow.closeOtherWindow();
		this.refreshCoinGold();
		this.refreshCoinDiamond();
		this.refreshCoinJadeite();
		this.refrushLimitShop(false);
	}
	private refrushLimitShop(real: boolean): void {
		if (real) {
			if (Game.playData.shopDiamondRefresh > 10) {
				if (Game.playData.shopDiamondRefresh > Game.playData.curDiamond) {
					Game.tipWin.showTip("钻石不足，无法刷新!", false);
				}
				else {
					let data = {
						diamondRefresh: 2,
					}
					Game.proto.shopGain(data);
				}
			}
			else {
				Game.playData.shopLimitBuyHeroId = 0;
				if (AdsManager.usable) {
					if (Game.showLog) {
						this.adOk();
					}
					else {
						AdsManager.show();
					}
				}
				else {
					Game.tipWin.showTip("视频加载失败，请稍后再试!", false);
				}
			}
		}
		else {
			let data = {
				diamondRefresh: 0,
			}
			Game.proto.shopGain(data);
		}
	}
	private adOk(): void {
		if (Game.playData.shopLimitBuyHeroId == 0) {
			let data = {
				diamondRefresh: 1,
			}
			Game.proto.shopGain(data);
		}
		else {
			let data = {
				heroId: Game.playData.shopLimitBuyHeroId,
				num: 1,
				adBuy: true,
			}
			Game.proto.shopBuy(data);
		}
	}
	private shopGainCall(): void {
		this.changeType(this.curSelect);
	}
	private curSelect: number = 0;
	private showType2: Array<ShopInfo> = [];
	private showType3: Array<ShopInfo> = [];

}
UI_ShopMain.bind();
