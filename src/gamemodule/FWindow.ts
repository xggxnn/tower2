import { AssetItemInfo, AssetItemType } from "../fgui/GamePreload";
import Dictionary from "../Tool/Dictionary";
import FGUIResPackageConfig from "../fgui/FGUIResPackageConfig";
import AssetManager from "../fgui/AssetManager";
import { MenuId } from "./MenuId";
import { MenuOpenParameter } from "./MenuOpenParameter";
import Game from "../Game";
import Signal from "../Tool/Signal";

export default class FWindow extends fairygui.Window {

	// 消息--显示完成
	sShowComplete: Signal = new Signal();
	// 消息--隐藏完成
	sHideComplete: Signal = new Signal();

	// 是否初始化视图
	menuIsCreated = false;
	// 模块ID
	menuId: MenuId;

	// 菜单参数
	menuParameter: MenuOpenParameter;
	// 窗口容器
	windowContainer: fairygui.GRoot;
	// win窗口添加的子节点
	windowChildren: Dictionary<number | string, Dictionary<number | string, any>> = new Dictionary<number | string, Dictionary<number | string, any>>();

	public constructor() {
		super();
	}
	protected onInit(): void {
		this.onMenuCreate();
	}
	protected doShowAnimation(): void {
		this.setChildWindow(this.contentPane);
		if (this.openAnimation) {
			// 出现的缓动
			// 缓动结束调用 this.onShown();
		}
		else {
			super.doShowAnimation();
		}
	}
	protected onShown(): void {
		this.sShowComplete.dispatch();
		if (this.contentPane) {
			this.callChildOnWindowShow(this.contentPane);
		}
	}
	protected doHideAnimation(): void {
		if (this.closeAnimation) {
			// 关闭的缓动
			// 缓动结束调用 this.hideImmediately();
		}
		else {
			super.doHideAnimation();
		}
	}
	protected onHide(): void {
		if (this.contentPane) {
			this.callChildOnWindowHide(this.contentPane);
		}
		this.callChildOnWindowHide();
	}
	protected onMenuCreate(): void {
		this.menuIsCreated = true;
		this.onMenuOpen(this.menuParameter);
	}

	onMenuOpen(parameter: MenuOpenParameter): void {
		this.menuParameter = parameter;
	}

	// 菜单显示
	menuShow(root: fairygui.GRoot) {
		this.showOn(root);
	}
	// 菜单管理器调的关闭
	onMenuClose() {
		this.hide();
	}

	windowAddChild(com: fairygui.GComponent) {
		if (com) {
			com["fwindow"] = this;
			if (!this.windowChildren.hasKey(this.menuId)) {
				this.windowChildren.add(this.menuId, new Dictionary<number, any>());
			}
			let child = this.windowChildren.getValue(this.menuId);
			if (!child.hasKey(com.id)) {
				child.add(com.id, com);
			}
			this.windowContainer.addChild(com);
			this.setChildWindow(com);
			this.callChildOnWindowShow(com);
		}
	}
	windowRemoveChild(com: fairygui.GComponent) {
		if (com) {
			this.callChildOnWindowHide(com);
			if (this.windowChildren.hasKey(this.menuId)) {
				let child = this.windowChildren.getValue(this.menuId);
				child.remove(com.id);
			}
			com.removeFromParent();
		}
	}

	//=========================
	// 设置child.moduleWindow
	//-------------------------
	private setChildWindow(com: fairygui.GComponent) {
		if (com) {
			com["moduleWindow"] = this;
		}
	}

	//=========================
	// 调用child GComponent的 onWindowShow
	//-------------------------
	private callChildOnWindowShow(com: fairygui.GComponent) {
		if (com) {
			let enbaleCall: boolean = true;
			let fun: Function = com["onWindowShow"];
			if (fun) {

				if (enbaleCall) {
					fun.apply(com);
				}
			}

			if (enbaleCall && com._children) {
				for (let i = 0; i < com._children.length; i++) {
					this.callChildOnWindowShow(com._children[i]);
				}
			}
		}
	}

	//=========================
	// 调用child GComponent的 onWindowHide
	//-------------------------
	private callChildOnWindowHide(com?: fairygui.GComponent) {
		if (com) {
			let enbaleCall: boolean = true;
			let fun: Function = com["onWindowHide"];
			if (fun) {

				if (enbaleCall) {
					fun.apply(com);
				}
			}

			if (enbaleCall && com._children) {
				for (let i = 0; i < com._children.length; i++) {
					this.callChildOnWindowHide(com._children[i]);
				}
			}
		}
		else {
			if (this.windowChildren.hasKey(this.menuId)) {
				let winChild = this.windowChildren.getValue(this.menuId);
				if (winChild.count > 0) {
					let list = winChild.getValues();
					for (let i = winChild.count - 1; i >= 0; i--) {
						this.windowRemoveChild(list[i]);
					}
				}
			}
		}
	}

	// 关闭
	menuClose() {
		Game.menu.close(this.menuId);
	}

	// 返回, 到之前打开该模块的面板
	menuBack() {
		Game.menu.back(this.menuId);
	}

	// 获取最后的menuParameter
	getLastMenuParameter(): MenuOpenParameter {
		return this.menuParameter;
	}

	get openAnimation(): boolean {
		return false;
	}
	get closeAnimation(): boolean {
		return false
	}

	destory(): void {
		this.sShowComplete.removeAll();
		this.sHideComplete.removeAll();

		if (this.contentPane) {
			this.contentPane.dispose();
			this.contentPane = null;
		}

		super.dispose();
	}

	// 依赖资源列表
	protected _loadAssets: AssetItemInfo[] = [];

	// 添加依赖资源--fgui 包名
	addAssetForFguiPackagename(packagename: string) {
		this._loadAssets.push({ url: packagename, type: AssetItemType.FguiPackage });
	}

	// 添加依赖资源--组件
	addAssetForFguiComponent<T extends fairygui.GComponent>(fguiCom: { new(): T }) {
		let names: string[] = fguiCom["DependPackages"];
		for (let i = 0; i < names.length; i++) {
			this.addAssetForFguiPackagename(names[i]);
		}
	}

	// 获取资源加载列表
	getLoadAssets(list: AssetItemInfo[], dict: Dictionary<string, AssetItemInfo>): AssetItemInfo[] {
		let assets = this._loadAssets;
		for (let i = 0; i < assets.length; i++) {
			let key = assets[i].type + " " + assets[i].url;
			if (!dict.hasKey(key)) {
				list.push(assets[i]);
				dict.add(key, assets[i]);
			}
		}

		return list;
	}

	unloadAssetForFguiPackagename(packagename: string) {
		// switch (packagename) {
		// 	case GuiPackageNames.MainUI:
		// 		return;
		// }
		AssetManager.unloadFgui(packagename);
	}

	// 卸载依赖资源--组件
	unloadAssetForFguiComponent<T extends fairygui.GComponent>(fguiCom: { new(): T }) {
		let names: string[] = fguiCom["DependPackages"];
		for (let i = 0; i < names.length; i++) {
			this.unloadAssetForFguiPackagename(names[i]);
		}
	}

	// 卸载依赖资源--初始化时加载的
	unloadAssetFroAssetList() {
		for (let i = 0; i < this._loadAssets.length; i++) {
			this.unloadAssetForFguiPackagename(this._loadAssets[i].url);
		}
	}


	// 动态资源列表
	protected _dynamicAssetsList: AssetItemInfo[] = [];

	// 添加动态资源
	addDynamicAsset(assetItem: AssetItemInfo) {
		if (assetItem)
			this._dynamicAssetsList.push(assetItem);
	}

	// // 添加动态资源--AvatarConfig里的所有
	// addDynmicAssetForAvatarAll(avatarConfig: AvatarConfig)  {
	// 	avatarConfig.getAllAssset(this._dynamicAssetsList);
	// }

	// 生成动态预加载资源
	generateAssetsForDynmic(): void {
		this._dynamicAssetsList = [];
	}

	// 获取动态资源加载列表
	getLoadAssetsForDynamic(list: AssetItemInfo[], dict: Dictionary<string, AssetItemInfo>): AssetItemInfo[] {
		let assets = this._dynamicAssetsList;
		for (let i = 0; i < assets.length; i++) {
			let key = assets[i].type + " " + assets[i].url;
			if (!dict.hasKey(key)) {
				list.push(assets[i]);
				dict.add(key, assets[i]);
			}
		}

		return list;
	}

}