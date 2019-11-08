/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_RewardItem extends fairygui.GLabel {

	public m_onLyTxt:fairygui.Controller;
	public m_count:fairygui.GTextField;

	public static URL:string = "ui://130tmfxdh5p91y";

	public static createInstance():fui_RewardItem {
		return <fui_RewardItem><any>(fairygui.UIPackage.createObject("System","RewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_onLyTxt = this.getControllerAt(0);
		this.m_count = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}