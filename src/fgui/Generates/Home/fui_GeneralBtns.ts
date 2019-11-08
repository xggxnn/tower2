/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_GeneralBtns extends fairygui.GButton {

	public m_bgColor:fairygui.Controller;
	public m_redTip:fairygui.Controller;

	public static URL:string = "ui://9xvnuoq0og7810";

	public static createInstance():fui_GeneralBtns {
		return <fui_GeneralBtns><any>(fairygui.UIPackage.createObject("Home","GeneralBtns"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bgColor = this.getControllerAt(1);
		this.m_redTip = this.getControllerAt(2);
	}
}