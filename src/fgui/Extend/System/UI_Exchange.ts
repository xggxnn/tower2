import fui_Exchange from "../../Generates/System/fui_Exchange";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import MenuLayer from "../../../gamemodule/MenuLayer";
import Fun from "../../../tool/Fun";

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
	private initStr: string = "请输入口令“我要变强”，点击确定\n更多兑换口令，请加QQ群：855988151";
	okBtnClick(): void {
		this.m_tip.text = this.checkStr();
	}
	cancelClikc(): void {
		this.removeFromParent();
	}

	showExchange(): void {
		this.m_tip.text = this.initStr;
		this.m_txt.text = "";
		MenuLayer.floatMsg.addChild(this);
	}

	private checkStr(): string {
		let str = this.m_txt.text;
		let result: string = "";
		if (str.length < 3) {
			result = "口令最短三个字";
		}
		else {
			result = Fun.format("您输入的口令\n{0}\n无效！", str);
		}
		return result;
	}

}
UI_Exchange.bind();
