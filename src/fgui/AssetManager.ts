import Dictionary from "../Tool/Dictionary";
import ResPackageConfig from "./ResPackageConfig";
import FGUIResPackageConfig from "./FGUIResPackageConfig";
import Handler = Laya.Handler;
import Loader = laya.net.Loader;
import { AssetItemInfo, AssetItemType } from "./GamePreload";

// 进度接口
export interface ProgressCallbackInterface {
	(rate: number, current: number, max: number, assetItemInfo?: AssetItemInfo): void;
}

export default class AssetManager {
	static loadedAssets = new Dictionary<string, number>();

	// 加载资源列表
	static loadList(list: AssetItemInfo[], onObj?: any, onCompleteFun?: Function, onProgress?: ProgressCallbackInterface) {

		let count = list.length;
		let index = 0;
		let callback = {
			onComplete: (isSuccess) => {
				let item: AssetItemInfo = list[index];

				index++;

				if (onProgress) {
					let rate = count > 0 ? index / count : 1;
					onProgress(rate, index, count, item);
				}

				if (index >= count) {
					if (onCompleteFun) {
						if (onObj) {
							onCompleteFun.apply(onObj);
						}
						else {
							onCompleteFun();
						}

					}
				}
			},
			onProgress: (val) => {
				// console.log("加载资源列表 onProgress: val=" + val);
			}
		};

		if (list && list.length > 0) {
			let assets = [];
			let item: AssetItemInfo;
			for (let i = 0; i < list.length; i++) {
				item = list[i];
				if (!item) {
					callback.onComplete(item);
				}


				switch (item.type) {
					case AssetItemType.FguiPackage:
						this.loadFguiByPackagename(item.url, callback, callback.onComplete);
						break;
					case AssetItemType.Image:
						assets.push({ url: item.url, type: Loader.IMAGE });
						break;
					case AssetItemType.Buffer:
						assets.push({ url: item.url, type: Loader.BUFFER });
						break;
					case AssetItemType.Sound:
						assets.push({ url: item.url, type: Loader.SOUND });
						break;
					case AssetItemType.Text:
						assets.push({ url: item.url, type: Loader.TEXT });
						break;
					case AssetItemType.Json:
						assets.push({ url: item.url, type: Loader.JSON });
						break;
					case AssetItemType.Xml:
						assets.push({ url: item.url, type: Loader.XML });
						break;
					case AssetItemType.Font:
						assets.push({ url: item.url, type: Loader.FONT });
						break;
					case AssetItemType.TTF:
						assets.push({ url: item.url, type: Loader.TTF });
						break;
				}
			}

			if (assets.length > 0) {
				for (let j = 0; j < assets.length; j++) {
					if (this.loadedAssets.hasKey(assets[j].url)) {
						callback.onComplete(true);
					}
					else {
						Laya.loader.load([assets[j]], Handler.create(callback, callback.onComplete), Handler.create(callback, callback.onProgress));
					}

					this.loadedAssets.add(assets[j].url, new Date().getTime());
				}
			}
		}
		else {
			callback.onComplete(null);
		}

	}

	// 加载fgui包
	static loadFguiByPackagename(packageName: string, caller?: any, method?: Function) {
		let packageConfig: ResPackageConfig = FGUIResPackageConfig.getconfig(packageName);
		this.loadFgui(packageConfig, caller, method);
	}

	static loadFgui(packageConfig: ResPackageConfig, caller?: any, method?: Function) {
		let callback = {
			apply: () => {

				this.addPackage(packageConfig.packagePath, packageConfig);

				if (method) {
					if (caller) {
						return method.apply(caller, [packageConfig]);
					}
					else {
						method(packageConfig);
					}
				}
			}
		};

		if (this._uiPackageDict.hasKey(packageConfig.packagePath)) {
			callback.apply();
			return;
		}

		Laya.loader.load(packageConfig.loadList, Handler.create(callback, callback.apply));
	}

	static unloadFgui(packageName: string, forceDispose?: boolean) {
		if (forceDispose === undefined)
			forceDispose = false;

		let packageConfig: ResPackageConfig = FGUIResPackageConfig.getconfig(packageName);

		if (packageConfig) {
			this.removePackage(packageConfig.packagePath, packageConfig);
			let list = packageConfig.loadList;
			for (let i = 0; i < list.length; i++) {
				Laya.loader.clearRes(list[i].url);
			}
		}
	}


	static _uiPackageDict = new Dictionary<string, fairygui.UIPackage>();
	static addPackage(resKey: string, packageConfig?: ResPackageConfig): fairygui.UIPackage {
		if (this._uiPackageDict.hasKey(resKey)) {
			return this._uiPackageDict.getValue(resKey);
		}
		else {
			let pkg = fairygui.UIPackage.addPackage(resKey);
			this._uiPackageDict.add(resKey, pkg);
			return pkg;
		}
	}

	static removePackage(resKey: string, packageConfig?: ResPackageConfig) {
		let pkg = this._uiPackageDict.getValue(resKey);
		if (pkg) {
			fairygui.UIPackage.removePackage(resKey);
			pkg.dispose();
			this._uiPackageDict.remove(resKey);
		}
	}
}