/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_BlackText extends fairygui.GComponent {

	public m_txt:fairygui.GTextField;

	public static URL:string = "ui://130tmfxd9mhx54a";

	public static createInstance():fui_BlackText {
		return <fui_BlackText><any>(fairygui.UIPackage.createObject("System","BlackText"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_txt = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}