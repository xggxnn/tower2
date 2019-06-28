/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_PopupMenuitem extends fairygui.GButton {

	public m_checked:fairygui.Controller;

	public static URL:string = "ui://130tmfxdnvpow";

	public static createInstance():fui_PopupMenuitem {
		return <fui_PopupMenuitem><any>(fairygui.UIPackage.createObject("System","PopupMenuitem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_checked = this.getControllerAt(1);
	}
}