/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_BattleLeftTop extends fairygui.GComponent {

	public m_waveBtn:fairygui.GButton;

	public static URL:string = "ui://3jvhuirzngrsx";

	public static createInstance():fui_BattleLeftTop {
		return <fui_BattleLeftTop><any>(fairygui.UIPackage.createObject("Battle","BattleLeftTop"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_waveBtn = <fairygui.GButton><any>(this.getChildAt(0));
	}
}