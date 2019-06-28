/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_SkillBtn from "./fui_SkillBtn";

export default class fui_BattleRightBottom extends fairygui.GComponent {

	public m_skill1Btn:fui_SkillBtn;
	public m_skill2Btn:fui_SkillBtn;
	public m_skill3Btn:fui_SkillBtn;

	public static URL:string = "ui://3jvhuirzngrs11";

	public static createInstance():fui_BattleRightBottom {
		return <fui_BattleRightBottom><any>(fairygui.UIPackage.createObject("Battle","BattleRightBottom"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_skill1Btn = <fui_SkillBtn><any>(this.getChildAt(1));
		this.m_skill2Btn = <fui_SkillBtn><any>(this.getChildAt(2));
		this.m_skill3Btn = <fui_SkillBtn><any>(this.getChildAt(3));
	}
}