/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_selectionBtn from "./fui_selectionBtn";

export default class fui_Selection extends fairygui.GComponent {

	public m_status:fairygui.Controller;
	public m_selBtn:fui_selectionBtn;
	public m_progress:fairygui.GTextField;
	public m_time:fairygui.GTextField;
	public m_gain:fairygui.GTextField;

	public static URL:string = "ui://pdzut3twngrs13";

	public static createInstance():fui_Selection {
		return <fui_Selection><any>(fairygui.UIPackage.createObject("Menus","Selection"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_status = this.getControllerAt(0);
		this.m_selBtn = <fui_selectionBtn><any>(this.getChildAt(0));
		this.m_progress = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_time = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_gain = <fairygui.GTextField><any>(this.getChildAt(8));
	}
}