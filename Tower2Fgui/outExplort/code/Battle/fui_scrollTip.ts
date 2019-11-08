/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_scrollTip extends fairygui.GComponent {

	public m_titles:fairygui.GTextField;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://3jvhuirzexbk25";

	public static createInstance():fui_scrollTip {
		return <fui_scrollTip><any>(fairygui.UIPackage.createObject("Battle","scrollTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_t0 = this.getTransitionAt(0);
	}
}