import fui_ItemIcon from "../../Generates/System/fui_ItemIcon";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import Game from "../../../Game";
import SignInfo from "../../../csvInfo/SignInfo";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import SpriteKey from "../../SpriteKey";

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
	// 免费抽奖赋值
	public rewardSetData(index: number): void {
		this.m_status.setSelectedIndex(0);
	}

	public singIndex: number = 0;
	public signInf: SignInfo = null;
	// 签到赋值
	public signSetData(index: number): void {
		this.singIndex = index;
		this.signInf = SignInfo.getInfo(this.singIndex);
		this.m_number.setVar("count", this.signInf.num.toString()).flushVars();
		if (this.signInf.rid > 11) {
			this.m_c1.setSelectedIndex(3);
		}
		else {
			this.m_c1.setSelectedIndex(2);
		}
		this.m_headIcon.icon = Game.playData.getIcon(this.signInf.rid);
		if (Game.playData.signInIndex >= this.singIndex) {
			this.m_status.setSelectedIndex(1);
		}
		else if (Game.playData.signInIndex + 1 == this.singIndex) {
			if (Game.playData.isSign) {
				this.m_status.setSelectedIndex(0);
			}
			else {
				this.m_status.setSelectedIndex(2);
			}
		}
		else {
			this.m_status.setSelectedIndex(0);
		}
	}

	public itemInfo: RewardItem;
	// 获取物品赋值
	public setData(inf: RewardItem): void {
		this.itemInfo = inf;
		this.m_number.setVar("count", this.itemInfo.itemNum.toString()).flushVars();
		if (this.itemInfo.isClips) {
			this.m_c1.setSelectedIndex(3);
		}
		else {
			this.m_c1.setSelectedIndex(2);
		}
		this.m_headIcon.icon = Game.playData.getIcon(this.itemInfo.itemId);
	}
	public hero: HeroInfoData = null;
	// 羁绊关系赋值
	public setHero(hero: HeroInfoData): void {
		this.hero = hero;
		this.m_headIcon.icon = Game.playData.getIcon(this.hero.id + 11);
		this.m_headIcon.grayed = !Game.playData.curHeroInfoList.hasKey(this.hero.id);
		this.m_quality.icon = SpriteKey.getUrl("quality" + hero.quality + ".png");
	}

}
UI_ItemIcon.bind();
