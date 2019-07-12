import FWindow from "../FWindow";
import UI_ArrangementMain from "../../fgui/Extend/Arrangement/UI_ArrangementMain";
import UI_PropBtn from "../../fgui/Extend/Arrangement/UI_PropBtn";
import UI_Association from "../../fgui/Extend/Arrangement/UI_Association";
import UI_txt from "../../fgui/Extend/Arrangement/UI_txt";
import UI_HeroInfo from "../../fgui/Extend/Home/UI_HeroInfo";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class ArrangementWin extends FWindow {
	content: UI_ArrangementMain;

	PropBtn: UI_PropBtn;
	HeroInfoUI: UI_HeroInfo;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_ArrangementMain);
		this.addAssetForFguiComponent(UI_PropBtn);
		this.addAssetForFguiComponent(UI_HeroInfo);
		this.addAssetForFguiComponent(UI_Association);
		this.addAssetForFguiComponent(UI_txt);
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
		this.HeroInfoUI.setWin(this);
	}
}
