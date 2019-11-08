/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_TabBtn extends fairygui.GButton {

	public m_redTip:fairygui.Controller;

	public static URL:string = "ui://130tmfxdj5ctl";

	public static createInstance():fui_TabBtn {
		return <fui_TabBtn><any>(fairygui.UIPackage.createObject("System","TabBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_redTip = this.getControllerAt(1);
	}
}