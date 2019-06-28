/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_CloseBtn extends fairygui.GButton {

	public m_bg:fairygui.GImage;

	public static URL:string = "ui://130tmfxdq080l";

	public static createInstance():fui_CloseBtn {
		return <fui_CloseBtn><any>(fairygui.UIPackage.createObject("System","CloseBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
	}
}