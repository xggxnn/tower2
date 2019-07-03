import fui_Association from "../../Generates/Arrangement/fui_Association";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Association extends fui_Association {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_Association {
		return <UI_Association>(fui_Association.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Association.URL, UI_Association);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_recommendBtn.onClick(this, this.recomClick);
	}

	recomClick(): void {
		this.moduleWindow.createRecommend();
	}

	setData(index: number, moduleWindow: ArrangementWin): void {
		this.moduleWindow = moduleWindow;
		switch (index) {
			case 0:
				this.m_title.text = "战士 X 1";
				break;
		}
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {

	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}


}
UI_Association.bind();
