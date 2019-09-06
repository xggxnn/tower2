/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Help extends fairygui.GButton {

	public m_bg:fairygui.GImage;

	public static URL:string = "ui://130tmfxdqrw053u";

	public static createInstance():fui_Help {
		return <fui_Help><any>(fairygui.UIPackage.createObject("System","Help"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
	}
}