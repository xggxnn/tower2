/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Trial extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_cdStatus:fairygui.Controller;
	public m_fightStatus:fairygui.Controller;
	public m_speedStatus:fairygui.Controller;
	public m_closeBtn:fairygui.GButton;
	public m_mapid:fairygui.GLoader;
	public m_levelid:fairygui.GLoader;
	public m_cgGold:fairygui.GTextField;
	public m_cgjad:fairygui.GTextField;
	public m_curFight:fairygui.GTextField;
	public m_curSpeed:fairygui.GTextField;
	public m_tjFight:fairygui.GTextField;
	public m_tjSpeed:fairygui.GTextField;
	public m_seatBtn:fairygui.GButton;
	public m_startBtn:fairygui.GButton;
	public m_slGold:fairygui.GTextField;
	public m_progress:fairygui.GProgressBar;
	public m_cd:fairygui.GTextField;

	public static URL:string = "ui://pdzut3twudz4p";

	public static createInstance():fui_Trial {
		return <fui_Trial><any>(fairygui.UIPackage.createObject("Menus","Trial"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_cdStatus = this.getControllerAt(1);
		this.m_fightStatus = this.getControllerAt(2);
		this.m_speedStatus = this.getControllerAt(3);
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(2));
		this.m_mapid = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_levelid = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_cgGold = <fairygui.GTextField><any>(this.getChildAt(11));
		this.m_cgjad = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_curFight = <fairygui.GTextField><any>(this.getChildAt(13));
		this.m_curSpeed = <fairygui.GTextField><any>(this.getChildAt(14));
		this.m_tjFight = <fairygui.GTextField><any>(this.getChildAt(15));
		this.m_tjSpeed = <fairygui.GTextField><any>(this.getChildAt(16));
		this.m_seatBtn = <fairygui.GButton><any>(this.getChildAt(17));
		this.m_startBtn = <fairygui.GButton><any>(this.getChildAt(18));
		this.m_slGold = <fairygui.GTextField><any>(this.getChildAt(22));
		this.m_progress = <fairygui.GProgressBar><any>(this.getChildAt(23));
		this.m_cd = <fairygui.GTextField><any>(this.getChildAt(25));
	}
}