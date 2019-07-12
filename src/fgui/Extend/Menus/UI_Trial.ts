import fui_Trial from "../../Generates/Menus/fui_Trial";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import SpriteKey from "../../SpriteKey";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import EventKey from "../../../Tool/EventKey";
import WaveStatus from "../../../gamemodule/DataStructs/WaveStatus";
import Fun from "../../../Tool/Fun";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Trial extends fui_Trial {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_Trial {
		return <UI_Trial>(fui_Trial.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Trial.URL, UI_Trial);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_closeBtn.onClick(this, this.closeUI);
		this.m_startBtn.onClick(this, this.startClick);
		this.m_seatBtn.onClick(this, this.seatClickBtn);
	}
	seatClickBtn(): void {
		if (Game.playData.curHero.length > 0) {
			Game.menu.open(MenuId.Arrange);
		}
		else {
			Game.tipWin.showTip("你还没有一个英雄，无法设置阵容");
		}
	}
	private fight_type: number = 0;
	// 开始挑战
	startClick(): void {
		EventManager.event(EventKey.SHOW_UI_WAIT);
		Game.battleData.fight_type = this.fight_type;
		let data = {
			waveId: Game.battleData.level_id,
			fightType: Game.battleData.fight_type,
		}
		Game.proto.selectWave(data);
	}
	private startFight(): void {
		this.moduleWindow.menuClose();
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		Game.menu.open(MenuId.Battle);
	}

	// 关闭ui
	closeUI(): void {
		if (!this.moduleWindow.menuParameter.initFunction.hasKey(this.id)) {
			this.moduleWindow.menuParameter.initFunction.remove(this.id);
		}
		this.moduleWindow.windowRemoveChild(this);
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(ProtoEvent.SELECTWAVE_CALL_BACK, this, this.startFight);
		this.item = null;
		if (Game.battleMap.waveStatusDict.hasKey(Game.battleData.level_id)) {
			this.item = Game.battleMap.waveStatusDict.getValue(Game.battleData.level_id);
		}
		this.fight_type = 0;
		Game.battleData.trial_level = 0;
		this.m_startBtn.enabled = true;
		if (this.item) {
			this.fight_type = 1;
			Game.battleData.trial_level = this.item.level;
			this.m_c1.setSelectedIndex(1);
			this.m_progress.value = Math.floor(this.item.level / 10 * 100);
			if (this.item.fightCd > 0) {
				this.m_cdStatus.setSelectedIndex(1);
				this.m_startBtn.enabled = false;
				this.showFightCd(this.item.fightCd);
				this.item.sUpdateFightCd.add(this.showFightCd, this);
			}
			else {
				this.m_cdStatus.setSelectedIndex(0);
			}
		}
		else {
			this.m_c1.setSelectedIndex(0);
			this.m_cdStatus.setSelectedIndex(0);
		}
		let map = Game.battleData.level_id % 10;
		let level = Game.battleData.level_id / 10;
		let first = SpriteKey.num1;
		switch (map) {
			case 1:
				first = SpriteKey.num1;
				break;
			case 2:
				first = SpriteKey.num2;
				break;
			case 3:
				first = SpriteKey.num3;
				break;
			case 4:
				first = SpriteKey.num4;
				break;
		}
		let end = SpriteKey.num1;
		switch (level) {
			case 1:
				end = SpriteKey.num1;
				break;
			case 2:
				end = SpriteKey.num2;
				break;
			case 3:
				end = SpriteKey.num3;
				break;
			case 4:
				end = SpriteKey.num4;
				break;
		}
		this.m_mapid.icon = SpriteKey.getUrl(first);
		this.m_levelid.icon = SpriteKey.getUrl(end);
	}
	private showFightCd(cd: number): void {
		this.m_cd.text = Fun.format("冷却时间：{0}", Fun.formatTime(cd));
		if (cd <= 0) {
			this.m_cdStatus.setSelectedIndex(0);
			this.m_startBtn.enabled = true;
		}
	}
	private item: WaveStatus = null;
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.SELECTWAVE_CALL_BACK, this, this.startFight);
		if (this.item) {
			this.item.sUpdateFightCd.remove(this.showFightCd, this);
		}
	}


}
UI_Trial.bind();