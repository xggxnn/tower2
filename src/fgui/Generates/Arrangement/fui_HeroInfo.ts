/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeroInfo extends fairygui.GComponent {

	public m_heroname:fairygui.GTextField;
	public m_icons:fairygui.GLoader;
	public m_lv:fairygui.GTextField;
	public m_star:fairygui.GTextField;
	public m_atk:fairygui.GTextField;
	public m_atkspeed:fairygui.GTextField;
	public m_cirt:fairygui.GTextField;
	public m_burst:fairygui.GTextField;
	public m_skillname:fairygui.GTextField;
	public m_gainmethod:fairygui.GButton;
	public m_race:fairygui.GTextField;
	public m_career:fairygui.GTextField;
	public m_special:fairygui.GTextField;
	public m_lookrace:fairygui.GButton;
	public m_lookcareer:fairygui.GButton;
	public m_lookspecial:fairygui.GButton;
	public m_closeBtn:fairygui.GButton;

	public static URL:string = "ui://9wh71t3fnn3i9";

	public static createInstance():fui_HeroInfo {
		return <fui_HeroInfo><any>(fairygui.UIPackage.createObject("Arrangement","HeroInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_heroname = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_lv = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_star = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_atk = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_atkspeed = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_cirt = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_burst = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_skillname = <fairygui.GTextField><any>(this.getChildAt(10));
		this.m_gainmethod = <fairygui.GButton><any>(this.getChildAt(11));
		this.m_race = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_career = <fairygui.GTextField><any>(this.getChildAt(13));
		this.m_special = <fairygui.GTextField><any>(this.getChildAt(14));
		this.m_lookrace = <fairygui.GButton><any>(this.getChildAt(15));
		this.m_lookcareer = <fairygui.GButton><any>(this.getChildAt(16));
		this.m_lookspecial = <fairygui.GButton><any>(this.getChildAt(17));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(18));
	}
}