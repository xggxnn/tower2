import fui_ItemIcon from "../../Generates/System/fui_ItemIcon";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import HeroInfo from "../../../dataInfo/HeroInfo";
import SpriteKey from "../../SpriteKey";
import RewardItem from "../../../gamemodule/DataStructs/ItemInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_ItemIcon extends fui_ItemIcon {

	moduleWindow: SystemWin;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_ItemIcon {
		return <UI_ItemIcon>(fui_ItemIcon.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_ItemIcon.URL, UI_ItemIcon);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

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

	public itemInfo: RewardItem;
	public setData(inf: RewardItem): void {
		this.itemInfo = inf;
		this.m_number.setVar("count", this.itemInfo.itemNum.toString()).flushVars();
		if (this.itemInfo.isClips) {
			this.m_c1.setSelectedIndex(3);
		}
		else {
			this.m_c1.setSelectedIndex(2);
		}
		switch (this.itemInfo.itemId) {
			case 10001:
				this.m_headIcon.icon = SpriteKey.getUrl(SpriteKey.diamond);
				break;
			case 10002:
				this.m_headIcon.icon = SpriteKey.getUrl(SpriteKey.gold);
				break;
			case 10003:
				this.m_headIcon.icon = SpriteKey.getUrl(SpriteKey.jadeite);
				break;
			case 10004:
				this.m_headIcon.icon = SpriteKey.getUrl(SpriteKey.jadeite);
				break;
			default:
				this.m_headIcon.icon = SpriteKey.getUrl("icon" + this.itemInfo.itemId + ".png");
				break;
		}
	}
	public hero: HeroInfo = null;
	public setHero(hero: HeroInfo): void {
		this.hero = hero;
		this.m_headIcon.icon = SpriteKey.getUrl("icon" + this.hero.id + ".png");
	}

}
UI_ItemIcon.bind();
