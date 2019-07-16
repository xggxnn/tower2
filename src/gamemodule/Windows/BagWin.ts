import FWindow from "../FWindow";
import UI_BagMain from "../../fgui/Extend/Bag/UI_BagMain";
import UI_HeroInfo from "../../fgui/Extend/Home/UI_HeroInfo";
import UI_BagItem from "../../fgui/Extend/Bag/UI_BagItem";
import UI_GainRewards from "../../fgui/Extend/System/UI_GainRewards";
import UI_HeroFetters from "../../fgui/Extend/Home/UI_HeroFetters";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class BagWin extends FWindow {
	content: UI_BagMain;

	HeroInfoUI: UI_HeroInfo;
	GainReward: UI_GainRewards;
	HeroFetters: UI_HeroFetters;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_BagMain);
		this.addAssetForFguiComponent(UI_BagItem);
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
	}
	public createHeroFetters() {
		if (!this.HeroFetters || this.HeroFetters == null) {
			this.HeroFetters = UI_HeroFetters.createInstance();
		}
		this.windowAddChild(this.HeroFetters);
	}
	public createGainReward() {
		if (!this.GainReward || this.GainReward == null) {
			this.GainReward = UI_GainRewards.createInstance();
		}
		this.windowAddChild(this.GainReward);
	}
}
