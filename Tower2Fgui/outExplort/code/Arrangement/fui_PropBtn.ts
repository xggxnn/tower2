/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_FightTip from "./fui_FightTip";

export default class fui_PropBtn extends fairygui.GButton {

	public m_status:fairygui.Controller;
	public m_have:fairygui.Controller;
	public m_infs:fairygui.Controller;
	public m_infAtk:fairygui.Controller;
	public m_infSpeed:fairygui.Controller;
	public m_infCrit:fairygui.Controller;
	public m_infBurst:fairygui.Controller;
	public m_stone:fairygui.GImage;
	public m_quality:fairygui.GLoader;
	public m_sk:fairygui.GLoader;
	public m_race:fairygui.GLoader;
	public m_career:fairygui.GLoader;
	public m_unlock:fairygui.GTextField;
	public m_atktip:fui_FightTip;
	public m_atk:fairygui.GTextField;
	public m_speedtip:fui_FightTip;
	public m_speed:fairygui.GTextField;
	public m_crittip:fui_FightTip;
	public m_crit:fairygui.GTextField;
	public m_bursttip:fui_FightTip;
	public m_burst:fairygui.GTextField;
	public m_t0:fairygui.Transition;
	public m_big:fairygui.Transition;
	public m_small:fairygui.Transition;

	public static URL:string = "ui://9wh71t3fnn3i4";

	public static createInstance():fui_PropBtn {
		return <fui_PropBtn><any>(fairygui.UIPackage.createObject("Arrangement","PropBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_status = this.getControllerAt(1);
		this.m_have = this.getControllerAt(2);
		this.m_infs = this.getControllerAt(3);
		this.m_infAtk = this.getControllerAt(4);
		this.m_infSpeed = this.getControllerAt(5);
		this.m_infCrit = this.getControllerAt(6);
		this.m_infBurst = this.getControllerAt(7);
		this.m_stone = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_sk = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_race = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_career = <fairygui.GLoader><any>(this.getChildAt(7));
		this.m_unlock = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_atktip = <fui_FightTip><any>(this.getChildAt(11));
		this.m_atk = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_speedtip = <fui_FightTip><any>(this.getChildAt(16));
		this.m_speed = <fairygui.GTextField><any>(this.getChildAt(17));
		this.m_crittip = <fui_FightTip><any>(this.getChildAt(21));
		this.m_crit = <fairygui.GTextField><any>(this.getChildAt(22));
		this.m_bursttip = <fui_FightTip><any>(this.getChildAt(26));
		this.m_burst = <fairygui.GTextField><any>(this.getChildAt(27));
		this.m_t0 = this.getTransitionAt(0);
		this.m_big = this.getTransitionAt(1);
		this.m_small = this.getTransitionAt(2);
	}
}