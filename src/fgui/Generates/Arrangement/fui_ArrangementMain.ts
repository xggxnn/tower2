/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ArrangementMain extends fairygui.GComponent {

	public m_titles:fairygui.GTextField;
	public m_select1:fairygui.GButton;
	public m_select2:fairygui.GButton;
	public m_select3:fairygui.GButton;
	public m_seatList:fairygui.GList;
	public m_heroList:fairygui.GList;
	public m_backBtn:fairygui.GButton;
	public m_level:fairygui.GTextField;
	public m_star:fairygui.GTextField;
	public m_levelUpBtn:fairygui.GButton;
	public m_starUpBtn:fairygui.GButton;
	public m_associationList:fairygui.GList;
	public m_recommendPos:fairygui.GLoader;

	public static URL:string = "ui://9wh71t3fog780";

	public static createInstance():fui_ArrangementMain {
		return <fui_ArrangementMain><any>(fairygui.UIPackage.createObject("Arrangement","ArrangementMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_select1 = <fairygui.GButton><any>(this.getChildAt(2));
		this.m_select2 = <fairygui.GButton><any>(this.getChildAt(3));
		this.m_select3 = <fairygui.GButton><any>(this.getChildAt(4));
		this.m_seatList = <fairygui.GList><any>(this.getChildAt(5));
		this.m_heroList = <fairygui.GList><any>(this.getChildAt(6));
		this.m_backBtn = <fairygui.GButton><any>(this.getChildAt(7));
		this.m_level = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_star = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_levelUpBtn = <fairygui.GButton><any>(this.getChildAt(10));
		this.m_starUpBtn = <fairygui.GButton><any>(this.getChildAt(11));
		this.m_associationList = <fairygui.GList><any>(this.getChildAt(15));
		this.m_recommendPos = <fairygui.GLoader><any>(this.getChildAt(16));
	}
}