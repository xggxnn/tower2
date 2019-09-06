import fui_HeroFetters from "../../Generates/Home/fui_HeroFetters";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import FWindow from "../../../gamemodule/FWindow";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";
import Association from "../../../gamemodule/DataStructs/Association";
import UI_ItemIcon from "../System/UI_ItemIcon";
import AssociationAttributeInfo from "../../../csvInfo/AssociationAttributeInfo";
import AssociationCareerInfo from "../../../csvInfo/AssociationCareerInfo";
import AssociationRaceInfo from "../../../csvInfo/AssociationRaceInfo";
import AssociationSpecialInfo from "../../../csvInfo/AssociationSpecialInfo";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroFetters extends fui_HeroFetters {

	moduleWindow: HomeWin;
	private fwindow: FWindow;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_HeroFetters {
		return <UI_HeroFetters>(fui_HeroFetters.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroFetters.URL, UI_HeroFetters);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_tuijianbackBtn.onClick(this, this.closeUI);
		this.m_bg.onClick(this, this.closeUI);
		this.m_heroList.setVirtual();
		this.m_heroList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_heroList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
	}

	// 关闭ui
	closeUI(): void {
		if (this.fwindow) {
			this.fwindow.windowRemoveChild(this);
		}
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}

	private heroList: Array<HeroInfoData> = [];
	private setData(): void {
		let hero = HeroInfoData.getInfo(Game.playData.fettersInf.id)
		this.heroList = [];
		switch (Number(Game.playData.fettersInf.type)) {
			case 0:
				{
					let names = Association.raceName(hero.race);
					this.m_typename.text = Fun.format("五行：{0}", names);
					let str = "";
					for (let i = 1, len = AssociationRaceInfo.getCount(); i <= len; i++) {
						let item = AssociationRaceInfo.getInfo(i);
						if (item.race == hero.race) {
							let att = AssociationAttributeInfo.getInfo(item.attribute);
							str += Fun.format("{0} X {1} 触发 ", names, item.num) + Fun.format(att.des, item.value) + "\n";
						}
					}
					this.m_tip.text = str;
					for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
						let heros = HeroInfoData.getInfo(i);
						if (heros.race == hero.race) {
							this.heroList.push(heros);
						}
					}
				}
				break;
			case 1:
				{
					let names = Association.careerName(hero.career);
					this.m_typename.text = Fun.format("门派：{0}", names);
					let str = "";
					for (let i = 1, len = AssociationCareerInfo.getCount(); i <= len; i++) {
						let item = AssociationCareerInfo.getInfo(i);
						if (item.career == hero.career) {
							let att = AssociationAttributeInfo.getInfo(item.attribute);
							str += Fun.format("{0} X {1} 触发 ", names, item.num) + Fun.format(att.des, item.value) + "\n";
						}
					}
					this.m_tip.text = str;
					for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
						let heros = HeroInfoData.getInfo(i);
						if (heros.career == hero.career) {
							this.heroList.push(heros);
						}
					}
				}
				break;
			case 2:
				this.heroList = Association.pointFetter(hero.point_fetters);
				let assSpecial = AssociationSpecialInfo.getInfo(hero.point_fetters);
				this.m_typename.text = Association.attributeIdToName(assSpecial.attribute);
				this.m_tip.text = Fun.format("{0} 触发 ", "以上英雄同时上阵") + Fun.format(assSpecial.name, assSpecial.value);
				break;
		}
		this.m_heroList.numItems = this.heroList.length;
	}

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		item.setHero(this.heroList[index]);
	}

	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		Game.popup.showPopup(obj, true, false, "英雄：{0}", item.hero.id + 11);
	}


}
UI_HeroFetters.bind();
