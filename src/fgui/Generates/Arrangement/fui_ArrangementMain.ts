/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ArrangementMain extends fairygui.GComponent {

	public m_titles:fairygui.GTextField;
	public m_seatList:fairygui.GList;
	public m_heroList:fairygui.GList;
	public m_backBtn:fairygui.GButton;

	public static URL:string = "ui://9wh71t3fog780";

	public static createInstance():fui_ArrangementMain {
		return <fui_ArrangementMain><any>(fairygui.UIPackage.createObject("Arrangement","ArrangementMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_seatList = <fairygui.GList><any>(this.getChildAt(5));
		this.m_heroList = <fairygui.GList><any>(this.getChildAt(6));
		this.m_backBtn = <fairygui.GButton><any>(this.getChildAt(7));
	}
}