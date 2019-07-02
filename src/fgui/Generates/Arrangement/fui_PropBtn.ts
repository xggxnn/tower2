/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_PropBtn extends fairygui.GButton {

	public m_status:fairygui.Controller;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://9wh71t3fnn3i4";

	public static createInstance():fui_PropBtn {
		return <fui_PropBtn><any>(fairygui.UIPackage.createObject("Arrangement","PropBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_status = this.getControllerAt(1);
		this.m_t0 = this.getTransitionAt(0);
	}
}