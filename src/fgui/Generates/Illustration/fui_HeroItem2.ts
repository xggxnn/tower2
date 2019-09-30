/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeroItem2 extends fairygui.GComponent {

	public m_have:fairygui.Controller;
	public m_status:fairygui.Controller;
	public m_quality:fairygui.GLoader;
	public m_pic:fairygui.GLabel;
	public m_num:fairygui.GTextField;
	public m_career:fairygui.GLoader;
	public m_race:fairygui.GLoader;
	public m_nam:fairygui.GLoader;

	public static URL:string = "ui://rzze1nh2qvb63";

	public static createInstance():fui_HeroItem2 {
		return <fui_HeroItem2><any>(fairygui.UIPackage.createObject("Illustration","HeroItem2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_have = this.getControllerAt(0);
		this.m_status = this.getControllerAt(1);
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_pic = <fairygui.GLabel><any>(this.getChildAt(1));
		this.m_num = <fairygui.GTextField><any>(this.getChildAt(3));
		this.m_career = <fairygui.GLoader><any>(this.getChildAt(4));
		this.m_race = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_nam = <fairygui.GLoader><any>(this.getChildAt(6));
	}
}