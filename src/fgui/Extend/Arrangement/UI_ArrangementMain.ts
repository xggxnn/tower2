import fui_ArrangementMain from "../../Generates/Arrangement/fui_ArrangementMain";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import UI_PropBtn from "./UI_PropBtn";
import Game from "../../../Game";
import HeroInfo from "../../../dataInfo/HeroInfo";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import Dictionary from "../../../Tool/Dictionary";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_ArrangementMain extends fui_ArrangementMain {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_ArrangementMain {
		return <UI_ArrangementMain>(fui_ArrangementMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_ArrangementMain.URL, UI_ArrangementMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_backBtn.onClick(this, this.backUI);
		this.m_heroList.setVirtual();
		// 设置列表渲染函数
		this.m_heroList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// 列表内容单个item被点击
		this.m_heroList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
		this.m_heroList.on(Laya.Event.MOUSE_MOVE, this, this.onScroll);
		this.m_heroList.on(Laya.Event.MOUSE_OUT, this, this.onScrollout);
		this.m_heroList.on(Laya.Event.MOUSE_UP, this, this.onScrollup);

		// 设置列表渲染函数
		this.m_seatList.itemRenderer = Laya.Handler.create(this, this.initSeatItem, null, false);
		// 列表内容单个item被点击
		this.m_seatList.on(fairygui.Events.CLICK_ITEM, this, this.onClickSeatItem);

		this.m_select1.onClick(this, this.selectClick, [0]);
		this.m_select2.onClick(this, this.selectClick, [1]);
		this.m_select3.onClick(this, this.selectClick, [2]);
		this.selectBtnEnable();
	}
	private selectClick(index: number): void {
		Game.battleScene.seatHeroSelect = index;
		this.selectBtnEnable();
		this.refrushHeroList();
	}
	private selectBtnEnable(): void {
		this.m_select1.enabled = Game.battleScene.seatHeroSelect != 0;
		this.m_select2.enabled = Game.battleScene.seatHeroSelect != 1;
		this.m_select3.enabled = Game.battleScene.seatHeroSelect != 2;
	}

	private rect: Laya.Rectangle;
	private dragItem: UI_PropBtn = null;
	// 拖拽列表中
	private onScroll(): void {
		if (this.dragItem == null) {
			this.rect = this.m_heroList.localToGlobalRect(0, 0, this.m_heroList.width, this.m_heroList.height);
			let cur: number = 0;
			while (this.dragItem == null) {
				let item = this.m_heroList.getChildAt(cur) as UI_PropBtn;
				let rect = item.localToGlobalRect(0, 0, item.width, item.height);
				if (rect.x >= this.rect.x + this.rect.width) {
					break;
				}
				if (rect.x < Laya.stage.mouseX && rect.x + item.width > Laya.stage.mouseX) {
					this.dragItem = item;
					break;
				}
				cur++;
			}
		}
	}
	// 拖拽出列表范围
	private onScrollout(): void {
		Game.battleData.heroInf = null;
		if (this.dragItem == null || this.dragItem.heroInf == null) return;
		Game.battleData.heroInf = this.dragItem.heroInf;
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(this.dragItem.displayObject);
		fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
		this.m_heroList.scrollPane.cancelDragging();
		this.dragItem = null;
	}
	// 在列表范围内抬起鼠标
	private onScrollup(): void {
		Game.battleData.heroInf = null;
		this.dragItem = null;
	}

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.heroList[index]);
	}
	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let index = this.m_heroList.getChildIndex(obj);
		// 转换为点击item在整个列表中的真实索引
		var realIndex: number = this.m_heroList.childIndexToItemIndex(index);
	}
	private refrushHeroList(): void {
		let list = HeroInfo.getList();
		this.heroList = [];
		if (!Game.battleScene.seatHeroDic.hasKey(Game.battleScene.seatHeroSelect)) {
			Game.battleScene.seatHeroDic.add(Game.battleScene.seatHeroSelect, new Dictionary<number, number>());
		}
		let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
		let seatList = dic.getValues();
		for (let i = 0, len = list.length; i < len; i++) {
			if (seatList.indexOf(Number(list[i].id)) == -1) {
				this.heroList.push(list[i]);
			}
		}
		this.m_heroList.numItems = this.heroList.length;
		this.m_seatList.numItems = 9;
	}


	// seat渲染item
	private initSeatItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.seatSetData(index);
	}
	// seat点击item
	private onClickSeatItem(obj: fairygui.GObject): void {
		let index = this.m_heroList.getChildIndex(obj);
		// 转换为点击item在整个列表中的真实索引
		var realIndex: number = this.m_seatList.childIndexToItemIndex(index);
	}

	private heroList: HeroInfo[] = [];

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
		EventManager.on(EventKey.ADD_HERO, this, this.refrushHeroList);
		this.refrushHeroList();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}


}
UI_ArrangementMain.bind();
