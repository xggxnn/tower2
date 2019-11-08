/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtn from "./fui_GeneralBtn";

export default class fui_Exchange extends fairygui.GComponent {

	public m_tipsss:fairygui.GTextField;
	public m_tip:fairygui.GTextField;
	public m_txt:fairygui.GTextInput;
	public m_ok:fui_GeneralBtn;
	public m_cancel:fairygui.GButton;

	public static URL:string = "ui://130tmfxdbcle54b";

	public static createInstance():fui_Exchange {
		return <fui_Exchange><any>(fairygui.UIPackage.createObject("System","Exchange"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_tipsss = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_tip = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_txt = <fairygui.GTextInput><any>(this.getChildAt(12));
		this.m_ok = <fui_GeneralBtn><any>(this.getChildAt(13));
		this.m_cancel = <fairygui.GButton><any>(this.getChildAt(14));
	}
}