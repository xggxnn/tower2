/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Association extends fairygui.GComponent {

	public m_title:fairygui.GRichTextField;
	public m_recommendBtn:fairygui.GButton;

	public static URL:string = "ui://9wh71t3fnn3i6";

	public static createInstance():fui_Association {
		return <fui_Association><any>(fairygui.UIPackage.createObject("Arrangement","Association"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_title = <fairygui.GRichTextField><any>(this.getChildAt(1));
		this.m_recommendBtn = <fairygui.GButton><any>(this.getChildAt(2));
	}
}