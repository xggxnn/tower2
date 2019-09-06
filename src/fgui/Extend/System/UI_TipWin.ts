import fui_TipWin from "../../Generates/System/fui_TipWin";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import MenuLayer from "../../../gamemodule/MenuLayer";
import Handler = Laya.Handler;
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import { Tick } from "../../../tool/TickManager";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_TipWin extends fui_TipWin {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_TipWin {
		return <UI_TipWin>(fui_TipWin.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_TipWin.URL, UI_TipWin);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_ok.onClick(this, this.okBtnClick);
		this.m_cancel.onClick(this, this.cancelClikc);
	}
	okBtnClick(): void {
		this.onComplete();
		this.cleatTick();
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
		this.cleatTick();
	}
	cleatTick(): void {
		if (this.closeTick) {
			this.closeTick.Stop();
			Game.tick.clearTick(this.closeTick);
			this.closeTick = null;
		}
		EventManager.offAllCaller(this);
	}
	private updateNum(): void {
		this.closeTimes--;
		this.m_ok.title = Fun.format("{1}({0})", this.closeTimes, this.okTitle);
	}
	private _onCompleteHandler: Handler;
	private _onCancelHandler: Handler;
	private closeTick: Tick = null;
	private closeTimes: number = 0;
	private okTitle: string = "确定";
	private cancelTitle: string = "取消";

	showTxt(txt: string, showCancel: boolean = false, onComplete?: Handler, cancelHandler?: Handler, okTitle?: string, cancelTitle?: string, delcloseTime?: number) {
		if (this.closeTick) {
			this.closeTick.Stop();
			Game.tick.clearTick(this.closeTick);
			this.closeTick = null;
		}
		if (this._onCompleteHandler) {
			this._onCompleteHandler.recover();
		}
		this._onCompleteHandler = onComplete;
		if (this._onCancelHandler) {
			this._onCancelHandler.recover();
		}
		this._onCancelHandler = cancelHandler;
		if (okTitle) {
			this.okTitle = okTitle;
		}
		else {
			this.okTitle = "确定";
		}
		if (cancelTitle) {
			this.cancelTitle = cancelTitle;
		}
		else {
			this.cancelTitle = "取消";
		}
		this.m_c1.setSelectedIndex(1);
		this.m_scrollTxt.text = txt;
		this.m_types.setSelectedIndex(showCancel ? 1 : 0);
		if (!showCancel) {
			if (delcloseTime == undefined) {
				this.closeTimes = 6;
				this.m_ok.title = Fun.format("{1}({0})", this.closeTimes, this.okTitle);
				this.closeTick = Game.tick.addTick(this.closeTimes - 2, Laya.Handler.create(this, this.updateNum, null, false),
					Laya.Handler.create(this, this.cancelClikc, null, false), 50);
				this.closeTick.Start();
			}
			else {
				this.m_ok.title = Fun.format("{0}", this.okTitle);
			}
		}
		else {
			this.m_ok.title = this.okTitle;
			this.m_cancel.title = this.cancelTitle;
		}
		EventManager.on(EventKey.GAMEWIN, this, this.cancelClikc);
		EventManager.on(EventKey.GAMEEXIT, this, this.cancelClikc);
		EventManager.on(EventKey.GAMELOSE, this, this.cancelClikc);
		MenuLayer.floatMsg.addChild(this);
	}
	showList(list: Array<any>, onComplete?: Handler) {
		if (this._onCompleteHandler) {
			this._onCompleteHandler.recover();
		}
		this._onCompleteHandler = onComplete;
		this.m_c1.setSelectedIndex(0);
		MenuLayer.floatMsg.addChild(this);
	}

	private onComplete() {
		this.removeFromParent();

		if (this._onCompleteHandler) {
			this._onCompleteHandler.runWith(this);
			this._onCompleteHandler = null;
		}
		if (this._onCancelHandler) {
			this._onCancelHandler = null;
		}
		this.cleatTick();
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


}
UI_TipWin.bind();