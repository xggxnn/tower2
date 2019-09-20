/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_PopupItem extends fairygui.GButton {

	public m_titles:fairygui.GTextField;

	public static URL:string = "ui://130tmfxdc8j3543";

	public static createInstance():fui_PopupItem {
		return <fui_PopupItem><any>(fairygui.UIPackage.createObject("System","PopupItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}