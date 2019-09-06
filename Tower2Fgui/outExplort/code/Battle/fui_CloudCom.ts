/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_CloudCom extends fairygui.GComponent {

	public m_com:fairygui.GGroup;

	public static URL:string = "ui://3jvhuirzczuw1v";

	public static createInstance():fui_CloudCom {
		return <fui_CloudCom><any>(fairygui.UIPackage.createObject("Battle","CloudCom"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_com = <fairygui.GGroup><any>(this.getChildAt(21));
	}
}