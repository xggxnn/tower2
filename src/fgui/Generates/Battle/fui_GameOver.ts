/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_GameOver extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_getGoldBtn:fairygui.GButton;
	public m_synthBtn:fairygui.GButton;
	public m_gainBtn:fairygui.GButton;
	public m_upLevelBtn:fairygui.GButton;
	public m_upBtn:fairygui.GButton;
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
		this.m_getGoldBtn = <fairygui.GButton><any>(this.getChildAt(7));
		this.m_synthBtn = <fairygui.GButton><any>(this.getChildAt(8));
		this.m_gainBtn = <fairygui.GButton><any>(this.getChildAt(9));
		this.m_upLevelBtn = <fairygui.GButton><any>(this.getChildAt(10));
		this.m_upBtn = <fairygui.GButton><any>(this.getChildAt(18));
		this.m_rewardList = <fairygui.GList><any>(this.getChildAt(19));
	}
}