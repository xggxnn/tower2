import FWindow from "../FWindow";
import UI_BagMain from "../../fgui/Extend/Bag/UI_BagMain";
import UI_BagItem from "../../fgui/Extend/Bag/UI_BagItem";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class BagWin extends FWindow {
	content: UI_BagMain;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_BagMain);
		this.addAssetForFguiComponent(UI_BagItem);
	}
	protected onMenuCreate(): void {
		this.content = UI_BagMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
