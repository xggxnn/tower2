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
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import SoundKey from "../../SoundKey";

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
		this.m_heroBtn.onClick(this, this.heroClick);
	}

	private menuselect(): void {
		this.closeUI();
		Game.menu.open(MenuId.MenuSelect);
	}
	seatClick(): void {
		if (Game.playData.curHeroInfoList.count > 0) {
			Game.menu.open(MenuId.Arrange);
		}
	}
	conquestClick(): void {
		let datas = this.m_conquestBtn as UI_conquestBtn;
		if (datas.canGet) {
			Game.tipWin.showTip(Fun.format(Game.tipTxt.Conquest, datas.levelcount, Fun.formatTime(datas.duration), datas.getGold), false, Laya.Handler.create(this, this.conquestReward));
		}
		else {
			Game.tipWin.showTip(Game.tipTxt.NoGainTip);
		}
	}
	setClick(): void {
		Game.tipWin.showTip("是否确认删除数据，删除后无法恢复，请谨慎操作，确定后请重启客户端进行体验。", true, Laya.Handler.create(this, () => {
			Game.proto.clearData();
		}), null, "删除数据", "考虑考虑");

	}
	actClick(): void {
		Game.menu.open(MenuId.Active);
	}
	shopClick(): void {
		Game.menu.open(MenuId.Shop);
	}
	sortClick(): void {
		Game.popup.showPopup(this.m_sortBtn, true, "功能开发中");
	}
	bagClick(): void {
		Game.menu.open(MenuId.Bag);
	}
	heroClick(): void {
		Game.menu.open(MenuId.Hero);
	}
	conquestReward(): void {
		Game.proto.conquestReward();
	}

	setData(): void {
		Game.sound.playMusic(SoundKey.bgm_1, 0);
		this.moduleWindow.closeOtherWindow();
		this.refreshCoinGold();
		this.refreshCoinDiamond();
		this.refreshCoinJadeite();
		(this.m_conquestBtn as UI_conquestBtn).setData();
		(this.m_seatBtn as UI_seatBtn).setData();
		(this.m_fightBtn as UI_fightBtn).setData();
		this.synthetise();
		if (Game.playData.guideIndex >= GuideType.sevenStartFive) {
			if (Game.redData.signRed) {
				Game.menu.open(MenuId.Active);
			}
		}
		else if (Game.playData.guideIndex == GuideType.fettersOver || Game.playData.guideIndex == GuideType.fiveUpLevelOver || Game.playData.guideIndex == GuideType.sixWin) {
			Game.playData.guideIndex++;
			setTimeout(() => {
				this.moduleWindow.createGuideUI(this.m_fightBtn, new Laya.Point(this.m_fightBtn.x, this.m_fightBtn.y), Laya.Handler.create(this, this.menuselect), Game.tipTxt.fiveEnterMenus, LocationType.Lower);
			}, 100);
		}
	}
	private synthetise(): void {
		if (Game.redData.heroRed) {
			Game.redTip.showRedTip(this.m_heroBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_heroBtn);
		}
		if (Game.redData.activeRed) {
			Game.redTip.showRedTip(this.m_actBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_actBtn);
		}
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
		EventManager.on(EventKey.COIN_DIAMOND_UPDATE, this, this.refreshCoinDiamond);
		EventManager.on(EventKey.COIN_JADEITE_UPDATE, this, this.refreshCoinJadeite);
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.PASSWAVE_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.SIGN_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.KING_CALL_BACK, this, this.synthetise);
		EventManager.on(EventKey.HERO_LEVEL_UPDATE, this, this.synthetise);
		EventManager.on(ProtoEvent.BAGGIFT_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.SHOPBUY_CALL_BACK, this, this.synthetise);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);

	}


}
UI_HomeMain.bind();
