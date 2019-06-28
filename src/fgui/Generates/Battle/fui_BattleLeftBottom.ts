/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_BattleLeftBottom extends fairygui.GComponent {

	public m_dikuang:fairygui.GLoader;
	public m_headIcon:fairygui.GComponent;
	public m_atkAttribute:fairygui.GLoader;
	public m_attribute:fairygui.GLoader;
	public m_nameIcon:fairygui.GLoader;
	public m_atktip:fairygui.GTextField;
	public m_skill:fairygui.GTextField;
	public m_menpai:fairygui.GTextField;
	public m_wuxing:fairygui.GTextField;

	public static URL:string = "ui://3jvhuirzngrsz";

	public static createInstance():fui_BattleLeftBottom {
		return <fui_BattleLeftBottom><any>(fairygui.UIPackage.createObject("Battle","BattleLeftBottom"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_dikuang = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_headIcon = <fairygui.GComponent><any>(this.getChildAt(2));
		this.m_atkAttribute = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_attribute = <fairygui.GLoader><any>(this.getChildAt(4));
		this.m_nameIcon = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_atktip = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_skill = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_menpai = <fairygui.GTextField><any>(this.getChildAt(8));
		this.m_wuxing = <fairygui.GTextField><any>(this.getChildAt(9));
	}
}