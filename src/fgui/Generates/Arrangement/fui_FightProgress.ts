/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_FightProgress extends fairygui.GComponent {

	public m_bar:fairygui.GImage;

	public static URL:string = "ui://9wh71t3fhaq32u";

	public static createInstance():fui_FightProgress {
		return <fui_FightProgress><any>(fairygui.UIPackage.createObject("Arrangement","FightProgress"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bar = <fairygui.GImage><any>(this.getChildAt(1));
	}
}