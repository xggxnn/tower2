/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_seatBtn from "./fui_seatBtn";
import fui_fightBtn from "./fui_fightBtn";
import fui_conquestBtn from "./fui_conquestBtn";

export default class fui_HomeMain extends fairygui.GComponent {

	public m_setBtn:fairygui.GButton;
	public m_actBtn:fairygui.GButton;
	public m_shopBtn:fairygui.GButton;
	public m_sortBtn:fairygui.GButton;
	public m_bagBtn:fairygui.GButton;
	public m_gold:fairygui.GLabel;
	public m_diamond:fairygui.GLabel;
	public m_jadeite:fairygui.GLabel;
	public m_seatBtn:fui_seatBtn;
	public m_fightBtn:fui_fightBtn;
	public m_conquestBtn:fui_conquestBtn;

	public static URL:string = "ui://9xvnuoq0og780";

	public static createInstance():fui_HomeMain {
		return <fui_HomeMain><any>(fairygui.UIPackage.createObject("Home","HomeMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_setBtn = <fairygui.GButton><any>(this.getChildAt(1));
		this.m_actBtn = <fairygui.GButton><any>(this.getChildAt(2));
		this.m_shopBtn = <fairygui.GButton><any>(this.getChildAt(3));
		this.m_sortBtn = <fairygui.GButton><any>(this.getChildAt(4));
		this.m_bagBtn = <fairygui.GButton><any>(this.getChildAt(5));
		this.m_gold = <fairygui.GLabel><any>(this.getChildAt(6));
		this.m_diamond = <fairygui.GLabel><any>(this.getChildAt(7));
		this.m_jadeite = <fairygui.GLabel><any>(this.getChildAt(8));
		this.m_seatBtn = <fui_seatBtn><any>(this.getChildAt(9));
		this.m_fightBtn = <fui_fightBtn><any>(this.getChildAt(10));
		this.m_conquestBtn = <fui_conquestBtn><any>(this.getChildAt(11));
	}
}