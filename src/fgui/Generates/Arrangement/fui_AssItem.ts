/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_AssItem extends fairygui.GLabel {

	public m_recommendBtn:fairygui.GButton;

	public static URL:string = "ui://9wh71t3fgc5lm";

	public static createInstance():fui_AssItem {
		return <fui_AssItem><any>(fairygui.UIPackage.createObject("Arrangement","AssItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_recommendBtn = <fairygui.GButton><any>(this.getChildAt(1));
	}
}