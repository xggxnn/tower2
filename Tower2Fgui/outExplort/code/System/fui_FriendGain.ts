/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_FriendGain extends fairygui.GButton {

	public m_titles:fairygui.GTextField;

	public static URL:string = "ui://130tmfxd94yv54n";

	public static createInstance():fui_FriendGain {
		return <fui_FriendGain><any>(fairygui.UIPackage.createObject("System","FriendGain"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}