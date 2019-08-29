/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_PropBtn extends fairygui.GButton {

	public m_status:fairygui.Controller;
	public m_have:fairygui.Controller;
	public m_stone:fairygui.GImage;
	public m_quality:fairygui.GLoader;
	public m_race:fairygui.GLoader;
	public m_career:fairygui.GLoader;
	public m_t0:fairygui.Transition;
	public m_big:fairygui.Transition;
	public m_small:fairygui.Transition;

	public static URL:string = "ui://9wh71t3fnn3i4";

	public static createInstance():fui_PropBtn {
		return <fui_PropBtn><any>(fairygui.UIPackage.createObject("Arrangement","PropBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_status = this.getControllerAt(1);
		this.m_have = this.getControllerAt(2);
		this.m_stone = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_race = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_career = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_t0 = this.getTransitionAt(0);
		this.m_big = this.getTransitionAt(1);
		this.m_small = this.getTransitionAt(2);
	}
}