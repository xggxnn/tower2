import fui_PopupMenu from "../../Generates/System/fui_PopupMenu";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import UI_PopupMenuitem from "./UI_PopupMenuitem";

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

		// 开启虚拟列表，开启后无法关闭
		this.m_list.setVirtual();
		// 设置列表渲染函数
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// 列表如果多个不同类型的item，需要此设置
		this.m_list.itemProvider = Laya.Handler.create(this, this.providerItem, null, false);
		// 列表内容单个item被点击
		this.m_list.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
	}
	showPopup(button: fairygui.GObject, showInBtnPos: boolean, ...arg: any[]): void {
		this.m_list.height = 300;
		this.updateData();
		if (showInBtnPos) {
			fairygui.GRoot.inst.showPopup(this, button);
		}
		else {
			fairygui.GRoot.inst.showPopup(this);
		}
	}

	updateData(): void {
		this.m_list.numItems = 10;
		this.m_list.scrollToView(0);
	}

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PopupMenuitem;
		item.title = "测试" + index;
	}
	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let index = this.m_list.getChildIndex(obj);
		// 转换为点击item在整个列表中的真实索引
		var realIndex: number = this.m_list.childIndexToItemIndex(index);
	}
	// 返回不同item
	providerItem(index: number): string {
		// 此处可返回不同类型的item混合
		return UI_PopupMenuitem.URL;
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