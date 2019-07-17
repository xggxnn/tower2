import fui_HeroFetters from "../../Generates/Home/fui_HeroFetters";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import FWindow from "../../../gamemodule/FWindow";
import Game from "../../../Game";
import HeroInfo from "../../../dataInfo/HeroInfo";
import Fun from "../../../Tool/Fun";
import FiveElementsInfo from "../../../dataInfo/FiveElementsInfo";
import AssociationRaceInfo from "../../../dataInfo/AssociationRaceInfo";
import Association from "../../../gamemodule/DataStructs/Association";
import AssociationAttributeInfo from "../../../dataInfo/AssociationAttributeInfo";
import UI_ItemIcon from "../System/UI_ItemIcon";
import AssociationCareerInfo from "../../../dataInfo/AssociationCareerInfo";

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
		this.m_heroList.setVirtual();
		this.m_tuijianbackBtn.onClick(this, this.closeUI);
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

	private heroList: Array<HeroInfo> = [];
	private setData(): void {
		let hero = HeroInfo.getInfo(Game.playData.fettersInf.id)
		this.heroList = [];
		switch (Number(Game.playData.fettersInf.type)) {
			case 0:
				{
					let names = FiveElementsInfo.getInfoWithType(hero.race).name;
					this.m_typename.text = Fun.format("五行：{0}", names);
					let racelist = AssociationRaceInfo.getList();
					let str = "";
					for (let i = 0, len = racelist.length; i < len; i++) {
						if (racelist[i].race == hero.race) {
							let att = AssociationAttributeInfo.getInfo(racelist[i].attribute);
							str += Fun.format("{0} X {1} 触发 ", names, racelist[i].num) + Fun.format(att.des, racelist[i].value) + "<br />";
						}
					}
					this.m_tip.text = str;
					let list = HeroInfo.getList();
					for (let i = 0, len = list.length; i < len; i++) {
						let heros = HeroInfo.getInfo(list[i]);
						if (list[i].race == hero.race) {
							this.heroList.push(list[i]);
						}
					}
				}
				break;
			case 1:
				{
					let names = FiveElementsInfo.getInfoWithType(hero.career).name;
					this.m_typename.text = Fun.format("门派：{0}", names);
					let racelist = AssociationCareerInfo.getList();
					let str = "";
					for (let i = 0, len = racelist.length; i < len; i++) {
						if (racelist[i].career == hero.career) {
							let att = AssociationAttributeInfo.getInfo(racelist[i].attribute);
							str += Fun.format("{0} X {1} 触发 ", names, racelist[i].num) + Fun.format(att.des, racelist[i].value) + "<br />";
						}
					}
					this.m_tip.text = str;
					let list = HeroInfo.getList();
					for (let i = 0, len = list.length; i < len; i++) {
						let heros = HeroInfo.getInfo(list[i]);
						if (list[i].career == hero.career) {
							this.heroList.push(list[i]);
						}
					}
				}
				break;
			case 2:
				this.m_typename.text = "特殊羁绊";
				this.m_tip.text = "";
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
		Game.popup.showPopup(obj, true, [item.hero.name]);
	}


}
UI_HeroFetters.bind();
