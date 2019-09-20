/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_SkillItem extends fairygui.GComponent {

	public m_double:fairygui.Controller;
	public m_locks:fairygui.Controller;
	public m_icons:fairygui.GLoader;
	public m_skillName:fairygui.GTextField;
	public m_lock:fairygui.GTextField;

	public static URL:string = "ui://9wh71t3fczuw2b";

	public static createInstance():fui_SkillItem {
		return <fui_SkillItem><any>(fairygui.UIPackage.createObject("Arrangement","SkillItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_double = this.getControllerAt(0);
		this.m_locks = this.getControllerAt(1);
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_skillName = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_lock = <fairygui.GTextField><any>(this.getChildAt(5));
	}
}