/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_comBtn extends fairygui.GButton {

	public m_redTip:fairygui.Controller;

	public static URL:string = "ui://130tmfxdj5ct15";

	public static createInstance():fui_comBtn {
		return <fui_comBtn><any>(fairygui.UIPackage.createObject("System","comBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_redTip = this.getControllerAt(1);
	}
}