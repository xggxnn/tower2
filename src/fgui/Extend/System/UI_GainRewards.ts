import fui_GainRewards from "../../Generates/System/fui_GainRewards";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import FWindow from "../../../gamemodule/FWindow";
import UI_ItemIcon from "./UI_ItemIcon";
import { Tick } from "../../../tool/TickManager";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";
import Handler = Laya.Handler;
import MenuLayer from "../../../gamemodule/MenuLayer";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_GainRewards extends fui_GainRewards {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_GainRewards {
		return <UI_GainRewards>(fui_GainRewards.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_GainRewards.URL, UI_GainRewards);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_okBtn.onClick(this, this.closeUI);
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_list.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);

	}
	// 关闭ui
	closeUI(): void {
		this.off(Laya.Event.CLICK, this, this.addNumOver);
		Game.playData.rewardList = [];
		this.removeFromParent();
		if (this._onCompleteHandler) {
			this._onCompleteHandler.runWith(this);
			this._onCompleteHandler.recover();
			this._onCompleteHandler = null;
		}
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {

	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}

	private tick: Tick = null;
	private giftCount: number = 0;
	private _onCompleteHandler: Handler;
	public setData(onComplete?: Handler): void {
		this.on(Laya.Event.CLICK, this, this.addNumOver);
		if (this._onCompleteHandler) {
			this._onCompleteHandler.recover();
		}
		this._onCompleteHandler = onComplete;
		this.m_list.numItems = 0;
		this.m_okBtn.visible = false;
		MenuLayer.floatMsg.addChild(this);
		this.giftCount = Game.playData.rewardList.length;
		if (this.tick) {
			this.tick.Stop();
			Game.tick.clearTick(this.tick);
			this.tick = null;
		}
		let count = this.giftCount - 1;
		if (count < 1) {
			this.updateNum();
			this.addNumOver();
		}
		else {
			this.tick = Game.tick.addTick(count, Laya.Handler.create(this, this.updateNum, null, false), Laya.Handler.create(this, this.addNumOver, null, false), 20);
			this.tick.Start();
		}
	}

	private updateNum(): void {
		if (this.giftCount > this.m_list.numItems) {
			this.m_list.numItems++;
			this.m_list.scrollToView(this.m_list.numItems - 1);
		}
	}
	private addNumOver(): void {
		if (this.tick) {
			this.tick.Stop();
			Game.tick.clearTick(this.tick);
			this.tick = null;
		}
		if (this.giftCount != this.m_list.numItems) {
			this.m_list.numItems = this.giftCount;
		}
		this.m_okBtn.visible = true;
	}


	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		item.setData(Game.playData.rewardList[index]);
	}

	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		Game.popup.showPopup(obj, true, false, "奖励物品：{0}", item.itemInfo.itemId);
	}
}
UI_GainRewards.bind();
