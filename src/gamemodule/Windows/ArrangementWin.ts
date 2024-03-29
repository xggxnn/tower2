import FWindow from "../FWindow";
import UI_ArrangementMain from "../../fgui/Extend/Arrangement/UI_ArrangementMain";
import UI_PropBtn from "../../fgui/Extend/Arrangement/UI_PropBtn";
import UI_HeroFetters from "../../fgui/Extend/Home/UI_HeroFetters";
import UI_AssociationItem from "../../fgui/Extend/Arrangement/UI_AssociationItem";
import UI_SkillItem from "../../fgui/Extend/Arrangement/UI_SkillItem";
import UI_HeroIcon55 from "../../fgui/Extend/Arrangement/UI_HeroIcon55";
import UI_UpBtn from "../../fgui/Extend/Arrangement/UI_UpBtn";
import UI_UpLevel from "../../fgui/Extend/Arrangement/UI_UpLevel";
import UI_FightProgress from "../../fgui/Extend/Arrangement/UI_FightProgress";
import UI_SeatBtn from "../../fgui/Extend/Arrangement/UI_SeatBtn";
import UI_Synthetise from "../../fgui/Extend/Home/UI_Synthetise";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class ArrangementWin extends FWindow {
	content: UI_ArrangementMain;

	Synthetise: UI_Synthetise;
	HeroFetters: UI_HeroFetters;
	UpLevel: UI_UpLevel;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_ArrangementMain);
		this.addAssetForFguiComponent(UI_PropBtn);
		this.addAssetForFguiComponent(UI_AssociationItem);
		this.addAssetForFguiComponent(UI_SkillItem);
		this.addAssetForFguiComponent(UI_HeroIcon55);
		this.addAssetForFguiComponent(UI_UpBtn);
		this.addAssetForFguiComponent(UI_UpLevel);
		this.addAssetForFguiComponent(UI_FightProgress);
		this.addAssetForFguiComponent(UI_HeroFetters);
		this.addAssetForFguiComponent(UI_SeatBtn);
	}
	protected onMenuCreate(): void {
		this.content = UI_ArrangementMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
	public createRecommend() {
	}
	public createHeroInfoUI() {
		if (!this.Synthetise || this.Synthetise == null) {
			this.Synthetise = UI_Synthetise.createInstance();
		}
		this.windowAddChild(this.Synthetise);
	}

	public createHeroFetters() {
		if (!this.HeroFetters || this.HeroFetters == null) {
			this.HeroFetters = UI_HeroFetters.createInstance();
		}
		this.windowAddChild(this.HeroFetters);
	}

	public createUpLevelUI() {
		if (!this.UpLevel || this.UpLevel == null) {
			this.UpLevel = UI_UpLevel.createInstance();
		}
		this.windowAddChild(this.UpLevel);
	}


}
