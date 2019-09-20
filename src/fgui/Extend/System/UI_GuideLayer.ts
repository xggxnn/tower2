import fui_GuideLayer from "../../Generates/System/fui_GuideLayer";
import SystemWin from "../../../gamemodule/Windows/SystemWin";
import UI_winBtn from "./UI_winBtn";
import MenuLayer from "../../../gamemodule/MenuLayer";
import Handler = Laya.Handler;
import Game from "../../../Game";
import FWindow from "../../../gamemodule/FWindow";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import UI_Hand from "./UI_Hand";
import Pools from "../../../tool/Pools";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_GuideLayer extends fui_GuideLayer {

	moduleWindow: SystemWin;
	private fwindow: FWindow;

	public static DependPackages: string[] = ["System"];

	public static createInstance(): UI_GuideLayer {
		return <UI_GuideLayer>(fui_GuideLayer.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_GuideLayer.URL, UI_GuideLayer);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		if (!this.m_wbtn || this.m_wbtn == null) {
			this.m_wbtn = UI_winBtn.createInstance();
			this.addChild(this.m_wbtn);
			this.m_wbtn.onClick(this, this.clickBtn);
		}
	}
	private m_wbtn: UI_winBtn;

	// 关闭ui
	closeUI(): void {
		Game.playData.guideShowTipLong = false;
		if (this.fwindow) {
			this.fwindow.windowRemoveChild(this);
		}
	}
	// 返回上一级ui
	backUI(): void {
		// this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		this.setData();
		EventManager.event(EventKey.CLOSE_WAIT);
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Game.playData.guideTarget = null;
		Game.playData.guideHandler = null;
		this.fwindow = null;
	}

	private setData(): void {
		if (this._dialog) {
			this._dialog.visible = false;
		}
		this.m_pos.setSelectedIndex(0);
		this.m_wbtn.enabled = false;
		let rect = Game.playData.guidePos;
		let win = this.m_window as fairygui.GObject;
		win.setSize(Game.playData.guideTarget.width, Game.playData.guideTarget.height);
		fairygui.tween.GTween.to2(win.x, win.y, rect.x, rect.y, 0.3).setTarget(win, win.setXY).onComplete(this._tweenComplete, this);
	}
	_tweenComplete(): void {
		this.m_wbtn.setSize(this.m_window.width, this.m_window.height);
		this.m_wbtn.setXY(this.m_window.x, this.m_window.y);
		if (this._dialog == null) {
			this._dialog = Pools.fetch(UI_Hand);
			this.m_wbtn.addChild(this._dialog);
			this._dialog.m_t0.play(null, -1);
		}
		this._dialog.setXY(this.m_wbtn.width / 2, this.m_wbtn.height / 2);
		this._dialog.visible = true;
		setTimeout(() => {
			this.m_wbtn.enabled = true;
			switch (Game.playData.guideTipPos) {
				case LocationType.Upper:
					{
						this.m_top.text = "";
						this.m_pos.setSelectedIndex(1);
						Game.writeEff.startTypeWrite(50, Game.playData.guideTip, this.m_top, null);
					}
					break;
				case LocationType.Left:
					{
						this.m_left.text = "";
						this.m_pos.setSelectedIndex(4);
						Game.writeEff.startTypeWrite(50, Game.playData.guideTip, this.m_left, null);
					}
					break;
				case LocationType.Lower:
					{
						this.m_bottom.text = "";
						this.m_pos.setSelectedIndex(3);
						Game.writeEff.startTypeWrite(50, Game.playData.guideTip, this.m_bottom, null);
					}
					break;
				case LocationType.RightLower:
					{
						this.m_rightLow.text = "";
						this.m_pos.setSelectedIndex(5);
						Game.writeEff.startTypeWrite(50, Game.playData.guideTip, this.m_rightLow, null);
					}
					break;
				default:
					{
						this.m_right.text = "";
						this.m_pos.setSelectedIndex(2);
						Game.writeEff.startTypeWrite(50, Game.playData.guideTip, this.m_right, null);
					}
					break;
			}
			if (Game.playData.guideShowTipLong) {
				Game.writeEff.completeTypeWrite();
			}
		}, 20);
	}
	private _dialog: UI_Hand = null;
	clickBtn(): void {
		this.m_wbtn.enabled = false;
		Game.writeEff.completeTypeWrite();
		if (Game.playData.guideHandler) {
			Game.playData.guideHandler.run();
		}
		this.closeUI();
	}


}
UI_GuideLayer.bind();