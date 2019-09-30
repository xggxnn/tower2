/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtns from "./fui_GeneralBtns";

export default class fui_Synthetise extends fairygui.GComponent {

	public m_quality:fairygui.Controller;
	public m_skbg:fairygui.GLoader;
	public m_atk:fairygui.GTextField;
	public m_atkspeed:fairygui.GTextField;
	public m_cirt:fairygui.GTextField;
	public m_burst:fairygui.GTextField;
	public m_atk2:fairygui.GTextField;
	public m_atkspeed2:fairygui.GTextField;
	public m_cirt2:fairygui.GTextField;
	public m_burst2:fairygui.GTextField;
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
		this.m_skbg = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_atk = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_atkspeed = <fairygui.GTextField><any>(this.getChildAt(3));
		this.m_cirt = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_burst = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_atk2 = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_atkspeed2 = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_cirt2 = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_burst2 = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_setSeat = <fui_GeneralBtns><any>(this.getChildAt(12));
		this.m_ok = <fui_GeneralBtns><any>(this.getChildAt(13));
		this.m_t0 = this.getTransitionAt(0);
	}
}