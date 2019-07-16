/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_BagMain extends fairygui.GComponent {

	public m_tab:fairygui.Controller;
	public m_list:fairygui.GList;
	public m_kabaoBtn:fairygui.GButton;
	public m_heroBtn:fairygui.GButton;
	public m_closeBtn:fairygui.GButton;

	public static URL:string = "ui://kpm8go2dj5ct0";

	public static createInstance():fui_BagMain {
		return <fui_BagMain><any>(fairygui.UIPackage.createObject("Bag","BagMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_tab = this.getControllerAt(0);
		this.m_list = <fairygui.GList><any>(this.getChildAt(6));
		this.m_kabaoBtn = <fairygui.GButton><any>(this.getChildAt(7));
		this.m_heroBtn = <fairygui.GButton><any>(this.getChildAt(8));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(9));
	}
}