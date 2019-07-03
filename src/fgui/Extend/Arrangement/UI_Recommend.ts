import fui_Recommend from "../../Generates/Arrangement/fui_Recommend";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import UI_PropBtn from "./UI_PropBtn";
import Game from "../../../Game";
import HeroInfo from "../../../dataInfo/HeroInfo";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import UI_txt from "./UI_txt";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Recommend extends fui_Recommend {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_Recommend {
		return <UI_Recommend>(fui_Recommend.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Recommend.URL, UI_Recommend);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_closeBtn.onClick(this, this.clickClose);
		this.m_heroList.setVirtual();
		// 设置列表渲染函数
		this.m_heroList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// 列表内容单个item被点击
		this.m_heroList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
		this.m_heroList.on(Laya.Event.MOUSE_MOVE, this, this.onScroll);
		this.m_heroList.on(Laya.Event.MOUSE_OUT, this, this.onScrollout);
		this.m_heroList.on(Laya.Event.MOUSE_UP, this, this.onScrollup);

		this.m_list.itemRenderer = Laya.Handler.create(this, this.initjibanItem, null, false);
	}
	clickClose(): void {
		this.moduleWindow.windowRemoveChild(this);
	}

	// 渲染item
	private initjibanItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_txt;
		item.m_titles.text = "战士 X" + index;
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

	private heroList: HeroInfo[] = [];
	private refrushHeroList(): void {
		let list = HeroInfo.getList();
		this.heroList = [];
		for (let i = 0, len = list.length; i < len; i++) {
			if (Number(list[i].race) == 1) {
				this.heroList.push(list[i]);
			}
		}
		this.m_heroList.numItems = this.heroList.length;
		this.m_list.numItems = 3;
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
		EventManager.on(EventKey.ADD_HERO, this, this.refrushHeroList);
		this.refrushHeroList();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}


}
UI_Recommend.bind();
