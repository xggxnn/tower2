import fui_seatBtn from "../../Generates/Home/fui_seatBtn";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_seatBtn extends fui_seatBtn {

	moduleWindow: HomeWin;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_seatBtn {
		return <UI_seatBtn>(fui_seatBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_seatBtn.URL, UI_seatBtn);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_hitTip.bold = true;
	}

	public setData(): void {
		this.m_hitTip.setVar("count", Game.playData.curFightVal.toFixed(1)).flushVars();
		this.m_speedTip.setVar("count", Game.playData.curSpeedVal.toFixed(1)).flushVars();
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
		EventManager.on(ProtoEvent.SETSEAT_CALL_BACK, this, this.setData);

	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}


}
UI_seatBtn.bind();
