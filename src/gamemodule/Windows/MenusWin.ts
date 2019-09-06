import FWindow from "../FWindow";
import UI_MenusMain from "../../fgui/Extend/Menus/UI_MenusMain";
import UI_Selection from "../../fgui/Extend/Menus/UI_Selection";
import UI_selectionBtn from "../../fgui/Extend/Menus/UI_selectionBtn";
import UI_Trial from "../../fgui/Extend/Menus/UI_Trial";
import UI_MapItem from "../../fgui/Extend/Menus/UI_MapItem";
import UI_GameOver from "../../fgui/Extend/Battle/UI_GameOver";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class MenusWin extends FWindow {
	content: UI_MenusMain;

	Selection: UI_Selection;
	selectionBtn: UI_selectionBtn;
	Trial: UI_Trial;
	GameOver: UI_GameOver;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_MenusMain);
		this.addAssetForFguiComponent(UI_Selection);
		this.addAssetForFguiComponent(UI_selectionBtn);
		this.addAssetForFguiComponent(UI_Trial);
		this.addAssetForFguiComponent(UI_MapItem);
		this.addAssetForFguiComponent(UI_GameOver);
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
	// 游戏结束，胜利或失败
	public gameResult(): void {
		if (!this.GameOver || this.GameOver == null) {
			this.GameOver = UI_GameOver.createInstance();
		}
		this.windowAddChild(this.GameOver);
	}
}
