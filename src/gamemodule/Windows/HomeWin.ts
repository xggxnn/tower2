import FWindow from "../FWindow";
import UI_GeneralBtns from "../../fgui/Extend/Home/UI_GeneralBtns";
import UI_HomeMain from "../../fgui/Extend/Home/UI_HomeMain";
import UI_conquestBtn from "../../fgui/Extend/Home/UI_conquestBtn";
import UI_fightBtn from "../../fgui/Extend/Home/UI_fightBtn";
import UI_seatBtn from "../../fgui/Extend/Home/UI_seatBtn";
import UI_HeroInfo from "../../fgui/Extend/Home/UI_HeroInfo";
import UI_HeroFetters from "../../fgui/Extend/Home/UI_HeroFetters";
import UI_Synthetise from "../../fgui/Extend/Home/UI_Synthetise";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class HomeWin extends FWindow {
	content: UI_HomeMain;
	ConquestBtn: UI_conquestBtn;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_HomeMain);
		this.addAssetForFguiComponent(UI_GeneralBtns);
		this.addAssetForFguiComponent(UI_conquestBtn);
		this.addAssetForFguiComponent(UI_fightBtn);
		this.addAssetForFguiComponent(UI_seatBtn);
		this.addAssetForFguiComponent(UI_HeroInfo);
		this.addAssetForFguiComponent(UI_HeroFetters);
		this.addAssetForFguiComponent(UI_Synthetise);
	}
	protected onMenuCreate(): void {
		this.content = UI_HomeMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
