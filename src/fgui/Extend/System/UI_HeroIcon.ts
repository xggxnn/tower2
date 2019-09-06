import fui_HeroIcon from "../../Generates/System/fui_HeroIcon";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import Fun from "../../../tool/Fun";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import Game from "../../../Game";
import SpriteKey from "../../SpriteKey";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroIcon extends fui_HeroIcon {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_HeroIcon {
		return <UI_HeroIcon>(fui_HeroIcon.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroIcon.URL, UI_HeroIcon);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}

	public setData(item: RewardItem): void {
		this.m_number.setVar("count", Fun.formatNumberUnit(item.itemNum)).flushVars();
		this.m_headIcon.m_icons.icon = Game.playData.getIcon(item.itemId);
		this.m_quality.icon = SpriteKey.getUrl("quality" + 3 + ".png");
		if (item.isHero) {
			let inf2 = HeroInfoData.getInfo(item.itemId - 11);
			this.m_quality.icon = SpriteKey.getUrl("quality" + inf2.quality + ".png");
		}
		if (item.isClips) {
			this.m_c1.setSelectedIndex(3);
		}
		else {
			this.m_c1.setSelectedIndex(2);
		}
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
UI_HeroIcon.bind();
