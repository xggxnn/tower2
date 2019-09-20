/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_Selection from "./fui_Selection";

export default class fui_MapItem extends fairygui.GComponent {

	public m_bgStatus:fairygui.Controller;
	public m_bg:fairygui.GLoader;
	public m_s1:fui_Selection;
	public m_s2:fui_Selection;
	public m_s3:fui_Selection;
	public m_s4:fui_Selection;
	public m_s5:fui_Selection;
	public m_s6:fui_Selection;
	public m_s7:fui_Selection;
	public m_s8:fui_Selection;
	public m_s9:fui_Selection;
	public m_s10:fui_Selection;

	public static URL:string = "ui://pdzut3tw11av51w";

	public static createInstance():fui_MapItem {
		return <fui_MapItem><any>(fairygui.UIPackage.createObject("Menus","MapItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bgStatus = this.getControllerAt(0);
		this.m_bg = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_s1 = <fui_Selection><any>(this.getChildAt(2));
		this.m_s2 = <fui_Selection><any>(this.getChildAt(3));
		this.m_s3 = <fui_Selection><any>(this.getChildAt(4));
		this.m_s4 = <fui_Selection><any>(this.getChildAt(5));
		this.m_s5 = <fui_Selection><any>(this.getChildAt(6));
		this.m_s6 = <fui_Selection><any>(this.getChildAt(7));
		this.m_s7 = <fui_Selection><any>(this.getChildAt(8));
		this.m_s8 = <fui_Selection><any>(this.getChildAt(9));
		this.m_s9 = <fui_Selection><any>(this.getChildAt(10));
		this.m_s10 = <fui_Selection><any>(this.getChildAt(11));
	}
}