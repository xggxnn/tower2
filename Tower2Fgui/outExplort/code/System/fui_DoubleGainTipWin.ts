/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtn from "./fui_GeneralBtn";

export default class fui_DoubleGainTipWin extends fairygui.GComponent {

	public m_list:fairygui.GList;
	public m_ok:fui_GeneralBtn;
	public m_cancel:fui_GeneralBtn;
	public m_close:fairygui.GButton;

	public static URL:string = "ui://130tmfxd94yv54f";

	public static createInstance():fui_DoubleGainTipWin {
		return <fui_DoubleGainTipWin><any>(fairygui.UIPackage.createObject("System","DoubleGainTipWin"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_list = <fairygui.GList><any>(this.getChildAt(8));
		this.m_ok = <fui_GeneralBtn><any>(this.getChildAt(9));
		this.m_cancel = <fui_GeneralBtn><any>(this.getChildAt(10));
		this.m_close = <fairygui.GButton><any>(this.getChildAt(11));
	}
}