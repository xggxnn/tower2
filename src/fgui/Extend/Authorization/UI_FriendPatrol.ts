import fui_FriendPatrol from "../../Generates/Authorization/fui_FriendPatrol";
import AuthorizationWin from "../../../gamemodule/Windows/AuthorizationWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import UI_FriendItem from "./UI_FriendItem";
import ShareManager from "../../../tool/ShareManager";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_FriendPatrol extends fui_FriendPatrol {

	moduleWindow: AuthorizationWin;

	public static DependPackages: string[] = ["Authorization"];

	public static createInstance(): UI_FriendPatrol {
		return <UI_FriendPatrol>(fui_FriendPatrol.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_FriendPatrol.URL, UI_FriendPatrol);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_closeBtn.onClick(this, this.closeUI);
		this.m_inviteBtn.onClick(this, this.clickInvite);

		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
	}

	// 关闭ui
	closeUI(): void {
		for (let i = 0; i < 10; i++) {
			let item = this.m_list.getChildAt(i) as UI_FriendItem;
			item.removeUpdate();
		}
		this.removeFromParent();
		this.moduleWindow.menuClose();
		if (this.aim == 2) {
			Game.battleData.curEnterFightType = 0;
			Game.menu.open(MenuId.MenuSelect);
		}
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

	// 打开的来源，2表示选关界面
	private aim: number = 0;

	public setData(moduleWindow: AuthorizationWin, aim: number): void {
		this.moduleWindow = moduleWindow;
		this.aim = aim;
		let num = Game.userData.InviteNum();
		let pre1 = 10;
		let pre2 = 5;
		this.m_haveCount.setVar("count", num.toString()).flushVars();
		this.m_gainTips.setVar("count1", (num * pre1).toString())
			.setVar("count2", (num * pre2).toString())
			.flushVars();
		this.m_tips.setVar("count1", pre1.toString())
			.setVar("count2", pre2.toString())
			.flushVars();
		this.m_list.numItems = 10;
	}
	// 邀请
	private clickInvite(): void {
		ShareManager.share();
	}

	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_FriendItem;
		if (index < Game.userData.InviteData.length) {
			item.setdata(Game.userData.InviteData[index]);
		}
		else {
			item.setdata(null);
		}
	}

}
UI_FriendPatrol.bind();
