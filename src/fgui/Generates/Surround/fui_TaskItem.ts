/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_TaskItem extends fairygui.GComponent {

	public m_gainStatus:fairygui.Controller;
	public m_task:fairygui.GLabel;
	public m_progress:fairygui.GProgressBar;
	public m_reward:fairygui.GLabel;
	public m_gainBtn:fairygui.GButton;

	public static URL:string = "ui://9cap1puyqrw07";

	public static createInstance():fui_TaskItem {
		return <fui_TaskItem><any>(fairygui.UIPackage.createObject("Surround","TaskItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_gainStatus = this.getControllerAt(0);
		this.m_task = <fairygui.GLabel><any>(this.getChildAt(1));
		this.m_progress = <fairygui.GProgressBar><any>(this.getChildAt(2));
		this.m_reward = <fairygui.GLabel><any>(this.getChildAt(3));
		this.m_gainBtn = <fairygui.GButton><any>(this.getChildAt(4));
	}
}