import fui_HeroFetters from "../../Generates/Home/fui_HeroFetters";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import FWindow from "../../../gamemodule/FWindow";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroFetters extends fui_HeroFetters {

	moduleWindow: HomeWin;
	private fwindow: FWindow;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_HeroFetters {
		return <UI_HeroFetters>(fui_HeroFetters.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroFetters.URL, UI_HeroFetters);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_heroList.setVirtual();
		this.m_tuijianbackBtn.onClick(this, this.closeUI);
		this.m_heroList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_heroList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
	}

	// 关闭ui
	closeUI(): void {
		if (this.fwindow) {
			this.fwindow.windowRemoveChild(this);
		}
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

	private setData(): void {
		this.m_typename.text = "";
		this.m_tip.text = "";
		this.m_heroList.numItems = 0;
	}

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		// let item = obj as UI_ItemIcon;
		// item.setData(index);
	}

	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		// let item = obj as UI_ItemIcon;
		// Game.popup.showPopup(obj, true, ["第" + (item.index + 1) + "个"]);
	}


}
UI_HeroFetters.bind();
