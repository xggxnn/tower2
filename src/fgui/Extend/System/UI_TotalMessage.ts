import fui_TotalMessage from "../../Generates/System/fui_TotalMessage";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import MenuLayer from "../../../gamemodule/MenuLayer";
import Handler = Laya.Handler;

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_TotalMessage extends fui_TotalMessage {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_TotalMessage {
		return <UI_TotalMessage>(fui_TotalMessage.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_TotalMessage.URL, UI_TotalMessage);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}

	private _onCompleteHandler: Handler;

	playMove(txt: string, onComplete?: Handler) {
		if (this._onCompleteHandler) {
			this._onCompleteHandler.recover();
		}
		this._onCompleteHandler = onComplete;
		this.m_moveTtitle.text = txt;
		MenuLayer.floatMsg.addChild(this);
		this.m_move.play(Handler.create(this, this.onComplete));
	}
	playTop(txt: string, onComplete?: Handler) {
		if (this._onCompleteHandler) {
			this._onCompleteHandler.recover();
		}
		this._onCompleteHandler = onComplete;
		this.m_topTitle.text = txt;
		MenuLayer.floatMsg.addChild(this);
		this.m_top.play(Handler.create(this, this.onComplete));
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
UI_TotalMessage.bind();