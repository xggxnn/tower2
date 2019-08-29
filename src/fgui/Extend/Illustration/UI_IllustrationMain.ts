import fui_IllustrationMain from "../../Generates/Illustration/fui_IllustrationMain";
import IllustrationWin from "../../../gamemodule/Windows/IllustrationWin";
import Dictionary from "../../../Tool/Dictionary";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import Game from "../../../Game";
import HeroqualityInfo from "../../../csvInfo/HeroqualityInfo";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import UI_HeroItem from "./UI_HeroItem";
import { MenuId } from "../../../gamemodule/MenuId";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_IllustrationMain extends fui_IllustrationMain {

	moduleWindow: IllustrationWin;

	public static DependPackages: string[] = ["Illustration"];

	public static createInstance(): UI_IllustrationMain {
		return <UI_IllustrationMain>(fui_IllustrationMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_IllustrationMain.URL, UI_IllustrationMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_closeBtn.onClick(this, this.closeUI);

		this.m_list.setVirtual();
		// 设置列表渲染函数
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
		Game.menu.open(MenuId.Home);
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this.moduleWindow, this.moduleWindow.createSynthetiseUI);
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.setData);
		EventManager.on(ProtoEvent.UPQUALITY_CALL_BACK, this.moduleWindow, this.moduleWindow.createSynthetiseUI);
		EventManager.on(ProtoEvent.UPQUALITY_CALL_BACK, this, this.setData);
		Game.playData.sShowFetters.add(this.moduleWindow.createHeroFetters, this.moduleWindow);
		if (Game.playData.guideIndex == GuideType.Win) {
			Game.playData.guideIndex = GuideType.ShowHeroList;
		}
		this.scrollToViewNum = -1;
		this.setData();
	}
	private scrollToViewNum: number = 0;
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Game.playData.sShowFetters.remove(this.moduleWindow.createHeroFetters, this.moduleWindow);
		EventManager.offAllCaller(this);
	}
	// 英雄碎片情况
	private datas: Dictionary<number, number> = new Dictionary<number, number>();
	private idList: Array<string> = [];
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_HeroItem;
		item.setData(this.idList[index], this.datas.getValue(this.idList[index]), this.moduleWindow, index);
	}

	private setData(): void {
		this.moduleWindow.closeOtherWindow();
		if (this.scrollToViewNum == -1) {
			this.scrollToViewNum = 0;
		}
		else {
			this.scrollToViewNum = this.m_list.getFirstChildInView();
		}
		this.datas.clear();
		let firstCanSyn: number = -1;
		for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
			let hero: HeroInfoData = HeroInfoData.getInfo(i);
			if (Game.haveHeroTem.indexOf(hero.skin) != -1) {
				if (Game.playData.curClips.hasKey(hero.id)) {
					let clips = Game.playData.curClips.getValue(hero.id);
					this.datas.add(hero.id, clips);
					if (firstCanSyn == -1) {
						let heroQuality = HeroqualityInfo.getInfoQuality(hero.quality);
						if (heroQuality && clips >= heroQuality.clip_hero) {
							firstCanSyn = this.datas.count - 1;
						}
					}
				}
				else {
					this.datas.add(hero.id, 0);
				}
			}
		}
		this.idList = this.datas.getKeys();
		this.m_list.numItems = this.datas.count;
		if (Game.playData.guideIndex == GuideType.ShowHeroList && firstCanSyn >= 0) {
			Game.playData.guideIndex = GuideType.ShowHeroListOver;
			this.m_list.scrollToView(firstCanSyn);
		}
		else {
			this.m_list.scrollToView(this.scrollToViewNum);
		}
	}

}
UI_IllustrationMain.bind();
