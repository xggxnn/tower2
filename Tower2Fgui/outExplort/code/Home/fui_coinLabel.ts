/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_coinLabel extends fairygui.GLabel {

	public m_bg:fairygui.GImage;

	public static URL:string = "ui://9xvnuoq0j5ct1k";

	public static createInstance():fui_coinLabel {
		return <fui_coinLabel><any>(fairygui.UIPackage.createObject("Home","coinLabel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
	}
}