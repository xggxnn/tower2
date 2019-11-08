/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ShopBtn extends fairygui.GButton {

	public m_adOrPrice:fairygui.Controller;
	public m_diam:fairygui.GLoader;
	public m_price:fairygui.GTextField;

	public static URL:string = "ui://9u2mjfyi94yva";

	public static createInstance():fui_ShopBtn {
		return <fui_ShopBtn><any>(fairygui.UIPackage.createObject("Shop","ShopBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_adOrPrice = this.getControllerAt(1);
		this.m_diam = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_price = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}