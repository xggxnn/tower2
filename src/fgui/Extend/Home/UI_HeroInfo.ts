import fui_HeroInfo from "../../Generates/Home/fui_HeroInfo";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import HeroInfo from "../../../dataInfo/HeroInfo";
import Fun from "../../../Tool/Fun";
import FiveElementsInfo from "../../../dataInfo/FiveElementsInfo";
import SpriteKey from "../../SpriteKey";
import EventKey from "../../../Tool/EventKey";
import FWindow from "../../../gamemodule/FWindow";
import SkillInfo from "../../../dataInfo/SkillInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroInfo extends fui_HeroInfo {

	moduleWindow: HomeWin;
	private fwindow: FWindow;

	public static DependPackages: string[] = ["Home"];

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
		this.m_gainmethod.onClick(this, this.clickGain);
		this.m_gainmethod.title = "获得方式";
		this.m_lookrace.onClick(this, this.clickLookFetters, [0]);
		this.m_lookcareer.onClick(this, this.clickLookFetters, [1]);
		this.m_lookspecial.onClick(this, this.clickLookFetters, [2]);
	}
	private clickLookFetters(types: number): void {
		Game.playData.fettersInf.id = this.heroInf.id;
		Game.playData.fettersInf.type = types;
		Game.playData.sShowFetters.dispatch();
	}


	private showTip: boolean = false;
	private clickGain(): void {
		if (this.showTip) {
			Game.popup.showPopup(this.m_gainmethod, false, ["1、闯关<br />2、挂机"]);
		}
		else {
			// 英雄合成
			EventManager.event(EventKey.SHOW_UI_WAIT);
			let data = {
				heroId: this.heroInf.id,
			}
			Game.proto.synthetise(data);
		}
	}
	private synthetiseOver(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		this.closeUI();
	}
	private heroInf: HeroInfo = null;
	setData(): void {
		this.heroInf = Game.battleData.clickHeroInf;
		if (this.heroInf != null) {
			this.m_heroname.text = this.heroInf.name;
			this.m_race.text = Fun.format("五行：{0}", FiveElementsInfo.getInfoWithType(this.heroInf.race).name);
			this.m_career.text = Fun.format("门派：{0}", FiveElementsInfo.getInfoWithType(this.heroInf.career).name);
			this.m_icons.icon = SpriteKey.getUrl("icon" + this.heroInf.id + ".png");
			let skill = SkillInfo.getInfo(this.heroInf.skill_id_1);
			this.m_atk.setVar("count", skill.atk.toFixed(1)).flushVars();
			this.m_atkspeed.setVar("count", (1 / skill.cd).toFixed(1)).flushVars();
			this.m_cirt.setVar("count", (skill.crit * 100).toFixed(1)).flushVars();
			this.m_burst.setVar("count", (skill.burst * 100).toFixed(0)).flushVars();
			let skill2 = SkillInfo.getInfo(this.heroInf.skill_id_2);
			this.m_skillname.setVar("count", skill2.explain).flushVars();
			this.m_gainmethod.enabled = true;
			this.showTip = false;
			if (Game.playData.curHero.indexOf(this.heroInf.id) == -1) {
				if (Game.playData.curClips.getValue(this.heroInf.id) >= 10) {
					this.m_gainmethod.title = "合成";
				}
				else {
					this.m_gainmethod.title = "数量不足";
					this.m_gainmethod.enabled = false;
				}
			}
			else {
				this.m_gainmethod.title = "获得方式";
				this.showTip = true;
			}
		}
		else {
			console.log("未发现英雄信息");
			this.closeUI();
		}
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
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.synthetiseOver);
		EventManager.on(EventKey.GAMELOSE, this, this.closeUI);
		EventManager.on(EventKey.GAMEWIN, this, this.closeUI);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
		Game.battleData.clickHeroInf = null;
		this.heroInf = null;
		this.fwindow = null;
	}


}
UI_HeroInfo.bind();
