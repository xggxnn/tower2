/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Trial extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_cdStatus:fairygui.Controller;
	public m_fightStatus:fairygui.Controller;
	public m_speedStatus:fairygui.Controller;
	public m_critStatus:fairygui.Controller;
	public m_burstStatus:fairygui.Controller;
	public m_closeBtn:fairygui.GButton;
	public m_mapid:fairygui.GTextField;
	public m_rewardList:fairygui.GList;
	public m_tjFight:fairygui.GTextField;
	public m_tjSpeed:fairygui.GTextField;
	public m_tjcrit:fairygui.GTextField;
	public m_tjBurst:fairygui.GTextField;
	public m_curFight:fairygui.GTextField;
	public m_curSpeed:fairygui.GTextField;
	public m_curCrit:fairygui.GTextField;
	public m_curBrust:fairygui.GTextField;
	public m_startBtn:fairygui.GButton;
	public m_reward:fairygui.GLabel;
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
		this.m_critStatus = this.getControllerAt(4);
		this.m_burstStatus = this.getControllerAt(5);
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(2));
		this.m_mapid = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_rewardList = <fairygui.GList><any>(this.getChildAt(7));
		this.m_tjFight = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_tjSpeed = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_tjcrit = <fairygui.GTextField><any>(this.getChildAt(10));
		this.m_tjBurst = <fairygui.GTextField><any>(this.getChildAt(11));
		this.m_curFight = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_curSpeed = <fairygui.GTextField><any>(this.getChildAt(13));
		this.m_curCrit = <fairygui.GTextField><any>(this.getChildAt(14));
		this.m_curBrust = <fairygui.GTextField><any>(this.getChildAt(15));
		this.m_startBtn = <fairygui.GButton><any>(this.getChildAt(16));
		this.m_reward = <fairygui.GLabel><any>(this.getChildAt(19));
		this.m_progress = <fairygui.GProgressBar><any>(this.getChildAt(20));
		this.m_cd = <fairygui.GTextField><any>(this.getChildAt(22));
	}
}