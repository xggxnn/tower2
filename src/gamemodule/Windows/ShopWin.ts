import FWindow from "../FWindow";
import UI_ItemShop from "../../fgui/Extend/Shop/UI_ItemShop";
import UI_ShopMain from "../../fgui/Extend/Shop/UI_ShopMain";
import UI_ShopBtn from "../../fgui/Extend/Shop/UI_ShopBtn";
import UI_Synthetise from "../../fgui/Extend/Home/UI_Synthetise";
import UI_HeroFetters from "../../fgui/Extend/Home/UI_HeroFetters";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class ShopWin extends FWindow {

	content: UI_ShopMain;
	Synthetise: UI_Synthetise;
	HeroFetters: UI_HeroFetters;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_ItemShop);
		this.addAssetForFguiComponent(UI_ShopMain);
		this.addAssetForFguiComponent(UI_ShopBtn);
	}
	protected onMenuCreate(): void {
		this.content = UI_ShopMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
	public createSynthetiseUI() {
		if (!this.Synthetise || this.Synthetise == null) {
			this.Synthetise = UI_Synthetise.createInstance();
		}
		this.windowAddChild(this.Synthetise);
	}
	public createHeroFetters() {
		if (!this.HeroFetters || this.HeroFetters == null) {
			this.HeroFetters = UI_HeroFetters.createInstance();
		}
		this.windowAddChild(this.HeroFetters);
	}
}
