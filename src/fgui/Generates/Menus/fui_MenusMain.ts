/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_MenusMain extends fairygui.GComponent {

	public m_list:fairygui.GList;
	public m_middle:fairygui.GImage;
	public m_backBtn:fairygui.GButton;
	public m_rightBtn:fairygui.GButton;
	public m_leftBtn:fairygui.GButton;

	public static URL:string = "ui://pdzut3twudz45";

	public static createInstance():fui_MenusMain {
		return <fui_MenusMain><any>(fairygui.UIPackage.createObject("Menus","MenusMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_list = <fairygui.GList><any>(this.getChildAt(0));
		this.m_middle = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_backBtn = <fairygui.GButton><any>(this.getChildAt(5));
		this.m_rightBtn = <fairygui.GButton><any>(this.getChildAt(6));
		this.m_leftBtn = <fairygui.GButton><any>(this.getChildAt(7));
	}
}