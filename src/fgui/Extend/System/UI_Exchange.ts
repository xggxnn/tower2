import fui_Exchange from "../../Generates/System/fui_Exchange";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import MenuLayer from "../../../gamemodule/MenuLayer";
import Fun from "../../../tool/Fun";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import Game from "../../../Game";
import ProtoEvent from "../../../protobuf/ProtoEvent";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Exchange extends fui_Exchange {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_Exchange {
		return <UI_Exchange>(fui_Exchange.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Exchange.URL, UI_Exchange);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_ok.onClick(this, this.okBtnClick);
		this.m_cancel.onClick(this, this.cancelClikc);
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

	okBtnClick(): void {
		let codes = this.m_txt.text.trim();
		if (codes.length < 3) {
			this.m_tip.text = "口令最短三个字";
		}
		else {
			codes = codes.toUpperCase();
			codes = encodeURI(codes);
			let data = {
				code: codes,
			}
			Game.proto.wishingCode(data);
		}
	}
	cancelClikc(): void {
		EventManager.off(ProtoEvent.WISHING_CALL_BACK, this, this.checkState);
		this.removeFromParent();
		EventManager.event(EventKey.SHOWHOMEMENU);
	}

	showExchange(): void {
		EventManager.on(ProtoEvent.WISHING_CALL_BACK, this, this.checkState);
		this.m_txt.text = "";
		this.m_tip.text = "";
		MenuLayer.floatMsg.addChild(this);
	}

	private checkState(): void {
		switch (Game.playData.wishingState) {
			case 0:
				this.m_tip.text = "领取成功！";
				break;
			case 1:
				this.m_tip.text = "已领完！";
				break;
			case 2:
				this.m_tip.text = "已领取！";
				break;
			case 3:
				this.m_tip.text = "无效的兑换码！";
				break;
			case 4:
				this.m_tip.text = "不在领取时间内！";
				break;
		}
	}

}
UI_Exchange.bind();
