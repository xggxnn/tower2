import fui_boxItem from "../../Generates/Surround/fui_boxItem";
import SurroundWin from "../../../gamemodule/Windows/SurroundWin";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";
import TimerManager from "../../../tool/TimerManager";
import Dictionary from "../../../tool/Dictionary";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_boxItem extends fui_boxItem {

	moduleWindow: SurroundWin;

	public static DependPackages: string[] = ["Surround"];

	public static createInstance(): UI_boxItem {
		return <UI_boxItem>(fui_boxItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_boxItem.URL, UI_boxItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}

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

	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}

	public curStatus: number = 0;
	private index: number = 0;
	private delayTimeKey: string = "";
	setData(index: number): void {
		this.index = index;
		this.m_boxStatus.setSelectedIndex(index);
		this.delayTimeKey = "freeBox_" + index;
		let cd = TimerManager.getTimeUpdate(this.delayTimeKey);
		if (Game.playData.BoxInfo.haveNum.getValue(index) >= 5) {
			this.curStatus = 2;
		}
		else {
			this.curStatus = cd > 0 ? 1 : 0;
		}
		this.m_gainStatus.setSelectedIndex(this.curStatus);
		this.m_num.text = Fun.format("（{0}/5）", Game.playData.BoxInfo.haveNum.getValue(index));
		switch (index) {
			case 0:
				this.m_gold.text = Fun.formatNumberUnit(Game.playData.BoxInfo.reward.getValue(index).itemNum);
				break;
			case 1:
				this.m_diamond.text = Fun.formatNumberUnit(Game.playData.BoxInfo.reward.getValue(index).itemNum);
				break;
			case 2:
				this.m_jadeite.text = Fun.formatNumberUnit(Game.playData.BoxInfo.reward.getValue(index).itemNum);
				break;
		}
		if (this.curStatus == 1) {
			this.m_dealyTime.text = Fun.formatTime(cd);
			TimerManager.sUpdateDownCd.add(this.updateTime, this);
		}
	}
	private updateTime(dic: Dictionary<string, number>): void {
		let tim = dic.getValue(this.delayTimeKey);
		this.m_dealyTime.text = Fun.formatTime(tim);
		if (tim <= 0) {
			this.curStatus = 0;
			this.m_gainStatus.setSelectedIndex(this.curStatus);
			TimerManager.sUpdateDownCd.remove(this.updateTime, this);
		}
	}
	public removeUpdate(): void {
		TimerManager.sUpdateDownCd.remove(this.updateTime, this);
	}

}
UI_boxItem.bind();
