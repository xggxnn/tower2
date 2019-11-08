/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_EndlessItem extends fairygui.GComponent {

	public m_colorTab:fairygui.Controller;
	public m_sort:fairygui.GTextField;
	public m_icons:fairygui.GLoader;
	public m_nam:fairygui.GTextField;
	public m_waves:fairygui.GTextField;

	public static URL:string = "ui://9cap1puyeaol10";

	public static createInstance():fui_EndlessItem {
		return <fui_EndlessItem><any>(fairygui.UIPackage.createObject("Surround","EndlessItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_colorTab = this.getControllerAt(0);
		this.m_sort = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_nam = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_waves = <fairygui.GTextField><any>(this.getChildAt(5));
	}
}