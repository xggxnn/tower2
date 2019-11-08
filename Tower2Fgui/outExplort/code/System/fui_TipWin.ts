/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_ScrollTxt from "./fui_ScrollTxt";
import fui_GeneralBtn from "./fui_GeneralBtn";

export default class fui_TipWin extends fairygui.GComponent {

	public m_types:fairygui.Controller;
	public m_tipOrShipin:fairygui.Controller;
	public m_scrollTxt:fui_ScrollTxt;
	public m_ok:fui_GeneralBtn;
	public m_cancel:fui_GeneralBtn;
	public m_tipNum:fairygui.GTextField;
	public m_actBtn:fui_GeneralBtn;
	public m_skipBtn:fui_GeneralBtn;

	public static URL:string = "ui://130tmfxdq080d";

	public static createInstance():fui_TipWin {
		return <fui_TipWin><any>(fairygui.UIPackage.createObject("System","TipWin"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_types = this.getControllerAt(0);
		this.m_tipOrShipin = this.getControllerAt(1);
		this.m_scrollTxt = <fui_ScrollTxt><any>(this.getChildAt(5));
		this.m_ok = <fui_GeneralBtn><any>(this.getChildAt(6));
		this.m_cancel = <fui_GeneralBtn><any>(this.getChildAt(7));
		this.m_tipNum = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_actBtn = <fui_GeneralBtn><any>(this.getChildAt(11));
		this.m_skipBtn = <fui_GeneralBtn><any>(this.getChildAt(12));
	}
}