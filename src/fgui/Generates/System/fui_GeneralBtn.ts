/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_GeneralBtn extends fairygui.GButton {

	public m_bgColor:fairygui.Controller;
	public m_redTip:fairygui.Controller;
	public m_adStatus:fairygui.Controller;

	public static URL:string = "ui://130tmfxdq080m";

	public static createInstance():fui_GeneralBtn {
		return <fui_GeneralBtn><any>(fairygui.UIPackage.createObject("System","GeneralBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bgColor = this.getControllerAt(1);
		this.m_redTip = this.getControllerAt(2);
		this.m_adStatus = this.getControllerAt(3);
	}
}