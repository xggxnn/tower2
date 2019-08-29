import fui_BattleLeftBottom from "../../Generates/Battle/fui_BattleLeftBottom";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import TimeHouseInfo from "../../../csvInfo/TimeHouseInfo";
import SkillInfo from "../../../csvInfo/SkillInfo";
import Association from "../../../gamemodule/DataStructs/Association";
import SpriteKey from "../../SpriteKey";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleLeftBottom extends fui_BattleLeftBottom {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleLeftBottom {
		return <UI_BattleLeftBottom>(fui_BattleLeftBottom.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleLeftBottom.URL, UI_BattleLeftBottom);
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
		this.m_showHide.setSelectedIndex(0);
		this.moduleWindow.sUpdateHeroInf.add(this.setData, this);
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		this.moduleWindow.sUpdateHeroInf.remove(this.setData, this);
	}
	private haveShowRangeNum: number = -1;
	private setData(hero: HeroInfoData): void {
		if (hero) {
			if (this.haveShowRangeNum >= 0) {
				clearTimeout(this.haveShowRangeNum);
			}
			let timehouse = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
			let star = timehouse.vals[Game.playData.curStar];
			let skill = SkillInfo.getInfo(hero.skill_id_2);
			this.m_name.text = hero.name;
			let curDic = Game.battleData.getHeroFightVal(hero.id);
			let tip = Game.playData.fightTip(curDic);
			this.m_atktip.setVar("count", tip.getValue(FightType.Atk)).setVar("speed", tip.getValue(FightType.Speed)).flushVars();
			this.m_skill.setVar("des", skill.explain).flushVars();
			this.m_menpai.setVar("name", Association.careerName(hero.career)).flushVars();
			this.m_wuxing.setVar("count", Association.raceName(hero.race)).flushVars();
			this.m_headIcon.m_icons.icon = SpriteKey.getUrl("hero_" + hero.skin + ".png");
			this.m_attribute.icon = SpriteKey.getUrl("race" + hero.race + ".png");
			this.m_atkAttribute.icon = SpriteKey.getUrl("career" + hero.career + ".png");
			this.m_showHide.setSelectedIndex(1);
			this.haveShowRangeNum = setTimeout(() => {
				this.m_showHide.setSelectedIndex(0);
			}, 5000);
		}
	}

}
UI_BattleLeftBottom.bind();