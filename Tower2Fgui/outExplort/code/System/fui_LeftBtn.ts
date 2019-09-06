/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_LeftBtn extends fairygui.GButton {

	public m_t0:fairygui.Transition;

	public static URL:string = "ui://130tmfxdj8q224";

	public static createInstance():fui_LeftBtn {
		return <fui_LeftBtn><any>(fairygui.UIPackage.createObject("System","LeftBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_t0 = this.getTransitionAt(0);
	}
}