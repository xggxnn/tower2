/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_selectionBtn from "./fui_selectionBtn";

export default class fui_Selection extends fairygui.GComponent {

	public m_status:fairygui.Controller;
	public m_starNum:fairygui.Controller;
	public m_forward:fairygui.Controller;
	public m_selBtn:fui_selectionBtn;
	public m_comquality:fairygui.GLoader;
	public m_comMask:fairygui.GImage;
	public m_comtime:fairygui.GTextField;
	public m_mask:fairygui.GImage;
	public m_protime:fairygui.GTextField;
	public m_progress:fairygui.GTextField;

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
		this.m_starNum = this.getControllerAt(1);
		this.m_forward = this.getControllerAt(2);
		this.m_selBtn = <fui_selectionBtn><any>(this.getChildAt(4));
		this.m_comquality = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_comMask = <fairygui.GImage><any>(this.getChildAt(9));
		this.m_comtime = <fairygui.GTextField><any>(this.getChildAt(10));
		this.m_mask = <fairygui.GImage><any>(this.getChildAt(24));
		this.m_protime = <fairygui.GTextField><any>(this.getChildAt(25));
		this.m_progress = <fairygui.GTextField><any>(this.getChildAt(26));
	}
}