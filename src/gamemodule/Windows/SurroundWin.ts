import FWindow from "../FWindow";
import UI_SurroundMain from "../../fgui/Extend/Surround/UI_SurroundMain";
import UI_KingItem from "../../fgui/Extend/Surround/UI_KingItem";
import UI_TaskItem from "../../fgui/Extend/Surround/UI_TaskItem";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class SurroundWin extends FWindow {
	content: UI_SurroundMain;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_SurroundMain);
		this.addAssetForFguiComponent(UI_KingItem);
		this.addAssetForFguiComponent(UI_TaskItem);
	}
	protected onMenuCreate(): void {
		this.content = UI_SurroundMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
