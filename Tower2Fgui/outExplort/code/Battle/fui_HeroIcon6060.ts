/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_HeroIcon6060 extends fairygui.GLabel {

	public m_mask:fairygui.GGraph;

	public static URL:string = "ui://3jvhuirzqyum1p";

	public static createInstance():fui_HeroIcon6060 {
		return <fui_HeroIcon6060><any>(fairygui.UIPackage.createObject("Battle","HeroIcon6060"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_mask = <fairygui.GGraph><any>(this.getChildAt(1));
	}
}