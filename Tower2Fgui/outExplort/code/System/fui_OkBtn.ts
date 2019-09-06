/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_OkBtn extends fairygui.GButton {

	public m_bg:fairygui.GImage;

	public static URL:string = "ui://130tmfxdq080e";

	public static createInstance():fui_OkBtn {
		return <fui_OkBtn><any>(fairygui.UIPackage.createObject("System","OkBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
	}
}