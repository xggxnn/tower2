import fui_GuideLayer from "../../Generates/System/fui_GuideLayer";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import UI_winBtn from "./UI_winBtn";
import MenuLayer from "../../../gamemodule/MenuLayer";
import Handler = Laya.Handler;

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_GuideLayer extends fui_GuideLayer {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_GuideLayer {
		return <UI_GuideLayer>(fui_GuideLayer.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_GuideLayer.URL, UI_GuideLayer);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		if (!this.m_wbtn || this.m_wbtn == null) {
			this.m_wbtn = UI_winBtn.createInstance();
			this.addChild(this.m_wbtn);
			this.m_wbtn.onClick(this, this.clickBtn);
		}
	}
	private m_wbtn: UI_winBtn;

	private _onCompleteHandler: Handler;
	showGuide(target: fairygui.GObject, onComplete?: Handler): void {
		if (this.timeOutNum != -1) {
			clearTimeout(this.timeOutNum);
			this.timeOutNum = -1;
		}
		this.m_wbtn.enabled = false;
		if (this._onCompleteHandler) {
			this._onCompleteHandler.recover();
		}
		this._onCompleteHandler = onComplete;
		MenuLayer.guide.addChild(this);
		let rect = target.localToGlobalRect(-5, -5, target.width + 10, target.height + 10);
		let win = this.m_window as fairygui.GObject;
		win.setSize(rect.width, rect.height);
		fairygui.tween.GTween.to2(win.x, win.y, rect.x, rect.y, 0.3).setTarget(win, win.setXY).onComplete(this._complete, this);

	}
	_complete(): void {
		this.m_wbtn.setSize(this.m_window.width, this.m_window.height);
		this.m_wbtn.setXY(this.m_window.x, this.m_window.y);
		this.m_wbtn.enabled = true;
	}

	clickBtn(): void {
		this.m_wbtn.enabled = false;
		if (this._onCompleteHandler) {
			this.timeOutNum = setTimeout(() => {
				this._onCompleteHandler.run();
			}, 100);
		}
		this.hideGuide();
	}
	timeOutNum: number = -1;

	hideGuide(): void {
		this.removeFromParent();
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
UI_GuideLayer.bind();