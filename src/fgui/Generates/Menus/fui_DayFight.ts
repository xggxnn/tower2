/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_SelectionDay from "./fui_SelectionDay";

export default class fui_DayFight extends fairygui.GComponent {

	public m_bg:fairygui.GLoader;
	public m_s1:fui_SelectionDay;
	public m_s2:fui_SelectionDay;
	public m_s3:fui_SelectionDay;
	public m_s4:fui_SelectionDay;
	public m_s5:fui_SelectionDay;

	public static URL:string = "ui://pdzut3twlljr528";

	public static createInstance():fui_DayFight {
		return <fui_DayFight><any>(fairygui.UIPackage.createObject("Menus","DayFight"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_s1 = <fui_SelectionDay><any>(this.getChildAt(5));
		this.m_s2 = <fui_SelectionDay><any>(this.getChildAt(6));
		this.m_s3 = <fui_SelectionDay><any>(this.getChildAt(7));
		this.m_s4 = <fui_SelectionDay><any>(this.getChildAt(8));
		this.m_s5 = <fui_SelectionDay><any>(this.getChildAt(9));
	}
}