/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ShopMain extends fairygui.GComponent {

	public m_tab:fairygui.Controller;
	public m_list:fairygui.GList;
	public m_limtBtn:fairygui.GButton;
	public m_cardBtn:fairygui.GButton;
	public m_buyBtn:fairygui.GButton;
	public m_closeBtn:fairygui.GButton;
	public m_gold:fairygui.GLabel;
	public m_diamond:fairygui.GLabel;
	public m_jadeite:fairygui.GLabel;

	public static URL:string = "ui://9u2mjfyibxj00";

	public static createInstance():fui_ShopMain {
		return <fui_ShopMain><any>(fairygui.UIPackage.createObject("Shop","ShopMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_tab = this.getControllerAt(0);
		this.m_list = <fairygui.GList><any>(this.getChildAt(5));
		this.m_limtBtn = <fairygui.GButton><any>(this.getChildAt(6));
		this.m_cardBtn = <fairygui.GButton><any>(this.getChildAt(7));
		this.m_buyBtn = <fairygui.GButton><any>(this.getChildAt(8));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(9));
		this.m_gold = <fairygui.GLabel><any>(this.getChildAt(10));
		this.m_diamond = <fairygui.GLabel><any>(this.getChildAt(11));
		this.m_jadeite = <fairygui.GLabel><any>(this.getChildAt(12));
	}
}