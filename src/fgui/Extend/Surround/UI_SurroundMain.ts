import fui_SurroundMain from "../../Generates/Surround/fui_SurroundMain";
import SurroundWin from "../../../gamemodule/Windows/SurroundWin";
import UI_ItemIcon from "../System/UI_ItemIcon";
import UI_KingItem from "./UI_KingItem";
import KingInfo from "../../../csvInfo/KingInfo";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import SignInfo from "../../../csvInfo/SignInfo";
import Game from "../../../Game";
import { Tick } from "../../../Tool/TickManager";
import Fun from "../../../Tool/Fun";
import EventKey from "../../../Tool/EventKey";

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
		this.m_closeBtn.onClick(this, this.closeUI);
		this.m_signlist.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_signlist.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
		this.m_kinglist.setVirtual();
		this.m_kinglist.itemRenderer = Laya.Handler.create(this, this.initKingItem, null, false);
		this.m_rewardList.itemRenderer = Laya.Handler.create(this, this.initRewardItem, null, false);

		this.m_signBtn.onClick(this, this.changeType, [0]);
		this.m_kingBtn.onClick(this, this.changeType, [1]);
		this.m_taskBtn.onClick(this, this.changeType, [2]);
		this.m_achieveBtn.onClick(this, this.changeType, [3]);
		this.m_rewardBtn.onClick(this, this.changeType, [4]);
		this.m_taskBtn.visible = false;
		this.m_achieveBtn.visible = false;
		this.m_rewardBtn.visible = false;
		this.m_rewardStart.onClick(this, this.startRewardClick);
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
		EventManager.on(ProtoEvent.KING_CALL_BACK, this, this.changeType, [1]);
		EventManager.on(ProtoEvent.SIGN_CALL_BACK, this, this.changeType, [0]);
		this.moduleWindow.closeOtherWindow();
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.KING_CALL_BACK, this, this.changeType);
		EventManager.off(ProtoEvent.SIGN_CALL_BACK, this, this.changeType);
	}

	private setData(): void {
		this.changeType(0);
	}

	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		item.signSetData(index + 1);
	}
	private initRewardItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		item.rewardSetData(index + 1);
		this.rewardItemList.push(item);
	}
	private onClickItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		if (Game.playData.signInIndex >= item.singIndex) {
			Game.tipWin.showTip(Game.tipTxt.SignHave);
		}
		else if (Game.playData.signInIndex + 1 == item.singIndex) {
			if (Game.playData.isSign) {
				Game.popup.showPopup(obj, true, "可获得：{0}", item.signInf.rid);
			}
			else {
				Game.proto.sign();
			}
		}
		else {
			Game.popup.showPopup(obj, true, "可获得：{0}", item.signInf.rid);
		}
	}

	private initKingItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_KingItem;
		item.setData(index);
	}

	private changeType(index: number): void {
		if (index != 0 && Game.redData.signRed) {
			Game.redTip.showRedTip(this.m_signBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_signBtn);
		}
		if (index != 1 && Game.redData.kingRed) {
			Game.redTip.showRedTip(this.m_kingBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_kingBtn);
		}
		switch (index) {
			case 0:
				{
					this.m_tip.text = "签到";
					this.m_signlist.numItems = SignInfo.getCount();
				}
				break;
			case 1:
				{
					this.m_kinglist.numItems = KingInfo.getCount();
					if (Game.redData.kingRedIndex > 0) {
						this.m_kinglist.scrollToView(Game.redData.kingRedIndex);
						Game.redData.kingRedIndex = -1;
					}
				}
				break;
			case 2:
				{
					this.m_tip.text = "每日任务";
					this.m_taskList.numItems = 10;
				}
				break;
			case 3:
				{
					this.m_tip.text = "成就";
					this.m_taskList.numItems = 10;
				}
				break;
			case 4:
				{
					this.m_tip.text = "免费抽奖";
					this.rewardItemList = [];
					this.m_rewardList.numItems = 15;
				}
				break;
		}
		this.m_tab.setSelectedIndex(index);
	}
	private rewardItemList: Array<UI_ItemIcon> = [];
	private curSelectRewardNum: number = 0;
	private tick: Tick = null;
	// 开始免费抽奖
	private startRewardClick(): void {
		EventManager.event(EventKey.SHOW_WAIT);
		if (this.tick) {
			this.tick.Stop();
			Game.tick.clearTick(this.tick);
			this.tick = null;
		}
		this.tick = Game.tick.addTick(100, Laya.Handler.create(this, this.rewardUpdate, null, false), Laya.Handler.create(this, this.rewardFinish, null, false));
		this.tick.Start();
	}
	rewardUpdate(): void {
		this.rewardItemList[this.curSelectRewardNum].m_status.setSelectedIndex(0);
		this.curSelectRewardNum = Fun.rangeBoth(0, 14);
		this.rewardItemList[this.curSelectRewardNum].m_status.setSelectedIndex(2);
	}
	rewardFinish(): void {
		EventManager.event(EventKey.CLOSE_WAIT);
		if (this.tick) {
			this.tick.Stop();
			Game.tick.clearTick(this.tick);
			this.tick = null;
		}
	}
}
UI_SurroundMain.bind();
