/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_KingItem extends fairygui.GComponent {

	public m_lock:fairygui.Controller;
	public m_item1Control:fairygui.Controller;
	public m_item2Control:fairygui.Controller;
	public m_show:fairygui.Controller;
	public m_level:fairygui.GTextField;
	public m_item1:fairygui.GComponent;
	public m_item2:fairygui.GComponent;
	public m_r1:fairygui.GImage;
	public m_r2:fairygui.GImage;
	public m_btn1:fairygui.GButton;
	public m_btn2:fairygui.GButton;

	public static URL:string = "ui://9cap1puyj8q25";

	public static createInstance():fui_KingItem {
		return <fui_KingItem><any>(fairygui.UIPackage.createObject("Surround","KingItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_lock = this.getControllerAt(0);
		this.m_item1Control = this.getControllerAt(1);
		this.m_item2Control = this.getControllerAt(2);
		this.m_show = this.getControllerAt(3);
		this.m_level = <fairygui.GTextField><any>(this.getChildAt(3));
		this.m_item1 = <fairygui.GComponent><any>(this.getChildAt(4));
		this.m_item2 = <fairygui.GComponent><any>(this.getChildAt(5));
		this.m_r1 = <fairygui.GImage><any>(this.getChildAt(7));
		this.m_r2 = <fairygui.GImage><any>(this.getChildAt(8));
		this.m_btn1 = <fairygui.GButton><any>(this.getChildAt(9));
		this.m_btn2 = <fairygui.GButton><any>(this.getChildAt(10));
	}
}