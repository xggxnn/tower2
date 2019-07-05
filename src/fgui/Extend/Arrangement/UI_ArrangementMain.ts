import fui_ArrangementMain from "../../Generates/Arrangement/fui_ArrangementMain";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import UI_PropBtn from "./UI_PropBtn";
import Game from "../../../Game";
import HeroInfo from "../../../dataInfo/HeroInfo";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import Dictionary from "../../../Tool/Dictionary";
import UI_Association from "./UI_Association";
import AssociationRaceInfo from "../../../dataInfo/AssociationRaceInfo";
import AssociationCareerInfo from "../../../dataInfo/AssociationCareerInfo";
import AssociationSpecialInfo from "../../../dataInfo/AssociationSpecialInfo";
import Association from "../../../gamemodule/DataStructs/Association";
import FiveElementsInfo from "../../../dataInfo/FiveElementsInfo";

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
		// this.m_heroList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
		this.m_heroList.on(Laya.Event.MOUSE_MOVE, this, this.onScroll);
		this.m_heroList.on(Laya.Event.MOUSE_OUT, this, this.onScrollout);
		this.m_heroList.on(Laya.Event.MOUSE_UP, this, this.onScrollup);

		// 设置列表渲染函数
		this.m_seatList.itemRenderer = Laya.Handler.create(this, this.initSeatItem, null, false);
		// 列表内容单个item被点击
		this.m_seatList.on(fairygui.Events.CLICK_ITEM, this, this.onClickSeatItem);

		this.m_associationList.setVirtual();
		// 设置列表渲染函数
		this.m_associationList.itemRenderer = Laya.Handler.create(this, this.initAssociationItem, null, false);

		// 下阵按钮
		this.m_removeSeatBtn.on(fairygui.Events.DROP, this, this.onDropRemove);

		this.m_select1.onClick(this, this.selectClick, [0]);
		this.m_select2.onClick(this, this.selectClick, [1]);
		this.m_select3.onClick(this, this.selectClick, [2]);
		this.selectBtnEnable();
	}
	// 拖拽松手在当前按钮上，上阵英雄下阵
	private onDropRemove(data: any, evt: laya.events.Event): void {
		console.log(data, evt);
		if (Game.battleData.seatPos == -1) return;
		if (Game.battleData.heroInf == null) return;
		if (Game.battleData.seatBtn != null) {
			Game.battleData.seatBtn.addHero(null);
			Game.battleData.seatBtn = null;
		}
	}
	// 切换布阵
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
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null) {
			this.rect = this.m_heroList.localToGlobalRect(0, 0, this.m_heroList.width, this.m_heroList.height);
			let cur: number = 0;
			while (this.dragItem == null && cur < this.m_heroList.numItems) {
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
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null || this.dragItem.heroInf == null) return;
		Game.battleData.seatPos = -1;
		Game.battleData.heroInf = this.dragItem.heroInf;
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(this.dragItem.displayObject);
		fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
		Game.battleData.startDrag = true;
		this.m_heroList.scrollPane.scrollToView(this.m_heroList.getFirstChildInView());
	}
	// 在列表范围内抬起鼠标
	private onScrollup(): void {
		Game.battleData.heroInf = null;
		this.dragItem = null;
	}
	// 鼠标抬起
	private mouseUp(): void {
		if (this.mouseupTimeout == -1 && Game.battleData.heroInf != null) {
			this.mouseupTimeout = setTimeout(() => {
				clearTimeout(this.mouseupTimeout);
				Game.battleData.heroInf = null;
				this.dragItem = null;
				Game.battleData.seatPos = -1;
				this.mouseupTimeout = -1;
				Game.battleData.startDrag = false;
			}, 10);
		}
	}
	private mouseupTimeout: number = -1;

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.heroList[index], this.moduleWindow);
	}
	// // 点击item
	// private onClickItem(obj: fairygui.GObject): void {
	// 	let index = this.m_heroList.getChildIndex(obj);
	// 	// 转换为点击item在整个列表中的真实索引
	// 	var realIndex: number = this.m_heroList.childIndexToItemIndex(index);
	// }
	// 刷新英雄列表
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
	// 显示所有羁绊关系
	private refrushAssociation(): void {
		this.association = [];
		let racelist = AssociationRaceInfo.getList();
		for (let i = 0, len = racelist.length; i < len; i++) {
			let _ass = new Association();
			_ass.num = racelist[i].num;
			_ass.attribute_id = racelist[i].attribute;
			_ass.values = racelist[i].value;
			_ass.race = racelist[i].race;
			_ass.names = FiveElementsInfo.getInfoWithType(_ass.race).name;
			this.association.push(_ass);
		}
		let careerlist = AssociationCareerInfo.getList();
		for (let i = 0, len = careerlist.length; i < len; i++) {
			let _ass = new Association();
			_ass.num = careerlist[i].num;
			_ass.attribute_id = careerlist[i].attribute;
			_ass.values = careerlist[i].value;
			_ass.career = careerlist[i].career;
			_ass.names = FiveElementsInfo.getInfoWithType(_ass.career).name;
			this.association.push(_ass);
		}
		let speciallist = AssociationSpecialInfo.getList();
		for (let i = 0, len = speciallist.length; i < len; i++) {
			let _ass = new Association();
			_ass.names = speciallist[i].name;
			_ass.attribute_id = speciallist[i].attribute;
			_ass.values = speciallist[i].value;
			let heros = [];
			let hero1 = speciallist[i].hero1;
			let hero2 = speciallist[i].hero2;
			let hero3 = speciallist[i].hero3;
			let hero4 = speciallist[i].hero4;
			let hero5 = speciallist[i].hero5;
			if (hero1 != 0) {
				heros.push(hero1);
			}
			if (hero2 != 0) {
				heros.push(hero2);
			}
			if (hero3 != 0) {
				heros.push(hero3);
			}
			if (hero4 != 0) {
				heros.push(hero4);
			}
			if (hero5 != 0) {
				heros.push(hero5);
			}
			_ass.hero = heros;
			this.association.push(_ass);
		}
		this.m_associationList.numItems = this.association.length;
	}

	// seat渲染item
	private initSeatItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.seatSetData(index, null, this.moduleWindow);
	}
	// seat点击item
	private onClickSeatItem(obj: fairygui.GObject): void {
		let index = this.m_heroList.getChildIndex(obj);
		// 转换为点击item在整个列表中的真实索引
		var realIndex: number = this.m_seatList.childIndexToItemIndex(index);
	}


	// Association渲染item
	private initAssociationItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_Association;
		item.setData(this.association[index], this.moduleWindow);
	}

	private heroList: HeroInfo[] = [];
	private association: Association[] = [];

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {

		let list = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
		for (let k = 0; k < 3; k++) {
			if (Game.battleScene.seatHeroDic.hasKey(k)) {
				let dic = Game.battleScene.seatHeroDic.getValue(k);
				for (let i = 0; i < 9; i++) {
					if (dic.hasKey(i)) {
						list[k][i] = dic.getValue(i);
					}
				}
			}
		}
		let data = {
			"seat": {
				"0": list[0],
				"1": list[1],
				"2": list[2]
			},
			"seatNum": Game.battleScene.seatHeroSelect
		}
		Game.proto.setSeat(data);
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
		Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
		EventManager.on(EventKey.ADD_HERO, this, this.refrushHeroList);
		this.refrushHeroList();
		this.refrushAssociation();
		if (this.heroList.length > 0) {
			this.m_heroList.scrollToView(0);
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
		Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
		EventManager.offAllCaller(this);
	}


}
UI_ArrangementMain.bind();
