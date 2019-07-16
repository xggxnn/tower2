/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_GeneralBtn from "./fui_GeneralBtn";

export default class fui_GainRewards extends fairygui.GComponent {

	public m_list:fairygui.GList;
	public m_okBtn:fui_GeneralBtn;

	public static URL:string = "ui://130tmfxdbxj017";

	public static createInstance():fui_GainRewards {
		return <fui_GainRewards><any>(fairygui.UIPackage.createObject("System","GainRewards"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_list = <fairygui.GList><any>(this.getChildAt(6));
		this.m_okBtn = <fui_GeneralBtn><any>(this.getChildAt(7));
	}
}