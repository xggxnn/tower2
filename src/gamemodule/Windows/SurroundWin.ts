import FWindow from "../FWindow";
import UI_SurroundMain from "../../fgui/Extend/Surround/UI_SurroundMain";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class SurroundWin extends FWindow {
	content: UI_SurroundMain;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_SurroundMain);
	}
	protected onMenuCreate(): void {
		this.content = UI_SurroundMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
