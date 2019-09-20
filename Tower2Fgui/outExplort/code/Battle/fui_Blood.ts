/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_Blood extends fairygui.GProgressBar {

	public m_bg:fairygui.GImage;

	public static URL:string = "ui://3jvhuirzepyrh";

	public static createInstance():fui_Blood {
		return <fui_Blood><any>(fairygui.UIPackage.createObject("Battle","Blood"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
	}
}