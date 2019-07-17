/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ShopMain extends fairygui.GComponent {

	public m_list:fairygui.GList;
	public m_closeBtn:fairygui.GButton;

	public static URL:string = "ui://9u2mjfyibxj00";

	public static createInstance():fui_ShopMain {
		return <fui_ShopMain><any>(fairygui.UIPackage.createObject("Shop","ShopMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_list = <fairygui.GList><any>(this.getChildAt(1));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(2));
	}
}