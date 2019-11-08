import FWindow from "../FWindow";
import UI_SurroundMain from "../../fgui/Extend/Surround/UI_SurroundMain";
import UI_KingItem from "../../fgui/Extend/Surround/UI_KingItem";
import UI_TaskItem from "../../fgui/Extend/Surround/UI_TaskItem";
import UI_boxItem from "../../fgui/Extend/Surround/UI_boxItem";
import UI_EndlessItem from "../../fgui/Extend/Surround/UI_EndlessItem";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class SurroundWin extends FWindow {
	content: UI_SurroundMain;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_SurroundMain);
		this.addAssetForFguiComponent(UI_KingItem);
		this.addAssetForFguiComponent(UI_TaskItem);
		this.addAssetForFguiComponent(UI_boxItem);
		this.addAssetForFguiComponent(UI_EndlessItem);
	}
	protected onMenuCreate(): void {
		this.content = UI_SurroundMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
