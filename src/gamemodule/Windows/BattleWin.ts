import FWindow from "../FWindow";
import UI_AssociationBtn from "../../fgui/Extend/Battle/UI_AssociationBtn";
import UI_bagua from "../../fgui/Extend/Battle/UI_bagua";
import UI_BattleLeftBottom from "../../fgui/Extend/Battle/UI_BattleLeftBottom";
import UI_BattleLeftTop from "../../fgui/Extend/Battle/UI_BattleLeftTop";
import UI_BattleMain from "../../fgui/Extend/Battle/UI_BattleMain";
import UI_BattleRightBottom from "../../fgui/Extend/Battle/UI_BattleRightBottom";
import UI_BattleRightTop from "../../fgui/Extend/Battle/UI_BattleRightTop";
import UI_BattleTopMiddle from "../../fgui/Extend/Battle/UI_BattleTopMiddle";
import UI_Blood from "../../fgui/Extend/Battle/UI_Blood";
import UI_DriftingBlood from "../../fgui/Extend/Battle/UI_DriftingBlood";
import UI_GameOver from "../../fgui/Extend/Battle/UI_GameOver";
import UI_Shadow from "../../fgui/Extend/Battle/UI_Shadow";
import UI_SkillBtn from "../../fgui/Extend/Battle/UI_SkillBtn";
import UI_Stone from "../../fgui/Extend/Battle/UI_Stone";
import Fun from "../../Tool/Fun";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class BattleWin extends FWindow {
	content: UI_BattleMain;

	AssociationBtn: UI_AssociationBtn;
	bagua: UI_bagua;
	BattleLeftBottom: UI_BattleLeftBottom;
	BattleLeftTop: UI_BattleLeftTop;
	BattleRightBottom: UI_BattleRightBottom;
	BattleRightTop: UI_BattleRightTop;
	BattleTopMiddle: UI_BattleTopMiddle;
	Blood: UI_Blood;
	DriftingBlood: UI_DriftingBlood;
	GameOver: UI_GameOver;
	Shadow: UI_Shadow;
	SkillBtn: UI_SkillBtn;
	Stone: UI_Stone;
	constructor() {
		super();
		this.addAssetForFguiComponent(UI_AssociationBtn);
		this.addAssetForFguiComponent(UI_bagua);
		this.addAssetForFguiComponent(UI_BattleLeftBottom);
		this.addAssetForFguiComponent(UI_BattleLeftTop);
		this.addAssetForFguiComponent(UI_BattleMain);
		this.addAssetForFguiComponent(UI_BattleRightBottom);
		this.addAssetForFguiComponent(UI_BattleRightTop);
		this.addAssetForFguiComponent(UI_BattleTopMiddle);
		this.addAssetForFguiComponent(UI_Blood);
		this.addAssetForFguiComponent(UI_DriftingBlood);
		this.addAssetForFguiComponent(UI_GameOver);
		this.addAssetForFguiComponent(UI_Shadow);
		this.addAssetForFguiComponent(UI_SkillBtn);
		this.addAssetForFguiComponent(UI_Stone);
	}
	protected onMenuCreate(): void {
		this.content = UI_BattleMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
	// 游戏结束，胜利或失败
	public gameResult(): void {
		if (!this.GameOver || this.GameOver == null) {
			this.GameOver = UI_GameOver.createInstance();
		}
		this.windowAddChild(this.GameOver);
	}
	// 左上角UI
	public createLeftTop() {
		if (!this.BattleLeftTop || this.BattleLeftTop == null) {
			this.BattleLeftTop = UI_BattleLeftTop.createInstance();
		}
		this.windowAddChild(this.BattleLeftTop);
		this.BattleLeftTop.setXY(Fun.leftTopPoint.x, Fun.leftTopPoint.y);
	}
	// 左下角UI
	public createLeftBottom() {
		if (!this.BattleLeftBottom || this.BattleLeftBottom == null) {
			this.BattleLeftBottom = UI_BattleLeftBottom.createInstance();
		}
		this.windowAddChild(this.BattleLeftBottom);
		this.BattleLeftBottom.setXY(Fun.leftBottomPoint.x, Fun.leftBottomPoint.y);
	}
	// 右上角UI
	public createRightTop() {
		if (!this.BattleRightTop || this.BattleRightTop == null) {
			this.BattleRightTop = UI_BattleRightTop.createInstance();
		}
		this.windowAddChild(this.BattleRightTop);
		this.BattleRightTop.setXY(Fun.rightTopPoint.x, Fun.rightTopPoint.y);
	}
	// 右下角UI
	public createRightBottom() {
		if (!this.BattleRightBottom || this.BattleRightBottom == null) {
			this.BattleRightBottom = UI_BattleRightBottom.createInstance();
		}
		this.windowAddChild(this.BattleRightBottom);
		this.BattleRightBottom.setXY(Fun.rightBottomPoint.x, Fun.rightBottomPoint.y);
	}
	// 顶部中间UI
	public createTopMiddle() {
		if (!this.BattleTopMiddle || this.BattleTopMiddle == null) {
			this.BattleTopMiddle = UI_BattleTopMiddle.createInstance();
		}
		this.windowAddChild(this.BattleTopMiddle);
		this.BattleTopMiddle.setXY(Fun.topMiddlePoint.x, Fun.topMiddlePoint.y);
	}
}
