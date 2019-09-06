import fui_HomeMain from "../../Generates/Home/fui_HomeMain";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import EventManager from "../../../tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import Fun from "../../../tool/Fun";
import EventKey from "../../../tool/EventKey";
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
		this.m_testBtn.onClick(this, this.clickTest);
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
			Game.tipWin.showTip(Fun.format(Game.tipTxt.Conquest, datas.levelcount, Fun.formatTime(datas.duration), datas.getGold, datas.getDiamond), false, Laya.Handler.create(this, this.conquestReward));
		}
		else {
			Game.tipWin.showTip(Game.tipTxt.NoGainTip);
		}
	}
	setClick(): void {
		Game.popup.showPopup(this.m_setBtn, true, false, "试玩版本无此功能！");
	}
	clickTest(): void {
		Game.tipWin.showTip("试玩说明\n当前版本为试玩版，计划于2019年9月1日开始，2019年9月30日结束试玩结束后，玩家的数据将会被清除\n试玩结束后，所有参与试玩的玩家将会获得一个试玩参与奖励：开荒兑换码（在正式版中可兑换开荒礼包）			\n试玩玩家请加入玩家Q群：855988151，欢迎提出反馈与建议，一经采纳，将可以获得正式版礼包奖励", false, null, null, "朕知道了", "", 0);
	}
	actClick(): void {
		Game.menu.open(MenuId.Active, 0);
	}
	shopClick(): void {
		Game.menu.open(MenuId.Shop);
	}
	sortClick(): void {
		Game.menu.open(MenuId.Active, 1);
	}
	bagClick(): void {
		Game.redData.bagRed = false;
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
		this.refrushRed();
		if (Game.playData.guideIndex >= GuideType.sevenStartFive) {
			if (Game.redData.signRed) {
				Game.menu.open(MenuId.Active, 0);
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
		this.refrushRed();
		setTimeout(() => {
			this.refrushRed();
		}, 100);
	}
	private refrushRed(): void {
		if (Game.redData.heroRed) {
			Game.redTip.showRedTip(this.m_heroBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_heroBtn);
		}
		if (Game.redData.signRed) {
			Game.redTip.showRedTip(this.m_actBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_actBtn);
		}
		if (Game.redData.kingRed) {
			Game.redTip.showRedTip(this.m_sortBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_sortBtn);
		}
		if (Game.redData.seatRed) {
			Game.redTip.showRedTip(this.m_seatBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_seatBtn);
		}
		if (Game.redData.bagRed) {
			Game.redTip.showRedTip(this.m_bagBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_bagBtn);
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
		EventManager.on(ProtoEvent.UPQUALITY_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.PASSWAVE_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.SIGN_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.KING_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.BAGGIFT_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.SHOPBUY_CALL_BACK, this, this.synthetise);
		EventManager.on(EventKey.HERO_LEVEL_UPDATE, this, this.synthetise);
		EventManager.on(EventKey.HERO_STAR_UPDATE, this, this.synthetise);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);

	}


}
UI_HomeMain.bind();
