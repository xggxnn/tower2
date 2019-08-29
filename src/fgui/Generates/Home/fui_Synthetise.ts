/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtns from "./fui_GeneralBtns";

export default class fui_Synthetise extends fairygui.GComponent {

	public m_quality:fairygui.Controller;
	public m_setSeat:fui_GeneralBtns;
	public m_ok:fui_GeneralBtns;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://9xvnuoq0qrw01v";

	public static createInstance():fui_Synthetise {
		return <fui_Synthetise><any>(fairygui.UIPackage.createObject("Home","Synthetise"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_quality = this.getControllerAt(0);
		this.m_setSeat = <fui_GeneralBtns><any>(this.getChildAt(5));
		this.m_ok = <fui_GeneralBtns><any>(this.getChildAt(6));
		this.m_t0 = this.getTransitionAt(0);
	}
}