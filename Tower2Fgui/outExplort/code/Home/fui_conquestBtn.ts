/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_conquestBtn extends fairygui.GButton {

	public m_tip1:fairygui.GRichTextField;
	public m_tip2:fairygui.GRichTextField;

	public static URL:string = "ui://9xvnuoq0j5ct1r";

	public static createInstance():fui_conquestBtn {
		return <fui_conquestBtn><any>(fairygui.UIPackage.createObject("Home","conquestBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_tip1 = <fairygui.GRichTextField><any>(this.getChildAt(4));
		this.m_tip2 = <fairygui.GRichTextField><any>(this.getChildAt(5));
	}
}