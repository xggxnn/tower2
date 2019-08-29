import fui_AssociationItem from "../../Generates/Arrangement/fui_AssociationItem";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import Association from "../../../gamemodule/DataStructs/Association";
import AssociationAttributeInfo from "../../../csvInfo/AssociationAttributeInfo";
import Fun from "../../../Tool/Fun";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import UI_HeroIcon55 from "./UI_HeroIcon55";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_AssociationItem extends fui_AssociationItem {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_AssociationItem {
		return <UI_AssociationItem>(fui_AssociationItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_AssociationItem.URL, UI_AssociationItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_heroList.itemRenderer = Laya.Handler.create(this, this.initHeroItem, null, false);
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

	setData(datas: Association, index: number): void {
		let att = AssociationAttributeInfo.getInfo(datas.attribute_id);
		this.m_tip.text = Fun.format(att.des, datas.values);
		if (datas.race > 0) {
			this.m_icons.icon = SpriteKey.getUrl("race" + datas.race + ".png");
		}
		else if (datas.career > 0) {
			this.m_icons.icon = SpriteKey.getUrl("career" + datas.career + ".png");
		}
		else {
			this.m_icons.icon = "";
		}
		this.m_count.setVar("count", datas.num.toString()).flushVars();
		let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
		this.heroList = [];
		for (let i = 0; i < 9; i++) {
			if (seatList[i] > 0) {
				let hero = HeroInfoData.getInfo(seatList[i]);
				if (datas.race > 0 && hero.race == datas.race) {
					this.heroList.push(hero);
				}
				else if (datas.career > 0 && hero.career == datas.career) {
					this.heroList.push(hero);
				}
			}
		}
		this.m_heroList.numItems = this.heroList.length;
		this.m_double.setSelectedIndex(index);
	}
	private heroList: Array<HeroInfoData> = [];
	// 渲染item
	private initHeroItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_HeroIcon55;
		item.m_icons.icon = SpriteKey.getUrl("hero_" + this.heroList[index].skin + ".png");
		item.m_quality.icon = SpriteKey.getUrl("quality" + this.heroList[index].quality + ".png");
	}

}
UI_AssociationItem.bind();
