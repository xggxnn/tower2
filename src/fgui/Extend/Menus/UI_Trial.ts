import fui_Trial from "../../Generates/Menus/fui_Trial";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import SpriteKey from "../../SpriteKey";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import EventKey from "../../../Tool/EventKey";

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
		Game.menu.open(MenuId.Arrange);
	}
	// 开始挑战
	startClick(): void {
		EventManager.event(EventKey.SHOW_UI_WAIT);
		Game.battleData.fight_type = 0;
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
		this.m_c1.setSelectedIndex(0);
		this.m_mapid.icon = SpriteKey.getUrl(SpriteKey[Game.battleData.play_map]);
		this.m_levelid.icon = SpriteKey.getUrl(SpriteKey[Game.battleData.play_level]);
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.SELECTWAVE_CALL_BACK, this, this.startFight);
	}


}
UI_Trial.bind();