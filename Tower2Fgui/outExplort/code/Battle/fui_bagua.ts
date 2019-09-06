/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_bagua extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_t1:fairygui.Transition;
	public m_t2:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzyyzwe";

	public static createInstance():fui_bagua {
		return <fui_bagua><any>(fairygui.UIPackage.createObject("Battle","bagua"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_t1 = this.getTransitionAt(0);
		this.m_t2 = this.getTransitionAt(1);
	}
}