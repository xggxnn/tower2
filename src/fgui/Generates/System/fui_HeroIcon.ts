/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_HeadIcon from "./fui_HeadIcon";

export default class fui_HeroIcon extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_quality:fairygui.GLoader;
	public m_headIcon:fui_HeadIcon;
	public m_number:fairygui.GTextField;

	public static URL:string = "ui://130tmfxdbxj018";

	public static createInstance():fui_HeroIcon {
		return <fui_HeroIcon><any>(fairygui.UIPackage.createObject("System","HeroIcon"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_headIcon = <fui_HeadIcon><any>(this.getChildAt(1));
		this.m_number = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}