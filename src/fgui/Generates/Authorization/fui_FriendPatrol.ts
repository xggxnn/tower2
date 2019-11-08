/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_FriendPatrol extends fairygui.GComponent {

	public m_haveCount:fairygui.GTextField;
	public m_tips:fairygui.GTextField;
	public m_gainTips:fairygui.GTextField;
	public m_list:fairygui.GList;
	public m_inviteBtn:fairygui.GButton;
	public m_closeBtn:fairygui.GButton;

	public static URL:string = "ui://3gd37va894yv5";

	public static createInstance():fui_FriendPatrol {
		return <fui_FriendPatrol><any>(fairygui.UIPackage.createObject("Authorization","FriendPatrol"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_haveCount = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_tips = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_gainTips = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_list = <fairygui.GList><any>(this.getChildAt(8));
		this.m_inviteBtn = <fairygui.GButton><any>(this.getChildAt(9));
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(10));
	}
}