import fui_HomeMain from "../../Generates/Home/fui_HomeMain";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import Fun from "../../../Tool/Fun";
import EventKey from "../../../Tool/EventKey";
import UI_conquestBtn from "./UI_conquestBtn";
import UI_seatBtn from "./UI_seatBtn";
import UI_fightBtn from "./UI_fightBtn";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HomeMain extends fui_HomeMain {

	moduleWindow: HomeWin;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_HomeMain {
		return <UI_HomeMain>(fui_HomeMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HomeMain.URL, UI_HomeMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_fightBtn.onClick(this, this.menuselect);
		this.m_seatBtn.onClick(this, this.seatClick);
		this.m_conquestBtn.onClick(this, this.conquestClick);
		this.m_setBtn.onClick(this, this.setClick);
		this.m_actBtn.onClick(this, this.actClick);
		this.m_shopBtn.onClick(this, this.shopClick);
		this.m_sortBtn.onClick(this, this.sortClick);
		this.m_bagBtn.onClick(this, this.bagClick);
	}

	private menuselect(): void {
		Game.menu.open(MenuId.MenuSelect);
		this.closeUI();
	}
	seatClick(): void {
		if (Game.playData.curHero.length > 0) {
			Game.menu.open(MenuId.Arrange);
		}
		else {
			Game.tipWin.showTip("你还没有一个英雄，无法设置阵容");
		}
	}
	conquestClick(): void {
		let datas = this.m_conquestBtn as UI_conquestBtn;
		if (datas.canGet) {
			Game.tipWin.showTip(Fun.format("已征服{0}个关卡<br />最近{1}产出{2}金币", datas.levelcount, Fun.formatTime(datas.duration), datas.getGold), Laya.Handler.create(this, this.conquestReward));
		}
		else {
			Game.tipWin.showTip("暂无收益!");
		}
	}
	setClick(): void {
		Game.popup.showPopup(this.m_setBtn, true, ["功能开发中"]);
	}
	actClick(): void {
		Game.popup.showPopup(this.m_actBtn, true, ["功能开发中"]);
	}
	shopClick(): void {
		Game.menu.open(MenuId.Shop);
	}
	sortClick(): void {
		Game.popup.showPopup(this.m_sortBtn, true, ["功能开发中"]);
	}
	bagClick(): void {
		Game.menu.open(MenuId.Bag);
	}
	conquestReward(): void {
		Game.proto.conquestReward();
	}

	setData(): void {
		this.refreshCoinGold();
		this.refreshCoinDiamond();
		this.refreshCoinJadeite();
		(this.m_conquestBtn as UI_conquestBtn).setData();
		(this.m_seatBtn as UI_seatBtn).setData();
		(this.m_fightBtn as UI_fightBtn).setData();
		Game.menu.open(MenuId.Sign);
	}
	private refreshCoinGold(): void {
		this.m_gold.text = Fun.format("{0}", Fun.formatNumberUnit(Game.playData.curGold));
	}
	private refreshCoinDiamond(): void {
		this.m_diamond.text = Fun.format("{0}", Fun.formatNumberUnit(Game.playData.curDiamond));
	}
	private refreshCoinJadeite(): void {
		this.m_jadeite.text = Fun.format("{0}", Fun.formatNumberUnit(Game.playData.curJadeite));
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
		EventManager.on(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinGold);
		EventManager.on(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinDiamond);
		EventManager.on(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinJadeite);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinGold);
		EventManager.off(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinDiamond);
		EventManager.off(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinJadeite);

	}


}
UI_HomeMain.bind();
