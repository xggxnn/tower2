import fui_AssociationItem from "../../Generates/Arrangement/fui_AssociationItem";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import Association from "../../../gamemodule/DataStructs/Association";
import AssociationAttributeInfo from "../../../csvInfo/AssociationAttributeInfo";
import Fun from "../../../tool/Fun";
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

	setData(datas: Association, index: number, gray: number): void {
		let seleIndex: number = gray < index ? 1 : 0
		this.m_isGray.setSelectedIndex(seleIndex);
		index = index % 2;
		let att = AssociationAttributeInfo.getInfo(datas.attribute_id);
		this.m_rewardStatus.setSelectedIndex(Game.playData.associationattribute.indexOf(datas.attribute_id) == -1 ? 1 : 0);
		if (seleIndex == 0 || Game.playData.unlockAssociationattribute.indexOf(datas.attribute_id) != -1) {
			this.m_tip.text = Fun.format(att.des, datas.values);
		}
		else {
			this.m_tip.text = Game.tipTxt.txts("AssociationLockTip");
		}
		if (datas.race > 0) {
			this.m_icons.icon = SpriteKey.getUrl("race" + datas.race + ".png");
		}
		else if (datas.career > 0) {
			this.m_icons.icon = SpriteKey.getUrl("career" + datas.career + ".png");
		}
		else if (datas.pointF > 0) {
			this.m_icons.icon = SpriteKey.getUrl("point" + datas.pointF + ".png");
		}
		else {
			this.m_icons.icon = "";
		}
		this.m_count.setVar("count", datas.num.toString()).flushVars();
		this.heroList = [];
		let seatList: Array<number> = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
		if (Game.battleData.MenuEnterDay) {
			let herolist = Game.battleData.dayHeroSeat;
			seatList = [];
			for (let i = 0; i < 9; i++) {
				if (herolist[i] != null) {
					if (datas.race > 0 && herolist[i].race == datas.race) {
						seatList.push(herolist[i].id);
						this.heroList.push(herolist[i]);
					}
					else if (datas.career > 0 && herolist[i].career == datas.career) {
						seatList.push(herolist[i].id);
						this.heroList.push(herolist[i]);
					}
					else if (datas.pointF > 0 && herolist[i].point_fetters == datas.pointF) {
						seatList.push(herolist[i].id);
						this.heroList.push(herolist[i]);
					}
				}
			}
		}
		else {
			for (let i = 0; i < 9; i++) {
				if (seatList[i] > 0) {
					let hero = HeroInfoData.getInfo(seatList[i]);
					if (datas.race > 0 && hero.race == datas.race) {
						this.heroList.push(hero);
					}
					else if (datas.career > 0 && hero.career == datas.career) {
						this.heroList.push(hero);
					}
					else if (datas.pointF > 0 && hero.point_fetters == datas.pointF) {
						this.heroList.push(hero);
					}
				}
			}
		}
		this.heroList.sort((a: HeroInfoData, b: HeroInfoData) => {
			if (a.id > b.id) {
				return 1;
			}
			else if (a.id < b.id) {
				return -1;
			}
			return 0;
		});
		this.grayHeroIndex = this.heroList.length - 1;
		for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
			let hero = HeroInfoData.getInfo(i);
			if (seatList.indexOf(i) == -1) {
				if (datas.race > 0 && hero.race == datas.race) {
					this.heroList.push(hero);
				}
				else if (datas.career > 0 && hero.career == datas.career) {
					this.heroList.push(hero);
				}
				else if (datas.pointF > 0 && hero.point_fetters == datas.pointF) {
					this.heroList.push(hero);
				}
			}
		}
		this.m_heroList.numItems = this.heroList.length;
		this.m_double.setSelectedIndex(index);
	}
	private heroList: Array<HeroInfoData> = [];
	private grayHeroIndex: number = 0;
	// 渲染item
	private initHeroItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_HeroIcon55;
		item.m_icons.icon = SpriteKey.getUrl("hero_" + this.heroList[index].skin + ".png");
		item.m_quality.icon = SpriteKey.getUrl("quality" + this.heroList[index].quality + ".png");
		let bol = this.grayHeroIndex < index;
		item.m_icons.grayed = bol;
		item.m_quality.grayed = bol;
	}

}
UI_AssociationItem.bind();
