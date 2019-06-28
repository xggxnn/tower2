/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_Stone from "./fui_Stone";

export default class fui_BattleMain extends fairygui.GComponent {

	public m_base0:fairygui.GComponent;
	public m_stone0:fui_Stone;
	public m_base1:fairygui.GComponent;
	public m_stone1:fui_Stone;
	public m_base2:fairygui.GComponent;
	public m_base3:fairygui.GComponent;
	public m_stone2:fui_Stone;
	public m_base4:fairygui.GComponent;
	public m_stone3:fui_Stone;
	public m_base5:fairygui.GComponent;
	public m_base6:fairygui.GComponent;
	public m_stone4:fui_Stone;
	public m_base7:fairygui.GComponent;
	public m_stone5:fui_Stone;
	public m_base8:fairygui.GComponent;
	public m_scenes:fairygui.GLoader;
	public m_bloods:fairygui.GLoader;

	public static URL:string = "ui://3jvhuirzn1s05";

	public static createInstance():fui_BattleMain {
		return <fui_BattleMain><any>(fairygui.UIPackage.createObject("Battle","BattleMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_base0 = <fairygui.GComponent><any>(this.getChildAt(1));
		this.m_stone0 = <fui_Stone><any>(this.getChildAt(2));
		this.m_base1 = <fairygui.GComponent><any>(this.getChildAt(3));
		this.m_stone1 = <fui_Stone><any>(this.getChildAt(4));
		this.m_base2 = <fairygui.GComponent><any>(this.getChildAt(5));
		this.m_base3 = <fairygui.GComponent><any>(this.getChildAt(6));
		this.m_stone2 = <fui_Stone><any>(this.getChildAt(7));
		this.m_base4 = <fairygui.GComponent><any>(this.getChildAt(8));
		this.m_stone3 = <fui_Stone><any>(this.getChildAt(9));
		this.m_base5 = <fairygui.GComponent><any>(this.getChildAt(10));
		this.m_base6 = <fairygui.GComponent><any>(this.getChildAt(11));
		this.m_stone4 = <fui_Stone><any>(this.getChildAt(12));
		this.m_base7 = <fairygui.GComponent><any>(this.getChildAt(13));
		this.m_stone5 = <fui_Stone><any>(this.getChildAt(14));
		this.m_base8 = <fairygui.GComponent><any>(this.getChildAt(15));
		this.m_scenes = <fairygui.GLoader><any>(this.getChildAt(24));
		this.m_bloods = <fairygui.GLoader><any>(this.getChildAt(25));
	}
}