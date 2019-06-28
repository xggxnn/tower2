import FWindow from "../FWindow";
import UI_Bag from "../../fgui/Extend/Bag/UI_Bag";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class BagWin extends FWindow {
	content: UI_Bag;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_Bag);
	}
	protected onMenuCreate(): void {
		this.content = UI_Bag.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
