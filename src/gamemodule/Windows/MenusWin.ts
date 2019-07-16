import FWindow from "../FWindow";
import UI_HeadIcon2 from "../../fgui/Extend/Menus/UI_HeadIcon2";
import UI_MenusMain from "../../fgui/Extend/Menus/UI_MenusMain";
import UI_Selection from "../../fgui/Extend/Menus/UI_Selection";
import UI_selectionBtn from "../../fgui/Extend/Menus/UI_selectionBtn";
import UI_Trial from "../../fgui/Extend/Menus/UI_Trial";
import UI_WaveTip from "../../fgui/Extend/Menus/UI_WaveTip";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class MenusWin extends FWindow {
	content: UI_MenusMain;

	HeadIcon2: UI_HeadIcon2;
	Selection: UI_Selection;
	selectionBtn: UI_selectionBtn;
	Trial: UI_Trial;
	WaveTip: UI_WaveTip;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_HeadIcon2);
		this.addAssetForFguiComponent(UI_MenusMain);
		this.addAssetForFguiComponent(UI_Selection);
		this.addAssetForFguiComponent(UI_selectionBtn);
		this.addAssetForFguiComponent(UI_Trial);
		this.addAssetForFguiComponent(UI_WaveTip);
	}
	protected onMenuCreate(): void {
		this.content = UI_MenusMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
	public createTrialUI() {
		if (!this.Trial || this.Trial == null) {
			this.Trial = UI_Trial.createInstance();
		}
		this.windowAddChild(this.Trial);
		if (!this.menuParameter.initFunction.hasKey(this.Trial.id)) {
			this.menuParameter.initFunction.add(this.Trial.id, this.createTrialUI);
		}
	}
}
