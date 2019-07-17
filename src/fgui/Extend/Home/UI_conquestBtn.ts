import fui_conquestBtn from "../../Generates/Home/fui_conquestBtn";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import { Tick } from "../../../Tool/TickManager";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import TimerManager from "../../../Tool/TimerManager";
import Fun from "../../../Tool/Fun";
import WaveRewardsInfo from "../../../dataInfo/WaveRewardsInfo";

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
	public canGet: boolean = false;
	public setData(): void {
		this.levelcount = Game.battleMap.waveStatusDict.count;
		this.m_tip1.setVar("count", this.levelcount.toString()).flushVars();
		this.updateTime();
	}
	updateTime(): void {
		this.duration = TimerManager.timestamp - Game.playData.conqueTime;
		this.canGet = Math.floor(this.duration / 60) > 0;
		this.getGold = Fun.formatNumberUnit(Math.floor(WaveRewardsInfo.getInfo(this.levelcount).coin_daily * Math.floor(this.duration / 60))).toString();
		this.m_tip2.setVar("time", Fun.formatTime(this.duration)).setVar("count", this.getGold).flushVars();
	}
	private tick: Tick = null;

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
