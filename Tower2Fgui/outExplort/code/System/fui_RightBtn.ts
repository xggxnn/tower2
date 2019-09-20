/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_RightBtn extends fairygui.GButton {

	public m_t0:fairygui.Transition;

	public static URL:string = "ui://130tmfxdj8q226";

	public static createInstance():fui_RightBtn {
		return <fui_RightBtn><any>(fairygui.UIPackage.createObject("System","RightBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_t0 = this.getTransitionAt(0);
	}
}