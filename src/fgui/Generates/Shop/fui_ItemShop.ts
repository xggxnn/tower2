/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ItemShop extends fairygui.GComponent {

	public m_quality:fairygui.GLoader;
	public m_heroName:fairygui.GTextField;
	public m_buyPrice:fairygui.GTextField;
	public m_checkBtn:fairygui.GButton;

	public static URL:string = "ui://9u2mjfyibxj01";

	public static createInstance():fui_ItemShop {
		return <fui_ItemShop><any>(fairygui.UIPackage.createObject("Shop","ItemShop"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_heroName = <fairygui.GTextField><any>(this.getChildAt(3));
		this.m_buyPrice = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_checkBtn = <fairygui.GButton><any>(this.getChildAt(5));
	}
}