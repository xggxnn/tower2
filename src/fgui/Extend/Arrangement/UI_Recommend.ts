import fui_Recommend from "../../Generates/Arrangement/fui_Recommend";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import UI_PropBtn from "./UI_PropBtn";
import Game from "../../../Game";
import HeroInfo from "../../../dataInfo/HeroInfo";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import UI_txt from "./UI_txt";
import Fun from "../../../Tool/Fun";
import Association from "../../../gamemodule/DataStructs/Association";
import AssociationRaceInfo from "../../../dataInfo/AssociationRaceInfo";
import AssociationCareerInfo from "../../../dataInfo/AssociationCareerInfo";
import Dictionary from "../../../Tool/Dictionary";
import AssociationAttributeInfo from "../../../dataInfo/AssociationAttributeInfo";
import FiveElementsInfo from "../../../dataInfo/FiveElementsInfo";

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
		let datas = this.assocation[this.assocation.length - 1];
		let att = AssociationAttributeInfo.getInfo(datas.attribute_id);
		item.m_titles.text = Fun.format("{0} X {1} 触发 ", datas.names, datas.num) + Fun.format(att.des, datas.values);
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.heroList[index], this.moduleWindow);
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
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null && this.m_heroList.numItems > 0) {
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

	private heroList: HeroInfo[] = [];
	private refrushHeroList(): void {
		let list = HeroInfo.getList();
		this.heroList = [];
		let ass = Game.battleData.association;
		if (!Game.battleScene.seatHeroDic.hasKey(Game.battleScene.seatHeroSelect)) {
			Game.battleScene.seatHeroDic.add(Game.battleScene.seatHeroSelect, new Dictionary<number, number>());
		}
		let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
		let seatList = dic.getValues();
		for (let i = 0, len = list.length; i < len; i++) {
			if (seatList.indexOf(Number(list[i].id)) != -1) {
				continue;
			}
			if (ass.race != 0) {
				if (list[i].race == ass.race) {
					this.heroList.push(list[i]);
				}
			}
			else if (ass.career != 0) {
				if (list[i].career == ass.career) {
					this.heroList.push(list[i]);
				}
			}
			else if (ass.hero.length > 0) {
				for (let k = ass.hero.length - 1; k >= 0; k--) {
					if (ass.hero[k] == Number(list[i].id)) {
						this.heroList.push(list[i]);
					}
				}
			}
		}
		this.m_heroList.numItems = this.heroList.length;
		this.assocation = [];
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


		if (ass.race != 0) {
			this.m_type.text = "职业羁绊：";
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
					this.assocation.push(_ass);
				}
			}
		}
		else if (ass.career != 0) {
			this.m_type.text = "种族羁绊：";
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
					this.assocation.push(_ass);
				}
			}
		}
		else if (ass.hero.length > 0) {
			this.m_type.text = "特殊羁绊：";
		}
		this.m_race.text = ass.names;
		if (this.assocation.length > 0) {
			this.m_list.numItems = 1;//this.assocation.length;
		}
		else {
			this.m_list.numItems = 0;
		}
	}
	assocation: Association[] = [];

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
		if (this.heroList.length > 0) {
			this.m_heroList.scrollToView(0);
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}


}
UI_Recommend.bind();
