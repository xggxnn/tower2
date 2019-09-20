import fui_FightProgress from "../../Generates/Arrangement/fui_FightProgress";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_FightProgress extends fui_FightProgress {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_FightProgress {
		return <UI_FightProgress>(fui_FightProgress.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_FightProgress.URL, UI_FightProgress);
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

	public setData(num: number, min: number, max: number): void {
		let x = 0;
		if (num < 0) num = 0;
		if (num <= min) {
			x = Math.floor(63 * num / min);
		} else if (num <= max) {
			let num2 = num - min;
			let max2 = max - min;
			x = 63 + Math.floor(84 * num2 / max2);
		} else if (num <= 2 * max) {
			let num3 = num - max;
			let max3 = max;
			x = 63 + 84 + Math.floor(42 * num3 / max3);
		} else if (num < 4 * max) {
			let num4 = num - 2 * max;
			let max4 = 2 * max;
			x = 63 + 84 + 42 + Math.floor(21 * num4 / max4);
		} else {
			x = 210;
		}
		this.m_bar.x = x;
	}

}
UI_FightProgress.bind();
