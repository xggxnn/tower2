import fui_AuthorizationMain from "../../Generates/Authorization/fui_AuthorizationMain";
import AuthorizationWin from "../../../gamemodule/Windows/AuthorizationWin";
import UI_FriendPatrol from "./UI_FriendPatrol";
import ShareManager from "../../../tool/ShareManager";
import EventManager from "../../../tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_AuthorizationMain extends fui_AuthorizationMain {

	moduleWindow: AuthorizationWin;

	public static DependPackages: string[] = ["Authorization"];

	public static createInstance(): UI_AuthorizationMain {
		return <UI_AuthorizationMain>(fui_AuthorizationMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_AuthorizationMain.URL, UI_AuthorizationMain);
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
		EventManager.on(ProtoEvent.FRIEDNPATROL_CALL_BACK, this, this.loginAndEnterGame);
		this.m_login.setSelectedIndex(0);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}

	private friendPatrol: UI_FriendPatrol = null;

	setData(): void {
		let aim = 0;
		if (this.moduleWindow.menuParameter.args.length > 0) {
			aim = Number(this.moduleWindow.menuParameter.args[0]);
		}
		switch (aim) {
			case 0:
				{
					this.m_login.setSelectedIndex(1);
					let pos = this.m_startBtn.localToGlobalRect(0, 0, this.m_startBtn.width, this.m_startBtn.height);
					ShareManager.UserInfLogin(pos);
				}
				break;
			case 1:
			case 2:
				{
					if (this.friendPatrol == null) {
						this.friendPatrol = UI_FriendPatrol.createInstance();
					}
					this.addChild(this.friendPatrol);
					this.friendPatrol.setXY(0, 0);
					this.friendPatrol.setData(this.moduleWindow, aim);
				}
				break;
		}
	}

	private loginAndEnterGame(): void {
		ShareManager.hideUserInfLogin();
		this.closeUI();
	}

}
UI_AuthorizationMain.bind();
