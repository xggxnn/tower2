/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_AssociationBtn extends fairygui.GButton {

	public m_titles:fairygui.GTextField;

	public static URL:string = "ui://3jvhuirzngrs18";

	public static createInstance():fui_AssociationBtn {
		return <fui_AssociationBtn><any>(fairygui.UIPackage.createObject("Battle","AssociationBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}