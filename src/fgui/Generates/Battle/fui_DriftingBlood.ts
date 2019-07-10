/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_DriftingBlood extends fairygui.GLabel {

	public m_c1:fairygui.Controller;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzepyri";

	public static createInstance():fui_DriftingBlood {
		return <fui_DriftingBlood><any>(fairygui.UIPackage.createObject("Battle","DriftingBlood"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_t0 = this.getTransitionAt(0);
	}
}