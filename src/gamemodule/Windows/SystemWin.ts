import FWindow from "../FWindow";
import UI_Circle from "../../fgui/Extend/System/UI_Circle";
import UI_CloseBtn from "../../fgui/Extend/System/UI_CloseBtn";
import UI_GeneralBtn from "../../fgui/Extend/System/UI_GeneralBtn";
import UI_GuideLayer from "../../fgui/Extend/System/UI_GuideLayer";
import UI_OkBtn from "../../fgui/Extend/System/UI_OkBtn";
import UI_PopupMenu from "../../fgui/Extend/System/UI_PopupMenu";
import UI_ScrollTxt from "../../fgui/Extend/System/UI_ScrollTxt";
import UI_TipWin from "../../fgui/Extend/System/UI_TipWin";
import UI_TotalMessage from "../../fgui/Extend/System/UI_TotalMessage";
import UI_HeadIcon from "../../fgui/Extend/System/UI_HeadIcon";
import UI_HeroIcon from "../../fgui/Extend/System/UI_HeroIcon";
import UI_GainRewards from "../../fgui/Extend/System/UI_GainRewards";
import UI_HeadIcon120107 from "../../fgui/Extend/System/UI_HeadIcon120107";
import UI_ItemIcon from "../../fgui/Extend/System/UI_ItemIcon";
import UI_winBtn from "../../fgui/Extend/System/UI_winBtn";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class SystemWin extends FWindow {
	content: UI_Circle;

	CloseBtn: UI_CloseBtn;
	GeneralBtn: UI_GeneralBtn;
	GuideLayer: UI_GuideLayer;
	OkBtn: UI_OkBtn;
	PopupMenu: UI_PopupMenu;
	ScrollTxt: UI_ScrollTxt;
	TipWin: UI_TipWin;
	TotalMessage: UI_TotalMessage;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_Circle);
		this.addAssetForFguiComponent(UI_CloseBtn);
		this.addAssetForFguiComponent(UI_GeneralBtn);
		this.addAssetForFguiComponent(UI_GainRewards);
		this.addAssetForFguiComponent(UI_GuideLayer);
		this.addAssetForFguiComponent(UI_OkBtn);
		this.addAssetForFguiComponent(UI_PopupMenu);
		this.addAssetForFguiComponent(UI_ScrollTxt);
		this.addAssetForFguiComponent(UI_TipWin);
		this.addAssetForFguiComponent(UI_TotalMessage);
		this.addAssetForFguiComponent(UI_HeadIcon);
		this.addAssetForFguiComponent(UI_HeadIcon120107);
		this.addAssetForFguiComponent(UI_HeroIcon);
		this.addAssetForFguiComponent(UI_ItemIcon);
		this.addAssetForFguiComponent(UI_winBtn);
	}
	protected onMenuCreate(): void {
		this.content = UI_Circle.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
