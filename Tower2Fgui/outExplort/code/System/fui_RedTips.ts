/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_RedTips extends fairygui.GComponent {

	public m_icon:fairygui.GLoader;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://130tmfxdh5p91v";

	public static createInstance():fui_RedTips {
		return <fui_RedTips><any>(fairygui.UIPackage.createObject("System","RedTips"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_t0 = this.getTransitionAt(0);
	}
}