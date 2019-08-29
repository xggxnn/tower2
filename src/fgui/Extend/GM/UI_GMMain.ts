import fui_GMMain from "../../Generates/GM/fui_GMMain";
import GMWin from "../../../gamemodule/Windows/GMWin";
import UI_GeneralBtn from "../System/UI_GeneralBtn";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_GMMain extends fui_GMMain {

	moduleWindow: GMWin;

	public static DependPackages: string[] = ["GM"];

	public static createInstance(): UI_GMMain {
		return <UI_GMMain>(fui_GMMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_GMMain.URL, UI_GMMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_closeBtn.onClick(this, this.closeUI);
		this.m_list.setVirtual();
		// 设置列表渲染函数
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// 列表内容单个item被点击
		this.m_list.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_GeneralBtn;
		item.title = Game.gm.tipList[index];
	}
	private inRichText: fairygui.GRichTextField = null;
	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let index = this.m_list.getChildIndex(obj);
		// 转换为点击item在整个列表中的真实索引
		var realIndex: number = this.m_list.childIndexToItemIndex(index);
		if (Game.gm.handlerList.length > realIndex) {
			let handl = Game.gm.handlerList[realIndex];
			if (handl) {
				handl.run();
			}
		}
		this.closeUI();
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
		if (Game.gm.tipList.length == 0) {
			Game.gm.setGmInf("此界面未发现GM命令", Laya.Handler.create(this, this.closeUI, null, false))
		}
		else if (Game.gm.tipList.length > 1) {
			Game.gm.removeGmInf("此界面未发现GM命令");
		}
		this.m_list.numItems = Game.gm.tipList.length;
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}


}
UI_GMMain.bind();
