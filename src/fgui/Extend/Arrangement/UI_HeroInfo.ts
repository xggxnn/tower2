import fui_HeroInfo from "../../Generates/Arrangement/fui_HeroInfo";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import Game from "../../../Game";
import HeroInfo from "../../../dataInfo/HeroInfo";
import FiveElementsInfo from "../../../dataInfo/FiveElementsInfo";
import Fun from "../../../Tool/Fun";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroInfo extends fui_HeroInfo {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_HeroInfo {
		return <UI_HeroInfo>(fui_HeroInfo.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroInfo.URL, UI_HeroInfo);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_closeBtn.onClick(this, this.closeUI);
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.windowRemoveChild(this);
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	private heroInf: HeroInfo = null;
	// 显示，相当于enable
	onWindowShow(): void {
		this.heroInf = Game.battleData.clickHeroInf;
		if (this.heroInf != null) {
			this.m_heroname.text = this.heroInf.name;
			this.m_race.text = Fun.format("五行：{0}", FiveElementsInfo.getInfoWithType(this.heroInf.race).name);
			this.m_career.text = Fun.format("门派：{0}", FiveElementsInfo.getInfoWithType(this.heroInf.career).name);
		}
		else {
			console.log("未发现英雄信息");
			this.closeUI();
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Game.battleData.clickHeroInf = null;
		this.heroInf = null;
	}


}
UI_HeroInfo.bind();
