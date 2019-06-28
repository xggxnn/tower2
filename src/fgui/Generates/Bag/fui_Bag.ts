/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Bag extends fairygui.GComponent {

	public m_title:fairygui.GTextField;

	public static URL:string = "ui://uf1oi85qepyr4";

	public static createInstance():fui_Bag {
		return <fui_Bag><any>(fairygui.UIPackage.createObject("Bag","Bag"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_title = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}