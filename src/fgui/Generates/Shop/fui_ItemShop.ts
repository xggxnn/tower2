/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ItemShop extends fairygui.GComponent {

	public m_type:fairygui.Controller;
	public m_limNum:fairygui.Controller;
	public m_posStatus:fairygui.Controller;
	public m_quality:fairygui.GLoader;
	public m_pic:fairygui.GLabel;
	public m_heroname:fairygui.GLoader;
	public m_price:fairygui.GTextField;
	public m_buyPrice:fairygui.GTextField;
	public m_picBtn:fairygui.GButton;
	public m_checkBtn:fairygui.GButton;
	public m_freeBuy:fairygui.GButton;

	public static URL:string = "ui://9u2mjfyibxj01";

	public static createInstance():fui_ItemShop {
		return <fui_ItemShop><any>(fairygui.UIPackage.createObject("Shop","ItemShop"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_type = this.getControllerAt(0);
		this.m_limNum = this.getControllerAt(1);
		this.m_posStatus = this.getControllerAt(2);
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_pic = <fairygui.GLabel><any>(this.getChildAt(4));
		this.m_heroname = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_price = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_buyPrice = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_picBtn = <fairygui.GButton><any>(this.getChildAt(8));
		this.m_checkBtn = <fairygui.GButton><any>(this.getChildAt(9));
		this.m_freeBuy = <fairygui.GButton><any>(this.getChildAt(10));
	}
}