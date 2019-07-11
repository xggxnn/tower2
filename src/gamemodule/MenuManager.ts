import Dictionary from "../Tool/Dictionary";
import { MenuId } from "./MenuId";
import MenuCtl from "./MenuCtl";
import MenuWindows from "./MenuWindows";
import { MenuOpenParameter } from "./MenuOpenParameter";
import { MenuCtlStateType } from "./MenuCtlStateType";
import Game from "../Game";
import EventManager from "../Tool/EventManager";
import EventKey from "../Tool/EventKey";

export default class MenuManager {

	/** 模块最小缓存时间 */
	menuCacheTime = 10000;

	dict: Dictionary<MenuId, MenuCtl> = new Dictionary<MenuId, MenuCtl>();
	list: MenuCtl[] = [];
	stack: MenuCtl[] = [];
	// 获取模块控制器
	getMenuCtl(menuId: MenuId): MenuCtl {
		return this.dict.getValue(menuId);
	}
	// 销毁
	destory(menuId: MenuId) {
		let ctl = this.getMenuCtl(menuId);
		if (ctl) {
			if (ctl.state == MenuCtlStateType.Opened) {
				ctl.close();
				setTimeout(() => {
					ctl.destory();
				}, 100);
			}
			else {
				ctl.destory();
			}
		}
	}
	// 关闭模块
	close(menuId: MenuId) {
		let ctl = this.getMenuCtl(menuId);
		if (ctl) {
			ctl.close();
		}
	}
	// 返回
	back(menuId: MenuId) {
		let ctl = this.getMenuCtl(menuId);
		if (ctl) {
			let backMenuId = ctl.backMenuId;
			if (backMenuId > 0) {
				let backMenuCtl = this.getMenuCtl(backMenuId);
				if (backMenuCtl) {
					let openParametar = backMenuCtl.moduleWindow ? backMenuCtl.moduleWindow.getLastMenuParameter() : null;
					if (!openParametar) {
						openParametar = backMenuCtl.openParametar;
					}
					this._open(backMenuId, openParametar);
				}
			}

			setTimeout(() => {
				this.close(menuId);
			}, 5);
		}
	}
	// 获取最后打开的面板
	getLastOpenMenuId(excludeMenuId?: MenuId[]): MenuId {
		for (let i = this.stack.length - 1; i >= 0; i--) {
			let ctl = this.stack[i];
			if (ctl.menuId != MenuId.Load) {
				if (excludeMenuId && excludeMenuId.indexOf(ctl.menuId) != -1) {
					continue;
				}
				return ctl.menuId;
			}
		}
		return -1;
	}
	// 获取模块是否打开        
	isOpened(menuId: MenuId) {
		let result = false;
		let ctl = this.getMenuCtl(menuId);
		if (ctl && ctl.state == MenuCtlStateType.Opened) {
			if (ctl.menuId == MenuId.Home) {
				if (ctl.moduleWindow && ctl.moduleWindow.contentPane)
					result = ctl.moduleWindow.contentPane.visible;
			}
			else {
				result = true;
			}
		}
		return result;
	}
	/**
	 * 打开模块
	 * @param menuId 模块id
	 * @param args 携带的参数
	 */
	open(menuId: MenuId, ...args: any[]): MenuCtl {
		return this._open(menuId, { openIndex: 0, args: args, dontCloseOther: false, initFunction: new Dictionary<string, Function>() });
	}
	// 打开模块
	private _open(menuId: MenuId, parametar: MenuOpenParameter) {
		if (menuId != MenuId.Load) {
			EventManager.event(EventKey.SHOW_UI_WAIT);
		}
		let ctl = this.getMenuCtl(menuId);
		if (!ctl) {

			let menuWindowConfig = MenuWindows.get(menuId);
			if (!menuWindowConfig) {
				console.log(`MenuManager.open 没有找到menuWindowConfig, menuId=${menuId}`);
				return null;
			}

			if (!menuWindowConfig.windowClass) {
				console.log(`MenuManager.open menuWindowConfig.windowClass=${menuWindowConfig.windowClass}, menuId=${menuId}`);
				return null;
			}

			ctl = new MenuCtl();
			ctl.__menuManager = this;
			ctl.menuId = menuId;
			ctl.menuWindowConfig = menuWindowConfig;
			this.dict.add(menuId, ctl);
			if (ctl.menuId != MenuId.Home)
				this.list.push(ctl);
		}
		if (menuId == MenuId.GM) parametar.dontCloseOther = true;
		ctl.open(parametar);
		let index = this.stack.indexOf(ctl);
		if (index != -1)
			this.stack.splice(index, 1);
		this.stack.push(ctl);
		//
		return ctl;
	}

	__onMenuClose(ctl: MenuCtl) {
		for (let i = this.stack.length - 1; i >= 0; i--) {
			if (this.stack[i] == ctl)
				this.stack.splice(i, 1);
		}

		// console.log(`关闭面板 :`, "MenuId." + MenuId[ctl.menuId]);
		// 关闭前打开主界面
		// let home = this.getMenuCtl(MenuId.Home);
		// if (!home || home.state != MenuCtlStateType.Opened) {
		// 	home = this.open(MenuId.Home);
		// }

		ctl.__delayClose();
		this.onTick();
	}

	/** 检测销毁模块 */
	onTick() {
		for (let i = 0; i < this.list.length; i++) {
			let ctl = this.list[i];
			if (ctl.state == MenuCtlStateType.Closed) {
				if (ctl.cacheTime != -1) {
					let cacheTime = Math.max(ctl.cacheTime, this.menuCacheTime);
					let subtime = Game.time.localTime - ctl.closeTime;
					if (subtime >= cacheTime && ctl.closeIsDestory) {
						ctl.destory();
					}
				}
			}
		}
	}
}