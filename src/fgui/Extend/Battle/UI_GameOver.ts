import fui_GameOver from "../../Generates/Battle/fui_GameOver";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import EventKey from "../../../Tool/EventKey";

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
			waveId: Game.battleData.wave_id,
		}
		Game.proto.passWave(data);
	}

	private showResult(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
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