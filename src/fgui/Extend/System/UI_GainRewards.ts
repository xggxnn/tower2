import fui_GainRewards from "../../Generates/System/fui_GainRewards";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import FWindow from "../../../gamemodule/FWindow";
import UI_ItemIcon from "./UI_ItemIcon";
import { Tick } from "../../../Tool/TickManager";
import Game from "../../../Game";
import Fun from "../../../Tool/Fun";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_GainRewards extends fui_GainRewards {

	moduleWindow: SystemWin;
	fwindow: FWindow;

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
		if (this.fwindow) {
			this.fwindow.windowRemoveChild(this);
		}
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		this.on(Laya.Event.CLICK, this, this.addNumOver);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		this.off(Laya.Event.CLICK, this, this.addNumOver);
	}

	private tick: Tick = null;
	private giftCount: number = 0;
	private setData(): void {
		this.m_list.numItems = 0;
		this.m_okBtn.visible = false;
		this.giftCount = Fun.rangeBoth(2, 10);
		if (this.tick) {
			this.tick.Stop();
			Game.tick.clearTick(this.tick);
			this.tick = null;
		}
		this.tick = Game.tick.addTick(this.giftCount - 1, Laya.Handler.create(this, this.updateNum, null, false), Laya.Handler.create(this, this.addNumOver, null, false), 20);
		this.tick.Start();
	}

	private updateNum(): void {
		if (this.giftCount > this.m_list.numItems) {
			this.m_list.numItems++;
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
		item.setData(index);
	}

	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		Game.popup.showPopup(obj, true, ["第" + (item.index + 1) + "个"]);
	}
}
UI_GainRewards.bind();
