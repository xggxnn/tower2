/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_IllustrationMain extends fairygui.GComponent {

	public m_list:fairygui.GList;
	public m_closeBtn:fairygui.GButton;

	public static URL:string = "ui://rzze1nh2qyum0";

	public static createInstance():fui_IllustrationMain {
		return <fui_IllustrationMain><any>(fairygui.UIPackage.createObject("Illustration","IllustrationMain"));
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