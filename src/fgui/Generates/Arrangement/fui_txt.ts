/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_txt extends fairygui.GComponent {

	public m_titles:fairygui.GTextField;

	public static URL:string = "ui://9wh71t3fnn3i8";

	public static createInstance():fui_txt {
		return <fui_txt><any>(fairygui.UIPackage.createObject("Arrangement","txt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(0));
	}
}