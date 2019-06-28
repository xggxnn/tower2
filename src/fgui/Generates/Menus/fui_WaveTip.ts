/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_WaveTip extends fairygui.GComponent {

	public m_icon:fairygui.GLoader;
	public m_title:fairygui.GTextField;
	public m_title2:fairygui.GTextField;

	public static URL:string = "ui://pdzut3twngrs18";

	public static createInstance():fui_WaveTip {
		return <fui_WaveTip><any>(fairygui.UIPackage.createObject("Menus","WaveTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_icon = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_title = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_title2 = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}