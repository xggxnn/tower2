import FWindow from "../FWindow";
import UI_IllustrationMain from "../../fgui/Extend/Illustration/UI_IllustrationMain";
import UI_HeroInfo from "../../fgui/Extend/Home/UI_HeroInfo";
import UI_HeroFetters from "../../fgui/Extend/Home/UI_HeroFetters";
import UI_Synthetise from "../../fgui/Extend/Home/UI_Synthetise";
import UI_HeroItem2 from "../../fgui/Extend/Illustration/UI_HeroItem2";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class IllustrationWin extends FWindow {
	content: UI_IllustrationMain;

	HeroInfoUI: UI_HeroInfo;
	HeroFetters: UI_HeroFetters;
	Synthetise: UI_Synthetise;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_IllustrationMain);
		this.addAssetForFguiComponent(UI_HeroItem2);
	}
	protected onMenuCreate(): void {
		this.content = UI_IllustrationMain.createInstance();
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
	public createSynthetiseUI() {
		if (!this.Synthetise || this.Synthetise == null) {
			this.Synthetise = UI_Synthetise.createInstance();
		}
		this.windowAddChild(this.Synthetise);
	}
}
