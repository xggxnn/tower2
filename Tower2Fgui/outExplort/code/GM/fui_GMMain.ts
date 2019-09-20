/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_GMMain extends fairygui.GComponent {

	public m_list:fairygui.GList;
	public m_closeBtn:fairygui.GButton;

	public static URL:string = "ui://krkxlzm9j5ct0";

	public static createInstance():fui_GMMain {
		return <fui_GMMain><any>(fairygui.UIPackage.createObject("GM","GMMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_list = <fairygui.GList><any>(this.getChildAt(1));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(2));
	}
}