import FWindow from "../FWindow";
import UI_GeneralBtns from "../../fgui/Extend/Home/UI_GeneralBtns";
import UI_HomeMain from "../../fgui/Extend/Home/UI_HomeMain";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class HomeWin extends FWindow {
	content: UI_HomeMain;

	GeneralBtns: UI_GeneralBtns;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_GeneralBtns);
		this.addAssetForFguiComponent(UI_HomeMain);
	}
	protected onMenuCreate(): void {
		this.content = UI_HomeMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
