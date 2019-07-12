import FWindow from "../FWindow";
import UI_BagMain from "../../fgui/Extend/Bag/UI_BagMain";
import UI_HeroInfo from "../../fgui/Extend/Home/UI_HeroInfo";
import UI_HeroIcon from "../../fgui/Extend/Menus/UI_HeroIcon";
import UI_HeadIcon from "../../fgui/Extend/Menus/UI_HeadIcon";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class BagWin extends FWindow {
	content: UI_BagMain;

	HeroInfoUI: UI_HeroInfo;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_BagMain);
		this.addAssetForFguiComponent(UI_HeroInfo);
		this.addAssetForFguiComponent(UI_HeroIcon);
		this.addAssetForFguiComponent(UI_HeadIcon);
	}
	protected onMenuCreate(): void {
		this.content = UI_BagMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
	public createHeroInfoUI() {
		if (!this.HeroInfoUI || this.HeroInfoUI == null) {
			this.HeroInfoUI = UI_HeroInfo.createInstance();
		}
		this.windowAddChild(this.HeroInfoUI);
		this.HeroInfoUI.setWin(this, true);
	}
}
