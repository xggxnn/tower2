import fui_BattleTopMiddle from "../../Generates/Battle/fui_BattleTopMiddle";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import UI_AssociationBtn from "./UI_AssociationBtn";
import SpriteKey from "../../SpriteKey";
import Association from "../../../gamemodule/DataStructs/Association";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";
import AssociationAttributeInfo from "../../../csvInfo/AssociationAttributeInfo";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import UI_HeroIcon6060 from "./UI_HeroIcon6060";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleTopMiddle extends fui_BattleTopMiddle {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleTopMiddle {
		return <UI_BattleTopMiddle>(fui_BattleTopMiddle.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleTopMiddle.URL, UI_BattleTopMiddle);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		// 设置列表渲染函数
		this.m_associationList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// 列表内容单个item被点击
		this.m_associationList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);

		this.m_heroList.itemRenderer = Laya.Handler.create(this, this.initHeroItem, null, false);
	}
	private heroList: Array<HeroInfoData> = [];
	// 渲染item
	private initHeroItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_HeroIcon6060;
		item.icon = SpriteKey.getUrl("hero_" + this.heroList[index].skin + ".png");
	}
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_AssociationBtn;
		let ass = this.association[index];
		item.m_titles.setVar("count", ass.num.toString()).flushVars();
		if (ass.race > 0) {
			item.icon = SpriteKey.getUrl("race" + ass.race + ".png");
		}
		else if (ass.career > 0) {
			item.icon = SpriteKey.getUrl("career" + ass.career + ".png");
		}
	}
	private inRichText: fairygui.GRichTextField = null;
	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let index = this.m_associationList.getChildIndex(obj);
		this.m_t0.stop();
		let ass = this.association[index];
		let att = AssociationAttributeInfo.getInfo(ass.attribute_id);
		this.m_title.text = Fun.format("[color=#61aa66]{0}[/color] X [color=#51FC55]{1}[/color]  ", ass.names, ass.num)
			+ Fun.format(att.des, ass.values);
		let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
		this.heroList = [];
		for (let i = 0; i < 9; i++) {
			if (seatList[i] > 0) {
				let hero = HeroInfoData.getInfo(seatList[i]);
				if (ass.race > 0 && hero.race == ass.race) {
					this.heroList.push(hero);
				}
				else if (ass.career > 0 && hero.career == ass.career) {
					this.heroList.push(hero);
				}
			}
		}
		this.m_heroList.numItems = this.heroList.length;

		this.m_c1.setSelectedIndex(1);
		// EventManager.event(EventKey.FETTERS_SHOW_HIDE, [true, ass]);
		this.m_t0.play(Laya.Handler.create(this, this.hideMethod));
	}
	hideMethod(): void {
		this.m_c1.setSelectedIndex(0);
		// EventManager.event(EventKey.FETTERS_SHOW_HIDE, [false]);
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	private association: Association[] = [];
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(EventKey.RE_TRYPLAY, this, this.setData);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}

	private setData(): void {
		this.m_c1.setSelectedIndex(0);
		this.association = Game.battleData.refrushAssociation(true);
		this.m_associationList.numItems = this.association.length;
	}

}
UI_BattleTopMiddle.bind();