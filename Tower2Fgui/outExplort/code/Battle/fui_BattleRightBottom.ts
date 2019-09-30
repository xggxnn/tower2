/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_AddSpeedBtn from "./fui_AddSpeedBtn";

export default class fui_BattleRightBottom extends fairygui.GComponent {

	public m_showHide:fairygui.Controller;
	public m_addSpeed:fui_AddSpeedBtn;
	public m_enemyList:fairygui.GList;
	public m_waveBtn:fairygui.GButton;

	public static URL:string = "ui://3jvhuirzngrs11";

	public static createInstance():fui_BattleRightBottom {
		return <fui_BattleRightBottom><any>(fairygui.UIPackage.createObject("Battle","BattleRightBottom"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_showHide = this.getControllerAt(0);
		this.m_addSpeed = <fui_AddSpeedBtn><any>(this.getChildAt(0));
		this.m_enemyList = <fairygui.GList><any>(this.getChildAt(2));
		this.m_waveBtn = <fairygui.GButton><any>(this.getChildAt(3));
	}
}