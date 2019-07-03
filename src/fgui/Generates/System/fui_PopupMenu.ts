/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_ScrollTxt from "./fui_ScrollTxt";

export default class fui_PopupMenu extends fairygui.GComponent {

	public m_popType:fairygui.Controller;
	public m_tip:fui_ScrollTxt;

	public static URL:string = "ui://130tmfxdnvpox";

	public static createInstance():fui_PopupMenu {
		return <fui_PopupMenu><any>(fairygui.UIPackage.createObject("System","PopupMenu"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_popType = this.getControllerAt(0);
		this.m_tip = <fui_ScrollTxt><any>(this.getChildAt(1));
	}
}