import fui_HomeMain from "../../Generates/Home/fui_HomeMain";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import Fun from "../../../Tool/Fun";
import EventKey from "../../../Tool/EventKey";

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
		this.m_fightBtn.onClick(this, this.waveInfoCall);
		this.m_trialBtn.onClick(this, this.trialClick);
		this.m_seatBtn.onClick(this, this.seatClick);
		this.m_conquestBtn.onClick(this, this.conquestClick);
		// EventManager.on(ProtoEvent.WAVEINFO_CALL_BACK, this, this.waveInfoCall);
	}

	// fightClick(): void {
	// 	Game.proto.waveInfo({});
	// }
	private waveInfoCall(): void {
		Game.menu.open(MenuId.MenuSelect);
		this.closeUI();
	}
	trialClick(): void {
		console.log("trialClick");
	}
	seatClick(): void {
		console.log("seatClick");
		Game.menu.open(MenuId.Arrange);
	}
	conquestClick(): void {
		console.log("conquestClick");
		Game.menu.open(MenuId.Bag);
	}

	setData(): void {
		this.refreshCoinGold();
		this.refreshCoinDiamond();
		this.refreshCoinJadeite();
	}
	private refreshCoinGold(): void {
		this.m_gold.text = Fun.format("金币：{0}", Game.playData.curGold);
	}
	private refreshCoinDiamond(): void {
		this.m_baoshi.text = Fun.format("宝石：{0}", Game.playData.curDiamond);
	}
	private refreshCoinJadeite(): void {
		this.m_feicui.text = Fun.format("翡翠：{0}", Game.playData.curJadeite);
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
