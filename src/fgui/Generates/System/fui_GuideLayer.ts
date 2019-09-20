/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_ScrollTxtNormal from "./fui_ScrollTxtNormal";

export default class fui_GuideLayer extends fairygui.GComponent {

	public m_pos:fairygui.Controller;
	public m_window:fairygui.GGraph;
	public m_top:fui_ScrollTxtNormal;
	public m_bottom:fui_ScrollTxtNormal;
	public m_right:fui_ScrollTxtNormal;
	public m_left:fui_ScrollTxtNormal;
	public m_rightLow:fui_ScrollTxtNormal;

	public static URL:string = "ui://130tmfxdopk1p";

	public static createInstance():fui_GuideLayer {
		return <fui_GuideLayer><any>(fairygui.UIPackage.createObject("System","GuideLayer"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_pos = this.getControllerAt(0);
		this.m_window = <fairygui.GGraph><any>(this.getChildAt(1));
		this.m_top = <fui_ScrollTxtNormal><any>(this.getChildAt(3));
		this.m_bottom = <fui_ScrollTxtNormal><any>(this.getChildAt(5));
		this.m_right = <fui_ScrollTxtNormal><any>(this.getChildAt(7));
		this.m_left = <fui_ScrollTxtNormal><any>(this.getChildAt(9));
		this.m_rightLow = <fui_ScrollTxtNormal><any>(this.getChildAt(11));
	}
}