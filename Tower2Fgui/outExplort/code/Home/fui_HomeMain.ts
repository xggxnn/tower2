/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_coinLabel from "./fui_coinLabel";
import fui_fightBtn from "./fui_fightBtn";
import fui_seatBtn from "./fui_seatBtn";
import fui_conquestBtn from "./fui_conquestBtn";

export default class fui_HomeMain extends fairygui.GComponent {

	public m_dayPass:fairygui.Controller;
	public m_showMask:fairygui.Controller;
	public m_gold:fui_coinLabel;
	public m_diamond:fui_coinLabel;
	public m_jadeite:fui_coinLabel;
	public m_fightBtn:fui_fightBtn;
	public m_seatBtn:fui_seatBtn;
	public m_dayBtn:fairygui.GButton;
	public m_line0:fairygui.GImage;
	public m_line1:fairygui.GImage;
	public m_line2:fairygui.GImage;
	public m_line3:fairygui.GImage;
	public m_line4:fairygui.GImage;
	public m_line5:fairygui.GImage;
	public m_line6:fairygui.GImage;
	public m_setBtn:fairygui.GButton;
	public m_freeBtn:fairygui.GButton;
	public m_boxBtn:fairygui.GButton;
	public m_sortBtn:fairygui.GButton;
	public m_bagBtn:fairygui.GButton;
	public m_actBtn:fairygui.GButton;
	public m_shopBtn:fairygui.GButton;
	public m_heroBtn:fairygui.GButton;
	public m_conquestBtn:fui_conquestBtn;
	public m_testBtn:fairygui.GButton;
	public m_WishingBtn:fairygui.GButton;
	public m_kefuBtn:fairygui.GButton;
	public m_friendGainBtn:fairygui.GButton;
	public m_endlessBtn:fairygui.GButton;
	public m_maskBtn:fairygui.GButton;

	public static URL:string = "ui://9xvnuoq0og780";

	public static createInstance():fui_HomeMain {
		return <fui_HomeMain><any>(fairygui.UIPackage.createObject("Home","HomeMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_dayPass = this.getControllerAt(0);
		this.m_showMask = this.getControllerAt(1);
		this.m_gold = <fui_coinLabel><any>(this.getChildAt(9));
		this.m_diamond = <fui_coinLabel><any>(this.getChildAt(10));
		this.m_jadeite = <fui_coinLabel><any>(this.getChildAt(11));
		this.m_fightBtn = <fui_fightBtn><any>(this.getChildAt(12));
		this.m_seatBtn = <fui_seatBtn><any>(this.getChildAt(13));
		this.m_dayBtn = <fairygui.GButton><any>(this.getChildAt(14));
		this.m_line0 = <fairygui.GImage><any>(this.getChildAt(17));
		this.m_line1 = <fairygui.GImage><any>(this.getChildAt(18));
		this.m_line2 = <fairygui.GImage><any>(this.getChildAt(19));
		this.m_line3 = <fairygui.GImage><any>(this.getChildAt(20));
		this.m_line4 = <fairygui.GImage><any>(this.getChildAt(21));
		this.m_line5 = <fairygui.GImage><any>(this.getChildAt(22));
		this.m_line6 = <fairygui.GImage><any>(this.getChildAt(23));
		this.m_setBtn = <fairygui.GButton><any>(this.getChildAt(24));
		this.m_freeBtn = <fairygui.GButton><any>(this.getChildAt(25));
		this.m_boxBtn = <fairygui.GButton><any>(this.getChildAt(26));
		this.m_sortBtn = <fairygui.GButton><any>(this.getChildAt(27));
		this.m_bagBtn = <fairygui.GButton><any>(this.getChildAt(28));
		this.m_actBtn = <fairygui.GButton><any>(this.getChildAt(29));
		this.m_shopBtn = <fairygui.GButton><any>(this.getChildAt(30));
		this.m_heroBtn = <fairygui.GButton><any>(this.getChildAt(31));
		this.m_conquestBtn = <fui_conquestBtn><any>(this.getChildAt(32));
		this.m_testBtn = <fairygui.GButton><any>(this.getChildAt(33));
		this.m_WishingBtn = <fairygui.GButton><any>(this.getChildAt(34));
		this.m_kefuBtn = <fairygui.GButton><any>(this.getChildAt(36));
		this.m_friendGainBtn = <fairygui.GButton><any>(this.getChildAt(37));
		this.m_endlessBtn = <fairygui.GButton><any>(this.getChildAt(38));
		this.m_maskBtn = <fairygui.GButton><any>(this.getChildAt(39));
	}
}