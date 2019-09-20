/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_BattleTopMiddle extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_bg:fairygui.GImage;
	public m_associationList:fairygui.GList;
	public m_title:fairygui.GRichTextField;
	public m_heroList:fairygui.GList;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzngrs15";

	public static createInstance():fui_BattleTopMiddle {
		return <fui_BattleTopMiddle><any>(fairygui.UIPackage.createObject("Battle","BattleTopMiddle"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_associationList = <fairygui.GList><any>(this.getChildAt(1));
		this.m_title = <fairygui.GRichTextField><any>(this.getChildAt(3));
		this.m_heroList = <fairygui.GList><any>(this.getChildAt(4));
		this.m_t0 = this.getTransitionAt(0);
	}
}