/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_seatBtn extends fairygui.GButton {

	public m_hitTip:fairygui.GTextField;
	public m_speedTip:fairygui.GTextField;

	public static URL:string = "ui://9xvnuoq0j5ct1n";

	public static createInstance():fui_seatBtn {
		return <fui_seatBtn><any>(fairygui.UIPackage.createObject("Home","seatBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_hitTip = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_speedTip = <fairygui.GTextField><any>(this.getChildAt(6));
	}
}