/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_GameOver extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_endlessStatus:fairygui.Controller;
	public m_synthBtn:fairygui.GButton;
	public m_gainBtn:fairygui.GButton;
	public m_upLevelBtn:fairygui.GButton;
	public m_upBtn:fairygui.GButton;
	public m_quitBtn:fairygui.GButton;
	public m_reFight:fairygui.GButton;
	public m_rewardList:fairygui.GList;

	public static URL:string = "ui://3jvhuirzngrsn";

	public static createInstance():fui_GameOver {
		return <fui_GameOver><any>(fairygui.UIPackage.createObject("Battle","GameOver"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_endlessStatus = this.getControllerAt(1);
		this.m_synthBtn = <fairygui.GButton><any>(this.getChildAt(14));
		this.m_gainBtn = <fairygui.GButton><any>(this.getChildAt(15));
		this.m_upLevelBtn = <fairygui.GButton><any>(this.getChildAt(16));
		this.m_upBtn = <fairygui.GButton><any>(this.getChildAt(17));
		this.m_quitBtn = <fairygui.GButton><any>(this.getChildAt(19));
		this.m_reFight = <fairygui.GButton><any>(this.getChildAt(20));
		this.m_rewardList = <fairygui.GList><any>(this.getChildAt(22));
	}
}