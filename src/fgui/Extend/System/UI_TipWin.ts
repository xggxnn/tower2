import fui_TipWin from "../../Generates/System/fui_TipWin";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import MenuLayer from "../../../gamemodule/MenuLayer";
import Handler = Laya.Handler;

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
	}
	okBtnClick(): void {
		this.onComplete();
	}
	private _onCompleteHandler: Handler;

	showTxt(txt: string, onComplete?: Handler) {
		if (this._onCompleteHandler) {
			this._onCompleteHandler.recover();
		}
		this._onCompleteHandler = onComplete;
		this.m_c1.setSelectedIndex(1);
		this.m_scrollTxt.text = txt;
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
			this._onCompleteHandler.recover();
			this._onCompleteHandler = null;
		}
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