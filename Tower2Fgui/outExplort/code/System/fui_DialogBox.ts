/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_DialogBox extends fairygui.GLabel {

	public m_bg:fairygui.GImage;
	public m_titles:fairygui.GTextField;

	public static URL:string = "ui://130tmfxdqss353q";

	public static createInstance():fui_DialogBox {
		return <fui_DialogBox><any>(fairygui.UIPackage.createObject("System","DialogBox"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}