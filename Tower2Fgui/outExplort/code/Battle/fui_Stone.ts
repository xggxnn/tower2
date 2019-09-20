/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Stone extends fairygui.GComponent {

	public m_c1:fairygui.Controller;

	public static URL:string = "ui://3jvhuirzn1s09";

	public static createInstance():fui_Stone {
		return <fui_Stone><any>(fairygui.UIPackage.createObject("Battle","Stone"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
	}
}