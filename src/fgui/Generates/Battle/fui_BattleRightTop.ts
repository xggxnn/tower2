/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_BattleRightTop extends fairygui.GComponent {

	public m_waveBtn:fairygui.GButton;
	public m_setBtn:fairygui.GButton;
	public m_pauseBtn:fairygui.GButton;
	public m_time:fairygui.GTextField;

	public static URL:string = "ui://3jvhuirzngrs10";

	public static createInstance():fui_BattleRightTop {
		return <fui_BattleRightTop><any>(fairygui.UIPackage.createObject("Battle","BattleRightTop"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_waveBtn = <fairygui.GButton><any>(this.getChildAt(0));
		this.m_setBtn = <fairygui.GButton><any>(this.getChildAt(1));
		this.m_pauseBtn = <fairygui.GButton><any>(this.getChildAt(2));
		this.m_time = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}