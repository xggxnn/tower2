import FWindow from "../FWindow";
import UI_GMMain from "../../fgui/Extend/GM/UI_GMMain";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class GMWin extends FWindow {
	content: UI_GMMain;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_GMMain);
	}
	protected onMenuCreate(): void {
		this.content = UI_GMMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
