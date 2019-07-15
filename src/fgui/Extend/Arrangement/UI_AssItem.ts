import fui_AssItem from "../../Generates/Arrangement/fui_AssItem";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import Association from "../../../gamemodule/DataStructs/Association";
import AssociationAttributeInfo from "../../../dataInfo/AssociationAttributeInfo";
import Fun from "../../../Tool/Fun";
import Game from "../../../Game";
import UI_ArrangementMain from "./UI_ArrangementMain";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_AssItem extends fui_AssItem {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_AssItem {
		return <UI_AssItem>(fui_AssItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_AssItem.URL, UI_AssItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_recommendBtn.onClick(this, this.recomClick);
	}

	recomClick(): void {
		Game.battleData.association = this.datas;
		this.main.changeStatus(2);
	}
	private main: UI_ArrangementMain
	private datas: Association
	setData(datas: Association, main: UI_ArrangementMain): void {
		this.main = main;
		this.datas = datas;
		let att = AssociationAttributeInfo.getInfo(datas.attribute_id);
		if (datas.hero.length > 0) {
			this.title = Fun.format("{0} ", datas.names);
		}
		else {
			this.title = Fun.format("{0} X {1} 触发 ", datas.names, datas.num) + Fun.format(att.des, datas.values);
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
UI_AssItem.bind();
