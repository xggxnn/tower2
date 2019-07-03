/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Recommend extends fairygui.GComponent {

	public m_race:fairygui.GTextField;
	public m_heroList:fairygui.GList;
	public m_list:fairygui.GList;
	public m_closeBtn:fairygui.GButton;

	public static URL:string = "ui://9wh71t3fnn3i7";

	public static createInstance():fui_Recommend {
		return <fui_Recommend><any>(fairygui.UIPackage.createObject("Arrangement","Recommend"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_race = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_heroList = <fairygui.GList><any>(this.getChildAt(4));
		this.m_list = <fairygui.GList><any>(this.getChildAt(6));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(7));
	}
}