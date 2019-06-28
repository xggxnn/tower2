/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeadIcon extends fairygui.GComponent {

	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://pdzut3twngrs10";

	public static createInstance():fui_HeadIcon {
		return <fui_HeadIcon><any>(fairygui.UIPackage.createObject("Menus","HeadIcon"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}