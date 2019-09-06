/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Hand extends fairygui.GComponent {

	public m_t0:fairygui.Transition;

	public static URL:string = "ui://130tmfxdqrw053s";

	public static createInstance():fui_Hand {
		return <fui_Hand><any>(fairygui.UIPackage.createObject("System","Hand"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_t0 = this.getTransitionAt(0);
	}
}