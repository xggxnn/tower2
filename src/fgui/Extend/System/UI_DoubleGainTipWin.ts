import fui_DoubleGainTipWin from "../../Generates/System/fui_DoubleGainTipWin";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import Handler = Laya.Handler;
import MenuLayer from "../../../gamemodule/MenuLayer";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import UI_ItemIcon from "./UI_ItemIcon";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_DoubleGainTipWin extends fui_DoubleGainTipWin {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_DoubleGainTipWin {
		return <UI_DoubleGainTipWin>(fui_DoubleGainTipWin.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_DoubleGainTipWin.URL, UI_DoubleGainTipWin);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_ok.onClick(this, this.onOkComplete);
		this.m_cancel.onClick(this, this.doubleClick);
		this.m_close.onClick(this, this.cancelClikc);
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_list.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
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

	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}

	private _onCompleteHandler: Handler;
	private _onDoubleHandler: Handler;
	private _onCancelHandler: Handler;
	private itemList: Array<RewardItem> = [];

	showList(list: Array<RewardItem>, onComplete: Handler, onDouble: Handler, onCancel: Handler) {
		if (this._onCompleteHandler) {
			this._onCompleteHandler.recover();
		}
		if (this._onCancelHandler) {
			this._onCancelHandler.recover();
		}
		if (this._onDoubleHandler) {
			this._onDoubleHandler.recover();
		}
		this._onCompleteHandler = onComplete;
		this._onCancelHandler = onCancel;
		this._onDoubleHandler = onDouble;
		this.itemList = list;
		this.m_list.numItems = this.itemList.length;
		MenuLayer.floatMsg.addChild(this);
	}

	cancelClikc(): void {
		this.removeFromParent();
		if (this._onCancelHandler) {
			this._onCancelHandler.runWith(this);
			this._onCancelHandler = null;
		}
		if (this._onCompleteHandler) {
			this._onCompleteHandler = null;
		}
		if (this._onDoubleHandler) {
			this._onDoubleHandler = null;
		}
	}
	private onOkComplete() {
		this.removeFromParent();

		if (this._onCompleteHandler) {
			this._onCompleteHandler.runWith(this);
			this._onCompleteHandler = null;
		}
		if (this._onCancelHandler) {
			this._onCancelHandler = null;
		}
		if (this._onDoubleHandler) {
			this._onDoubleHandler = null;
		}
	}
	private doubleClick() {
		this.removeFromParent();

		if (this._onDoubleHandler) {
			this._onDoubleHandler.runWith(this);
			this._onDoubleHandler = null;
		}
		if (this._onCancelHandler) {
			this._onCancelHandler = null;
		}
		if (this._onCompleteHandler) {
			this._onCompleteHandler = null;
		}
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		item.setData(this.itemList[index]);
	}

	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		Game.popup.showPopup(obj, true, false, "奖励物品：{0}", item.itemInfo.itemId);
	}

}
UI_DoubleGainTipWin.bind();
