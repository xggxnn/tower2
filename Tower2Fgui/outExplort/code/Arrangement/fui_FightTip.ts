/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_FightTip extends fairygui.GComponent {

	public m_status:fairygui.Controller;
	public m_att:fairygui.Controller;
	public m_bg:fairygui.Controller;
	public m_ping:fairygui.GImage;
	public m_down:fairygui.GImage;
	public m_up:fairygui.GImage;

	public static URL:string = "ui://9wh71t3fhbcf2o";

	public static createInstance():fui_FightTip {
		return <fui_FightTip><any>(fairygui.UIPackage.createObject("Arrangement","FightTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_status = this.getControllerAt(0);
		this.m_att = this.getControllerAt(1);
		this.m_bg = this.getControllerAt(2);
		this.m_ping = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_down = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_up = <fairygui.GImage><any>(this.getChildAt(4));
	}
}