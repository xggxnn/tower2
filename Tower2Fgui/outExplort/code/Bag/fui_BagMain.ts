/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_BagMain extends fairygui.GComponent {

	public m_list:fairygui.GList;
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

		this.m_list = <fairygui.GList><any>(this.getChildAt(5));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(6));
	}
}