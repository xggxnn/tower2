/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeroItem2 extends fairygui.GComponent {

	public m_have:fairygui.Controller;
	public m_quality:fairygui.GLoader;
	public m_pic:fairygui.GLabel;
	public m_buyNum:fairygui.GTextField;

	public static URL:string = "ui://rzze1nh2qvb63";

	public static createInstance():fui_HeroItem2 {
		return <fui_HeroItem2><any>(fairygui.UIPackage.createObject("Illustration","HeroItem2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_have = this.getControllerAt(0);
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_pic = <fairygui.GLabel><any>(this.getChildAt(1));
		this.m_buyNum = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}