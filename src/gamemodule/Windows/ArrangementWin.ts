import FWindow from "../FWindow";
import UI_ArrangementMain from "../../fgui/Extend/Arrangement/UI_ArrangementMain";
import UI_PropBtn from "../../fgui/Extend/Arrangement/UI_PropBtn";
import UI_Recommend from "../../fgui/Extend/Arrangement/UI_Recommend";
import UI_Association from "../../fgui/Extend/Arrangement/UI_Association";
import UI_txt from "../../fgui/Extend/Arrangement/UI_txt";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class ArrangementWin extends FWindow {
	content: UI_ArrangementMain;

	PropBtn: UI_PropBtn;
	Recommend: UI_Recommend;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_ArrangementMain);
		this.addAssetForFguiComponent(UI_PropBtn);
		this.addAssetForFguiComponent(UI_Recommend);
		this.addAssetForFguiComponent(UI_Association);
		this.addAssetForFguiComponent(UI_txt);
	}
	protected onMenuCreate(): void {
		this.content = UI_ArrangementMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
	public createRecommend() {
		if (!this.Recommend || this.Recommend == null) {
			this.Recommend = UI_Recommend.createInstance();
		}
		this.windowAddChild(this.Recommend);
		this.Recommend.setXY(this.content.m_recommendPos.x, this.content.m_recommendPos.y);
	}
}
