/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_SurroundMain extends fairygui.GComponent {

	public m_closeBtn:fairygui.GButton;
	public m_tip:fairygui.GTextField;
	public m_list:fairygui.GList;

	public static URL:string = "ui://9cap1puybxj00";

	public static createInstance():fui_SurroundMain {
		return <fui_SurroundMain><any>(fairygui.UIPackage.createObject("Surround","SurroundMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(4));
		this.m_tip = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_list = <fairygui.GList><any>(this.getChildAt(6));
	}
}