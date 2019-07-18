/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_HeadIcon120107 from "./fui_HeadIcon120107";

export default class fui_ItemIcon extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_status:fairygui.Controller;
	public m_quality:fairygui.GLoader;
	public m_headIcon:fui_HeadIcon120107;
	public m_number:fairygui.GTextField;

	public static URL:string = "ui://130tmfxdbxj019";

	public static createInstance():fui_ItemIcon {
		return <fui_ItemIcon><any>(fairygui.UIPackage.createObject("System","ItemIcon"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_status = this.getControllerAt(1);
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_headIcon = <fui_HeadIcon120107><any>(this.getChildAt(1));
		this.m_number = <fairygui.GTextField><any>(this.getChildAt(4));
	}
}