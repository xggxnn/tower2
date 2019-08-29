/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_HeadIcon2 from "./fui_HeadIcon2";

export default class fui_BattleLeftBottom extends fairygui.GComponent {

	public m_showHide:fairygui.Controller;
	public m_dikuang:fairygui.GLoader;
	public m_headIcon:fui_HeadIcon2;
	public m_atkAttribute:fairygui.GLoader;
	public m_attribute:fairygui.GLoader;
	public m_name:fairygui.GTextField;
	public m_atktip:fairygui.GTextField;
	public m_skill:fairygui.GTextField;
	public m_menpai:fairygui.GTextField;
	public m_wuxing:fairygui.GTextField;
	public m_zu:fairygui.GGroup;
	public m_t0:fairygui.Transition;
	public m_t1:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzngrsz";

	public static createInstance():fui_BattleLeftBottom {
		return <fui_BattleLeftBottom><any>(fairygui.UIPackage.createObject("Battle","BattleLeftBottom"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_showHide = this.getControllerAt(0);
		this.m_dikuang = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_headIcon = <fui_HeadIcon2><any>(this.getChildAt(2));
		this.m_atkAttribute = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_attribute = <fairygui.GLoader><any>(this.getChildAt(4));
		this.m_name = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_atktip = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_skill = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_menpai = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_wuxing = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_zu = <fairygui.GGroup><any>(this.getChildAt(10));
		this.m_t0 = this.getTransitionAt(0);
		this.m_t1 = this.getTransitionAt(1);
	}
}