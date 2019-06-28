/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_GameOver extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_gainBtn:fairygui.GButton;
	public m_upBtn:fairygui.GButton;

	public static URL:string = "ui://3jvhuirzngrsn";

	public static createInstance():fui_GameOver {
		return <fui_GameOver><any>(fairygui.UIPackage.createObject("Battle","GameOver"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_gainBtn = <fairygui.GButton><any>(this.getChildAt(7));
		this.m_upBtn = <fairygui.GButton><any>(this.getChildAt(15));
	}
}