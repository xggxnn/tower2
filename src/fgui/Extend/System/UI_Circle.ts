import fui_Circle from "../../Generates/System/fui_Circle";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import MenuLayer from "../../../gamemodule/MenuLayer";
import { MenuLayerType } from "../../../gamemodule/DataEnums/MenuLayerType";
import Fun from "../../../Tool/Fun";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Circle extends fui_Circle {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_Circle {
		return <UI_Circle>(fui_Circle.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Circle.URL, UI_Circle);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		EventManager.on(EventKey.LOADER_PROGRESS, this, this.setProgress);
		EventManager.on(EventKey.LOADER_OVER, this, this.loadOver);
		EventManager.on(EventKey.SHOW_WAIT, this, this.showWait);
		EventManager.on(EventKey.CLOSE_WAIT, this, this.loadOver);
		MenuLayer.showHideLayer(MenuLayerType.Loader, false)
	}

	setProgress(progress: number, max: number): void {
		this.m_c1.setSelectedIndex(0);
		MenuLayer.showHideLayer(MenuLayerType.Loader, true)
		let num = Math.floor(progress * 1000 / max);
		if (num > 999) num = 999;
		this.m_tips.text = Fun.format("{0}.{1}%", Math.floor(num * 0.1), num % 10);
	}
	showWait(): void {
		this.m_c1.setSelectedIndex(1);
		MenuLayer.showHideLayer(MenuLayerType.Loader, true)
	}
	loadOver(): void {
		MenuLayer.showHideLayer(MenuLayerType.Loader, false)
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
UI_Circle.bind();