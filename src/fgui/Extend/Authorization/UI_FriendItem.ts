import fui_FriendItem from "../../Generates/Authorization/fui_FriendItem";
import AuthorizationWin from "../../../gamemodule/Windows/AuthorizationWin";
import { InviteInfo } from "../../../tool/UserData";
import Fun from "../../../tool/Fun";
import TimerManager from "../../../tool/TimerManager";
import Dictionary from "../../../tool/Dictionary";
import ShareManager from "../../../tool/ShareManager";
import Game from "../../../Game";
import LoaderManager from "../../../tool/LoaderManager";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_FriendItem extends fui_FriendItem {

	moduleWindow: AuthorizationWin;

	public static DependPackages: string[] = ["Authorization"];

	public static createInstance(): UI_FriendItem {
		return <UI_FriendItem>(fui_FriendItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_FriendItem.URL, UI_FriendItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.maxTime = 24 * 60 * 60;
		this.m_tipBtn.onClick(this, this.clickTipBtn);
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
	private maxTime: number = 0;
	private delayTimeKey: string = "";
	setdata(inf: InviteInfo): void {
		this.delayTimeKey = "";
		if (inf != null) {
			this.m_status.setSelectedIndex(2);
			this.m_nam.text = inf.names;
			this.m_icons.icon = inf.avatarUrl;
			this.delayTimeKey = inf.delayTimeKey
			if (inf.delayTime > 0) {
				TimerManager.sUpdateDownCd.add(this.updateTime, this);
			}
			else {
				this.m_status.setSelectedIndex(0);
			}
		}
		else {
			this.m_status.setSelectedIndex(0);
		}
	}
	private updateTime(dic: Dictionary<string, number>): void {
		let tim = dic.getValue(this.delayTimeKey);
		this.m_tim.text = Fun.formatTimeEN(tim);
		this.m_mask.fillAmount = tim / this.maxTime;
	}

	public removeUpdate(): void {
		TimerManager.sUpdateDownCd.remove(this.updateTime, this);
	}
	private clickTipBtn(): void {
		if (this.delayTimeKey) {
			Game.popup.showPopup(this.m_tipBtn, false, false, "正在帮忙巡山中！" + this.m_tim.text + " 后将离开");
		}
		else {
			ShareManager.share();
		}
	}

}
UI_FriendItem.bind();
