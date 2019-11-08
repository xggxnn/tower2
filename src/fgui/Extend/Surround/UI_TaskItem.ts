import fui_TaskItem from "../../Generates/Surround/fui_TaskItem";
import SurroundWin from "../../../gamemodule/Windows/SurroundWin";
import Game from "../../../Game";
import UI_RewardItem from "../System/UI_RewardItem";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import { TaskItem } from "../../../gamemodule/DataStructs/TaskData";
import UI_ProgressBar from "../System/UI_ProgressBar";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_TaskItem extends fui_TaskItem {

	moduleWindow: SurroundWin;

	public static DependPackages: string[] = ["Surround"];

	public static createInstance(): UI_TaskItem {
		return <UI_TaskItem>(fui_TaskItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_TaskItem.URL, UI_TaskItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_gainBtn.onClick(this, this.clickGet);
		this.progress = this.m_progress as UI_ProgressBar;
	}
	private progress: UI_ProgressBar;
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

	private curdata: TaskItem = null;
	setData(index: number): void {
		let conf = Game.task.taskInf.getValue(index + 1);
		this.curdata = Game.task.taskStatus.getValue(index + 1);
		this.m_task.title = conf.content;
		this.progress.max = this.curdata.max;
		let val = (this.curdata.progress < this.curdata.max ? this.curdata.progress : this.curdata.max);
		this.progress.value = val;
		this.progress.m_valZero.setSelectedIndex(val <= 0 ? 1 : 0);
		this.m_gainStatus.setSelectedIndex(this.curdata.status);
		let rew: RewardItem = new RewardItem();
		rew.itemId = this.curdata.rid;
		rew.itemNum = this.curdata.num;
		(this.m_reward as UI_RewardItem).setData(rew);
	}
	private clickGet(): void {
		if (this.curdata && !this.curdata.ispicked && this.curdata.progress >= this.curdata.max) {
			let data = {
				id: this.curdata.id,
			}
			Game.proto.taskGain(data);
		}
	}

}
UI_TaskItem.bind();
