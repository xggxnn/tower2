import fui_GameOver from "../../Generates/Battle/fui_GameOver";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import EventKey from "../../../Tool/EventKey";
import UI_HeroIcon from "../Menus/UI_HeroIcon";
import { Tick } from "../../../Tool/TickManager";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_GameOver extends fui_GameOver {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_GameOver {
		return <UI_GameOver>(fui_GameOver.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_GameOver.URL, UI_GameOver);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_gainBtn.onClick(this, this.gainClick);
		this.m_upBtn.onClick(this, this.upClick);
		this.m_rewardList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_HeroIcon;
		item.setData(Game.battleData.fight_result[index]);
	}
	gainClick(): void {
		Game.battleScene.clearBattleScene();
		Game.menu.open(MenuId.MenuSelect);
	}
	upClick(): void {
		Game.battleScene.clearBattleScene();
		Game.menu.open(MenuId.MenuSelect);
	}

	setData(): void {
		EventManager.event(EventKey.SHOW_UI_WAIT);
		this.m_gainBtn.visible = false;
		this.m_upBtn.visible = false;
		let value: number = Game.gameStatus == GameStatus.Win ? 0 : 1;
		this.m_c1.setSelectedIndex(value);
		let data = {
			winLose: Game.gameStatus == GameStatus.Win,
			waveId: Game.battleData.level_id,
			fightType: Game.battleData.fight_type,
		}
		Game.proto.passWave(data);
	}
	private tick: Tick = null;
	private showResult(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		if (Game.gameStatus == GameStatus.Win && Game.battleData.fight_result.length > 0) {
			if (this.tick) {
				this.tick.Stop();
				Game.tick.clearTick(this.tick);
				this.tick = null;
			}
			this.m_rewardList.numItems = 0;
			this.tick = Game.tick.addTick(Game.battleData.fight_result.length - 1, Laya.Handler.create(this, this.updateNum, null, false), Laya.Handler.create(this, this.addNumOver, null, false), 10);
			this.tick.Start();
		}
		else {
			this.addNumOver();
		}
	}
	private updateNum(): void {
		if (Game.battleData.fight_result.length > this.m_rewardList.numItems) {
			this.m_rewardList.numItems++;
		}
	}
	private addNumOver(): void {
		if (this.tick) {
			this.tick.Stop();
			Game.tick.clearTick(this.tick);
			this.tick = null;
		}
		this.m_gainBtn.visible = true;
		this.m_upBtn.visible = true;
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
		EventManager.on(ProtoEvent.PASSWAVE_CALL_BACK, this, this.showResult);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.PASSWAVE_CALL_BACK, this, this.showResult);
	}


}
UI_GameOver.bind();