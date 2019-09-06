/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_cloudBig extends fairygui.GComponent {

	public m_t0:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzczuw1t";

	public static createInstance():fui_cloudBig {
		return <fui_cloudBig><any>(fairygui.UIPackage.createObject("Battle","cloudBig"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_t0 = this.getTransitionAt(0);
	}
}