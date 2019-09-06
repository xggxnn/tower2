/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_cloudSmall extends fairygui.GComponent {

	public m_t0:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzczuw1u";

	public static createInstance():fui_cloudSmall {
		return <fui_cloudSmall><any>(fairygui.UIPackage.createObject("Battle","cloudSmall"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_t0 = this.getTransitionAt(0);
	}
}