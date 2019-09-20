/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_FightTip extends fairygui.GComponent {

	public m_att:fairygui.Controller;

	public static URL:string = "ui://9wh71t3fhbcf2o";

	public static createInstance():fui_FightTip {
		return <fui_FightTip><any>(fairygui.UIPackage.createObject("Arrangement","FightTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_att = this.getControllerAt(0);
	}
}