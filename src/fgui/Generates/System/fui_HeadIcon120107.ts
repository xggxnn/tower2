/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeadIcon120107 extends fairygui.GLabel {

	public m_mask:fairygui.GGraph;

	public static URL:string = "ui://130tmfxdbxj0e";

	public static createInstance():fui_HeadIcon120107 {
		return <fui_HeadIcon120107><any>(fairygui.UIPackage.createObject("System","HeadIcon120107"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_mask = <fairygui.GGraph><any>(this.getChildAt(1));
	}
}