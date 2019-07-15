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
		this.m_bagBtn.onClick(this, this.bagClick);
	}

	private menuselect(): void {
		Game.menu.open(MenuId.MenuSelect);
		this.closeUI();
	}
	trialClick(): void {
		console.log("trialClick");
	}
	seatClick(): void {
		Game.menu.open(MenuId.Arrange);
		// if (Game.playData.curHero.length > 0) {
		// 	Game.menu.open(MenuId.Arrange);
		// }
		// else {
		// 	Game.tipWin.showTip("你还没有一个英雄，无法设置阵容");
		// }
	}
	bagClick(): void {
		Game.menu.open(MenuId.Bag);
	}
	conquestClick(): void {
		console.log("conquestClick");
	}

	setData(): void {
		this.refreshCoinGold();
		this.refreshCoinDiamond();
		this.refreshCoinJadeite();
		(this.m_conquestBtn as UI_conquestBtn).setData();
		(this.m_seatBtn as UI_seatBtn).setData();
		(this.m_fightBtn as UI_fightBtn).setData();
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
