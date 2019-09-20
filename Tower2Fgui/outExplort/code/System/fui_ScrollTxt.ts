/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ScrollTxt extends fairygui.GLabel {

	public m_gloader:fairygui.GLoader;

	public static URL:string = "ui://130tmfxdq080f";

	public static createInstance():fui_ScrollTxt {
		return <fui_ScrollTxt><any>(fairygui.UIPackage.createObject("System","ScrollTxt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_gloader = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}