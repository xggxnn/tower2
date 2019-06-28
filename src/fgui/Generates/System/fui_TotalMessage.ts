/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_TotalMessage extends fairygui.GComponent {

	public m_topTitle:fairygui.GTextField;
	public m_moveTtitle:fairygui.GTextField;
	public m_top:fairygui.Transition;
	public m_move:fairygui.Transition;

	public static URL:string = "ui://130tmfxdq0808";

	public static createInstance():fui_TotalMessage {
		return <fui_TotalMessage><any>(fairygui.UIPackage.createObject("System","TotalMessage"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_topTitle = <fairygui.GTextField><any>(this.getChildAt(0));
		this.m_moveTtitle = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_top = this.getTransitionAt(0);
		this.m_move = this.getTransitionAt(1);
	}
}