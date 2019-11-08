/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_boxItem extends fairygui.GComponent {

	public m_boxStatus:fairygui.Controller;
	public m_gainStatus:fairygui.Controller;
	public m_gold:fairygui.GLabel;
	public m_diamond:fairygui.GLabel;
	public m_jadeite:fairygui.GLabel;
	public m_num:fairygui.GTextField;
	public m_dealyTime:fairygui.GTextField;
	public m_gainBtn:fairygui.GButton;

	public static URL:string = "ui://9cap1puy94yvi";

	public static createInstance():fui_boxItem {
		return <fui_boxItem><any>(fairygui.UIPackage.createObject("Surround","boxItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_boxStatus = this.getControllerAt(0);
		this.m_gainStatus = this.getControllerAt(1);
		this.m_gold = <fairygui.GLabel><any>(this.getChildAt(3));
		this.m_diamond = <fairygui.GLabel><any>(this.getChildAt(4));
		this.m_jadeite = <fairygui.GLabel><any>(this.getChildAt(5));
		this.m_num = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_dealyTime = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_gainBtn = <fairygui.GButton><any>(this.getChildAt(9));
	}
}