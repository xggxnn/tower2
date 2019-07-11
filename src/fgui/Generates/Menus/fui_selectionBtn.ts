/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_selectionBtn extends fairygui.GButton {

	public m_pic:fairygui.Controller;
	public m_first:fairygui.GLoader;
	public m_end:fairygui.GLoader;

	public static URL:string = "ui://pdzut3twudz4h";

	public static createInstance():fui_selectionBtn {
		return <fui_selectionBtn><any>(fairygui.UIPackage.createObject("Menus","selectionBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_pic = this.getControllerAt(1);
		this.m_first = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_end = <fairygui.GLoader><any>(this.getChildAt(4));
	}
}