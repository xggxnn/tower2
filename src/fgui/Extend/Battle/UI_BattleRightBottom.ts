import fui_BattleRightBottom from "../../Generates/Battle/fui_BattleRightBottom";
import BattleWin from "../../../gamemodule/Windows/BattleWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleRightBottom extends fui_BattleRightBottom {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleRightBottom {
		return <UI_BattleRightBottom>(fui_BattleRightBottom.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleRightBottom.URL, UI_BattleRightBottom);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_skill1Btn.m_mask.fillAmount = 0.3;
		this.m_skill2Btn.m_mask.fillAmount = 0.6;
		this.m_skill3Btn.m_mask.fillAmount = 0;
		this.m_skill2Btn.enabled = false;

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
UI_BattleRightBottom.bind();