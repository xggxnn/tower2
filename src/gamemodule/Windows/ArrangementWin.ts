import FWindow from "../FWindow";
import UI_ArrangementMain from "../../fgui/Extend/Arrangement/UI_ArrangementMain";
import UI_PropBtn from "../../fgui/Extend/Arrangement/UI_PropBtn";
import UI_HeroInfo from "../../fgui/Extend/Home/UI_HeroInfo";
import UI_AssItem from "../../fgui/Extend/Arrangement/UI_AssItem";
import UI_HeroFetters from "../../fgui/Extend/Home/UI_HeroFetters";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class ArrangementWin extends FWindow {
	content: UI_ArrangementMain;

	HeroInfoUI: UI_HeroInfo;
	HeroFetters: UI_HeroFetters;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_ArrangementMain);
		this.addAssetForFguiComponent(UI_PropBtn);
		this.addAssetForFguiComponent(UI_AssItem);
	}
	protected onMenuCreate(): void {
		this.content = UI_ArrangementMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
	public createRecommend() {
	}
	public createHeroInfoUI() {
		if (!this.HeroInfoUI || this.HeroInfoUI == null) {
			this.HeroInfoUI = UI_HeroInfo.createInstance();
		}
		this.windowAddChild(this.HeroInfoUI);
	}

	public createHeroFetters() {
		if (!this.HeroFetters || this.HeroFetters == null) {
			this.HeroFetters = UI_HeroFetters.createInstance();
		}
		this.windowAddChild(this.HeroFetters);
	}
}
