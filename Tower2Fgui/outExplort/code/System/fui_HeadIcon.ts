/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeadIcon extends fairygui.GLabel {

	public m_icons:fairygui.GLoader;

	public static URL:string = "ui://130tmfxdngrs10";

	public static createInstance():fui_HeadIcon {
		return <fui_HeadIcon><any>(fairygui.UIPackage.createObject("System","HeadIcon"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}