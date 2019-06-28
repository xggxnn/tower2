/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_GuideLayer extends fairygui.GComponent {

	public m_window:fairygui.GGraph;

	public static URL:string = "ui://130tmfxdopk1p";

	public static createInstance():fui_GuideLayer {
		return <fui_GuideLayer><any>(fairygui.UIPackage.createObject("System","GuideLayer"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_window = <fairygui.GGraph><any>(this.getChildAt(1));
	}
}