/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Shadow extends fairygui.GComponent {

	public m_t0:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzepyrk";

	public static createInstance():fui_Shadow {
		return <fui_Shadow><any>(fairygui.UIPackage.createObject("Battle","Shadow"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_t0 = this.getTransitionAt(0);
	}
}