import fui_ArrangementMain from "../../Generates/Arrangement/fui_ArrangementMain";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import UI_PropBtn from "./UI_PropBtn";
import Game from "../../../Game";
import HeroInfo from "../../../dataInfo/HeroInfo";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import Dictionary from "../../../Tool/Dictionary";
import AssociationRaceInfo from "../../../dataInfo/AssociationRaceInfo";
import AssociationCareerInfo from "../../../dataInfo/AssociationCareerInfo";
import AssociationSpecialInfo from "../../../dataInfo/AssociationSpecialInfo";
import Association from "../../../gamemodule/DataStructs/Association";
import FiveElementsInfo from "../../../dataInfo/FiveElementsInfo";
import { Tick } from "../../../Tool/TickManager";
import Fun from "../../../Tool/Fun";
import UI_AssItem from "./UI_AssItem";
import AssociationAttributeInfo from "../../../dataInfo/AssociationAttributeInfo";
import TimeHouseInfo from "../../../dataInfo/TimeHouseInfo";

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
		// 升级
		this.m_levelUpBtn.on(Laya.Event.MOUSE_DOWN, this, this.levelUpDown);
		this.m_levelUpBtn.on(Laya.Event.MOUSE_OUT, this, this.levelUpUp);
		this.m_levelUpBtn.on(Laya.Event.MOUSE_UP, this, this.levelUpUp);
		// 升星
		this.m_starUpBtn.onClick(this, this.starUpClick);

		this.m_select1.onClick(this, this.selectClick, [0]);
		this.m_select2.onClick(this, this.selectClick, [1]);
		this.m_select3.onClick(this, this.selectClick, [2]);

		this.tuijianInit();
		this.qianghuaInit();
	}
	private levelTick: Tick = null;
	private _levelAdd: number = 0;
	// 点击升级按钮
	private levelUpDown(): void {
		this._levelAdd = 0;
		if (this.levelTick) {
			this.levelTick.Stop();
			Game.tick.clearTick(this.levelTick);
			this.levelTick = null;
		}
		this.levelTick = Game.tick.addTick(9, Laya.Handler.create(this, this.levelAdd, null, false), null);
		this.levelTick.Start();

	}
	private levelAdd(): void {
		this._levelAdd++;
	}
	private levelUpUp(): void {
		if (this.levelTick) {
			this.levelTick.Stop();
			Game.tick.clearTick(this.levelTick);
			this.levelTick = null;
			let data = {
				upLevel: this._levelAdd,
			}
			Game.proto.upLevel(data);
		}
	}
	// 点击升星按钮
	private starUpClick(): void {
		Game.proto.upStar({});
	}
	// 拖拽松手在当前按钮上，上阵英雄下阵
	private onDropRemove(data: any, evt: laya.events.Event): void {
		if (Game.battleData.seatPos == -1) return;
		if (Game.battleData.heroInf == null) return;
		if (Game.battleData.seatBtn != null) {
			Game.battleData.seatBtn.addHero(null);
			Game.battleData.seatBtn = null;
		}
	}
	private refreshCoinGold(): void {
		this.m_gold.text = Fun.format("金币：{0}", Game.playData.curGold);
	}
	private refreshCoinJadeite(): void {
		this.m_jadeite.text = Fun.format("翡翠：{0}", Game.playData.curJadeite);
	}
	// 切换布阵
	private selectClick(index: number): void {
		if (Game.battleScene.seatHeroSelect != index) {
			Game.battleScene.seatHeroSelect = index;
			this.refrushHeroList();
		}
	}

	private dragItem: UI_PropBtn = null;
	// 拖拽英雄列表中
	private onScroll(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null) {
			let listNum = this.m_heroList.numItems;
			for (let cur = 0; cur < listNum; cur++) {
				if (cur >= listNum - this.m_heroList.getFirstChildInView()) {
					break;
				}
				let item = this.m_heroList.getChildAt(cur) as UI_PropBtn;
				if (item) {
					if (this.m_heroList.scrollPane.isChildInView(item)) {
						let itemRect = item.localToGlobalRect(0, 0, item.width, item.height);
						if (Laya.stage.mouseX < itemRect.x) {
							break;
						}
						if (Laya.stage.mouseX > itemRect.x) {
							this.dragItem = item
						}
					}
				}
			}
		}
	}
	// 拖拽出英雄列表范围
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
		else {
			Game.battleData.heroInf = null;
			this.dragItem = null;
			Game.battleData.seatPos = -1;
			this.mouseupTimeout = -1;
			Game.battleData.startDrag = false;
		}
	}
	private mouseupTimeout: number = -1;

	// 渲染item 英雄列表的item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.heroList[index], this.moduleWindow);
	}
	// 刷新英雄列表
	private refrushHeroList(): void {
		let list = Game.playData.curHero;
		this.heroList = [];
		let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
		let seatList = dic.getValues();
		for (let i = 0, len = list.length; i < len; i++) {
			if (seatList.indexOf(list[i]) == -1) {
				let hero = HeroInfo.getInfo(list[i]);
				this.heroList.push(hero);
			}
		}
		this.m_heroList.numItems = this.heroList.length;
		this.m_seatList.numItems = 9;
		this.refrushAssociation();
	}
	// 显示所有羁绊关系
	private refrushAssociation(): void {
		this.association = Game.battleData.refrushAssociation(true);
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
		let item = obj as UI_AssItem;
		item.setData(this.association[index], this);
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
		EventManager.on(EventKey.ADD_HERO, this, this.refrushTuijianHeroList);
		EventManager.on(EventKey.HERO_LEVEL_UPDATE, this, this.refreshHeroLevel);
		EventManager.on(EventKey.HERO_STAR_UPDATE, this, this.refreshHeroStar);
		EventManager.on(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinGold);
		EventManager.on(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinJadeite);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
		Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
		EventManager.offAllCaller(this);
	}
	// 界面赋值
	private setData(): void {
		this.changeStatus(0);
		this.refrushHeroList();
		if (this.heroList.length > 0) {
			this.m_heroList.scrollToView(0);
		}
		this.refreshHeroLevel();
		this.refreshHeroStar();
		this.refreshCoinGold();
		this.refreshCoinJadeite();
		this.m_tab.setSelectedIndex(Game.battleScene.seatHeroSelect);
	}
	// 刷新英雄等级
	private refreshHeroLevel(): void {
		let timeHouse: TimeHouseInfo = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
		this.m_levelUpBtn.title = Fun.formatNumberUnit(timeHouse.cost_gold);
		this.m_level.setVar("count", Game.playData.curLevel.toString()).flushVars();
	}
	// 刷新英雄星级
	private refreshHeroStar(): void {
		let list = TimeHouseInfo.getList();
		for (let i = list.length - 1; i >= 0; i--) {
			if (list[i].star == Game.playData.curStar && list[i].cost_jadeite > 0) {
				this.m_starUpBtn.title = Fun.formatNumberUnit(list[i].cost_jadeite);
				break;
			}
		}
		this.m_star.setVar("count", Game.playData.curStar.toString()).flushVars();
	}




	// 切换状态
	public changeStatus(index: number): void {
		if (this.m_page.selectedIndex != index) {
			this.m_page.setSelectedIndex(index);
			if (index == 1) {
				// 强化
			}
			else if (index == 2) {
				// 推荐阵容
				this.refrushTuijianHeroList();
			}
		}
	}

	/***********************	推荐相关	************************ */
	private tuijianInit(): void {
		this.m_tuijianbackBtn.onClick(this, this.changeStatus, [0]);
		this.m_tuijianheroList.setVirtual();
		// 设置列表渲染函数
		this.m_tuijianheroList.itemRenderer = Laya.Handler.create(this, this.initTuijianItem, null, false);

		this.m_tuijianheroList.on(Laya.Event.MOUSE_MOVE, this, this.onScrollTuijian);
		this.m_tuijianheroList.on(Laya.Event.MOUSE_OUT, this, this.onScrolloutTuijian);
		this.m_tuijianheroList.on(Laya.Event.MOUSE_UP, this, this.onScrollup);
	}

	private tuijianHeroList: HeroInfo[] = [];
	private tuijianAssociation: Association = null;
	// 刷新推荐英雄列表
	private refrushTuijianHeroList(): void {
		if (this.m_page.selectedIndex != 2) return;
		let list = Game.playData.curHero;
		this.tuijianHeroList = [];
		let ass = Game.battleData.association;
		let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
		let seatList = dic.getValues();
		for (let i = 0, len = list.length; i < len; i++) {
			if (seatList.indexOf(list[i]) != -1) {
				continue;
			}
			let hero = HeroInfo.getInfo(list[i]);
			if (ass.race != 0) {
				if (hero.race == ass.race) {
					this.tuijianHeroList.push(hero);
				}
			}
			else if (ass.career != 0) {
				if (hero.career == ass.career) {
					this.tuijianHeroList.push(hero);
				}
			}
			else if (ass.hero.length > 0) {
				for (let k = ass.hero.length - 1; k >= 0; k--) {
					if (ass.hero[k] == list[i]) {
						this.tuijianHeroList.push(hero);
					}
				}
			}
		}
		this.m_tuijianheroList.numItems = this.tuijianHeroList.length;
		let assocationLength = 0;
		for (let i = 0, len = seatList.length; i < len; i++) {
			if (ass.race != 0) {
				if (seatList[i] > 0) {
					let hero = HeroInfo.getInfo(seatList[i]);
					if (hero.race == ass.race) {
						assocationLength++;
					}
				}
			}
			else if (ass.career != 0) {
				if (seatList[i] > 0) {
					let hero = HeroInfo.getInfo(seatList[i]);
					if (hero.career == ass.career) {
						assocationLength++;
					}
				}
			}
			else if (ass.hero.length > 0) {
				for (let k = ass.hero.length - 1; k >= 0; k--) {
					if (ass.hero.indexOf(seatList[i]) != -1) {
						assocationLength++;
					}
				}
			}
		}

		this.tuijianAssociation = null;
		if (ass.race != 0) {
			//"职业羁绊：";
			let racelist = AssociationRaceInfo.getList();
			let names = FiveElementsInfo.getInfoWithType(ass.race).name;
			for (let i = 0, len = racelist.length; i < len; i++) {
				if (racelist[i].race == ass.race && racelist[i].num <= assocationLength) {
					let _ass = new Association();
					_ass.names = names;
					_ass.num = racelist[i].num;
					_ass.attribute_id = racelist[i].attribute;
					_ass.values = racelist[i].value;
					_ass.race = racelist[i].race;
					if (this.tuijianAssociation == null) {
						this.tuijianAssociation = _ass;
					}
					else {
						if (this.tuijianAssociation.num < _ass.num) {
							this.tuijianAssociation = _ass;
						}
					}
				}
			}
		}
		else if (ass.career != 0) {
			//"种族羁绊：";
			let careerlist = AssociationCareerInfo.getList();
			let names = FiveElementsInfo.getInfoWithType(ass.career).name;
			for (let i = 0, len = careerlist.length; i < len; i++) {
				if (careerlist[i].career == ass.career && careerlist[i].num <= assocationLength) {
					let _ass = new Association();
					_ass.names = names;
					_ass.num = careerlist[i].num;
					_ass.attribute_id = careerlist[i].attribute;
					_ass.values = careerlist[i].value;
					_ass.career = careerlist[i].career;
					if (this.tuijianAssociation == null) {
						this.tuijianAssociation = _ass;
					}
					else {
						if (this.tuijianAssociation.num < _ass.num) {
							this.tuijianAssociation = _ass;
						}
					}
				}
			}
		}
		else if (ass.hero.length > 0) {
			// "特殊羁绊：";
		}

		if (this.tuijianAssociation != null) {
			let att = AssociationAttributeInfo.getInfo(this.tuijianAssociation.attribute_id);
			this.m_tip.text = Fun.format("{0} X {1} 触发 ", this.tuijianAssociation.names, this.tuijianAssociation.num) + Fun.format(att.des, this.tuijianAssociation.values);
		}
		else {
			this.m_tip.text = "无";
		}
	}

	// 渲染item 英雄列表的item
	private initTuijianItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.tuijianHeroList[index], this.moduleWindow);
	}

	// 拖拽推荐英雄列表中
	private onScrollTuijian(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null) {
			let listNum = this.m_tuijianheroList.numItems;
			for (let cur = 0; cur < listNum; cur++) {
				if (cur >= listNum - this.m_tuijianheroList.getFirstChildInView()) {
					break;
				}
				let item = this.m_tuijianheroList.getChildAt(cur) as UI_PropBtn;
				if (item) {
					if (this.m_tuijianheroList.scrollPane.isChildInView(item)) {
						let itemRect = item.localToGlobalRect(0, 0, item.width, item.height);
						if (Laya.stage.mouseX < itemRect.x) {
							break;
						}
						if (Laya.stage.mouseX > itemRect.x) {
							this.dragItem = item
						}
					}
				}
			}
		}
	}

	// 拖拽出英雄列表范围
	private onScrolloutTuijian(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null || this.dragItem.heroInf == null) return;
		Game.battleData.seatPos = -1;
		Game.battleData.heroInf = this.dragItem.heroInf;
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(this.dragItem.displayObject);
		fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
		Game.battleData.startDrag = true;
		this.m_tuijianheroList.scrollPane.scrollToView(this.m_tuijianheroList.getFirstChildInView());
	}

	/***********************	强化相关	************************ */
	private qianghuaInit(): void {
		this.m_qianghuabackBtn.onClick(this, this.changeStatus, [0]);
		// this.m_hitBtn.visible = true;
		// this.m_hitBtn.onClick(this, this.changeStatus, [1]);

		// this.m_qianghuaheroList.setVirtual();
		// // 设置列表渲染函数
		// this.m_qianghuaheroList.itemRenderer = Laya.Handler.create(this, this.initQianghuaItem, null, false);

		// this.m_qianghuaheroList.on(Laya.Event.MOUSE_MOVE, this, this.onScrollTuijian);
		// this.m_qianghuaheroList.on(Laya.Event.MOUSE_OUT, this, this.onScrollout);
		// this.m_qianghuaheroList.on(Laya.Event.MOUSE_UP, this, this.onScrollup);

		// this.m_qianghuaheroList2.setVirtual();
		// // 设置列表渲染函数
		// this.m_qianghuaheroList2.itemRenderer = Laya.Handler.create(this, this.initTuijianItem, null, false);

		// this.m_qianghuaheroList2.on(Laya.Event.MOUSE_MOVE, this, this.onScrollTuijian);
		// this.m_qianghuaheroList2.on(Laya.Event.MOUSE_OUT, this, this.onScrollout);
		// this.m_qianghuaheroList2.on(Laya.Event.MOUSE_UP, this, this.onScrollup);
	}
	// private qianghuaHeroList: HeroInfo[] = [];
	// // 渲染item 英雄列表的item
	// private initQianghuaItem(index: number, obj: fairygui.GObject): void {
	// 	let item = obj as UI_PropBtn;
	// 	item.setData(this.qianghuaHeroList[index], this.moduleWindow);
	// }




}
UI_ArrangementMain.bind();
