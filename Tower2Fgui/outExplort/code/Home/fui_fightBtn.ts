/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_fightBtn extends fairygui.GButton {

	public m_reward:fairygui.GTextField;
	public m_fight:fairygui.GRichTextField;
	public m_speed:fairygui.GRichTextField;
	public m_cur:fairygui.GTextField;

	public static URL:string = "ui://9xvnuoq0j5ct1q";

	public static createInstance():fui_fightBtn {
		return <fui_fightBtn><any>(fairygui.UIPackage.createObject("Home","fightBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_reward = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_fight = <fairygui.GRichTextField><any>(this.getChildAt(7));
		this.m_speed = <fairygui.GRichTextField><any>(this.getChildAt(9));
		this.m_cur = <fairygui.GTextField><any>(this.getChildAt(10));
	}
}