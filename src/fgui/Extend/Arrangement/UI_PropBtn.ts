import fui_PropBtn from "../../Generates/Arrangement/fui_PropBtn";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import BagWin from "../../../gamemodule/Windows/BagWin";
import Dictionary from "../../../tool/Dictionary";
import Fun from "../../../tool/Fun";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import BaseSK from "../../../base/BaseSK";
import { HeroAniEnums } from "../../../gamemodule/DataEnums/HeroAniEnums";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import PositionunlockInfo from "../../../csvInfo/PositionunlockInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_PropBtn extends fui_PropBtn {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_PropBtn {
		return <UI_PropBtn>(fui_PropBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_PropBtn.URL, UI_PropBtn);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.onClick(this, this.clickBtn);
	}
	// 按钮被点击
	private clickBtn(): void {
		if (Game.battleData.startDrag) return;
		if (this.heroInf != null && Game.battleMap.maxMapId >= 3) {
			Game.battleData.clickHeroInf = this.heroInf;
			this.moduleWindow.createHeroInfoUI();
		}
	}

	public heroInf: HeroInfoData = null;
	// 列表英雄赋值
	public setData(heroInf: HeroInfoData, moduleWindow: ArrangementWin, showicon: boolean = true): void {
		if (this.moduleWindow == null) this.moduleWindow = moduleWindow;
		this.heroInf = heroInf;
		this.title = heroInf.name;
		this.icon = Game.playData.getIcon(this.heroInf.id + 11);
		this.m_quality.icon = SpriteKey.getUrl("quality" + this.heroInf.quality + ".png");
		this.m_race.icon = SpriteKey.getUrl("race" + this.heroInf.race + ".png");
		this.m_career.icon = SpriteKey.getUrl("career" + this.heroInf.career + ".png");

		this.m_status.setSelectedIndex(1);
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



}
UI_PropBtn.bind();
