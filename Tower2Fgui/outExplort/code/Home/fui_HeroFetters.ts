/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeroFetters extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_bg:fairygui.GLoader;
	public m_tip:fairygui.GLabel;
	public m_heroList:fairygui.GList;
	public m_typename:fairygui.GTextField;
	public m_tuijianbackBtn:fairygui.GButton;
	public m_rewardBtn:fairygui.GButton;

	public static URL:string = "ui://9xvnuoq0bxj01u";

	public static createInstance():fui_HeroFetters {
		return <fui_HeroFetters><any>(fairygui.UIPackage.createObject("Home","HeroFetters"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_bg = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_tip = <fairygui.GLabel><any>(this.getChildAt(6));
		this.m_heroList = <fairygui.GList><any>(this.getChildAt(9));
		this.m_typename = <fairygui.GTextField><any>(this.getChildAt(10));
		this.m_tuijianbackBtn = <fairygui.GButton><any>(this.getChildAt(13));
		this.m_rewardBtn = <fairygui.GButton><any>(this.getChildAt(14));
	}
}