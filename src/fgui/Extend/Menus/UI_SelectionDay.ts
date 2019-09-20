import fui_SelectionDay from "../../Generates/Menus/fui_SelectionDay";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import BattleEffectEnemy from "../../../gamemodule/Models/BattleEffectEnemy";
import Game from "../../../Game";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_SelectionDay extends fui_SelectionDay {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_SelectionDay {
		return <UI_SelectionDay>(fui_SelectionDay.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_SelectionDay.URL, UI_SelectionDay);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_selBtn.onClick(this, this.clickBtn);
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

	private clickBtn(): void {
		if (Game.battleData.dayFightProgress == this.index) {
			EventManager.event(EventKey.DAYFIGHTSELECT);
		}
		else if (Game.battleData.dayFightProgress > this.index) {
			Game.tipWin.showTip(Game.tipTxt.txts("DailyChallengeDone"), false);
		}
		else if (this.index == 5) {
			Game.rewardWin.showReward(Game.battleData.dayReward, false);
		}
	}
	private index: number = 0;

	private _sk: BattleEffectEnemy = null;
	private addBattleEffect(id: string, loop: boolean): BattleEffectEnemy {
		let key: string = String(id);
		let _effect: BattleEffectEnemy = BattleEffectEnemy.create(id, loop);
		this.displayObject.addChild(_effect.sk);
		_effect.scale(1, 1, true);
		_effect.sk.pos(40, 40);
		return _effect;
	}

	public dayData(index: number): void {
		this.index = index;
		if (this._sk) {
			this._sk.sk.destroySk();
			this._sk = null;
		}
		if (Game.battleData.dayFightProgress == this.index) {
			this.m_grayStatus.setSelectedIndex(0);
			this._sk = this.addBattleEffect("ui03", true);
			this._sk.sk.pos(40, 20);
		}
		else if (Game.battleData.dayFightProgress < this.index) {
			this.m_grayStatus.setSelectedIndex(1);
		}
		else {
			this.m_grayStatus.setSelectedIndex(0);
			this._sk = this.addBattleEffect("ui02", true);
		}
	}

}
UI_SelectionDay.bind();
