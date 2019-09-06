import fui_PopupMenu from "../../Generates/System/fui_PopupMenu";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import ResourceInfo from "../../../csvInfo/ResourceInfo";
import Fun from "../../../tool/Fun";
import UI_PopupItem from "./UI_PopupItem";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_PopupMenu extends fui_PopupMenu {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_PopupMenu {
		return <UI_PopupMenu>(fui_PopupMenu.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_PopupMenu.URL, UI_PopupMenu);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_list.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
	}
	showPopup(button: fairygui.GObject, showInBtnPos: boolean, list: boolean = false, ...arg: any[]): void {
		if (list) {
			this.updateData();
			this.m_popType.setSelectedIndex(1);
		}
		else {
			this.width = 200;
			this.height = 200;
			let aarr = arg[0];
			if (aarr.length == 1) {
				this.m_tip.text = aarr.toString();
			}
			else if (aarr.length == 2) {
				let resource = ResourceInfo.getInfo(aarr[1]);
				this.m_tip.text = Fun.format(aarr[0], resource.desc);
			}
			this.m_tip.scrollPane.scrollTop();
			this.m_popType.setSelectedIndex(0);
		}
		if (showInBtnPos) {
			fairygui.GRoot.inst.showPopup(this, button);
		}
		else {
			fairygui.GRoot.inst.showPopup(this);
		}
	}

	updateData(): void {
		this.width = 120;
		this.height = 200;
		this.m_list.numItems = 4;
	}
	private sortInf = ["攻击排序", "攻频排序", "暴击排序", "爆伤排序"];

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PopupItem;
		item.m_titles.text = this.sortInf[index];
	}

	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let index = this.m_list.getChildIndex(obj);
		Game.battleData.sUpdateSortSign.dispatch(index);
		fairygui.GRoot.inst.hidePopup(this);
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
UI_PopupMenu.bind();