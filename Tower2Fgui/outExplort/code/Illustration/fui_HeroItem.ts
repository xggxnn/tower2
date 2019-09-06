/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeroItem extends fairygui.GComponent {

	public m_have:fairygui.Controller;
	public m_quality:fairygui.GLoader;
	public m_buyNum:fairygui.GTextField;
	public m_pic:fairygui.GLabel;
	public m_heroName:fairygui.GTextField;
	public m_checkBtn:fairygui.GButton;

	public static URL:string = "ui://rzze1nh2qyum2";

	public static createInstance():fui_HeroItem {
		return <fui_HeroItem><any>(fairygui.UIPackage.createObject("Illustration","HeroItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_have = this.getControllerAt(0);
		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_buyNum = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_pic = <fairygui.GLabel><any>(this.getChildAt(3));
		this.m_heroName = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_checkBtn = <fairygui.GButton><any>(this.getChildAt(5));
	}
}