/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_UpBtn extends fairygui.GButton {

	public m_bg:fairygui.Controller;
	public m_titles:fairygui.GTextField;
	public m_icons:fairygui.GLoader;
	public m_counts:fairygui.GTextField;

	public static URL:string = "ui://9wh71t3fczuw2d";

	public static createInstance():fui_UpBtn {
		return <fui_UpBtn><any>(fairygui.UIPackage.createObject("Arrangement","UpBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = this.getControllerAt(0);
		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(4));
		this.m_counts = <fairygui.GTextField><any>(this.getChildAt(5));
	}
}