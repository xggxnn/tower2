/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeadIcon2 extends fairygui.GComponent {

	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://pdzut3twngrs1k";

	public static createInstance():fui_HeadIcon2 {
		return <fui_HeadIcon2><any>(fairygui.UIPackage.createObject("Menus","HeadIcon2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}