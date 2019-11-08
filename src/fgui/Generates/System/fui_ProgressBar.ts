/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_ProgressBar extends fairygui.GProgressBar {

	public m_valZero:fairygui.Controller;

	public static URL:string = "ui://130tmfxdudz4v";

	public static createInstance():fui_ProgressBar {
		return <fui_ProgressBar><any>(fairygui.UIPackage.createObject("System","ProgressBar"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_valZero = this.getControllerAt(0);
	}
}