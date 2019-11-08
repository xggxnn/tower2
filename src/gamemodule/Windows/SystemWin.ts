import FWindow from "../FWindow";
import UI_Circle from "../../fgui/Extend/System/UI_Circle";
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
import UI_RedTips from "../../fgui/Extend/System/UI_RedTips";
import UI_RewardItem from "../../fgui/Extend/System/UI_RewardItem";
import UI_ScrollTxtNormal from "../../fgui/Extend/System/UI_ScrollTxtNormal";
import UI_LeftBtn from "../../fgui/Extend/System/UI_LeftBtn";
import UI_RightBtn from "../../fgui/Extend/System/UI_RightBtn";
import UI_DialogBox from "../../fgui/Extend/System/UI_DialogBox";
import UI_Hand from "../../fgui/Extend/System/UI_Hand";
import UI_Help from "../../fgui/Extend/System/UI_Help";
import UI_PopupItem from "../../fgui/Extend/System/UI_PopupItem";
import UI_BlackText from "../../fgui/Extend/System/UI_BlackText";
import UI_Exchange from "../../fgui/Extend/System/UI_Exchange";
import UI_DoubleGainTipWin from "../../fgui/Extend/System/UI_DoubleGainTipWin";
import UI_comBtn from "../../fgui/Extend/System/UI_comBtn";
import UI_FriendGain from "../../fgui/Extend/System/UI_FriendGain";
import UI_FightTip from "../../fgui/Extend/System/UI_FightTip";
import UI_TabBtn from "../../fgui/Extend/System/UI_TabBtn";
import UI_ProgressBar from "../../fgui/Extend/System/UI_ProgressBar";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class SystemWin extends FWindow {
	content: UI_Circle;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_Circle);
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
		this.addAssetForFguiComponent(UI_RedTips);
		this.addAssetForFguiComponent(UI_RewardItem);
		this.addAssetForFguiComponent(UI_ScrollTxtNormal);
		this.addAssetForFguiComponent(UI_LeftBtn);
		this.addAssetForFguiComponent(UI_RightBtn);
		this.addAssetForFguiComponent(UI_DialogBox);
		this.addAssetForFguiComponent(UI_Hand);
		this.addAssetForFguiComponent(UI_Help);
		this.addAssetForFguiComponent(UI_PopupItem);
		this.addAssetForFguiComponent(UI_BlackText);
		this.addAssetForFguiComponent(UI_Exchange);
		this.addAssetForFguiComponent(UI_DoubleGainTipWin);
		this.addAssetForFguiComponent(UI_comBtn);
		this.addAssetForFguiComponent(UI_FriendGain);
		this.addAssetForFguiComponent(UI_FightTip);
		this.addAssetForFguiComponent(UI_TabBtn);
		this.addAssetForFguiComponent(UI_ProgressBar);
	}
	protected onMenuCreate(): void {
		this.content = UI_Circle.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
