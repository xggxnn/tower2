/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_SkillBtn from "./fui_SkillBtn";

export default class fui_BattleLeftBottom extends fairygui.GComponent {

	public m_showHide:fairygui.Controller;
	public m_quality:fairygui.GLoader;
	public m_pic:fairygui.GLabel;
	public m_atkAttribute:fairygui.GLoader;
	public m_attribute:fairygui.GLoader;
	public m_name:fairygui.GTextField;
	public m_atktip:fairygui.GTextField;
	public m_skill:fairygui.GTextField;
	public m_menpai:fairygui.GTextField;
	public m_wuxing:fairygui.GTextField;
	public m_zu:fairygui.GGroup;
	public m_playSkillDes:fairygui.GTextField;
	public m_playSkillBtn:fui_SkillBtn;

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
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_pic = <fairygui.GLabel><any>(this.getChildAt(2));
		this.m_atkAttribute = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_attribute = <fairygui.GLoader><any>(this.getChildAt(4));
		this.m_name = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_atktip = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_skill = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_menpai = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_wuxing = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_zu = <fairygui.GGroup><any>(this.getChildAt(10));
		this.m_playSkillDes = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_playSkillBtn = <fui_SkillBtn><any>(this.getChildAt(13));
	}
}