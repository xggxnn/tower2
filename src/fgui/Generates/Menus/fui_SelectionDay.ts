/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_selectionBtn from "./fui_selectionBtn";

export default class fui_SelectionDay extends fairygui.GComponent {

	public m_status:fairygui.Controller;
	public m_starNum:fairygui.Controller;
	public m_grayStatus:fairygui.Controller;
	public m_selBtn:fui_selectionBtn;
	public m_comquality:fairygui.GLoader;
	public m_comMask:fairygui.GImage;
	public m_comtime:fairygui.GTextField;
	public m_mask:fairygui.GImage;
	public m_protime:fairygui.GTextField;
	public m_progress:fairygui.GTextField;

	public static URL:string = "ui://pdzut3twlljr52a";

	public static createInstance():fui_SelectionDay {
		return <fui_SelectionDay><any>(fairygui.UIPackage.createObject("Menus","SelectionDay"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_status = this.getControllerAt(0);
		this.m_starNum = this.getControllerAt(1);
		this.m_grayStatus = this.getControllerAt(2);
		this.m_selBtn = <fui_selectionBtn><any>(this.getChildAt(0));
		this.m_comquality = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_comMask = <fairygui.GImage><any>(this.getChildAt(6));
		this.m_comtime = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_mask = <fairygui.GImage><any>(this.getChildAt(21));
		this.m_protime = <fairygui.GTextField><any>(this.getChildAt(22));
		this.m_progress = <fairygui.GTextField><any>(this.getChildAt(23));
	}
}