/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_FriendItem extends fairygui.GComponent {

	public m_status:fairygui.Controller;
	public m_nam:fairygui.GTextField;
	public m_icons:fairygui.GLoader;
	public m_mask:fairygui.GImage;
	public m_tim:fairygui.GTextField;
	public m_tipBtn:fairygui.GButton;

	public static URL:string = "ui://3gd37va894yv6";

	public static createInstance():fui_FriendItem {
		return <fui_FriendItem><any>(fairygui.UIPackage.createObject("Authorization","FriendItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_status = this.getControllerAt(0);
		this.m_nam = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_mask = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_tim = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_tipBtn = <fairygui.GButton><any>(this.getChildAt(6));
	}
}