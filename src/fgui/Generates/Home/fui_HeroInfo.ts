/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtns from "./fui_GeneralBtns";

export default class fui_HeroInfo extends fairygui.GComponent {

	public m_teshu:fairygui.Controller;
	public m_up:fairygui.Controller;
	public m_bg:fairygui.GLoader;
	public m_closeBtn:fairygui.GButton;
	public m_heroname:fairygui.GTextField;
	public m_icons:fairygui.GLoader;
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
	public m_help:fairygui.GButton;
	public m_upQuality:fui_GeneralBtns;
	public m_upAtk:fui_GeneralBtns;
	public m_upSpeed:fui_GeneralBtns;
	public m_upCrit:fui_GeneralBtns;
	public m_upBurst:fui_GeneralBtns;

	public static URL:string = "ui://9xvnuoq0nn3i9";

	public static createInstance():fui_HeroInfo {
		return <fui_HeroInfo><any>(fairygui.UIPackage.createObject("Home","HeroInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_teshu = this.getControllerAt(0);
		this.m_up = this.getControllerAt(1);
		this.m_bg = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(4));
		this.m_heroname = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(8));
		this.m_atk = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_atkspeed = <fairygui.GTextField><any>(this.getChildAt(10));
		this.m_cirt = <fairygui.GTextField><any>(this.getChildAt(11));
		this.m_burst = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_skillname = <fairygui.GTextField><any>(this.getChildAt(13));
		this.m_race = <fairygui.GTextField><any>(this.getChildAt(14));
		this.m_career = <fairygui.GTextField><any>(this.getChildAt(15));
		this.m_special = <fairygui.GTextField><any>(this.getChildAt(16));
		this.m_lookrace = <fui_GeneralBtns><any>(this.getChildAt(17));
		this.m_lookcareer = <fui_GeneralBtns><any>(this.getChildAt(18));
		this.m_lookspecial = <fui_GeneralBtns><any>(this.getChildAt(19));
		this.m_gainmethod = <fui_GeneralBtns><any>(this.getChildAt(20));
		this.m_star = <fairygui.GLoader><any>(this.getChildAt(21));
		this.m_help = <fairygui.GButton><any>(this.getChildAt(22));
		this.m_upQuality = <fui_GeneralBtns><any>(this.getChildAt(23));
		this.m_upAtk = <fui_GeneralBtns><any>(this.getChildAt(24));
		this.m_upSpeed = <fui_GeneralBtns><any>(this.getChildAt(25));
		this.m_upCrit = <fui_GeneralBtns><any>(this.getChildAt(26));
		this.m_upBurst = <fui_GeneralBtns><any>(this.getChildAt(27));
	}
}