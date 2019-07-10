import ResPackageConfig from "./ResPackageConfig";
import Dictionary from "../Tool/Dictionary";
import FGUIResPackageConfig from "./FGUIResPackageConfig";
import Loader = laya.net.Loader;
import AssetManager from "./AssetManager";
import GuiPackageNames from "./GuiPackageNames";

export default class GamePreload {


	static list: AssetItemInfo[];

	private static packageConfigs: ResPackageConfig[] = [];
	// 依赖资源列表
	protected static assets: AssetItemInfo[] = [];

	// 添加依赖资源--fgui 包名
	static addAssetForFguiPackagename(packagename: string) {
		this.assets.push({ url: packagename, type: AssetItemType.FguiPackage });
	}

	// 添加依赖资源--组件
	static addAssetForFguiComponent<T extends fairygui.GComponent>(fguiCom: { new(): T }) {
		let names: string[] = fguiCom["DependPackages"];
		for (let i = 0; i < names.length; i++) {
			this.addAssetForFguiPackagename(names[i]);
		}
	}

	static onObj: any;
	static onCompleteFun: Function;

	static begin(onObj?: any, onCompleteFun?: Function) {
		this.onObj = onObj;
		this.onCompleteFun = onCompleteFun;

		this.generate();
		console.log("预加载资源数量：" + this.list.length);
		AssetManager.loadList(this.list, this, this.onEnd, this.onProgress);
	}

	private static onProgress(rate, index: number, count: number, item) {
		// fgui加载进度
	}
	private static onEnd() {
		for (let packageConfig of this.packageConfigs) {
			AssetManager.addPackage(packageConfig.packagePath);
		}


		if (this.onCompleteFun) {
			if (this.onObj) {
				this.onCompleteFun.apply(this.onObj);
			}
			else {
				this.onCompleteFun();
			}
		}
	}

	private static generate() {
		this.addAssetForFguiPackagename(GuiPackageNames.System);
		this.addAssetForFguiPackagename(GuiPackageNames.GM);
		this.addAssetForFguiPackagename(GuiPackageNames.Sound);
		this.addAssetForFguiPackagename(GuiPackageNames.FSprite);
		this.addAssetForFguiPackagename(GuiPackageNames.Home);

		let dict: Dictionary<string, AssetItemInfo> = new Dictionary<string, AssetItemInfo>();
		let packageDict: Dictionary<string, ResPackageConfig> = new Dictionary<string, ResPackageConfig>();
		for (let i = 0; i < this.assets.length; i++) {
			let item = this.assets[i];
			let packageConfig: ResPackageConfig = null;
			switch (item.type) {
				case AssetItemType.FguiPackage:
					packageConfig = FGUIResPackageConfig.getconfig(item.url);
					break;
				case AssetItemType.FspritePackage:
					packageConfig = FGUIResPackageConfig.getconfig(item.url);
					break;
			}

			if (packageConfig) {
				if (!packageDict.hasKey(packageConfig.packagePath)) {
					packageDict.add(packageConfig.packagePath, packageConfig);
				}

				let packageRes = packageConfig.loadList;
				for (let packageItem of packageRes) {
					if (!dict.hasKey(packageItem.url)) {
						let mitem = { url: packageItem.url, type: AssetHelper.layaLoaderType2AssetItemType(packageItem.type) }
						dict.add(mitem.url, mitem);
					}
				}

			}
			else {
				if (!dict.hasKey(item.url)) {
					dict.add(item.url, item);
				}
			}

		}

		this.list = dict.getValues();
		this.packageConfigs = packageDict.getValues();
	}
}

export interface AssetItemInfo {
	url: string;
	type: AssetItemType;
}

export enum AssetItemType {
	FguiPackage,
	FspritePackage,
	Image,
	Buffer,
	Sound,
	Text,
	Json,
	Xml,
	Font,
	TTF,
	PKM
}

export class AssetHelper {
	private static _layaLoaderType2AssetItemTypeDict;
	static get layaLoaderType2AssetItemTypeDict(): Dictionary<string, AssetItemType> {
		if (!AssetHelper._layaLoaderType2AssetItemTypeDict) {
			let dict = new Dictionary<string, AssetItemType>();
			dict.add(Loader.IMAGE, AssetItemType.Image);
			dict.add(Loader.BUFFER, AssetItemType.Buffer);
			dict.add(Loader.SOUND, AssetItemType.Sound);
			dict.add(Loader.TEXT, AssetItemType.Text);
			dict.add(Loader.JSON, AssetItemType.Json);
			dict.add(Loader.XML, AssetItemType.Xml);
			dict.add(Loader.FONT, AssetItemType.Font);
			dict.add(Loader.TTF, AssetItemType.TTF);

			AssetHelper._layaLoaderType2AssetItemTypeDict = dict;
		}

		return AssetHelper._layaLoaderType2AssetItemTypeDict;
	}

	static layaLoaderType2AssetItemType(loader: string | Loader): AssetItemType {
		return AssetHelper.layaLoaderType2AssetItemTypeDict.getValue(<string>loader);
	}
}