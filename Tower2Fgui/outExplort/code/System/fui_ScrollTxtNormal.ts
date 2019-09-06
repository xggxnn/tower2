/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ScrollTxtNormal extends fairygui.GLabel {

	public m_gloader:fairygui.GLoader;

	public static URL:string = "ui://130tmfxdh5p91z";

	public static createInstance():fui_ScrollTxtNormal {
		return <fui_ScrollTxtNormal><any>(fairygui.UIPackage.createObject("System","ScrollTxtNormal"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_gloader = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}