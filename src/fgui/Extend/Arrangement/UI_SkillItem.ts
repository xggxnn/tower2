import fui_SkillItem from "../../Generates/Arrangement/fui_SkillItem";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import PlayerSkillInfo from "../../../csvInfo/PlayerSkillInfo";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_SkillItem extends fui_SkillItem {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_SkillItem {
		return <UI_SkillItem>(fui_SkillItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_SkillItem.URL, UI_SkillItem);
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
	public setData(inf: PlayerSkillInfo, index: number): void {
		this.m_skillName.text = inf.name;
		this.m_icons.icon = SpriteKey.getUrl("icon_skill0" + inf.id + ".png");
		this.m_double.setSelectedIndex(index);
		if (inf.unlock <= Game.playData.curLevel) {
			this.m_locks.setSelectedIndex(0);
		}
		else {
			this.m_locks.setSelectedIndex(1);
			this.m_lock.text = "金乌等级达到" + inf.unlock + "级解锁！"
		}
	}

}
UI_SkillItem.bind();
