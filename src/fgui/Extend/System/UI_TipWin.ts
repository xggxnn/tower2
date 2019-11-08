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
		this.m_actBtn.onClick(this, this.okBtnClick);
		this.m_skipBtn.onClick(this, this.cancelClikc);
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
	private updateNumCancel(): void {
		this.closeTimes--;
		this.m_cancel.title = Fun.format("{1}({0})", this.closeTimes, this.cancelTitle);
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
		this.m_ok.m_adStatus.setSelectedIndex(0);
		if (okTitle) {
			this.okTitle = okTitle;
			if ("跳过战斗" == okTitle) {
				this.m_ok.m_adStatus.setSelectedIndex(1);
			}
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
		this.m_scrollTxt.text = txt;
		this.m_tipOrShipin.setSelectedIndex(0);
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
			if (delcloseTime != undefined && delcloseTime > 0) {
				this.closeTimes = delcloseTime;
				this.m_cancel.title = Fun.format("{1}({0})", this.closeTimes, this.cancelTitle);
				this.closeTick = Game.tick.addTick(this.closeTimes - 1, Laya.Handler.create(this, this.updateNumCancel, null, false),
					Laya.Handler.create(this, this.cancelClikc, null, false), 60);
				this.closeTick.Start();
			}
			else {
				this.m_cancel.title = this.cancelTitle;
			}
		}
		EventManager.on(EventKey.GAMEWIN, this, this.cancelClikc);
		EventManager.on(EventKey.GAMEEXIT, this, this.cancelClikc);
		EventManager.on(EventKey.GAMELOSE, this, this.cancelClikc);
		MenuLayer.floatMsg.addChild(this);
	}

	battleSkip(onComplete: Handler, cancelHandler: Handler, delcloseTime: number): void {
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
		this.m_tipOrShipin.setSelectedIndex(1);
		if (Game.redData.adOneFree) {
			this.m_actBtn.m_adStatus.setSelectedIndex(1);
			this.m_actBtn.title = "免费获取";
		} else {
			this.m_actBtn.m_adStatus.setSelectedIndex(0);
			this.m_actBtn.title = "首次免费";
		}
		this.closeTimes = delcloseTime;
		this.m_tipNum.text = Fun.format("{0}", this.closeTimes);
		this.closeTick = Game.tick.addTick(this.closeTimes - 1, Laya.Handler.create(this, this.updateNumBattle, null, false),
			Laya.Handler.create(this, this.cancelClikc, null, false), 60);
		this.closeTick.Start();
		MenuLayer.floatMsg.addChild(this);
	}
	private updateNumBattle(): void {
		this.m_tipNum.text = Fun.format("{0}", this.closeTimes);
		this.closeTimes--;
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