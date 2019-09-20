/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Circle extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_showTip:fairygui.Controller;
	public m_tips:fairygui.GTextField;
	public m_t0:fairygui.Transition;
	public m_t1:fairygui.Transition;

	public static URL:string = "ui://130tmfxdq0800";

	public static createInstance():fui_Circle {
		return <fui_Circle><any>(fairygui.UIPackage.createObject("System","Circle"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_showTip = this.getControllerAt(1);
		this.m_tips = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_t0 = this.getTransitionAt(0);
		this.m_t1 = this.getTransitionAt(1);
	}
}