import fui_conquestBtn from "../../Generates/Home/fui_conquestBtn";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import { Tick } from "../../../tool/TickManager";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import TimerManager from "../../../tool/TimerManager";
import Fun from "../../../tool/Fun";
import WaveRewardInfo from "../../../csvInfo/WaveRewardInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_conquestBtn extends fui_conquestBtn {

	moduleWindow: HomeWin;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_conquestBtn {
		return <UI_conquestBtn>(fui_conquestBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_conquestBtn.URL, UI_conquestBtn);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}

	public levelcount: number = 0;
	public duration: number = 0;
	public getGold: string = "";
	public getDiamond: string = "";
	public canGet: boolean = false;
	private haveRed: boolean = false;
	public setData(): void {
		this.haveRed = false;
		this.levelcount = 0;
		if (Game.battleMap.waveStatusDict.count > 0) {
			this.levelcount = Game.battleMap.waveStatusDict.count;
			this.m_tip1.setVar("count", this.levelcount.toString()).flushVars();
			this.m_tip2.visible = true;
			this.updateTime();
		}
		else {
			this.m_tip1.setVar("count", "0").flushVars();
			this.m_tip2.visible = false;
		}
		this.enabled = this.levelcount != 0;
	}
	updateTime(): void {
		if (this.levelcount > 0) {
			this.duration = TimerManager.timestamp - Game.playData.conqueTime;
			if (this.duration > this.maxHoures) {
				this.duration = this.maxHoures;
				if (!this.haveRed) {
					this.haveRed = true;
					this.m_redTip.setSelectedIndex(1);
				}
			} else {
				if (this.haveRed) {
					this.haveRed = false;
					this.m_redTip.setSelectedIndex(0);
				}
			}
			this.canGet = Math.floor(this.duration / 60) > 0;
			this.getGold = Fun.formatNumberUnit(Math.floor(WaveRewardInfo.getInfo(this.levelcount).coin_daily * Math.floor(this.duration / 60))).toString();
			this.getDiamond = Fun.formatNumberUnit(Math.floor(WaveRewardInfo.getInfo(this.levelcount).diamond_daily * Math.floor(this.duration / 60 / 10))).toString();
			this.m_tip2.setVar("time", Fun.formatTime(this.duration)).setVar("count", this.getGold).setVar("count2", this.getDiamond).flushVars();
		}
	}
	private tick: Tick = null;
	private maxHoures = 14400;

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(EventKey.ENTER_SECOND, this, this.updateTime);

	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(EventKey.ENTER_SECOND, this, this.updateTime);
	}


}
UI_conquestBtn.bind();
