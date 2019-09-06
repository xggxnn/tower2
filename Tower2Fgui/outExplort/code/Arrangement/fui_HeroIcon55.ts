/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeroIcon55 extends fairygui.GComponent {

	public m_quality:fairygui.GLoader;
	public m_icons:fairygui.GLoader;

	public static URL:string = "ui://9wh71t3fczuw2e";

	public static createInstance():fui_HeroIcon55 {
		return <fui_HeroIcon55><any>(fairygui.UIPackage.createObject("Arrangement","HeroIcon55"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_quality = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(1));
	}
}