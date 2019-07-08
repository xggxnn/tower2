import fui_BattleRightBottom from "../../Generates/Battle/fui_BattleRightBottom";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import PlaySkillInfo from "../../../dataInfo/PlaySkillInfo";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import UI_SkillBtn from "./UI_SkillBtn";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleRightBottom extends fui_BattleRightBottom {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleRightBottom {
		return <UI_BattleRightBottom>(fui_BattleRightBottom.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleRightBottom.URL, UI_BattleRightBottom);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_skill3Btn.onClick(this, this.skillClick, [0]);
		this.m_skill2Btn.onClick(this, this.skillClick, [1]);
		this.m_skill1Btn.onClick(this, this.skillClick, [2]);
		this.m_skillBtn.push(this.m_skill3Btn as UI_SkillBtn);
		this.m_skillBtn.push(this.m_skill2Btn as UI_SkillBtn);
		this.m_skillBtn.push(this.m_skill1Btn as UI_SkillBtn);
	}
	private m_skillBtn: Array<UI_SkillBtn> = [];
	private skillClick(index: number): void {
		this.mapSkillCD[index] = this.mapSkillInf[index].cd * 1000;
		this.m_skillBtn[index].m_mask.fillAmount = 1;
		this.m_skillBtn[index].enabled = false;
	}

	private update(): void {
		var dt = Laya.timer.delta;
		for (let i = 0; i < 3; i++) {
			if (this.mapSkillCD[i] > 0) {
				this.mapSkillCD[i] -= dt
				if (this.mapSkillCD[i] < 0) {
					this.mapSkillCD[i] = 0;
					this.m_skillBtn[i].enabled = true;
				}
				this.m_skillBtn[i].m_mask.fillAmount = this.mapSkillCD[i] / this.mapSkillCDMax[i]
			}
		}
	}

	private mapSkillInf: PlaySkillInfo[] = [null, null, null];
	private mapSkillCD: Array<number> = [0, 0, 0];
	private mapSkillCDMax: Array<number> = [0, 0, 0];
	private setData(): void {
		this.mapSkillInf = [null, null, null];
		for (let i = 0; i < 3; i++) {
			this.m_skillBtn[i].m_mask.fillAmount = 0;
			if (Game.battleData.map_skills[i] > 0) {
				this.mapSkillInf[i] = PlaySkillInfo.getInfo(Game.battleData.map_skills[i]);
				this.mapSkillCDMax[i] = this.mapSkillInf[i].cd * 1000;
				this.m_skillBtn[i].enabled = true;
			}
			else {
				this.mapSkillInf[i] = null;
				this.mapSkillCD[i] = 0;
				this.m_skillBtn[i].enabled = false;
			}
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
		EventManager.on(EventKey.ENTER_FRAME, this, this.update);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(EventKey.ENTER_FRAME, this, this.update);
	}


}
UI_BattleRightBottom.bind();