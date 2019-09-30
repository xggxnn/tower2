/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class fui_EnemyItem extends fairygui.GLabel {

	public m_icons:fairygui.GLoader;
	public m_titles:fairygui.GTextField;

	public static URL:string = "ui://3jvhuirzbcle23";

	public static createInstance():fui_EnemyItem {
		return <fui_EnemyItem><any>(fairygui.UIPackage.createObject("Battle","EnemyItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_icons = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_titles = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}