/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeroIcon extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_headIcon:fairygui.GLabel;
	public m_number:fairygui.GTextField;

	public static URL:string = "ui://pdzut3twngrsz";

	public static createInstance():fui_HeroIcon {
		return <fui_HeroIcon><any>(fairygui.UIPackage.createObject("Menus","HeroIcon"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_headIcon = <fairygui.GLabel><any>(this.getChildAt(1));
		this.m_number = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}