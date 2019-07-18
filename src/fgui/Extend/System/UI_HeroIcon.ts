import fui_HeroIcon from "../../Generates/System/fui_HeroIcon";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import RewardItem from "../../../gamemodule/DataStructs/ItemInfo";
import Fun from "../../../Tool/Fun";
import HeroInfo from "../../../dataInfo/HeroInfo";
import SpriteKey from "../../SpriteKey";

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
		this.m_number.setVar("count", item.itemNum.toString()).flushVars();
		if (item.itemId < 10000) {
			this.m_headIcon.m_icons.icon = SpriteKey.getUrl("icon" + item.itemId + ".png");
			this.m_c1.setSelectedIndex(3);
		}
		else {
			switch (item.itemId) {
				case 10001:
					this.m_headIcon.m_icons.icon = SpriteKey.getUrl(SpriteKey.diamond);
					break;
				case 10002:
					this.m_headIcon.m_icons.icon = SpriteKey.getUrl(SpriteKey.gold);
					break;
				case 10003:
					this.m_headIcon.m_icons.icon = SpriteKey.getUrl(SpriteKey.jadeite);
					break;
			}
			this.m_c1.setSelectedIndex(2);
		}
	}
	// 显示碎片
	public clipsSetData(id: string, Clips: number): void {
		let heroInf = HeroInfo.getInfo(id);
		this.m_number.text = Fun.format("{0}X{1}", heroInf.name, Clips);
		this.m_headIcon.m_icons.icon = SpriteKey.getUrl("icon" + heroInf.id + ".png");
		this.m_c1.setSelectedIndex(3);
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
