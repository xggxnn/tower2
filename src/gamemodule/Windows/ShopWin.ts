import FWindow from "../FWindow";
import UI_ItemShop from "../../fgui/Extend/Shop/UI_ItemShop";
import UI_ShopMain from "../../fgui/Extend/Shop/UI_ShopMain";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class ShopWin extends FWindow {
	content: UI_ShopMain;

	ItemShop: UI_ItemShop;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_ItemShop);
		this.addAssetForFguiComponent(UI_ShopMain);
	}
	protected onMenuCreate(): void {
		this.content = UI_ShopMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
