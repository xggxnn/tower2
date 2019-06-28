/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_PopupMenu extends fairygui.GComponent {

	public m_popType:fairygui.Controller;
	public m_list:fairygui.GList;

	public static URL:string = "ui://130tmfxdnvpox";

	public static createInstance():fui_PopupMenu {
		return <fui_PopupMenu><any>(fairygui.UIPackage.createObject("System","PopupMenu"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_popType = this.getControllerAt(0);
		this.m_list = <fairygui.GList><any>(this.getChildAt(1));
	}
}