/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_AuthorizationMain extends fairygui.GComponent {

	public m_login:fairygui.Controller;
	public m_bg:fairygui.GImage;
	public m_startBtn:fairygui.GButton;

	public static URL:string = "ui://3gd37va894yv0";

	public static createInstance():fui_AuthorizationMain {
		return <fui_AuthorizationMain><any>(fairygui.UIPackage.createObject("Authorization","AuthorizationMain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_login = this.getControllerAt(0);
		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_startBtn = <fairygui.GButton><any>(this.getChildAt(2));
	}
}