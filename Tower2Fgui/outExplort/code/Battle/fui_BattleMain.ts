/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_bagua from "./fui_bagua";
import fui_Stone from "./fui_Stone";

export default class fui_BattleMain extends fairygui.GComponent {

	public m_showRange:fairygui.Controller;
	public m_bgStatus:fairygui.Controller;
	public m_bg:fairygui.GLoader;
	public m_bg00:fairygui.GLoader;
	public m_cloud:fairygui.GLoader;
	public m_bagua1:fui_bagua;
	public m_bg3:fairygui.GGroup;
	public m_bagua2:fui_bagua;
	public m_bg1:fairygui.GGroup;
	public m_bagua4:fui_bagua;
	public m_bg2:fairygui.GGroup;
	public m_bagua3:fui_bagua;
	public m_bg4:fairygui.GGroup;
	public m_haloscenes:fairygui.GLoader;
	public m_atkRange:fairygui.GImage;
	public m_shadow:fairygui.GLoader;
	public m_base0:fairygui.GButton;
	public m_stone0:fui_Stone;
	public m_base1:fairygui.GButton;
	public m_stone1:fui_Stone;
	public m_base2:fairygui.GButton;
	public m_base3:fairygui.GButton;
	public m_stone2:fui_Stone;
	public m_base4:fairygui.GButton;
	public m_stone3:fui_Stone;
	public m_base5:fairygui.GButton;
	public m_base6:fairygui.GButton;
	public m_stone4:fui_Stone;
	public m_base7:fairygui.GButton;
	public m_stone5:fui_Stone;
	public m_base8:fairygui.GButton;
	public m_bas:fairygui.GGroup;
	public m_scenes:fairygui.GLoader;
	public m_bloods:fairygui.GLoader;
	public m_effects:fairygui.GLoader;

	public static URL:string = "ui://3jvhuirzn1s05";

	public static createInstance():fui_BattleMain {
		return <fui_BattleMain><any>(fairygui.UIPackage.createObject("Battle","BattleMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_showRange = this.getControllerAt(0);
		this.m_bgStatus = this.getControllerAt(1);
		this.m_bg = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_bg00 = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_cloud = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_bagua1 = <fui_bagua><any>(this.getChildAt(4));
		this.m_bg3 = <fairygui.GGroup><any>(this.getChildAt(5));
		this.m_bagua2 = <fui_bagua><any>(this.getChildAt(7));
		this.m_bg1 = <fairygui.GGroup><any>(this.getChildAt(8));
		this.m_bagua4 = <fui_bagua><any>(this.getChildAt(10));
		this.m_bg2 = <fairygui.GGroup><any>(this.getChildAt(11));
		this.m_bagua3 = <fui_bagua><any>(this.getChildAt(13));
		this.m_bg4 = <fairygui.GGroup><any>(this.getChildAt(14));
		this.m_haloscenes = <fairygui.GLoader><any>(this.getChildAt(15));
		this.m_atkRange = <fairygui.GImage><any>(this.getChildAt(16));
		this.m_shadow = <fairygui.GLoader><any>(this.getChildAt(17));
		this.m_base0 = <fairygui.GButton><any>(this.getChildAt(18));
		this.m_stone0 = <fui_Stone><any>(this.getChildAt(19));
		this.m_base1 = <fairygui.GButton><any>(this.getChildAt(20));
		this.m_stone1 = <fui_Stone><any>(this.getChildAt(21));
		this.m_base2 = <fairygui.GButton><any>(this.getChildAt(22));
		this.m_base3 = <fairygui.GButton><any>(this.getChildAt(23));
		this.m_stone2 = <fui_Stone><any>(this.getChildAt(24));
		this.m_base4 = <fairygui.GButton><any>(this.getChildAt(25));
		this.m_stone3 = <fui_Stone><any>(this.getChildAt(26));
		this.m_base5 = <fairygui.GButton><any>(this.getChildAt(27));
		this.m_base6 = <fairygui.GButton><any>(this.getChildAt(28));
		this.m_stone4 = <fui_Stone><any>(this.getChildAt(29));
		this.m_base7 = <fairygui.GButton><any>(this.getChildAt(30));
		this.m_stone5 = <fui_Stone><any>(this.getChildAt(31));
		this.m_base8 = <fairygui.GButton><any>(this.getChildAt(32));
		this.m_bas = <fairygui.GGroup><any>(this.getChildAt(33));
		this.m_scenes = <fairygui.GLoader><any>(this.getChildAt(34));
		this.m_bloods = <fairygui.GLoader><any>(this.getChildAt(35));
		this.m_effects = <fairygui.GLoader><any>(this.getChildAt(36));
	}
}