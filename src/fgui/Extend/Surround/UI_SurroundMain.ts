import fui_SurroundMain from "../../Generates/Surround/fui_SurroundMain";
import SurroundWin from "../../../gamemodule/Windows/SurroundWin";
import UI_ItemIcon from "../System/UI_ItemIcon";
import UI_KingItem from "./UI_KingItem";
import KingInfo from "../../../csvInfo/KingInfo";
import EventManager from "../../../tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import SignInfo from "../../../csvInfo/SignInfo";
import Game from "../../../Game";
import { Tick } from "../../../tool/TickManager";
import Fun from "../../../tool/Fun";
import EventKey from "../../../tool/EventKey";
import AdsManager from "../../../tool/AdsManager";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import UI_boxItem from "./UI_boxItem";
import UI_TaskItem from "./UI_TaskItem";
import UI_TabBtn from "../System/UI_TabBtn";
import UI_EndlessItem from "./UI_EndlessItem";
import { MenuId } from "../../../gamemodule/MenuId";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_SurroundMain extends fui_SurroundMain {

	moduleWindow: SurroundWin;

	public static DependPackages: string[] = ["Surround"];

	public static createInstance(): UI_SurroundMain {
		return <UI_SurroundMain>(fui_SurroundMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_SurroundMain.URL, UI_SurroundMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_closeBtn.onClick(this, this.backUI);
		this.m_signlist.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_signlist.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
		this.m_kinglist.setVirtual();
		this.m_kinglist.itemRenderer = Laya.Handler.create(this, this.initKingItem, null, false);
		this.m_rewardList.itemRenderer = Laya.Handler.create(this, this.initRewardItem, null, false);
		this.m_rewardList.on(fairygui.Events.CLICK_ITEM, this, this.onClickRewardItem);
		this.m_taskList.setVirtual();
		this.m_taskList.itemRenderer = Laya.Handler.create(this, this.initTaskItem, null, false);
		this.m_dayBtn.onClick(this, this.clickBigTask);

		this.m_endlessList.setVirtual();
		this.m_endlessList.itemRenderer = Laya.Handler.create(this, this.initEndlessItem, null, false);
		this.m_endleStart.onClick(this, this.clickEndlessStart);


		this.m_signBtn.onClick(this, this.changeType, [0]);
		this.m_kingBtn.onClick(this, this.changeType, [1]);
		this.m_taskBtn.onClick(this, this.changeType, [2]);
		this.m_achieveBtn.onClick(this, this.changeType, [3]);
		this.m_rewardBtn.onClick(this, this.changeType, [4]);
		this.m_rewardStart.onClick(this, this.startRewardClick);
		this.boxList = [];
		this.boxList.push(this.m_box1 as UI_boxItem);
		this.boxList.push(this.m_box2 as UI_boxItem);
		this.boxList.push(this.m_box3 as UI_boxItem);

		for (let i = 0; i < 3; i++) {
			this.boxList[i].m_gainBtn.onClick(this, this.boxGainClick, [i]);
		}
	}

	private boxList: Array<UI_boxItem> = [];

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		for (let i = 0; i < 3; i++) {
			this.boxList[i].removeUpdate();
		}
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(ProtoEvent.KING_CALL_BACK, this, this.changeType, [1]);
		EventManager.on(ProtoEvent.SIGN_CALL_BACK, this, this.changeType, [0]);
		EventManager.on(EventKey.REWARDED_VIDEO_AD_YES, this, this.adOk);
		EventManager.on(ProtoEvent.FREEADCONFIG_CALL_BACK, this, this.freeConfig);
		EventManager.on(ProtoEvent.FREEREWARD_CALL_BACK, this, this.startReward);
		EventManager.on(ProtoEvent.BOXCONFIG_CALL_BACK, this, this.boxConfig);
		EventManager.on(ProtoEvent.GAINBOX_CALL_BACK, this, this.boxConfig);
		EventManager.on(ProtoEvent.TASKCONFIG_CALL_BACK, this, this.taskConfig);
		EventManager.on(ProtoEvent.TASKGAIN_CALL_BACK, this, this.taskConfig);
		EventManager.on(ProtoEvent.ENDLESSCONFIG_CALL_BACK, this, this.endlessConfig);
		this.moduleWindow.closeOtherWindow();
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}

	private setData(): void {
		this.changeType(this.moduleWindow.menuParameter.args[0]);
	}

	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		item.signSetData(index + 1);
	}

	private freeConfig(): void {
		this.rewardItemList = [];
		this.m_rewardList.numItems = 15;
		this.m_rewardStart.enabled = true;
	}
	private initRewardItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		item.rewardSetData(index + 1);
		this.rewardItemList.push(item);
	}
	private onClickRewardItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		Game.popup.showPopup(obj, false, false, "可获得：{0}", item.freeRewardResId);
	}


	private onClickItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		switch (item.signgainstatus) {
			case 0:
				Game.tipWin.showDoubleGain([item.signReward], Laya.Handler.create(this, this.sign), Laya.Handler.create(this, this.doubleSign));
				break;
			case 1:
				Game.popup.showPopup(obj, false, false, Game.tipTxt.SignHave);
				break;
			case 2:
				Game.popup.showPopup(obj, false, false, "每日签到可领取{0}，大王稍等，奖励正在路上啦！", item.signReward.itemId);
				break;
		}
	}
	private sign(): void {
		let data = {
			double: 0,
		}
		Game.proto.sign(data);
	}
	private doubleSign(): void {
		this.isFreeReward = 0;
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
	private adOk(): void {
		switch (this.isFreeReward) {
			case 0:
				{
					let data = {
						double: 1,
					}
					Game.proto.sign(data);
				}
				break;
			case 1:
				{
					Game.playData.freeGetReward = new RewardItem();
					Game.proto.freeReward();
				}
				break;
			case 2:
				{
					let data = {
						type: this.boxIndex,
						double: true,
					}
					Game.proto.gainBox(data);
				}
				break;
		}
	}


	private initKingItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_KingItem;
		item.setData(index);
	}

	private changeType(index: number): void {
		if (index == 2) {
			let sele = Game.redData.signRed ? 1 : 0;
			(this.m_signBtn as UI_TabBtn).m_redTip.setSelectedIndex(sele);
			(this.m_taskBtn as UI_TabBtn).m_redTip.setSelectedIndex(0);
		} else if (index == 0) {
			(this.m_signBtn as UI_TabBtn).m_redTip.setSelectedIndex(0);
			let sele = Game.task.showRed ? 1 : 0;
			(this.m_taskBtn as UI_TabBtn).m_redTip.setSelectedIndex(sele);
		}
		switch (index) {
			case 0:
				{
					// 签到
					this.m_signlist.numItems = SignInfo.getCount();
				}
				break;
			case 1:
				{
					// 国王之路
					this.m_kinglist.numItems = KingInfo.getCount() - 9;
					this.m_kinglist.scrollToView(Game.redData.kingRedIndex);
				}
				break;
			case 2:
				{
					// 任务
					Game.proto.taskConfig();
				}
				break;
			case 3:
				{
					this.m_taskList.numItems = 10;
				}
				break;
			case 4:
				{
					// 免费领奖
					this.m_rewardStart.enabled = false;
					this.m_rewardList.numItems = 0;
					Game.proto.freeConfig();
				}
				break;
			case 5:
				{
					// 资源补给箱
					Game.proto.boxConfig();
				}
				break;
			case 6:
				{
					// 无尽天宫
					this.endlessSort();
				}
				break;
		}
		this.m_tab.setSelectedIndex(index);
	}
	/**
	 * 0：签到
	 * 1：免费抽奖
	 * 2：宝箱领取
	 */
	private isFreeReward: number = 0;
	private rewardItemList: Array<UI_ItemIcon> = [];
	private curSelectRewardNum: number = 0;
	private tick: Tick = null;
	// 开始免费抽奖
	private startRewardClick(): void {
		// if (Game.playData.videoLottryNum < Game.playData.totalVideoLottryNum) {
		this.isFreeReward = 1;
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
		// }
		// else {
		// 	Game.tipWin.showTip("今日免费抽奖次数已用完，请明日再试!", false);
		// }
	}
	private startReward(): void {
		setTimeout(() => {
			EventManager.event(EventKey.SHOW_WAIT);
			if (this.tick) {
				this.tick.Stop();
				Game.tick.clearTick(this.tick);
				this.tick = null;
			}
			this.tick = Game.tick.addTick(50, Laya.Handler.create(this, this.rewardUpdate, null, false), Laya.Handler.create(this, this.rewardFinish, null, false));
			this.tick.Start();
		}, 10);
	}
	rewardUpdate(): void {
		this.rewardItemList[this.curSelectRewardNum].m_status.setSelectedIndex(0);
		this.curSelectRewardNum = Fun.rangeBoth(0, 14);
		this.rewardItemList[this.curSelectRewardNum].m_status.setSelectedIndex(3);
	}
	rewardFinish(): void {
		EventManager.event(EventKey.CLOSE_WAIT);
		this.rewardItemList[this.curSelectRewardNum].m_status.setSelectedIndex(0);
		this.curSelectRewardNum = Game.playData.freeGetReward.id - 1;
		this.rewardItemList[this.curSelectRewardNum].m_status.setSelectedIndex(3);
		if (this.tick) {
			this.tick.Stop();
			Game.tick.clearTick(this.tick);
			this.tick = null;
		}
		Game.rewardWin.showReward([Game.playData.freeGetReward]);
	}

	private boxIndex: number = 0;
	private boxConfig(): void {
		for (let i = 0; i < 3; i++) {
			this.boxList[i].setData(i);
		}
	}
	private boxGainClick(index: number): void {
		this.boxIndex = index;
		switch (this.boxList[index].curStatus) {
			case 0:
				{
					Game.tipWin.showDoubleGain([Game.playData.BoxInfo.reward.getValue(index)], Laya.Handler.create(this, this.boxGain), Laya.Handler.create(this, this.boxDoubleGain));

				}
				break;
			case 1:
				{
					Game.popup.showPopup(this.boxList[index].m_gainBtn, false, false, "冷却时间未结束，请稍后再试！");
				}
				break;
		}
	}
	private boxGain(): void {
		let data = {
			type: this.boxIndex,
			double: false,
		}
		Game.proto.gainBox(data);
	}
	private boxDoubleGain(): void {
		this.isFreeReward = 2;
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

	private taskConfig(): void {
		let item = Game.task.taskStatus.getValue(9);
		this.m_dayProgress.value = (item.progress < 5 ? item.progress : 5);
		this.m_taskBig.setSelectedIndex(item.ispicked ? 1 : 0);
		this.m_taskList.numItems = 8;
		this.m_taskList.scrollToView(Game.task.showTaskNum);
	}
	private taskGain(): void {
		this.m_taskList.numItems = 8;
	}
	private initTaskItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_TaskItem;
		item.setData(index);
	}
	private clickBigTask(): void {
		let item = Game.task.taskStatus.getValue(9);
		if (item && !item.ispicked && item.status < 1) {
			Game.popup.showPopup(this.m_dayBtn, false, false, "奖励物品：{0}", item.rid);
		} else {
			// 领取大奖
			let data = {
				id: 9,
			}
			Game.proto.taskGain(data);
		}
	}

	private endlessSort(): void {
		(this.m_my as UI_EndlessItem).setData(Game.battleData.endlessMy);
		this.m_endleStart.title = Fun.format("挑战第{0}关", Game.battleData.endlessMy.progress + 1);
		this.m_endlessList.numItems = Game.battleData.endlessRank.length;
	}
	private initEndlessItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_EndlessItem;
		item.setData(Game.battleData.endlessRank[index]);
	}

	private clickEndlessStart(): void {
		Game.proto.endlessConfig();
	}
	private endlessConfig(): void {
		Game.battleData.trial_level = 0;
		Game.battleData.curEnterFightType = 3;
		Game.menu.open(MenuId.Battle);
	}
}
UI_SurroundMain.bind();
