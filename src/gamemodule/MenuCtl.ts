import { MenuId } from "./MenuId";
import { AssetItemInfo } from "../fgui/GamePreload";
import Dictionary from "../Tool/Dictionary";
import FWindow from "./FWindow";
import AssetManager from "../fgui/AssetManager";
import ModuleConfig from "./ModuleConfig";
import MenuManager from "./MenuManager";
import { MenuOpenParameter } from "./MenuOpenParameter";
import { MenuCtlStateType } from "./MenuCtlStateType";
import Game from "../Game";
import MenuLayer from "./MenuLayer";
import { MenuLayerType } from "./DataEnums/MenuLayerType";
import EventManager from "../Tool/EventManager";
import LoaderManager from "../Tool/LoaderManager";
import EventKey from "../Tool/EventKey";

export default class MenuCtl {
	__menuManager: MenuManager;
	menuId: MenuId;
	// 窗口势力对象
	moduleWindow: FWindow;
	_closeOther: boolean = false;
	// 菜单窗口配置
	menuWindowConfig: ModuleConfig;
	// 打开参数
	openParametar: MenuOpenParameter;
	// 返回菜单ID
	backMenuId: MenuId = -1;
	// 当前状态
	state: MenuCtlStateType;
	// 内存停留时间
	cacheTime: number = 100;
	// 关闭时间
	closeTime: number = 0;
	// 此次关闭是否销毁
	closeIsDestory: boolean = false;

	open(parametar: MenuOpenParameter) {
		this.openParametar = parametar;
		if (!this.moduleWindow) {
			this.moduleWindow = new this.menuWindowConfig.windowClass();
			this.moduleWindow.menuId = this.menuId;
			switch (this.menuId) {
				case MenuId.GM:
					this.moduleWindow.windowContainer = MenuLayer.getLayer(MenuLayerType.Guide);
					break;
				case MenuId.Load:
					this.moduleWindow.windowContainer = MenuLayer.getLayer(MenuLayerType.Loader);
					break;
				default:
					this.moduleWindow.windowContainer = MenuLayer.getLayer(MenuLayerType.Module);
					break;
			}
		}
		this.load();
	}

	protected load() {
		this.state = MenuCtlStateType.Loading;
		let list = this.getLoadAssets();
		if (!list || list.length == 0) {
			this.onLoadComplete();
		}
		else {

			// 打开加载面板
			let onProgress = (rate: number, current: number, max: number, assetItemInfo?: AssetItemInfo) => {
				EventManager.event(EventKey.LOADER_PROGRESS, [current, max]);
			};
			AssetManager.loadList(list, this, this.onLoadComplete, onProgress);
		}
	}
	// 加载完成
	private onLoadComplete() {
		this.setShow();
		EventManager.event(EventKey.CLOSE_UI_WAIT);
	}

	protected setShow(): void {

		if (!this.moduleWindow) {
			console.warn(`设置显示 但是模块已销毁 : ${this.menuId}`, "MenuId." + MenuId[this.menuId]);
			return;
		}
		console.log("设置显示面板 : ", "MenuId." + MenuId[this.menuId]);

		this.moduleWindow.sShowComplete.addOnce(this.closeOther, this);

		this.state = MenuCtlStateType.Opened;
		if (this.moduleWindow.menuIsCreated) {
			this.moduleWindow.onMenuOpen(this.openParametar);
		}
		else {
			this.moduleWindow.menuParameter = this.openParametar;
		}
		this.moduleWindow.menuShow(this.moduleWindow.windowContainer);
	}

	// 关闭其他模块
	protected closeOther() {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		let hasCloseOtherMenu: boolean = false;
		// 设置返回MenuID
		let backMenuId = this.__menuManager.getLastOpenMenuId([this.menuId]);

		// if (!this.openParametar.dontCloseOther) {
		// 	let homeIsOpen = this.__menuManager.isOpened(MenuId.Home);
		// 	let list: MenuCtl[] = Game.menu.dict.getValues();
		// 	for (let i = 0; i < list.length; i++) {
		// 		let ctl = list[i];
		// 		if (ctl.menuId == MenuId.Home || ctl.menuId == MenuId.Load)
		// 			continue;

		// 		if (ctl != this) {
		// 			ctl.closeIsDestory = homeIsOpen;
		// 			ctl.close();
		// 			hasCloseOtherMenu = true;
		// 		}
		// 	}
		// }
		this.backMenuId = hasCloseOtherMenu ? backMenuId : -1;
	}
	// 关闭
	close() {
		if (this.state == MenuCtlStateType.Closed || this.state == MenuCtlStateType.Destoryed)
			return;

		this.__menuManager.__onMenuClose(this);
	}
	// 延时关闭，等把主界面打开再关闭
	__delayClose() {
		this.backMenuId = -1;
		if (this.moduleWindow && this.moduleWindow.menuIsCreated) {
			this.moduleWindow.onMenuClose();
			this.closeTime = Game.time.localTime;
		}
		this.state = MenuCtlStateType.Closed;
	}
	// 销毁
	destory() {
		if (this.moduleWindow && this.menuId != MenuId.Load) {
			console.log("销毁面板", "MenuId." + MenuId[this.menuId]);
			this.moduleWindow.sShowComplete.remove(this.closeOther, this);
			this.moduleWindow.dispose();
			this.moduleWindow = null;
		}
		this.state = MenuCtlStateType.Destoryed;
	}

	// 获取模块资源列表
	protected getLoadAssets(): AssetItemInfo[] {
		let list = [];
		let dict: Dictionary<string, AssetItemInfo> = new Dictionary<string, AssetItemInfo>();

		if (!this.moduleWindow.menuIsCreated) {
			this.moduleWindow.getLoadAssets(list, dict);
		}

		this.moduleWindow.generateAssetsForDynmic();
		this.moduleWindow.getLoadAssetsForDynamic(list, dict);

		return list;
	}
}