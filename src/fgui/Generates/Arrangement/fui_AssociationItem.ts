/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_AssociationItem extends fairygui.GComponent {

	public m_double:fairygui.Controller;
	public m_isGray:fairygui.Controller;
	public m_rewardStatus:fairygui.Controller;
	public m_icons:fairygui.GLoader;
	public m_count:fairygui.GTextField;
	public m_tip:fairygui.GTextField;
	public m_heroList:fairygui.GList;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://9wh71t3fczuw2c";

	public static createInstance():fui_AssociationItem {
		return <fui_AssociationItem><any>(fairygui.UIPackage.createObject("Arrangement","AssociationItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_double = this.getControllerAt(0);
		this.m_isGray = this.getControllerAt(1);
		this.m_rewardStatus = this.getControllerAt(2);
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_count = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_tip = <fairygui.GTextField><any>(this.getChildAt(3));
		this.m_heroList = <fairygui.GList><any>(this.getChildAt(4));
		this.m_t0 = this.getTransitionAt(0);
	}
}