/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Trial extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_closeBtn:fairygui.GButton;
	public m_mapid:fairygui.GLoader;
	public m_levelid:fairygui.GLoader;
	public m_seatBtn:fairygui.GButton;
	public m_startBtn:fairygui.GButton;
	public m_progress:fairygui.GProgressBar;

	public static URL:string = "ui://pdzut3twudz4p";

	public static createInstance():fui_Trial {
		return <fui_Trial><any>(fairygui.UIPackage.createObject("Menus","Trial"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_closeBtn = <fairygui.GButton><any>(this.getChildAt(2));
		this.m_mapid = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_levelid = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_seatBtn = <fairygui.GButton><any>(this.getChildAt(17));
		this.m_startBtn = <fairygui.GButton><any>(this.getChildAt(18));
		this.m_progress = <fairygui.GProgressBar><any>(this.getChildAt(23));
	}
}