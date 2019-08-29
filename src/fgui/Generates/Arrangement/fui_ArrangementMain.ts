/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_PropBtn from "./fui_PropBtn";
import fui_UpBtn from "./fui_UpBtn";

export default class fui_ArrangementMain extends fairygui.GComponent {

	public m_tab:fairygui.Controller;
	public m_page:fairygui.Controller;
	public m_showTitle:fairygui.Controller;
	public m_atkStatus:fairygui.Controller;
	public m_speedStatus:fairygui.Controller;
	public m_critStatus:fairygui.Controller;
	public m_burstStatus:fairygui.Controller;
	public m_seatFight:fairygui.Controller;
	public m_showHideSkill:fairygui.Controller;
	public m_initStatus:fairygui.Controller;
	public m_mask0:fairygui.GLoader;
	public m_hit1:fairygui.GTextField;
	public m_speed1:fairygui.GTextField;
	public m_cirt1:fairygui.GTextField;
	public m_burt1:fairygui.GTextField;
	public m_hit2:fairygui.GTextField;
	public m_speed2:fairygui.GTextField;
	public m_cirt2:fairygui.GTextField;
	public m_burt2:fairygui.GTextField;
	public m_skillName:fairygui.GTextField;
	public m_hitBtn:fairygui.GButton;
	public m_speedBtn:fairygui.GButton;
	public m_critBtn:fairygui.GButton;
	public m_burstBtn:fairygui.GButton;
	public m_skillBtn:fairygui.GButton;
	public m_left:fairygui.GGroup;
	public m_select1:fairygui.GButton;
	public m_select2:fairygui.GButton;
	public m_select3:fairygui.GButton;
	public m_seat0:fui_PropBtn;
	public m_seat1:fui_PropBtn;
	public m_seat2:fui_PropBtn;
	public m_seat3:fui_PropBtn;
	public m_seat4:fui_PropBtn;
	public m_seat5:fui_PropBtn;
	public m_seat6:fui_PropBtn;
	public m_seat7:fui_PropBtn;
	public m_seat8:fui_PropBtn;
	public m_heroList:fairygui.GList;
	public m_middle:fairygui.GGroup;
	public m_associationList:fairygui.GList;
	public m_levelUpBtn:fui_UpBtn;
	public m_starUpBtn:fui_UpBtn;
	public m_level:fairygui.GTextField;
	public m_star:fairygui.GTextField;
	public m_right:fairygui.GGroup;
	public m_gold:fairygui.GLabel;
	public m_jadeite:fairygui.GLabel;
	public m_backBtn:fairygui.GButton;
	public m_titleMap:fairygui.GTextField;
	public m_help:fairygui.GButton;
	public m_mask:fairygui.GLoader;
	public m_fight:fairygui.GButton;
	public m_tuijiantip:fairygui.GTextField;
	public m_qianghuaheroList:fairygui.GList;
	public m_qianghuaheroList2:fairygui.GList;
	public m_qianghuabackBtn:fairygui.GButton;
	public m_tuijianheroList:fairygui.GList;
	public m_tip:fairygui.GLabel;
	public m_tuijianbackBtn:fairygui.GButton;
	public m_skillBg:fairygui.GLoader;
	public m_skillList:fairygui.GList;
	public m_posGold:fairygui.GLoader;
	public m_aniShow:fairygui.Transition;
	public m_aniHide:fairygui.Transition;
	public m_ArrangeTobattle:fairygui.Transition;
	public m_main:fairygui.Transition;

	public static URL:string = "ui://9wh71t3fog780";

	public static createInstance():fui_ArrangementMain {
		return <fui_ArrangementMain><any>(fairygui.UIPackage.createObject("Arrangement","ArrangementMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_tab = this.getControllerAt(0);
		this.m_page = this.getControllerAt(1);
		this.m_showTitle = this.getControllerAt(2);
		this.m_atkStatus = this.getControllerAt(3);
		this.m_speedStatus = this.getControllerAt(4);
		this.m_critStatus = this.getControllerAt(5);
		this.m_burstStatus = this.getControllerAt(6);
		this.m_seatFight = this.getControllerAt(7);
		this.m_showHideSkill = this.getControllerAt(8);
		this.m_initStatus = this.getControllerAt(9);
		this.m_mask0 = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_hit1 = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_speed1 = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_cirt1 = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_burt1 = <fairygui.GTextField><any>(this.getChildAt(10));
		this.m_hit2 = <fairygui.GTextField><any>(this.getChildAt(11));
		this.m_speed2 = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_cirt2 = <fairygui.GTextField><any>(this.getChildAt(13));
		this.m_burt2 = <fairygui.GTextField><any>(this.getChildAt(14));
		this.m_skillName = <fairygui.GTextField><any>(this.getChildAt(16));
		this.m_hitBtn = <fairygui.GButton><any>(this.getChildAt(18));
		this.m_speedBtn = <fairygui.GButton><any>(this.getChildAt(19));
		this.m_critBtn = <fairygui.GButton><any>(this.getChildAt(20));
		this.m_burstBtn = <fairygui.GButton><any>(this.getChildAt(21));
		this.m_skillBtn = <fairygui.GButton><any>(this.getChildAt(22));
		this.m_left = <fairygui.GGroup><any>(this.getChildAt(23));
		this.m_select1 = <fairygui.GButton><any>(this.getChildAt(26));
		this.m_select2 = <fairygui.GButton><any>(this.getChildAt(27));
		this.m_select3 = <fairygui.GButton><any>(this.getChildAt(28));
		this.m_seat0 = <fui_PropBtn><any>(this.getChildAt(29));
		this.m_seat1 = <fui_PropBtn><any>(this.getChildAt(30));
		this.m_seat2 = <fui_PropBtn><any>(this.getChildAt(31));
		this.m_seat3 = <fui_PropBtn><any>(this.getChildAt(32));
		this.m_seat4 = <fui_PropBtn><any>(this.getChildAt(33));
		this.m_seat5 = <fui_PropBtn><any>(this.getChildAt(34));
		this.m_seat6 = <fui_PropBtn><any>(this.getChildAt(35));
		this.m_seat7 = <fui_PropBtn><any>(this.getChildAt(36));
		this.m_seat8 = <fui_PropBtn><any>(this.getChildAt(37));
		this.m_heroList = <fairygui.GList><any>(this.getChildAt(38));
		this.m_middle = <fairygui.GGroup><any>(this.getChildAt(39));
		this.m_associationList = <fairygui.GList><any>(this.getChildAt(44));
		this.m_levelUpBtn = <fui_UpBtn><any>(this.getChildAt(45));
		this.m_starUpBtn = <fui_UpBtn><any>(this.getChildAt(46));
		this.m_level = <fairygui.GTextField><any>(this.getChildAt(47));
		this.m_star = <fairygui.GTextField><any>(this.getChildAt(48));
		this.m_right = <fairygui.GGroup><any>(this.getChildAt(50));
		this.m_gold = <fairygui.GLabel><any>(this.getChildAt(51));
		this.m_jadeite = <fairygui.GLabel><any>(this.getChildAt(52));
		this.m_backBtn = <fairygui.GButton><any>(this.getChildAt(53));
		this.m_titleMap = <fairygui.GTextField><any>(this.getChildAt(56));
		this.m_help = <fairygui.GButton><any>(this.getChildAt(57));
		this.m_mask = <fairygui.GLoader><any>(this.getChildAt(58));
		this.m_fight = <fairygui.GButton><any>(this.getChildAt(59));
		this.m_tuijiantip = <fairygui.GTextField><any>(this.getChildAt(65));
		this.m_qianghuaheroList = <fairygui.GList><any>(this.getChildAt(67));
		this.m_qianghuaheroList2 = <fairygui.GList><any>(this.getChildAt(68));
		this.m_qianghuabackBtn = <fairygui.GButton><any>(this.getChildAt(69));
		this.m_tuijianheroList = <fairygui.GList><any>(this.getChildAt(75));
		this.m_tip = <fairygui.GLabel><any>(this.getChildAt(78));
		this.m_tuijianbackBtn = <fairygui.GButton><any>(this.getChildAt(79));
		this.m_skillBg = <fairygui.GLoader><any>(this.getChildAt(81));
		this.m_skillList = <fairygui.GList><any>(this.getChildAt(82));
		this.m_posGold = <fairygui.GLoader><any>(this.getChildAt(83));
		this.m_aniShow = this.getTransitionAt(0);
		this.m_aniHide = this.getTransitionAt(1);
		this.m_ArrangeTobattle = this.getTransitionAt(2);
		this.m_main = this.getTransitionAt(3);
	}
}