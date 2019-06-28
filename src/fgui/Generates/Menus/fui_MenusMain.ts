/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_Selection from "./fui_Selection";

export default class fui_MenusMain extends fairygui.GComponent {

	public m_backBtn:fairygui.GButton;
	public m_middle:fairygui.GImage;
	public m_select1:fui_Selection;
	public m_select2:fui_Selection;
	public m_select3:fui_Selection;
	public m_select4:fui_Selection;
	public m_select5:fui_Selection;
	public m_select6:fui_Selection;
	public m_select7:fui_Selection;
	public m_select8:fui_Selection;
	public m_select9:fui_Selection;
	public m_select10:fui_Selection;
	public m_select11:fui_Selection;
	public m_select12:fui_Selection;
	public m_select13:fui_Selection;

	public static URL:string = "ui://pdzut3twudz45";

	public static createInstance():fui_MenusMain {
		return <fui_MenusMain><any>(fairygui.UIPackage.createObject("Menus","MenusMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_backBtn = <fairygui.GButton><any>(this.getChildAt(2));
		this.m_middle = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_select1 = <fui_Selection><any>(this.getChildAt(7));
		this.m_select2 = <fui_Selection><any>(this.getChildAt(8));
		this.m_select3 = <fui_Selection><any>(this.getChildAt(9));
		this.m_select4 = <fui_Selection><any>(this.getChildAt(10));
		this.m_select5 = <fui_Selection><any>(this.getChildAt(11));
		this.m_select6 = <fui_Selection><any>(this.getChildAt(12));
		this.m_select7 = <fui_Selection><any>(this.getChildAt(13));
		this.m_select8 = <fui_Selection><any>(this.getChildAt(14));
		this.m_select9 = <fui_Selection><any>(this.getChildAt(15));
		this.m_select10 = <fui_Selection><any>(this.getChildAt(16));
		this.m_select11 = <fui_Selection><any>(this.getChildAt(17));
		this.m_select12 = <fui_Selection><any>(this.getChildAt(18));
		this.m_select13 = <fui_Selection><any>(this.getChildAt(19));
	}
}