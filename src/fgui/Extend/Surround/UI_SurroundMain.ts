import fui_SurroundMain from "../../Generates/Surround/fui_SurroundMain";
import SurroundWin from "../../../gamemodule/Windows/SurroundWin";
import UI_ItemIcon from "../System/UI_ItemIcon";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_SurroundMain extends fui_SurroundMain {

	moduleWindow: SurroundWin;

	public static DependPackages: string[] = ["Surround"];

	public static createInstance(): UI_SurroundMain {
		return <UI_SurroundMain>(fui_SurroundMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_SurroundMain.URL, UI_SurroundMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_closeBtn.onClick(this, this.closeUI);
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_list.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
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
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}

	private curIndex: number = 0;
	private setData(): void {
		this.curIndex = 0;
		this.m_list.numItems = 30;
	}

	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		let status = 0;
		if (this.curIndex == index) {
			status = 2;
		}
		else if (this.curIndex > index) {
			status = 1;
		}
		item.signSetData(index + 1, status);
	}
	private onClickItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		console.log(item.singIndex);
		if (this.curIndex + 1 == item.singIndex) {
			this.curIndex++;
			this.m_list.numItems = 30;
		}
		else if (this.curIndex + 1 < item.singIndex) {
			console.log("未达到日期");
		}
		else {
			console.log("已签到");
		}
	}
}
UI_SurroundMain.bind();
