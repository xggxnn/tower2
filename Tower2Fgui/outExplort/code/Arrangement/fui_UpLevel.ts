/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_UpLevel extends fairygui.GComponent {

	public m_upStar:fairygui.GButton;
	public m_upLevel:fairygui.GButton;
	public m_middle:fairygui.GImage;
	public m_backBtn:fairygui.GButton;
	public m_gold:fairygui.GLabel;
	public m_jadeite:fairygui.GLabel;
	public m_icons1:fairygui.GLoader;
	public m_counts1:fairygui.GTextField;
	public m_icons2:fairygui.GLoader;
	public m_counts2:fairygui.GTextField;
	public m_level:fairygui.GTextField;
	public m_star:fairygui.GTextField;
	public m_help:fairygui.GButton;

	public static URL:string = "ui://9wh71t3fqvb62q";

	public static createInstance():fui_UpLevel {
		return <fui_UpLevel><any>(fairygui.UIPackage.createObject("Arrangement","UpLevel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_upStar = <fairygui.GButton><any>(this.getChildAt(1));
		this.m_upLevel = <fairygui.GButton><any>(this.getChildAt(2));
		this.m_middle = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_backBtn = <fairygui.GButton><any>(this.getChildAt(7));
		this.m_gold = <fairygui.GLabel><any>(this.getChildAt(8));
		this.m_jadeite = <fairygui.GLabel><any>(this.getChildAt(9));
		this.m_icons1 = <fairygui.GLoader><any>(this.getChildAt(11));
		this.m_counts1 = <fairygui.GTextField><any>(this.getChildAt(12));
		this.m_icons2 = <fairygui.GLoader><any>(this.getChildAt(14));
		this.m_counts2 = <fairygui.GTextField><any>(this.getChildAt(15));
		this.m_level = <fairygui.GTextField><any>(this.getChildAt(16));
		this.m_star = <fairygui.GTextField><any>(this.getChildAt(17));
		this.m_help = <fairygui.GButton><any>(this.getChildAt(18));
	}
}