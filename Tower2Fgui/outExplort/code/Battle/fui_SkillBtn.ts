/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_SkillBtn extends fairygui.GButton {

	public m_icons:fairygui.GLoader;
	public m_mask:fairygui.GImage;
	public m_titles:fairygui.GTextField;
	public m_tip:fairygui.GTextField;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzngrs13";

	public static createInstance():fui_SkillBtn {
		return <fui_SkillBtn><any>(fairygui.UIPackage.createObject("Battle","SkillBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_mask = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_tip = <fairygui.GTextField><any>(this.getChildAt(3));
		this.m_t0 = this.getTransitionAt(0);
	}
}