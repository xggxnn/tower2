/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtns from "./fui_GeneralBtns";
import fui_coinLabel from "./fui_coinLabel";

export default class fui_Synthetise extends fairygui.GComponent {

	public m_quality:fairygui.Controller;
	public m_teshu:fairygui.Controller;
	public m_resetAtt:fairygui.Controller;
	public m_heroStatus:fairygui.Controller;
	public m_tipStatus:fairygui.Controller;
	public m_upd:fairygui.Controller;
	public m_showMask:fairygui.Controller;
	public m_skbg:fairygui.GLoader;
	public m_qualitys:fairygui.GLoader;
	public m_career:fairygui.GLoader;
	public m_race:fairygui.GLoader;
	public m_lookcareer:fui_GeneralBtns;
	public m_lookrace:fui_GeneralBtns;
	public m_special:fairygui.GTextField;
	public m_lookspecial:fui_GeneralBtns;
	public m_atktip:fairygui.GComponent;
	public m_atk:fairygui.GTextField;
	public m_upAtk:fairygui.GButton;
	public m_atk2:fairygui.GTextField;
	public m_speedtip:fairygui.GComponent;
	public m_atkspeed:fairygui.GTextField;
	public m_upSpeed:fairygui.GButton;
	public m_atkspeed2:fairygui.GTextField;
	public m_crittip:fairygui.GComponent;
	public m_crit:fairygui.GTextField;
	public m_upCrit:fairygui.GButton;
	public m_cirt2:fairygui.GTextField;
	public m_bursttip:fairygui.GComponent;
	public m_burst:fairygui.GTextField;
	public m_upBurst:fairygui.GButton;
	public m_burst2:fairygui.GTextField;
	public m_skillInf:fairygui.GLabel;
	public m_nam:fairygui.GLoader;
	public m_progress:fairygui.GProgressBar;
	public m_setSeat:fui_GeneralBtns;
	public m_ok:fui_GeneralBtns;
	public m_middle:fairygui.GImage;
	public m_backBtn:fairygui.GButton;
	public m_bg:fairygui.GLoader;
	public m_tipleftBtn:fairygui.GButton;
	public m_tiprightBtn:fairygui.GButton;
	public m_tips:fairygui.GLabel;
	public m_fightTips:fairygui.GComponent;
	public m_suipian:fui_coinLabel;
	public m_cur:fairygui.GTextField;
	public m_pro:fairygui.GTextField;
	public m_maxTip:fairygui.GTextField;
	public m_costTip:fairygui.GTextField;
	public m_closeBtn:fairygui.GButton;
	public m_mask:fairygui.GLoader;
	public m_t4:fairygui.Transition;
	public m_t5:fairygui.Transition;

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
		this.m_teshu = this.getControllerAt(1);
		this.m_resetAtt = this.getControllerAt(2);
		this.m_heroStatus = this.getControllerAt(3);
		this.m_tipStatus = this.getControllerAt(4);
		this.m_upd = this.getControllerAt(5);
		this.m_showMask = this.getControllerAt(6);
		this.m_skbg = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_qualitys = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_career = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_race = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_lookcareer = <fui_GeneralBtns><any>(this.getChildAt(9));
		this.m_lookrace = <fui_GeneralBtns><any>(this.getChildAt(10));
		this.m_special = <fairygui.GTextField><any>(this.getChildAt(11));
		this.m_lookspecial = <fui_GeneralBtns><any>(this.getChildAt(12));
		this.m_atktip = <fairygui.GComponent><any>(this.getChildAt(15));
		this.m_atk = <fairygui.GTextField><any>(this.getChildAt(16));
		this.m_upAtk = <fairygui.GButton><any>(this.getChildAt(17));
		this.m_atk2 = <fairygui.GTextField><any>(this.getChildAt(18));
		this.m_speedtip = <fairygui.GComponent><any>(this.getChildAt(20));
		this.m_atkspeed = <fairygui.GTextField><any>(this.getChildAt(21));
		this.m_upSpeed = <fairygui.GButton><any>(this.getChildAt(22));
		this.m_atkspeed2 = <fairygui.GTextField><any>(this.getChildAt(23));
		this.m_crittip = <fairygui.GComponent><any>(this.getChildAt(25));
		this.m_crit = <fairygui.GTextField><any>(this.getChildAt(26));
		this.m_upCrit = <fairygui.GButton><any>(this.getChildAt(27));
		this.m_cirt2 = <fairygui.GTextField><any>(this.getChildAt(28));
		this.m_bursttip = <fairygui.GComponent><any>(this.getChildAt(30));
		this.m_burst = <fairygui.GTextField><any>(this.getChildAt(31));
		this.m_upBurst = <fairygui.GButton><any>(this.getChildAt(32));
		this.m_burst2 = <fairygui.GTextField><any>(this.getChildAt(33));
		this.m_skillInf = <fairygui.GLabel><any>(this.getChildAt(35));
		this.m_nam = <fairygui.GLoader><any>(this.getChildAt(38));
		this.m_progress = <fairygui.GProgressBar><any>(this.getChildAt(39));
		this.m_setSeat = <fui_GeneralBtns><any>(this.getChildAt(41));
		this.m_ok = <fui_GeneralBtns><any>(this.getChildAt(42));
		this.m_middle = <fairygui.GImage><any>(this.getChildAt(43));
		this.m_backBtn = <fairygui.GButton><any>(this.getChildAt(46));
		this.m_bg = <fairygui.GLoader><any>(this.getChildAt(48));
		this.m_tipleftBtn = <fairygui.GButton><any>(this.getChildAt(54));
		this.m_tiprightBtn = <fairygui.GButton><any>(this.getChildAt(55));
		this.m_tips = <fairygui.GLabel><any>(this.getChildAt(56));
		this.m_fightTips = <fairygui.GComponent><any>(this.getChildAt(57));
		this.m_suipian = <fui_coinLabel><any>(this.getChildAt(58));
		this.m_cur = <fairygui.GTextField><any>(this.getChildAt(63));
		this.m_pro = <fairygui.GTextField><any>(this.getChildAt(64));
		this.m_maxTip = <fairygui.GTextField><any>(this.getChildAt(68));
		this.m_costTip = <fairygui.GTextField><any>(this.getChildAt(71));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(72));
		this.m_mask = <fairygui.GLoader><any>(this.getChildAt(74));
		this.m_t4 = this.getTransitionAt(0);
		this.m_t5 = this.getTransitionAt(1);
	}
}