/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_SurroundMain extends fairygui.GComponent {

	public m_tab:fairygui.Controller;
	public m_closeBtn:fairygui.GButton;
	public m_tip:fairygui.GTextField;
	public m_signlist:fairygui.GList;
	public m_signBtn:fairygui.GButton;
	public m_kingBtn:fairygui.GButton;
	public m_taskBtn:fairygui.GButton;
	public m_achieveBtn:fairygui.GButton;
	public m_rewardBtn:fairygui.GButton;
	public m_kinglist:fairygui.GList;
	public m_rewardList:fairygui.GList;
	public m_rewardStart:fairygui.GButton;
	public m_taskList:fairygui.GList;

	public static URL:string = "ui://9cap1puybxj00";

	public static createInstance():fui_SurroundMain {
		return <fui_SurroundMain><any>(fairygui.UIPackage.createObject("Surround","SurroundMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_tab = this.getControllerAt(0);
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(4));
		this.m_tip = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_signlist = <fairygui.GList><any>(this.getChildAt(7));
		this.m_signBtn = <fairygui.GButton><any>(this.getChildAt(8));
		this.m_kingBtn = <fairygui.GButton><any>(this.getChildAt(9));
		this.m_taskBtn = <fairygui.GButton><any>(this.getChildAt(10));
		this.m_achieveBtn = <fairygui.GButton><any>(this.getChildAt(11));
		this.m_rewardBtn = <fairygui.GButton><any>(this.getChildAt(12));
		this.m_kinglist = <fairygui.GList><any>(this.getChildAt(17));
		this.m_rewardList = <fairygui.GList><any>(this.getChildAt(18));
		this.m_rewardStart = <fairygui.GButton><any>(this.getChildAt(19));
		this.m_taskList = <fairygui.GList><any>(this.getChildAt(20));
	}
}