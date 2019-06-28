/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtns from "./fui_GeneralBtns";

export default class fui_HomeMain extends fairygui.GComponent {

	public m_homeTip:fairygui.GTextField;
	public m_feicui:fairygui.GTextField;
	public m_baoshi:fairygui.GTextField;
	public m_gold:fairygui.GTextField;
	public m_fightBtn:fui_GeneralBtns;
	public m_trialBtn:fui_GeneralBtns;
	public m_seatBtn:fui_GeneralBtns;
	public m_conquestBtn:fui_GeneralBtns;

	public static URL:string = "ui://9xvnuoq0og780";

	public static createInstance():fui_HomeMain {
		return <fui_HomeMain><any>(fairygui.UIPackage.createObject("Home","HomeMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_homeTip = <fairygui.GTextField><any>(this.getChildAt(0));
		this.m_feicui = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_baoshi = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_gold = <fairygui.GTextField><any>(this.getChildAt(3));
		this.m_fightBtn = <fui_GeneralBtns><any>(this.getChildAt(4));
		this.m_trialBtn = <fui_GeneralBtns><any>(this.getChildAt(5));
		this.m_seatBtn = <fui_GeneralBtns><any>(this.getChildAt(6));
		this.m_conquestBtn = <fui_GeneralBtns><any>(this.getChildAt(7));
	}
}