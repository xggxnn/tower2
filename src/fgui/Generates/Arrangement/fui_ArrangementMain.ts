/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ArrangementMain extends fairygui.GComponent {

	public m_tab:fairygui.Controller;
	public m_page:fairygui.Controller;
	public m_select1:fairygui.GButton;
	public m_select2:fairygui.GButton;
	public m_select3:fairygui.GButton;
	public m_seatList:fairygui.GList;
	public m_heroList:fairygui.GList;
	public m_removeSeatBtn:fairygui.GButton;
	public m_associationList:fairygui.GList;
	public m_levelUpBtn:fairygui.GButton;
	public m_starUpBtn:fairygui.GButton;
	public m_level:fairygui.GTextField;
	public m_star:fairygui.GTextField;
	public m_gold:fairygui.GLabel;
	public m_jadeite:fairygui.GLabel;
	public m_backBtn:fairygui.GButton;
	public m_qianghuaheroList:fairygui.GList;
	public m_tuijiantip:fairygui.GTextField;
	public m_qianghuaheroList2:fairygui.GList;
	public m_qianghuabackBtn:fairygui.GButton;
	public m_tuijianheroList:fairygui.GList;
	public m_tip:fairygui.GLabel;
	public m_tuijianbackBtn:fairygui.GButton;

	public static URL:string = "ui://9wh71t3fog780";

	public static createInstance():fui_ArrangementMain {
		return <fui_ArrangementMain><any>(fairygui.UIPackage.createObject("Arrangement","ArrangementMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_tab = this.getControllerAt(0);
		this.m_page = this.getControllerAt(1);
		this.m_select1 = <fairygui.GButton><any>(this.getChildAt(20));
		this.m_select2 = <fairygui.GButton><any>(this.getChildAt(21));
		this.m_select3 = <fairygui.GButton><any>(this.getChildAt(22));
		this.m_seatList = <fairygui.GList><any>(this.getChildAt(23));
		this.m_heroList = <fairygui.GList><any>(this.getChildAt(24));
		this.m_removeSeatBtn = <fairygui.GButton><any>(this.getChildAt(25));
		this.m_associationList = <fairygui.GList><any>(this.getChildAt(28));
		this.m_levelUpBtn = <fairygui.GButton><any>(this.getChildAt(29));
		this.m_starUpBtn = <fairygui.GButton><any>(this.getChildAt(30));
		this.m_level = <fairygui.GTextField><any>(this.getChildAt(31));
		this.m_star = <fairygui.GTextField><any>(this.getChildAt(32));
		this.m_gold = <fairygui.GLabel><any>(this.getChildAt(33));
		this.m_jadeite = <fairygui.GLabel><any>(this.getChildAt(34));
		this.m_backBtn = <fairygui.GButton><any>(this.getChildAt(35));
		this.m_qianghuaheroList = <fairygui.GList><any>(this.getChildAt(39));
		this.m_tuijiantip = <fairygui.GTextField><any>(this.getChildAt(42));
		this.m_qianghuaheroList2 = <fairygui.GList><any>(this.getChildAt(44));
		this.m_qianghuabackBtn = <fairygui.GButton><any>(this.getChildAt(45));
		this.m_tuijianheroList = <fairygui.GList><any>(this.getChildAt(51));
		this.m_tip = <fairygui.GLabel><any>(this.getChildAt(54));
		this.m_tuijianbackBtn = <fairygui.GButton><any>(this.getChildAt(55));
	}
}