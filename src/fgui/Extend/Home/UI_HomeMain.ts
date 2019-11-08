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
import UnlockInfo from "../../../csvInfo/UnlockInfo";
import UI_Exchange from "../System/UI_Exchange";
import ShareManager from "../../../tool/ShareManager";
import UI_comBtn from "../System/UI_comBtn";
import UI_FriendGain from "../System/UI_FriendGain";
import SystemManager from "../../../tool/SystemManager";

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
		this.m_WishingBtn.onClick(this, this.clickWishing);
		this.m_dayBtn.onClick(this, this.dayFight);
		this.m_freeBtn.onClick(this, this.freeClick);
		this.m_boxBtn.onClick(this, this.boxClick);
		this.m_kefuBtn.onClick(this, this.kefuClick);

		this.funPosList = [];
		this.funList = [];
		this.funList.push(this.m_seatBtn);
		this.funPosList.push(new Laya.Point(this.m_seatBtn.x, this.m_seatBtn.y));
		this.funList.push(this.m_setBtn);
		this.funPosList.push(new Laya.Point(this.m_setBtn.x, this.m_setBtn.y));
		this.funList.push(this.m_heroBtn);
		this.funPosList.push(new Laya.Point(this.m_heroBtn.x, this.m_heroBtn.y));
		this.funList.push(this.m_boxBtn);
		this.funPosList.push(new Laya.Point(this.m_boxBtn.x, this.m_boxBtn.y));
		this.funList.push(this.m_sortBtn);
		this.funPosList.push(new Laya.Point(this.m_sortBtn.x, this.m_sortBtn.y));
		this.funList.push(this.m_bagBtn);
		this.funPosList.push(new Laya.Point(this.m_bagBtn.x, this.m_bagBtn.y));
		this.funList.push(this.m_actBtn);
		this.funPosList.push(new Laya.Point(this.m_actBtn.x, this.m_actBtn.y));
		this.funList.push(this.m_conquestBtn);
		this.funPosList.push(new Laya.Point(this.m_conquestBtn.x, this.m_conquestBtn.y));
		this.funList.push(this.m_shopBtn);
		this.funPosList.push(new Laya.Point(this.m_shopBtn.x, this.m_shopBtn.y));
		this.funList.push(this.m_dayBtn);
		this.funPosList.push(new Laya.Point(this.m_dayBtn.x, this.m_dayBtn.y));
		this.funList.push(null);
		this.funPosList.push(new Laya.Point());

		// this.m_gold.onClick(this, this.clickGold);
		this.m_friendGainBtn.onClick(this, this.friendGainClick);
		this.m_endlessBtn.onClick(this, this.clickEndless);
	}
	// private clickGold(): void {
	// 	Game.popup.showPopup(this.m_gold, false, false, "金币，升级金乌！\n现有" + Game.playData.curGold);
	// }

	private menuselect(): void {
		Game.redData.fightReds();
		this.m_fightBtn.m_redTip.setSelectedIndex(0);
		this.closeUI();
		Game.battleData.curEnterFightType = 0;
		Game.menu.open(MenuId.MenuSelect);
	}
	seatClick(): void {
		Game.battleData.curEnterFightType = -1;
		Game.menu.open(MenuId.Arrange);
	}
	conquestClick(): void {
		this.hideFriendInfBtn();
		let datas = this.m_conquestBtn as UI_conquestBtn;
		if (datas.canGet) {
			Game.tipWin.showTip(Fun.format(Game.tipTxt.Conquest, datas.levelcount, Fun.formatTime(datas.duration), datas.getGold, datas.getDiamond), false,
				Laya.Handler.create(this, this.conquestReward), null, "确定", "", 0);
		}
		else {
			Game.tipWin.showTip(Game.tipTxt.NoGainTip, false, Laya.Handler.create(this, this.checkFriendGainBtn), null, "确定", "", 0);
		}
	}
	setClick(): void {
		Game.popup.showPopup(this.m_setBtn, false, false, "试玩版本无此功能！");
	}
	private kefuClick(): void {
		SystemManager.customerService();
	}
	private exchange: UI_Exchange = null;
	clickWishing(): void {
		this.hideFriendInfBtn();
		if (this.exchange == null) {
			this.exchange = UI_Exchange.createInstance();
		}
		this.exchange.showExchange();
	}
	clickTest(): void {
		this.hideFriendInfBtn();
		Game.tipWin.showTip(Game.tipTxt.txts("TrialInfo"), false, Laya.Handler.create(this, this.checkFriendGainBtn), null, "朕知道了", "", 0);
	}
	actClick(): void {
		Game.menu.open(MenuId.Active, 0);
	}
	shopClick(): void {
		Game.redData.shopReds();
		(this.m_shopBtn as UI_comBtn).m_redTip.setSelectedIndex(0);
		Game.menu.open(MenuId.Shop);
	}
	sortClick(): void {
		Game.menu.open(MenuId.Active, 1);
	}
	freeClick(): void {
		Game.menu.open(MenuId.Active, 4);
	}
	boxClick(): void {
		Game.menu.open(MenuId.Active, 5);
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
		if (!Game.playData.isSendWXRequest) {
			Game.playData.isSendWXRequest = true;
			ShareManager.subscribe();
		}
	}
	dayFight(): void {
		if (Game.battleMap.maxMapId < 11) {
			Game.tipWin.showTip(Game.tipTxt.txts("DailyChallengeUnlockTip"), false, Laya.Handler.create(this, this.checkFriendGainBtn), null, "确定", "", 0);
		}
		else if (Game.battleData.dayFightProgress > 5) {
			Game.tipWin.showTip(Game.tipTxt.txts("DailyChallengeDone"), false, Laya.Handler.create(this, this.checkFriendGainBtn), null, "确定", "", 0);
		}
		else {
			this.closeUI();
			Game.battleData.curEnterFightType = 2;
			Game.menu.open(MenuId.MenuSelect);
		}
	}
	checkDayFight(): void {
		if (Game.playData.unlockInit < 7) {
			this.m_dayPass.setSelectedIndex(0);
		}
		else {
			if (Game.battleMap.maxMapId < 11) {
				this.m_dayPass.setSelectedIndex(0);
			}
			else if (Game.battleData.dayFightProgress > 5) {
				this.m_dayPass.setSelectedIndex(2);
			}
			else {
				this.m_dayPass.setSelectedIndex(1);
			}
		}
	}

	private friendGainClick(): void {
		Game.proto.friendPatrolData();
	}
	private clickEndless(): void {
		let data = {
			myName: ShareManager.userinf["nickName"],
			myAvatarUrl: ShareManager.userinf["avatarUrl"],
		}
		Game.proto.endlessSort(data);
	}
	private endlessClick(): void {
		Game.menu.open(MenuId.Active, 6);
	}
	private openAuthorization(): void {
		Game.menu.open(MenuId.Authorization, 1);
	}
	private checkFriendGainBtn(): void {
		this.m_endlessBtn.visible = Game.playData.unlockEndless == 2;
		let num = Game.userData.InviteNum();
		(this.m_friendGainBtn as UI_FriendGain).m_titles
			.setVar("count1", num.toString())
			.setVar("count2", "10").flushVars();
		if (Game.playData.unlockInit >= 5) {
			if (ShareManager.userinf == null) {
				let pos = this.m_friendGainBtn.localToGlobalRect(0, 0, this.m_friendGainBtn.width, this.m_friendGainBtn.height);
				ShareManager.UserInfHome(pos);
				if (Game.playData.unlockEndless == 2) {
					let pos2 = this.m_endlessBtn.localToGlobalRect(0, 0, this.m_endlessBtn.width, this.m_endlessBtn.height);
					ShareManager.UserInfHomeEndless(pos2);
				}
			}
		}
	}
	private hideFriendInfBtn(): void {
		this.m_endlessBtn.visible = Game.playData.unlockEndless == 2;
		ShareManager.hideUserInfHomeBtn();
		ShareManager.hideUserInfHomeEndlessBtn();
	}

	setData(): void {
		Game.sound.playMusic(SoundKey.bgm_1, 0);
		Game.battleData.curEnterFightType = 0;
		this.moduleWindow.closeOtherWindow();
		this.refreshCoinGold();
		this.refreshCoinDiamond();
		this.refreshCoinJadeite();
		(this.m_conquestBtn as UI_conquestBtn).setData();
		(this.m_seatBtn as UI_seatBtn).setData();
		(this.m_fightBtn as UI_fightBtn).setData();
		this.refrushRed();
		if (Game.playData.guideIndex >= GuideType.sevenStartFive) {
		}
		else if (Game.playData.guideIndex == GuideType.fettersOver || Game.playData.guideIndex == GuideType.fiveUpLevelOver || Game.playData.guideIndex == GuideType.sixWin) {
			Game.playData.guideIndex++;
			EventManager.event(EventKey.SHOW_WAIT);
			setTimeout(() => {
				this.moduleWindow.createGuideUI(this.m_fightBtn, new Laya.Point(this.m_fightBtn.x, this.m_fightBtn.y), Laya.Handler.create(this, this.menuselect), Game.tipTxt.fiveEnterMenus, LocationType.Lower);
			}, 100);
		}
		this.checkDayFight();
		this.checkFriendGainBtn();
		this.unlockEndless();
	}
	private synthetise(): void {
		setTimeout(() => {
			this.refrushRed();
		}, 100);
	}
	// 刷新红点
	private refrushRed(): void {
		if (Game.redData.heroRed) {
			(this.m_heroBtn as UI_comBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_heroBtn as UI_comBtn).m_redTip.setSelectedIndex(0);
		}
		if (Game.redData.signRed || Game.task.showRed) {
			(this.m_actBtn as UI_comBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_actBtn as UI_comBtn).m_redTip.setSelectedIndex(0);
		}
		if (Game.redData.kingRed) {
			(this.m_sortBtn as UI_comBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_sortBtn as UI_comBtn).m_redTip.setSelectedIndex(0);
		}
		if (Game.redData.seatRed) {
			this.m_seatBtn.m_redTip.setSelectedIndex(1);
		}
		else {
			this.m_seatBtn.m_redTip.setSelectedIndex(0);
		}
		if (Game.redData.bagRed) {
			(this.m_bagBtn as UI_comBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_bagBtn as UI_comBtn).m_redTip.setSelectedIndex(0);
		}
		if (Game.redData.shopRed) {
			(this.m_shopBtn as UI_comBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_shopBtn as UI_comBtn).m_redTip.setSelectedIndex(0);
		}
		if (Game.redData.fightRed) {
			this.m_fightBtn.m_redTip.setSelectedIndex(1);
		}
		else {
			this.m_fightBtn.m_redTip.setSelectedIndex(0);
		}
		if (Game.playData.BoxInfo.showRed) {
			(this.m_boxBtn as UI_comBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_boxBtn as UI_comBtn).m_redTip.setSelectedIndex(0);
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
		EventManager.on(ProtoEvent.CONQUESTREWARD_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.CONQUESTREWARD_CALL_BACK, this, this.checkFriendGainBtn);
		EventManager.on(ProtoEvent.DAYFIGHTREWARD_CALL_BACK, this, this.checkDayFight);
		EventManager.on(ProtoEvent.FRIEDNPATROLDATA_CALL_BACK, this, this.openAuthorization);
		EventManager.on(EventKey.HERO_LEVEL_UPDATE, this, this.synthetise);
		EventManager.on(EventKey.HERO_STAR_UPDATE, this, this.synthetise);
		EventManager.on(ProtoEvent.GAINBOX_CALL_BACK, this, this.synthetise);
		EventManager.on(EventKey.REFRUSHBOXSTATUS, this, this.synthetise);
		EventManager.on(ProtoEvent.FREEREWARD_CALL_BACK, this, this.synthetise);
		EventManager.on(ProtoEvent.ENDLESSSORT_CALL_BACK, this, this.endlessClick);
		Game.task.sUpdateRed.add(this.refrushRed, this);
		if (Game.playData.unlockInit < Game.playData.unlockLoginInit) {
			this.initUnlock();
		}
		if (Game.playData.unlockInit < Game.playData.unlockIndex) {
			this.unlockFun();
		}
		this.setData();
		EventManager.on(EventKey.SHOWHOMEMENU, this, this.checkFriendGainBtn);
		EventManager.on(EventKey.HIDEHOMEMENU, this, this.hideFriendInfBtn);
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		this.hideFriendInfBtn();
		Game.task.sUpdateRed.remove(this.refrushRed, this);
		EventManager.offAllCaller(this);
	}

	// 功能点初始位置列表
	private funPosList: Array<Laya.Point> = [];
	// 功能点按钮列表
	private funList: Array<fairygui.GButton> = [];
	// 初始化功能点
	private initUnlock(): void {
		this.m_endlessBtn.visible = Game.playData.unlockEndless == 2;
		this.m_friendGainBtn.visible = false;
		for (let i = 0, len = this.funList.length; i < len; i++) {
			if (this.funList[i] != null) {
				this.funList[i].visible = false;
			}
		}
		for (let i = 1, len = UnlockInfo.getCount(); i <= len; i++) {
			if (Game.playData.unlockLoginInit >= i) {
				let unlock = UnlockInfo.getInfo(i);
				for (let k = unlock.unLock.length - 1; k >= 0; k--) {
					if (this.funList[unlock.unLock[k]] != null) {
						this.funList[unlock.unLock[k]].visible = true;
						if (unlock.unLock[k] == 7) {
							this.m_friendGainBtn.visible = true;
						}
					}
				}
			}
		}
		Game.playData.unlockInit = Game.playData.unlockLoginInit;
	}
	// 解锁
	private unlockFun(): void {
		this.hideFriendInfBtn();
		this.m_showMask.setSelectedIndex(1);
		this.tweenList = [];
		this.tweenPosList = [];
		let unlock = UnlockInfo.getInfo(Game.playData.unlockIndex);
		let opFriend: boolean = false;
		if (unlock && unlock.mapId != 11) {
			for (let k = 0; k < unlock.unLock.length; k++) {
				if (this.funList[unlock.unLock[k]] != null) {
					this.tweenList.push(this.funList[unlock.unLock[k]]);
					this.tweenPosList.push(this.funPosList[unlock.unLock[k]]);
					if (unlock.unLock[k] == 7) {
						opFriend = true;
					}
				}
			}
		}
		if (opFriend) {
			let pos = new Laya.Point(this.m_friendGainBtn.x, this.m_friendGainBtn.y);
			this.m_friendGainBtn.setXY(this.m_maskBtn.x, this.m_maskBtn.y);
			this.m_friendGainBtn.visible = true;
			fairygui.tween.GTween.to2(this.m_maskBtn.x, this.m_maskBtn.y, pos.x, pos.y, 1)
				.setTarget(this.m_friendGainBtn, this.m_friendGainBtn.setXY)
				.setEase(fairygui.tween.EaseType.SineInOut);
		}
		this.startTween();
	}
	private tweenList: Array<fairygui.GButton> = [];
	private tweenPosList: Array<Laya.Point> = [];
	private startTween(): void {
		if (this.tweenList.length > 0) {
			let btn = this.tweenList.shift();
			let pos = this.tweenPosList.shift();
			btn.setXY(this.m_maskBtn.x, this.m_maskBtn.y);
			btn.setScale(0, 0);
			btn.visible = true;
			fairygui.tween.GTween.to2(0, 0, 1, 1, 1)
				.setTarget(btn, btn.setScale)
				.setEase(fairygui.tween.EaseType.SineInOut);
			fairygui.tween.GTween.to2(this.m_maskBtn.x, this.m_maskBtn.y, pos.x, pos.y, 1)
				.setTarget(btn, btn.setXY)
				.setEase(fairygui.tween.EaseType.SineInOut)
				.setDelay(1.1)
				.onComplete(this.startTween, this);
		}
		else {
			this.lockOver();
		}
	}
	private lockOver(): void {
		Game.playData.unlockInit = Game.playData.unlockIndex;
		this.m_showMask.setSelectedIndex(0);
		if (Game.playData.unlockInit >= 5) {
			this.checkFriendGainBtn();
		}
		if (Game.playData.unlockInit >= 7) {
			this.checkDayFight();
		}
	}

	private unlockEndless(): void {
		if (Game.playData.unlockEndless == 1) {
			let pos = new Laya.Point(this.m_endlessBtn.x, this.m_endlessBtn.y);
			this.m_endlessBtn.setXY(this.m_maskBtn.x, this.m_maskBtn.y);
			this.m_endlessBtn.visible = true;
			fairygui.tween.GTween.to2(this.m_maskBtn.x, this.m_maskBtn.y, pos.x, pos.y, 1)
				.setTarget(this.m_endlessBtn, this.m_endlessBtn.setXY)
				.setEase(fairygui.tween.EaseType.SineInOut)
				.onComplete(this.unlockEndlessOver, this);
		}
	}
	private unlockEndlessOver(): void {
		this.m_showMask.setSelectedIndex(0);
		Game.playData.unlockEndless = 2;
		this.checkFriendGainBtn();
	}

}
UI_HomeMain.bind();
