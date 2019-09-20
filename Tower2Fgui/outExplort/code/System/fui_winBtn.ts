/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_winBtn extends fairygui.GButton {

	public m_icons:fairygui.GLoader;

	public static URL:string = "ui://130tmfxdngrsz";

	public static createInstance():fui_winBtn {
		return <fui_winBtn><any>(fairygui.UIPackage.createObject("System","winBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}