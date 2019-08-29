import fui_BagMain from "../../Generates/Bag/fui_BagMain";
import BagWin from "../../../gamemodule/Windows/BagWin";
import Game from "../../../Game";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import UI_BagItem from "./UI_BagItem";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BagMain extends fui_BagMain {

	moduleWindow: BagWin;

	public static DependPackages: string[] = ["Bag"];

	public static createInstance(): UI_BagMain {
		return <UI_BagMain>(fui_BagMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BagMain.URL, UI_BagMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_list.setVirtual();
		// 设置列表渲染函数
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);

		this.m_closeBtn.onClick(this, this.backUI);
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
		EventManager.on(ProtoEvent.BAGGIFT_CALL_BACK, this, this.baggiftCall);
		EventManager.on(ProtoEvent.OPENCARD_CALL_BACK, this, this.setData);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}

	private setData(): void {
		this.moduleWindow.closeOtherWindow();
		Game.proto.bagGift();
	}
	private baggiftCall(): void {
		this.m_list.numItems = Game.playData.curGift.length;
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_BagItem;
		item.giftSetData(index);
	}
}
UI_BagMain.bind();
