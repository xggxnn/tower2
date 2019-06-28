/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_ScrollTxt from "./fui_ScrollTxt";
import fui_OkBtn from "./fui_OkBtn";

export default class fui_TipWin extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_scrollTxt:fui_ScrollTxt;
	public m_list:fairygui.GList;
	public m_ok:fui_OkBtn;

	public static URL:string = "ui://130tmfxdq080d";

	public static createInstance():fui_TipWin {
		return <fui_TipWin><any>(fairygui.UIPackage.createObject("System","TipWin"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_scrollTxt = <fui_ScrollTxt><any>(this.getChildAt(1));
		this.m_list = <fairygui.GList><any>(this.getChildAt(2));
		this.m_ok = <fui_OkBtn><any>(this.getChildAt(3));
	}
}