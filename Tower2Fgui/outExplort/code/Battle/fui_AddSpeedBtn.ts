/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_AddSpeedBtn extends fairygui.GButton {

	public m_changeStatus:fairygui.Controller;

	public static URL:string = "ui://3jvhuirzh5p91n";

	public static createInstance():fui_AddSpeedBtn {
		return <fui_AddSpeedBtn><any>(fairygui.UIPackage.createObject("Battle","AddSpeedBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_changeStatus = this.getControllerAt(1);
	}
}