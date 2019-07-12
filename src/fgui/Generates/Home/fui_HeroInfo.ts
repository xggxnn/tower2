/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtns from "./fui_GeneralBtns";

export default class fui_HeroInfo extends fairygui.GComponent {

	public m_closeBtn:fairygui.GButton;
	public m_heroname:fairygui.GTextField;
	public m_icons:fairygui.GLoader;
	public m_lv:fairygui.GTextField;
	public m_atk:fairygui.GTextField;
	public m_atkspeed:fairygui.GTextField;
	public m_cirt:fairygui.GTextField;
	public m_burst:fairygui.GTextField;
	public m_skillname:fairygui.GTextField;
	public m_race:fairygui.GTextField;
	public m_career:fairygui.GTextField;
	public m_special:fairygui.GTextField;
	public m_lookrace:fui_GeneralBtns;
	public m_lookcareer:fui_GeneralBtns;
	public m_lookspecial:fui_GeneralBtns;
	public m_gainmethod:fui_GeneralBtns;
	public m_star:fairygui.GLoader;

	public static URL:string = "ui://9xvnuoq0nn3i9";

	public static createInstance():fui_HeroInfo {
		return <fui_HeroInfo><any>(fairygui.UIPackage.createObject("Home","HeroInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(4));
		this.m_heroname = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(8));
		this.m_lv = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_atk = <fairygui.GTextField><any>(this.getChildAt(10));
		this.m_atkspeed = <fairygui.GTextField><any>(this.getChildAt(11));
		this.m_cirt = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_burst = <fairygui.GTextField><any>(this.getChildAt(13));
		this.m_skillname = <fairygui.GTextField><any>(this.getChildAt(14));
		this.m_race = <fairygui.GTextField><any>(this.getChildAt(15));
		this.m_career = <fairygui.GTextField><any>(this.getChildAt(16));
		this.m_special = <fairygui.GTextField><any>(this.getChildAt(17));
		this.m_lookrace = <fui_GeneralBtns><any>(this.getChildAt(18));
		this.m_lookcareer = <fui_GeneralBtns><any>(this.getChildAt(19));
		this.m_lookspecial = <fui_GeneralBtns><any>(this.getChildAt(20));
		this.m_gainmethod = <fui_GeneralBtns><any>(this.getChildAt(21));
		this.m_star = <fairygui.GLoader><any>(this.getChildAt(22));
	}
}